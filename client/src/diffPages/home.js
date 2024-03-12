import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/events").then((response) => {
          setListOfEvents(response.data);
        });
      }, []);
      
      return (
      <div>
        {listOfEvents.map((value, key) => {
            return (
                <div className="event"> 
                <div className="title">{value.title}</div>
                <div className="body">{value.eventDescription}</div>
                <div className="footer">Posted by: {value.author}</div>
                </div>
            );
        })}
      </div>
  )
}

export default Home