import { NextResponse } from "next/server";
import { getUsers } from "@/app/lib/queries";

export async function GET() {
  const users = await getUsers();
  //   return new NextResponse(JSON.stringify(users));
  console.log(users)
  return NextResponse.json(users);
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   return NextResponse.json({ id });
// }
