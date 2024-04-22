import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./diffPages/home"
import CreateEvent from "./diffPages/createEvent";
import Event from "./diffPages/event";
import Login from "./diffPages/login";
import Signup from "./diffPages/signup";
import { context } from "./assists/context";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState ({
    username: "",
    id: 0,
    status: false,
  });
  
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/authentication/verify", {
      headers: {
        accessToken: localStorage.getItem('token'),
      },
    }).then((response) => {
      if (response.data.error){
        setAuthState({...authState, status: false});
      }
      else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <context.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <span style={{marginRight: "20px"}}/>
            <span className="tabs">
              <Link to="/">home</Link>
              <Link to="/createEvent">new event</Link>
            </span>
            
            {!authState.status ? (
              <span className="signupTab">
                <Link to="/signup">sign up or login</Link>
              </span>
              ):(
              <button className="signoutTab" onClick={logout}>logout</button>
            )}
        
            <span className="webTitle">GatorGather.</span>
            
            {authState.status && (
              <span className="accountName">
                @{authState.username}
              </span>
            )}
          </div>
          <Routes>
            
            {!authState.status ? (
              <Route path="/" element={ <Signup/> } />
              ):(
                <Route path="/" element={ <Home/> } />
            )}

            {!authState.status ? (
              <Route path="/createEvent" element={ <Signup/> } />
              ):(
              <Route path="/createEvent" element={ <CreateEvent/> } />
            )}

            {!authState.status ? (
              <Route path="/event/:id" element={ <Signup/> } />
              ):(
              <Route path="/event/:id" element={ <Event/> } />
            )}

            <Route path="/signup" element={ <Signup/> } />
            <Route path="/login" element={ <Login/> } />
          </Routes>
        </Router>
      </context.Provider>
    </div>
  );
}

export default App;