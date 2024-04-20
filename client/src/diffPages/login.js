import React, { useState, useContext }  from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { context } from "../assists/context";

function Login(){
    let navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(context);

    const login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:5000/authentication/login", data).then((response) => {
            if(response.data.error) {
                alert("response.data.error")
            }
            else {
                localStorage.setItem("token", response.data.token);
                setAuthState({
                    username: response.data.username, 
                    id: response.data.id, 
                    status: true});
                navigate(`/`);
            }
        });
    };

    return (    
    <div className="createAccountForm"> 
        <div className="form">
            <label>login</label>
            <input 
                type="text" 
                className="addUsername" 
                id = "inCreateEvent" 
                name="username" 
                placeholder="username" 
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <input 
                type="password" 
                className="addPassword"
                id = "inCreateEvent" 
                name="password" 
                placeholder="password" 
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button onClick={(login)}>log in</button>
            <div className="loginLink" onClick={() => {navigate("/signup")}}>
                or sign up instead
            </div>
        </div>
    </div>

    
    )
}

export default Login;