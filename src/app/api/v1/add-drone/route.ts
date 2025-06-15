import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, location } = body;

    if (!name || !location) {
      return NextResponse.json(
        { success: false, message: "Name and location are required." },
        { status: 400 }
      );
    }

    const drone = await prisma.drone.create({
      data: {
        name,
        location,
        status: "AVAILABLE", // default
      },
    });

    return NextResponse.json({ success: true, data: drone });
  } catch (error: any) {
    console.error("Error creating drone:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
