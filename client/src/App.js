import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./diffPages/home"
import CreateEvent from "./diffPages/createEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createEvent">Create a New Event</Link>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/createEvent" element={ <CreateEvent/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;