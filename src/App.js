import './App.css';
import Header from './components/header/header';
import SudokuArea from './components/header/sudoku-area/sudoku-area';



function App() {
  return (
    <div className="App">
      <div className='App-header'>
      <Header/>
      <SudokuArea/>
      
      </div>
    </div>
  );
}

export default App;
