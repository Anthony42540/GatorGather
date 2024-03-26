import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./diffPages/home"
import CreateEvent from "./diffPages/createEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <span className="tabs">
            <Link to="/">Home</Link>
            <Link to="/createEvent">New Post</Link>
          </span>
          <span className="title">GatorGather</span>
        </div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/createEvent" element={ <CreateEvent/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;