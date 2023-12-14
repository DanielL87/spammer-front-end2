import { prisma } from "../lib/prisma.js";
import Post from "./Post.jsx";

export default async function Posts() {
  const posts = await prisma.post.findMany();

  //sort with prisma query
  // const posts = await prisma.post.findMany({
  //   orderBy: {
  //     CreatedAt: 'desc', // 'desc' for descending order, 'asc' for ascending order
  //   },
  // });

  return (
    <div id="posts-container">
      {posts
        // alternate sort syntax, does the same thing using -
        // .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
        .sort((a, b) =>
          new Date(b.CreatedAt) > new Date(a.CreatedAt) ? 1 : -1
        )
        .map((post) => {
          return <Post key={post.id} post={post} />;
        })}
    </div>
  );
}
