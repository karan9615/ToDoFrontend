import './App.css';
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import ShowToDoList from "./components/ShowToDoList"
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Router>
     <NavigationBar />
      <Routes>
      <Route path="/" element={<ShowToDoList />} />
      </Routes>
      </Router>
    </div>
    
  );
}

export default App;
