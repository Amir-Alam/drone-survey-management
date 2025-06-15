import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, droneId, areaGeoJSON, altitude, pattern } = body;

    if (!name || !droneId || !areaGeoJSON || !altitude || !pattern) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Verify drone exists and is AVAILABLE
    const drone = await prisma.drone.findUnique({ where: { id: droneId } });
    if (!drone) {
      return NextResponse.json(
        { success: false, message: "Drone not found." },
        { status: 404 }
      );
    }

    if (drone.status !== "AVAILABLE") {
      return NextResponse.json(
        { success: false, message: "Drone is not available for new mission." },
        { status: 400 }
      );
    }

    // Create mission
    const mission = await prisma.mission.create({
      data: {
        name,
        droneId,
        areaGeoJSON,
        altitude,
        pattern,
        status: "PLANNED",
      },
    });

    // Update drone status to IN_MISSION (optional, or later during start)
    await prisma.drone.update({
      where: { id: droneId },
      data: { status: "IN_MISSION" },
    });

    return NextResponse.json({ success: true, data: mission });
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
