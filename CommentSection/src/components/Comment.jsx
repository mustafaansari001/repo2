import React, { useState } from "react";
import CommentForm from "./CommentForm";

export default function Comment({ comment, onReply, onVote }) {
  const [showReply, setShowReply] = useState(false);

  const handleReply = text => {
    onReply(text, comment.id);
    setShowReply(false);
  };

  return (
    <div style={{ marginLeft: comment.parentId ? 20 : 0, marginTop: 10 }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: 10,
          background: "#fafafa"
        }}
      >
        <p>{comment.text}</p>
        <small>
          {comment.createdAt.toLocaleString()} | Score: {comment.score}
        </small>
        <div style={{ marginTop: 5 }}>
          <button onClick={() => onVote(comment.id, +1)}>⬆️</button>
          <button onClick={() => onVote(comment.id, -1)}>⬇️</button>
          <button onClick={() => setShowReply(!showReply)}>💬 Reply</button>
        </div>
      </div>

      {showReply && (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
          <CommentForm onSubmit={handleReply} placeholder="Reply..." />
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
