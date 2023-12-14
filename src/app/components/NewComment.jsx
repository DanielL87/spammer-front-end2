"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function NewComment({
  setIsCommenting,
  post,
  fetchComments,
  setComments,
}) {
  const [text, setText] = useState("");
  const router = useRouter();

  async function handleformSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    setIsCommenting(false);
    fetchComments();
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleformSubmit}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <div>
          <button type="submit">Comment</button>
          <button
            type="button"
            onClick={(e) => {
              setIsCommenting(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
