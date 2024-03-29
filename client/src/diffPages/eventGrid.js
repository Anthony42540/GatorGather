import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventGrid = ({ listOfEvents }) => {
    const [] = useState(0);
    let navigate = useNavigate();

    // Render items based on currentIndex and displayCount
    // const renderItems = () => {
    //     let itemsToShow = [];
    //     for (let i = 0; i < displayCount; i++) {
    //         let index = (currentIndex + i) % listOfEvents.length; // Wrap around if index exceeds items length
    //         let item = listOfEvents[index];
    //
    //         itemsToShow.push(
    //             <div key={index} className="event" onClick={() => {navigate(`/event/${item.id}`)}}>
    //                 <div className="title">{item.title}</div>
    //                 <div className="body">{item.eventDescription}</div>
    //                 <div className="footer">posted by: {item.author}</div>
    //             </div>
    //         );
    //     }
    //     return itemsToShow;
    // };

    return (
    <div className="events-grid">{listOfEvents.map((value, index) => {
        return (
            <div className="small-event" onClick={() => {navigate(`/event/${value.id}`)}}>
                <div className="title">{value.title}</div>
                <div className="body">{value.eventDescription}</div>
                <div className="footer">posted by: {value.author}</div>
            </div>
        )})}
    </div>
        // <div className="carousel">
        //     <button onClick={goToPrevSlide}>⬅</button>
        //     {/*<div className="carousel-content">{renderItems()}</div>*/}
        //     {renderItems()}
        //     <button onClick={goToNextSlide}>➡</button>
        // </div>
    );
};

export default EventGrid;
