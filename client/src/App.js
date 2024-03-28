import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./diffPages/home"
import CreateEvent from "./diffPages/createEvent";
import Event from "./diffPages/event";
import Login from "./diffPages/login";
import Signup from "./diffPages/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <span className="tabs">
            <Link to="/">home</Link>
            <Link to="/createEvent">new event</Link>
          </span>
          <span className="signupTab">
            <Link to="/signup">sign up or login</Link>
          </span>
          <span className="webTitle">GatorGather</span>
        </div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/createEvent" element={ <CreateEvent/> } />
          <Route path="/event/:id" element={ <Event/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/login" element={ <Login/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;