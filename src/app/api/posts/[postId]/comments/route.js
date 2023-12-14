import { NextResponse } from "next/server.js";
import { prisma } from "@/app/lib/prisma.js";

export async function GET(request, response) {
  const { postId } = response.params;

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  });

  return NextResponse.json({ success: true, comments });
}

export async function POST(request, response) {
  const { postId } = response.params;
  return NextResponse.json({ success: true, comment });
}
