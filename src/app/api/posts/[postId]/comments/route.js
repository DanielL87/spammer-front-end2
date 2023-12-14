import { NextResponse } from "next/server.js";
import { prisma } from "@/app/lib/prisma.js";

export async function GET(request, response) {
  const { postId } = response.params;

  const foundPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!foundPost) {
    return NextResponse.json({
      success: false,
      message: "No post found using that ID",
    });
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  });

  return NextResponse.json({ success: true, comments });
}

export async function POST(request, response) {
  const { postId } = response.params;
  const { text } = await request.json();

  const foundPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!foundPost) {
    return NextResponse.json({
      success: false,
      message: "No post found using that ID",
    });
  }

  const comment = await prisma.comment.create({ data: { text, postId } });

  return NextResponse.json({ success: true, comment });
}
