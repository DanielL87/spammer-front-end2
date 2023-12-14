export const dynamic = "force-dynamic";
import NewPost from "./components/NewPost.jsx";
import Posts from "./components/Posts.jsx";

export default function Home() {
  return (
    <main>
      <h1>Spammer</h1>
      <NewPost />
      <Posts />
    </main>
  );
}
