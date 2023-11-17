import logo from './logo.svg';
import './App.css';
import ListCompoment from './components/listCompoment';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ListCompoment name="Daniel"/>
        <ListCompoment name="Daniel"/>
        <ListCompoment name="Daniel"/>
      </header>
    </div>
  );
}

export default App;
