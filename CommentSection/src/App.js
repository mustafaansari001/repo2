import React from "react";
import CommentSection from "./components/CommentSection";

export default function App() {
  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>💬 Comment Section</h2>
      <CommentSection />
    </div>
  );
}
