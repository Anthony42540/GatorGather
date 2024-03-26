import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";

function CreateEvent() {
    const initVal = {
        title: "",
        eventDescription: "",
        author: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/events", data).then((response) => {});
    };

    const valSchema = yup.object().shape({
        title: yup.string().min(1).max(100).required("Please input a title!"),
        eventDescription: yup.string().required("Please write a description for your event!"),
        author: yup.string().min(3).max(12).required("Please write your name or alias!")
    })

    let navigate = useNavigate()

    return (
    <div className="createEventForm"> 
        <Formik initialValues={ initVal } onSubmit={ onSubmit } validationSchema={ valSchema }> 
            <Form className="form">
                <label>
                    Event Title:
                </label>
                <ErrorMessage name="title" component="span"/>
                <Field  
                    id = "inCreateEvent" 
                    name="title" 
                    placeholder="Ex. Tailgate!" 
                />

                <label>
                    Event Description:
                </label>
                <ErrorMessage name="eventDescription" component="span"/>
                <Field  
                    id = "inCreateEvent" 
                    name="eventDescription" 
                    placeholder="Ex. 6 PM near NEB!" 
                />

                <label>
                    Author:
                </label>
                <ErrorMessage name="author" component="span"/>
                <Field  
                    id = "inCreateEvent" 
                    name="author" 
                    placeholder="Ex. Jane Doe." 
                />

                <button type="submit" onClick={() => {navigate(`/`)}}> Create New Event</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreateEvent