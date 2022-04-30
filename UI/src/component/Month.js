import React from "react";
import Set from "./Set";
import "../Month.css"
import CalendarState from "../context/CalendarContext";
import Header from "./Calendar/Header";
import Calendar from "./Calendar/Calendar";
import TaskForm from "./Calendar/TaskForm";
import Navbar from "./Navbar";
import {MusicPlayer} from "./index";
import {gql, useQuery} from "@apollo/client";

const TASK_LIST = gql`
    query TaskList{
        taskList{
            date, name, status, priority, comment,
        }
    }
`;


const Month = () => {
    let gapi = window.gapi;

    let CLIENT_ID = "810582666663-ga8mvf3u0r2jhpdq2fb224i01sk6b4mj.apps.googleusercontent.com"
    let API_KEY = "AIzaSyBHPVGWeO_9cNNPZWp6n350qrNj-ponLhM"
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    let SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const TaskListQuery = () => {
        const { loading, error, data } = useQuery(TASK_LIST);

        if (loading) {
            console.log("loading");
        }
        if (error) {
            console.error(error);
        }

        return <div>hi</div>;
    };

    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    const event = {
                        'summary': 'Awesome Event!',
                        'location': '800 Howard St., San Francisco, CA 94103',
                        'description': 'Really great refreshments',
                        'start': {
                            'dateTime': '2020-06-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2020-06-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                {'method': 'email', 'minutes': 24 * 60},
                                {'method': 'popup', 'minutes': 10}
                            ]
                        }
                    }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                    })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })

                })
        })
    }

    return (
        <>
            <Navbar/>
            <MusicPlayer/>
            <div className="day-block"></div>
            <div style={{padding: '120px 60px 65px 0px'}}>
                <Set/>
                <div className={"container"}>
                    <CalendarState>
                        <Header/>
                        <Calendar/>
                        <TaskForm/>
                    </CalendarState>
                    <button className={"monthexport"} onClick={handleClick}>
                        Export to Google Calendar
                    </button>
                </div>

            </div>
            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
                </div>
            </footer>
        </>)
};

export default Month;
