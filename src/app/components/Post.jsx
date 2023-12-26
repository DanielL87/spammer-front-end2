"use client";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost.jsx";
import LikePost from "./LikePost.jsx";
import EditPost from "./EditPost.jsx";
import Comment from "./Comment.jsx";

import NewComment from "./NewComment.jsx";

export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    const res = await fetch(`/api/posts/${post.id}/comments`);
    const info = await res.json();

    const newComments = info.comments || [];

    setComments(newComments);
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
        <LikePost
          post={post}
          fetchComments={fetchComments}
          setComments={setComments}
        />
        <DeletePost
          post={post}
          fetchComments={fetchComments}
          setComments={setComments}
        />
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
            setComments={setComments}
          />
        )}

        {comments.length > 0 ? (
          <div>
            <h5>Comments:</h5>
            {comments.map(
              (comment) =>
                comment.text && <Comment key={comment.id} comment={comment} />
            )}
          </div>
        ) : (
          <h5>Be the first to comment!</h5>
        )}
      </div>
    </div>
  );
}
