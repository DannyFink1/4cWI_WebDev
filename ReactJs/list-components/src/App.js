import logo from './logo.svg';
import './App.css';
import ListElementComponent from './components/ListElementComponent';
import ButtonComponent from './components/ButtonComponent';
import CardComponent from './components/CardComponent';


function App() {

  
  return (
    <div className="App ">
      <header className="App-header">
        <ListElementComponent item="Coffee"/>
        <ListElementComponent item="Tea"/>
        <ListElementComponent item="Beer"/>
        <ButtonComponent name="Sendar"/>
        <CardComponent src="https://www.w3schools.com/howto/img_avatar.png" name="John Doe" title="Architect & Engineer"/>
      </header>
    </div>
  );
}

export default App;
