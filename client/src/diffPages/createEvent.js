import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {categoryTagOptions} from "./categoryTags";

function CreateEvent() {
    let navigate = useNavigate()

    const initVal = {
        title: "",
        eventDescription: "",
        author: "",
        categoryTag: [],
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/events", data).then((response) => {navigate(`/`);});
    };

    const valSchema = yup.object().shape({
        title: yup.string().min(1).max(100).required("Please input a title!"),
        eventDescription: yup.string().required("Please write a description for your event!"),
        author: yup.string().min(3).max(12).required("Please write your name or alias!"),
        categoryTag: yup.array().min(1,"Must select a category tag!")
    })

    return (
    <div className="createEventForm"> 
        <Formik initialValues={ initVal } onSubmit={ onSubmit } validationSchema={ valSchema }> 
            <Form className="form">
                <label>add your event</label>
                <ErrorMessage name="title" component="span"/>
                <Field  
                    id = "inCreateEvent" 
                    name="title" 
                    placeholder="title"
                    className="addTitle" 
                />
                <ErrorMessage name="eventDescription" component="span"/>
                <Field
                    id = "inCreateEvent" 
                    name="eventDescription" 
                    placeholder="event description" 
                    className="addDescription" 
                    component="textarea"
                />
                <ErrorMessage name="author" component="span"/>
                <Field  
                    id = "inCreateEvent" 
                    name="author" 
                    placeholder="author" 
                    className="addAuthor" 
                />
                <label htmlFor="categoryTag">Choose a category tag:</label>
                <ErrorMessage name="categoryTag" component="span"/>
                <Field as="select" name="categoryTag" className="addCategoryTag" id="inCreateEvent" multiple>
                    {categoryTagOptions.map(option => (
                        <option value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Field>
                <button type="submit"> create new event</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreateEvent