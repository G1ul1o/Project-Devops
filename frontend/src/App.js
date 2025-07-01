import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Predict from './pages/Predict';

function App() {
  return (
  <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Predict" element={<Predict />} />
      </Routes>
    </div>
  );  
}

export default App;
