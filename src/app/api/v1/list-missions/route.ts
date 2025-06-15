import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const missions = await prisma.mission.findMany({
      include: { drone: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: missions });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
