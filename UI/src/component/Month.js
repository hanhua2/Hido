import React, {useState} from "react";
import Set from "./Set";
import "../Month.css"
import CalendarState from "../context/CalendarContext";
import Header from "./Calendar/Header";
import Calendar from "./Calendar/Calendar";
import TaskForm from "./Calendar/TaskForm";
import Navbar from "./Navbar";
import {MusicPlayer} from "./index";
import {gql, useQuery} from "@apollo/client";
import {useLocation} from 'react-router-dom';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

const getDatabase = async ()=> {
    const query = `query {
    taskList {
      date, name, status, priority, comment, userEmail
    }
  }`
    const data = await graphQLFetch(query);
    return data.taskList;
}

const Month = () => {
    const { state } = useLocation();
    let userEmail = "";
    let google = false;
    if (state != null) {
        userEmail = state.email;
        google = state.google;
    } 
    
    //console.log(userEmail);
    let gapi = window.gapi;

    let CLIENT_ID = "810582666663-ga8mvf3u0r2jhpdq2fb224i01sk6b4mj.apps.googleusercontent.com"
    let API_KEY = "AIzaSyBHPVGWeO_9cNNPZWp6n350qrNj-ponLhM"
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    let SCOPES = "https://www.googleapis.com/auth/calendar.events"


    const handleClick = async () => {
        var taskArray = Array();

        const db = await getDatabase();

        for (let i = 0; i < db.length; i++) {
            var obj = db[i]

            const event = {
                'summary': obj.name,
                'description': 'Status: ' + obj.status.toString() + ' Priority: ' + obj.priority.toString() + ' Comment: '+obj.comment.toString(),
                'start': {
                    'dateTime': obj.date,
                    'timeZone': 'Asia/Singapore'
                },
                'end': {
                    'dateTime': obj.date,
                    'timeZone': 'Asia/Singapore'
                },
                'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=1'
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                    ]
                }
            }
            taskArray.push(event);
        }

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
                    for (var i = 0; i < taskArray.length - 1; i++) {
                        var resource = taskArray[i];

                        var request = gapi.client.calendar.events.insert({
                            'calendarId': 'primary',
                            'resource': resource,
                        });
                        request.execute(function(resp) {
                            console.log(resp);
                        });
                    }

                    resource = taskArray[taskArray.length-1];

                    request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': resource,
                    });
                    request.execute(function(resp) {
                        console.log(resp);
                        window.open(resp.htmlLink)
                    });
                })
        })
    }

    return (
        <>
            <Navbar email = {userEmail}  google={google}/>
            <MusicPlayer/>
            <div className="day-block"></div>
            <div style={{padding: '120px 60px 65px 0px'}}>
                <Set email = {userEmail}  google={google}/>
                <div className={"container"}>
                    <CalendarState>
                        <Header />
                        <Calendar email = {userEmail}/>
                        <TaskForm email = {userEmail}/>
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
