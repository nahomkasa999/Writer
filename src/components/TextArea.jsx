import React, { useState } from "react";

function TextArea() {
  let [count, setCount] = useState(0);
  let [text, setText] = useState("");

  function CountWord(event) {
    const value = event.target.value;
    setText(value);

    // Count words by splitting the text by spaces, filtering out empty values
    const wordCount = value.trim().split(/\s+/).filter((word) => word.length > 0).length;
    setCount(wordCount);
  }

  return (
    <>
      <p id="wordcounter">Word Count: {count}</p>
      <textarea
        name="WritingContanier"
        id="TextArea"
        rows={18}
        cols={96}
        placeholder="What is in your mind today..."
        value={text}
        onChange={CountWord}
      ></textarea>
    </>
    
  );
}

export default TextArea;
