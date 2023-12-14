export default function Comment({ comment }) {
  return (
    <div className="comment-container">
      {comment.text}
      <hr />
    </div>
  );
}
