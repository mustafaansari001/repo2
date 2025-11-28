import React, { useState } from "react";

export default function CommentForm({ onSubmit, placeholder }) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        rows="3"
        style={{
          width: "100%",
          borderRadius: 4,
          border: "1px solid #ccc",
          padding: "6px",
          resize: "vertical"
        }}
      />
      <button
        type="submit"
        style={{
          marginTop: 5,
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: 4
        }}
      >
        Post
      </button>
    </form>
  );
}
