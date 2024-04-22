import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { categoryTagOptions } from "./categoryTags";
import { SelectField } from "./dropDown";

function CreateEvent() {
    let navigate = useNavigate()

    const initVal = {
        title: "",
        eventDescription: "",
        categoryTag: [],
    };

    const onSubmit = (data) => {
        axios
            .post("http://localhost:5000/events", 
                data,

                {headers: {accessToken: localStorage.getItem("token"),}}
            )
            .then((response) => {
                if (response.data.error){
                    alert("please login to post")
                }
                else{
                    console.log(data);
                    navigate("/");
                }
            });
    };

    const valSchema = yup.object().shape({
        title: yup.string().min(1).max(100).required("Please input a title!"),
        eventDescription: yup.string().required("Please write a description for your event!"),
        categoryTag: yup.array()
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
                <ErrorMessage name="categoryTag" component="span"/>
                <Field 
                    name="categoryTag" 
                    id="inCreateEvent"
                    options={categoryTagOptions}
                    component={SelectField}
                    placeholder="add category tags"
                    className="addCategoryTag"
                />
                <button type="submit"> create new event</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreateEvent