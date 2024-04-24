import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";


function Signup(){
    let navigate = useNavigate()

    const initVal = {
        username: "",
        password: "",
        email: "",
    };
 

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/authentication", data).then((response) => {
        
        register:     
            if(response.data.error) {
                alert(response.data.error)
            }
            else {
                navigate("/login")
            }
        });
    };

    const valSchema = yup.object().shape({
        username: yup.string()
            .min(1)
            .max(100)
            .required("username required")
            .matches(/^[a-zA-Z0-9_\.]+$/, "username must only consist of alphanumeric characters, underscores, and periods"),
        password: yup.string().min(8).required("password required"),
        email: yup.string().email().required("valid email address required"),
    })

    return (
    <div className="createAccountForm"> 
        <Formik initialValues={ initVal } onSubmit={ onSubmit } validationSchema={ valSchema }> 
            <Form className="form">
                <label>sign up</label>
                <ErrorMessage name="username" component="span"/>
                <Field  
                    id = "inCreateAccount" 
                    name="username" 
                    placeholder="create username" 
                    className="addUsername" 
                />
                <ErrorMessage name="password" component="span"/>
                <Field  
                    id = "inCreateAccount" 
                    name="password" 
                    type="password"
                    placeholder="create password" 
                    className="addPassword" 
                />
                <ErrorMessage name="email" component="span"/>
                <Field  
                    id = "inCreateAccount" 
                    name="email" 
                    placeholder="add email" 
                    className="addEmail" 
                />
                <button type="submit">create account</button>
                <div className="loginLink" onClick={() => {navigate("/login")}}>
                    or login instead
                </div>
                
            </Form>
        </Formik>
    </div>
    )
}

export default Signup;