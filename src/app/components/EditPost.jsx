"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function EditPost({ post, setIsEditing }) {
  const [text, setText] = useState(post.text);

  const router = useRouter();

  async function handleEdit(e) {
    e.preventDefault();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });
    const data = await response.json();

    setIsEditing(false);

    router.refresh();
  }

  async function handleCancel() {
    setIsEditing(false);
  }

  return (
    <div>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <div>
          <button onSubmit={handleEdit} type="submit">
            Edit post
          </button>
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
