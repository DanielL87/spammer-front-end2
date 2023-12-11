import { API } from "../lib/api.js";
import Post from "./Post.jsx";

export default async function Posts() {
  const res = await fetch(`${API}/api/posts`, { cache: "no-store" });
  const posts = await res.json();

  return (
    <div id="posts-container">
      {posts.posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
