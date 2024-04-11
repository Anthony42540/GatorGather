import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Carousel = ({ listOfEvents, displayCount }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    let navigate = useNavigate();

    const goToPrevSlide = () => {
        const newIndex = currentIndex === 0 ? listOfEvents.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = currentIndex === listOfEvents.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Render items based on currentIndex and displayCount
    const renderItems = () => {
        let itemsToShow = [];
        if(listOfEvents.length === 0) return "";
        else if (listOfEvents.length < displayCount){
            displayCount = listOfEvents.length;
        }

        for (let i = 0; i < displayCount; i++) {
            let index = (currentIndex + i) % listOfEvents.length; // Wrap around if index exceeds items length
            let item = listOfEvents[index];
            itemsToShow.push(
                <div key={index} className="event" onClick={() => {navigate(`/event/${item.id}`)}}>
                    <div className="title">{item.title}</div>
                    <div className="body">{item.eventDescription}</div>
                    <div className="footer">posted by: {item.author}</div>
                </div>
            );
        }
        return itemsToShow;
    };

    return (
        <div className="carousel">
            <button onClick={goToPrevSlide}>⬅</button>
            {/*<div className="carousel-content">{renderItems()}</div>*/}
            {renderItems()}
            <button onClick={goToNextSlide}>➡</button>
        </div>
    );
};

export default Carousel;
