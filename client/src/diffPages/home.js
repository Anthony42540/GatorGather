import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:5000/events").then((response) => {
          setListOfEvents(response.data);
        });
      }, []);

    if (Object.keys(listOfEvents).length === 0) {
        return (
          <div className="noEvents">Oops, nothings going on right now. Check back later for upcoming events!</div>
        )
    }
    return (
      <div>
        {listOfEvents.map((value, key) => {
            return (
              <div className="event" onClick={() => {navigate(`/event/${value.id}`)}}> 
                <div className="title">{value.title}</div>
                <div className="body">{value.eventDescription}</div>
                <div className="footer">posted by: {value.author}</div>
              </div>
            );
        })}
      </div>
    )
}

export default Home