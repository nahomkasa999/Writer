import React, { useState } from "react";

function TitleArea({ titleToBePassed }) {
  const [title, setTitle] = useState("");
  const [isInitial, setIsInitial] = useState(true);

  let prevValue = Object.keys(localStorage)?.[0] || '';

  if(prevValue === "loglevel"){
    prevValue = "Untitled"
  }
  

  const handleInput = (e) => {
    setIsInitial(false)
    const updatedTitle = e.target.value;
    setTitle(updatedTitle); // Update local state
    titleToBePassed(updatedTitle); // Pass the updated title to parent
  };

  return (
    <textarea
      name="TitleContainer"
      id="TitleArea"
      rows={1}
      cols={31}
      placeholder="Title..."
      autoFocus
      value={isInitial ? prevValue : title} 
      onInput={handleInput}
    />
  );
}

export default TitleArea;
