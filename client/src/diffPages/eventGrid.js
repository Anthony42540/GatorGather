import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventGrid = ({ listOfEvents, type}) => {
    const [] = useState(0);
    let navigate = useNavigate();
    return (
    <div className="events-grid">{listOfEvents.filter(event=>event.categoryTag?.includes(type) || type==="all").map((value, index) => {
        return (
            <div className="small-event" onClick={() => {navigate(`/event/${value.id}`)}}>
                <div className="title">{value.title}</div>
                <div className="body">{value.eventDescription}</div>
                <div className="footer">posted by: {value.author}</div>
            </div>
        )})}
    </div>
    );
};

export default EventGrid;
