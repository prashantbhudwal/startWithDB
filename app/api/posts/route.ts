import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany();
  return new NextResponse(JSON.stringify(posts));
}
