import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const drones = await prisma.drone.findMany();
  return NextResponse.json({ success: true, data: drones });
}
