import React from "react";
import axios from "axios";
import Select from 'react-select';
import { useEffect, useState } from "react";
import Carousel from "./carousel";
import EventGrid from "./eventGrid";
import { categoryTagOptions } from "./categoryTags";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);
    const [type, setType] = useState("all");

    useEffect(() => {
        axios.get("http://localhost:5000/events").then((response) => {
          setListOfEvents(response.data);
          if (Object.keys(listOfEvents).length === 0) {
            return (
              <div className="noEvents">Oops, nothings going on right now. Check back later for upcoming events!</div>
            )
        }
        });
      }, []);

    const handleTypeChange = (filter) => {
      if (filter === null) {
          setType("all");
      } else {
          setType(filter.label);
      }
      
    };

    return (
      <div>
          <Carousel listOfEvents={listOfEvents} displayCount={3}/>

          <div className="filterbar">
              <Select
                name="type"
                onChange={handleTypeChange}
                options={categoryTagOptions}
                isClearable={true}
                value={categoryTagOptions.find(option => option.label === type)}
              >
              </Select>
          </div>
          <EventGrid listOfEvents={listOfEvents} type={type}/>

      </div>
    )
}

export default Home