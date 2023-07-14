import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
 
  const user = await prisma.user.create({
    data: {
      email: "test",
      name: "test",
    },
  });
  return NextResponse.json(user);
}
