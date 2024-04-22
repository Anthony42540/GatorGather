import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "./carousel";
import EventGrid from "./eventGrid";
import { categoryTagOptions } from "./categoryTags";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);
    const [likedEvents, setLikedEvents] = useState([]);
    const [type, setType] = useState("all");

    useEffect(() => {
        axios.get("http://localhost:5000/events", { 
        headers: {accessToken: localStorage.getItem("token")},
        })
        .then((response) => {
          setListOfEvents(response.data.listOfEvents);
          setLikedEvents(response.data.likedEvents.map((like) => {
            return like.EventId;
          }))
        });
      }, []);


    if (Object.keys(listOfEvents).length === 0) {
        return (
          <div className="noEvents">Oops, nothing's going on right now. Check back later for upcoming events!</div>
        )
    }

    return (
      <div>
          <Carousel listOfEvents={listOfEvents} displayCount={3}/>

          <div className="filterbar">
              <div className="filtertabs">
                  <button style={(type === "all") ? {background: "white", color: "#f78000", border: "2px solid white"} : {}} onClick={() => setType("all")}>All</button>
                  {categoryTagOptions.map(button => (
                      <button style={(type === button.value) ? {background: "white", color: "#f78000", border: "2px solid white"} : {}} onClick={() => setType(button.value)}>
                          {button.label}
                      </button>
                  ))}
              </div>
          </div>
          <EventGrid listOfEvents={listOfEvents} setListOfEvents={setListOfEvents} likedEvents={likedEvents} setLikedEvents={setLikedEvents} type={type}/>

      </div>
    )
}

export default Home