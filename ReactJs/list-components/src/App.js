import logo from './logo.svg';
import './App.css';
import ListElementComponent from './components/ListElementComponent';


function App() {
  return (
    <div className="App ">
      <header className="App-header">
        <ListElementComponent item="Coffee"/>
        <ListElementComponent item="Tea"/>
        <ListElementComponent item="Beer"/>
      </header>
    </div>
  );
}

export default App;
