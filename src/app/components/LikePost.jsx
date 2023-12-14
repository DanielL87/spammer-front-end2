"use client";
import { useRouter } from "next/navigation.js";

export default function LikePost({ post, fetchComments, setComments }) {
  const router = useRouter();
  async function handleLike() {
    const res = await fetch(`/api/posts/${post.id}/likes`, {
      method: "POST",
    });
    fetchComments();
    router.refresh();
  }
  return (
    <div className="likes-container">
      {post.likes}
      <div onClick={handleLike}>👍</div>
    </div>
  );
}
