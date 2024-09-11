import { useState } from 'react';
import TitleArea from './components/TitleArea';
import WikipediaIntro from './components/BrowserBar';
import RichText from './components/RichText';


function App() {
  const [keyTitle, setKeyTitle] = useState("");

  const handleStoreTitle = (title) => {
    setKeyTitle(title);
  };

  const handleSave = (body) => {
    try {
      if (!keyTitle) {
        alert("Title cannot be empty!");
        return;
      }
      localStorage.setItem(keyTitle, body);
      alert("Saved successfully!");
    } catch (error) {
      alert(`Unable to save: ${error.message}`);
    }
  };

  return (
    <>
      <TitleArea titleToBePassed={handleStoreTitle} />
      <RichText save={handleSave} />
      <WikipediaIntro />
    </>
  );
}

export default App;
