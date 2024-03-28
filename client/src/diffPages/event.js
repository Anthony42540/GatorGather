import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Event() {
    let{ id } = useParams();
    const [eventObject, setEventObject] = useState({});

    //fetch data based on ID using axios
    useEffect(() => {
      axios.get(`http://localhost:5000/events/byId/${id}`).then((response) => {
        setEventObject(response.data);
      });
    });

    return (
        <div className='eventPage'>
          <div className='left'>
            <div className='eventInfo' id="individual">
              <div className="title">{eventObject.title}</div>
              <div className="footer">@{eventObject.author} </div>
              <div className="body">{eventObject.eventDescription}</div>
            </div>
          </div>
          <div className='right'>
            the right
          </div>
        </div>
    )
}

export default Event;