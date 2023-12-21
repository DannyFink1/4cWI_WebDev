import './App.css';
import HeaderComponent from './components/HeaderComponent';
import NewsComponent from './components/NewsComponent';
import { useEffect, useState } from 'react';

function App() {

  const [data, setdata] = useState([]);
  const [lang, setlang] = useState("en");

  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=Christmas&apiKey=&language='+ lang).then(response => response.json()).then(response => {

    if(response.articles != null)
    {
      console.log(response)
      setdata(response.articles[0]);
      console.log(data);
    }
      
    });

  })

  const myFunc = (value) => {
    if (value === undefined) {
      alert("undefined")
    } else {
      console.log(value);
      setlang(value);
    }

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[url('https://i.pinimg.com/originals/53/18/c4/5318c45f7bdc3d4d56959b85b117c5d7.jpg')] bg-cover">
      <HeaderComponent onClick={myFunc} />
      <NewsComponent data={data} />
    </div>
  );
}

export default App;
