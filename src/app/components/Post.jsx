"use client";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost.jsx";
import LikePost from "./LikePost.jsx";
import EditPost from "./EditPost.jsx";
import Comment from "./Comment.jsx";
import { API } from "../lib/api.js";
import NewComment from "./NewComment.jsx";

export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    const res = await fetch(`${API}/api/posts/${post.id}/comments`);
    const info = await res.json();
    setComments(info.comments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="post-containers">
      {isEditing ? (
        <EditPost post={post} setIsEditing={setIsEditing} />
      ) : (
        <div>{post.text}</div>
      )}
      <div className="post-buttons-containers">
        <LikePost post={post} />
        <DeletePost post={post} fetchComments={fetchComments} />
        <div
          type="div"
          onClick={(e) => {
            // e.stopPropagation();
            setIsEditing(true);
          }}
        >
          ✏
        </div>
        <div
          onClick={(e) => {
            setIsCommenting(true);
          }}
        >
          💬
        </div>
      </div>
      <div>
        {isCommenting && (
          <NewComment
            setIsCommenting={setIsCommenting}
            post={post}
            fetchComments={fetchComments}
          />
        )}
        {comments.map(
          (comment) =>
            comment.text && <Comment key={comment.id} comment={comment} />
        )}
      </div>
    </div>
  );
}
