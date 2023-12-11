"use client";
import { useRouter } from "next/navigation.js";
import { API } from "../lib/api.js";

export default function LikePost({ post }) {
  const router = useRouter();
  async function handleLike() {
    const res = await fetch(`${API}/api/posts/${post.id}/likes`, {
      method: "POST",
    });
    router.refresh();
  }
  return (
    <div className="likes-container">
      {post.likes}
      <div onClick={handleLike}>👍</div>
    </div>
  );
}
