import { NextResponse } from "next/server";
import { getPosts as getPostsFind } from "@/app/lib/queries/find";
import { getPosts as getPostsAggregate } from "@/app/lib/queries/aggregate";

export async function GET() {
  const posts = await getPostsAggregate();
  return NextResponse.json(posts);
}
