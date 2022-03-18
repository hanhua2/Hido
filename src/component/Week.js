import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

const events = [{
    id: 1,
    title: 'event 1',
    start: '2022-03-18T19:00:00',
    end: '2022-03-18T19:30:00',
}]

function Week(){
    return (
        <div className ="App">
            < FullCalendar
                plugins ={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'title',
                    center: 'dayGridMonth,timeGridWeek',
                    end : ''
                }}
                customButtons={{
                    new: {
                        text: 'new',
                        click: () => console.log('new event'),
                    }
                }}
                events={events}
                nowIndicator
                dateClick={(e) => console.log(e.dateStr)}
                eventClick={(e) => console.log(e.event.id)}
                aspectRatio={0.5}
                height={500}
            />
        </div>
    );

}

export default Week;