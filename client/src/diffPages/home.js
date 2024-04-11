import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Carousel from "./carousel";
import EventGrid from "./eventGrid";
import {categoryTagOptions} from "./categoryTags";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);
    const [type, setType] = useState("all");
    let navigate = useNavigate();
    let mockEvents = [
        {"id": 1, "author": "auth1", "title": "t1", "eventDescription": "im one 😊"},
        {"id": 2, "author": "auth2", "title": "t2", "eventDescription": "yo 👋"},
        {"id": 3, "author": "auth3", "title": "t3", "eventDescription": "im just chillin 😎👌"},
        {"id": 4, "author": "auth4", "title": "t4", "eventDescription": "this is another event 🎉"},
        {"id": 5, "author": "auth5", "title": "t5", "eventDescription": "exciting event coming up! 🚀"},
        {"id": 6, "author": "auth6", "title": "t6", "eventDescription": "don't miss out on this opportunity 💼"},
        {"id": 7, "author": "auth7", "title": "t7", "eventDescription": "join us for a fun-filled day 🎈"},
        {"id": 8, "author": "auth8", "title": "t8", "eventDescription": "let's make memories together 📸"},
        {"id": 9, "author": "auth9", "title": "t9", "eventDescription": "get ready for an unforgettable experience 💫"},
        {"id": 10, "author": "auth10", "title": "t10", "eventDescription": "come and be part of something special ✨"}
    ];


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
          <Carousel listOfEvents={listOfEvents} displayCount={3}/>

          <div className="filterbar">
              <div className="filtertabs">
                  <button style={(type === "all") ? {textDecoration: "underline"} : {}} onClick={() => setType("all")}>All</button>
                  {categoryTagOptions.map(button => (
                      <button style={(type === button.value) ? {textDecoration: "underline"} : {}} onClick={() => setType(button.value)}>
                          {button.label}
                      </button>
                  ))}
              </div>
          </div>
          <EventGrid listOfEvents={listOfEvents} type={type}/>


        {/*{mockEvents.map((value, key) => {*/}
        {/*    return (*/}
        {/*      <div className="event" onClick={() => {navigate(`/event/${value.id}`)}}>*/}
        {/*        <div className="title">{value.title}</div>*/}
        {/*        <div className="body">{value.eventDescription}</div>*/}
        {/*        <div className="footer">posted by: {value.author}</div>*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*})}*/}
      </div>
  )
}

export default Home