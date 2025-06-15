import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const drones = await prisma.drone.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: drones });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
