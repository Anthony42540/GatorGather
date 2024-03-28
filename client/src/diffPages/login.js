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
        <Formik initialValues={ initVal } onSubmit={ onSubmit } validationSchema={ valSchema }> 
            <Form className="form">
                <label>log in</label>
                <ErrorMessage name="username" component="span"/>
                <Field  
                    id = "inCreateAccount" 
                    name="username" 
                    placeholder="username" 
                    className="addUsername" 
                />
                <ErrorMessage name="password" component="span"/>
                <Field  
                    id = "inCreateAccount" 
                    name="password" 
                    placeholder="password" 
                    className="addPassword" 
                />
                <button type="submit">log in</button>
                <div className="loginLink" onClick={() => {navigate("/signup")}}>
                        or sign up instead
                </div>
                
            </Form>
        </Formik>
    </div>
    )
}

export default Login;