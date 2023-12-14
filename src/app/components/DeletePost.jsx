"use client";
import { useRouter } from "next/navigation.js";

export default function DeletePost({ post, fetchComments, setComments }) {
  const router = useRouter();

  async function handleDeleteButton() {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });
    const info = await response.json();

    console.log("Refreshing the page");
    fetchComments();
    router.refresh();
  }

  return (
    <div className="delete-buttons" onClick={handleDeleteButton}>
      🗑️
    </div>
  );
}
