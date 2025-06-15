import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const VALID_STATUSES = ["IN_PROGRESS", "PAUSED", "COMPLETED", "ABORTED"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const missionId = params.id;
    const { status } = await req.json();

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const mission = await prisma.mission.update({
      where: { id: missionId },
      data: {
        status,
        startTime: status === "IN_PROGRESS" ? new Date() : undefined,
        endTime:
          status === "COMPLETED" || status === "ABORTED"
            ? new Date()
            : undefined,
      },
    });

    if (status === "COMPLETED") {
      const durationInMinutes = Math.floor(
        (new Date().getTime() - new Date(mission.startTime!).getTime()) /
          1000 /
          60
      );

      await prisma.surveyReport.upsert({
        where: { missionId },
        update: {},
        create: {
          missionId,
          duration: durationInMinutes,
          distance: Math.random() * 10 + 2, // Random 2-12 km
          coverage: Math.random() * 5 + 1, // Random 1-6 sq km
        },
      });
    }

    return NextResponse.json({ success: true, data: mission });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
