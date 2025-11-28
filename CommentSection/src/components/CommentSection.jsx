import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [sortType, setSortType] = useState("newest");

  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      score: 0,
      createdAt: new Date(),
      parentId,
      replies: []
    };
    setComments(prev => [...prev, newComment]);
  };

  const updateScore = (id, delta) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, score: c.score + delta } : c))
    );
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === "newest") return b.createdAt - a.createdAt;
    if (sortType === "oldest") return a.createdAt - b.createdAt;
    if (sortType === "mostScore") return b.score - a.score;
    if (sortType === "leastScore") return a.score - b.score;
    return 0;
  });

  const nestedComments = buildTree(sortedComments);

  function buildTree(list, parentId = null) {
    return list
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        replies: buildTree(list, item.id)
      }));
  }

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>Sort by: </label>
        <select value={sortType} onChange={e => setSortType(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="mostScore">Most Score</option>
          <option value="leastScore">Least Score</option>
        </select>
      </div>

      <CommentForm onSubmit={addComment} placeholder="Write a comment..." />

      <div style={{ marginTop: "20px" }}>
        {nestedComments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={addComment}
            onVote={updateScore}
          />
        ))}
      </div>
    </div>
  );
}
