import { useNavigate } from "react-router-dom";

const EventGrid = ({ listOfEvents, type}) => {
    let navigate = useNavigate();

    const filteredEvents = listOfEvents.filter(event => event.categoryTag?.includes(type) || type === "all");

    if (filteredEvents.length === 0) {
        return (
            <div className="empty-grid">oops, no upcoming events match your search!</div>
        );
    }

    return (
    <div className="events-grid">{filteredEvents.map((value, index) => {
        return (
            <div className="grid-event" onClick={() => {navigate(`/event/${value.id}`)}}>
                <div className="title">{value.title}</div>
                <div className="footer">@{value.username}</div>
                <div className="body">{value.eventDescription}</div>
            </div>
        )})}
    </div>
    );
};

export default EventGrid;
