"use client";
import { useState } from "react";
import { API } from "../lib/api.js";
import { useRouter } from "next/navigation.js";

export default function NewComment({ setIsCommenting, post, fetchComments }) {
  const [text, setText] = useState("");
  const router = useRouter();

  async function handleformSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    setIsCommenting(false);
    console.log("Refreshing the page");
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
