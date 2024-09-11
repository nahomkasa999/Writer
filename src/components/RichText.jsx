import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

function RichText({ save }) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isInitial, setIsInitial] = useState(true);
  const [count, setCount] = useState(0);

  // Get the first value from localStorage if it exists
  let prevValue = Object.values(localStorage)?.[0] || '';

  if (prevValue === 'INFO') {
    prevValue = "What's on your mind today...";
  }

  const handleDelete = () => {
    const confirmDeletion = window.confirm('Are you sure you want to delete all files?');
    const doubleConfirmDeletion = confirmDeletion && window.confirm('This is the last warning. Deletion will remove all files, including important ones.');

    if (doubleConfirmDeletion) {
      localStorage.clear();
      alert('All files have been deleted.');
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setCount(newContent.split(/\s+/).filter(word => word).length); // Count only non-empty words
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          save(content);  // Save the current content
        }}
      >
        <button type="submit">Save</button>
      </form>

      <p>Word count: {count}</p>

      <button
        onClick={handleDelete}
        style={{ color: 'rgb(250, 100, 20, 0.6)', position: 'relative', left: '90%', background: 'transparent', border: 'none' }}
      >
        Delete All Stored Files
      </button>

      <JoditEditor
        ref={editor}
        value={isInitial ? prevValue : content} // Use initial value from localStorage if first load
        tabIndex={1} // tabIndex of the editor
        onBlur={() => {
          setIsInitial(false);  // Mark that the editor has been interacted with
          setContent(editor.current.value);  // Update content with editor's new value
        }}
        onChange={handleContentChange} // Handle content changes and update word count
      />
    </>
  );
}

export default RichText;
