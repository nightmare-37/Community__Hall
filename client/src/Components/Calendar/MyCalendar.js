import React,{useEffect, useState} from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const MyCalendar=()=>{

  const [events,setEvents]=useState([]);

  
 useEffect(()=>{
    const dataEvents=async()=>{

        const response=await fetch("http://localhost:5000/api/bookings/get-events");
        const responseData = await response.json();
        var bookedDates=[];
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        else {
            bookedDates=responseData.events.map(data=>{
                return {
                    start: new Date(data.startDate),
                    end:  new Date(data.endDate),
                    title: data.purpose
                }
            });
        }
        console.log(bookedDates);
          setEvents(bookedDates);   
     }

     dataEvents();
    
 },[]);
     

    return (
    <section >
      <FullCalendar 
         events={events}
         height="650px"
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
  </section>
    );
}

export default MyCalendar;

// ?start="+new Date(data.start).toDateString()+"&end="+new Date(data.end).toDateString())