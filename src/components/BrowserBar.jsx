import React,{useEffect, useState} from 'react'


 function BrowserBar(props){
 const [topic, setTopic] = useState('');
 const [results, setResults] = useState([]);
 const [error, setError] = useState('');

 async function GetWikis(props) {
   const title = props.split(/\s+/).join("+");
   const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}':&limit=10&format=json&origin=*`;
   try {
    const response = await fetch(url)

    if(response.ok){
        const result = await response.json()
        const titles = result[1];
      fetchIntroductionusingTitle(titles)
        
    }
   } catch (error) {
     console.log("cant fetch data")
   }
 }

 async function fetchIntroductionusingTitle(titles) {
       // const link = `https://en.wikipedia.org/?curid=${page.pageid}`;    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=extracts&exintro=1&explaintext=1&origin=*`
       const WikeContainer = titles.map(async (title) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=extracts&exintro=1&explaintext=1&origin=*`

        const response = await fetch(url)

        if(response.ok){
            try {
                const Introductionresult = await response.json()
                const query = Introductionresult.query
                const IntroductionContainer = Object.values(Object.values(query)[0])[0]
                const extract = IntroductionContainer.extract || "No Introduction available"
                const link = `https://en.wikipedia.org/?curid=${IntroductionContainer.pageid}`
                return {title: title, Introduction: extract + "...", link: link} 
            } catch (error) {
                setError("pls wait... this might be because your network is not working ")
                return {title: title, Introduction: "No introduction" + "...", link: "#"} 
           
            }   
           
        } else {
            setError("sorry we couldnt find search")
        }

       });
const Container = await Promise.all(WikeContainer)
setResults(Container)
 }
 
const handleSubmit = (e) => {
    e.preventDefault();
    GetWikis(topic)
  };

  return (
    <div>
      <h1>Wikipedia Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}

      {results.length > 0 && (
        <div>
          <h2>Search Results</h2>
          {results.map((result, index) => (
            <div key={index}>
              <h3>{result.title}</h3>
              <p>{result.Introduction}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                Read more on Wikipedia
              </a>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default BrowserBar;