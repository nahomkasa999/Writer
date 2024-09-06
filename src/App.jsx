import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TextArea from './components/TextArea'
import TitleArea from './components/TitleArea'
import WikipediaIntro from "./components/BrowserBar.jsx"
function App() {

  return (
    <>
<TitleArea/>
<TextArea/>
<WikipediaIntro/>
    </>
  )
}

export default App
