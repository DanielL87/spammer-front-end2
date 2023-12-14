"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function NewPost() {
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (!postText) {
      setError("You must enter a message to post!");
    } else {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: postText,
        }),
      });
      const info = await response.json();
      setPostText("");
      setError("");
      router.refresh();
    }
  }

  function handleInputChanges(event) {
    setPostText(event.target.value);
  }

  return (
    <div>
      <form id="new-post-form" onSubmit={handleFormSubmit}>
        <input type="text" value={postText} onChange={handleInputChanges} />
        <button type="submit" id="create-post-button">
          Submit Post
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
}
