import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";


function Login(){
    let navigate = useNavigate()

    const initVal = {
        username: "",
        password: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/authentication/login", data).then((response) => {navigate(`/`);});
    };

    const valSchema = yup.object().shape({
        username: yup.string()
            .min(1)
            .max(100)
            .required("username required")
            /*
            .test('Unique username', 'Username is taken',
                function(value){
                    return new Promise((resolve, reject) => {
                        axios.get(`http://localhost:5000/authentication/${value}`)
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.content === "This username is taken") {
                                    resolve(false);
                                }
                            })
                    })
                }
            )*/,
        password: yup.string().min(8).required("password required"),
    })

    return (
    <div className="createAccountForm"> 
        <div className="form">
            <label>sign up</label>
            <input 
                type="text" 
                className="addUsername" 
                id = "inCreateEvent" 
                name="username" 
                placeholder="username" 
            />
            <input 
                type="password" 
                className="addPassword"
                id = "inCreateEvent" 
                name="password" 
                placeholder="password" 
            />
            <button>log in</button>
            <div className="loginLink" onClick={() => {navigate("/signup")}}>
                or sign up instead
            </div>
        </div>
    </div>

    
    )
}

export default Login;