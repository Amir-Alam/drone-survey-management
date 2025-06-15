import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const missionId = params.id;
    const { location, percentComplete } = await req.json();

    // Find mission and update drone position
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: { drone: true },
    });

    if (!mission) {
      return NextResponse.json(
        { success: false, message: "Mission not found" },
        { status: 404 }
      );
    }

    // Update drone location
    await prisma.drone.update({
      where: { id: mission.droneId },
      data: { location },
    });

    // Simulate progress with just console.log or memory store
    console.log(`Mission ${mission.name}: ${percentComplete}% complete`);

    return NextResponse.json({
      success: true,
      message: "Drone updated with progress.",
    });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
