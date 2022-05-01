import React, {useEffect, useState, useRef} from "react";
import Form from "./todo/Form";
import FilterButton from "./todo/FilterButton";
import Todo from "./todo/Todo";
import Set from "./Set";
import {v4 as uuidv4} from 'uuid';
import "../Day.css"
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import {MusicPlayer} from "./index";
import html2canvas from 'html2canvas';
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query, variables})
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

async function taskAdd(task) { // add tasks to database
    const query = `mutation myMutation($task:TaskInput!){
    taskAdd(task: $task) {
      id 
      name 
      priority
    }
  }`
    const data = await graphQLFetch(query, {task});
}

async function taskDelete(taskID) { // delete tasks in database use taskID
    const query = `mutation myMutation($taskID:String!){
    taskDelete(taskID: $taskID) {
    name
    id }
  }`
    const data = await graphQLFetch(query, {taskID});
}


async function taskUpdate(task) { // search task in database by id and update
    const query = `mutation myMutation($task:TaskInput!){
    taskUpdate(task: $task) {
      id 
      name 
      priority
    }
  }`
    const data = await graphQLFetch(query, {task});
}


const FILTER_MAP = { // filter function for the three filter buttons
    All: () => true, 
    Todo: task => task.status === "To do" || task.status === "Doing",
    Done: task => task.status === "Done"
};

const PRIORITY_MAP = { // map the priority of task to values to sort
    "Primary": 1,
    "Urgent": 2,
    "Normal": 3,
    "No Rush": 4,
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Day() {
    const [filter, setFilter] = useState('All');
    const [tasks, setTasks] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [sorted, setSorted] = useState(false);

    const { state } = useLocation();
    let userEmail = "";    // userEmail is the email of logged in user and will be stored in task
    let google = false;    // google variable will indicate if user use google login, the logout button will be different  
    if (state != null) {
        userEmail = state.email;
        google = state.google;
    } 


    const fetchData = async () => {  //get task data from database
        const query = `query {
      taskList {
        date, name, color, status, priority, comment, id, userEmail
      }
    }`
        const data = await graphQLFetch(query);
        let tasks = data.taskList;
        tasks.map(task => task.date = new Date(task.date));
        setTasks(tasks);

    };

    useEffect(() => {
        fetchData();
    }, []);

    function toggleTaskCompleted(id) {  // mark task as completed. Triggered when checkbox is checked.
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                return {...task, status: task.status === "Done" ? "To do" : "Done"}
            }
            return task;
        });
        setTasks(updatedTasks);
        const newTask = tasks.filter(task => {
            return task.id === id
        })
            .map(task => {
                return {...task, status: task.status === "Done" ? "To do" : "Done"}
            });
        taskUpdate(newTask[0]);
    }

    function addTask(name, priority) { //add task will chosen priority
        const newTask = {
            id: "todo-" + uuidv4(),
            name: name,
            status: "To do",
            color: "#d2635b",
            priority: priority,
            comment: "",
            date: startDate,
            userEmail: userEmail
        };
        taskAdd(newTask);
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) { // delete task
        taskDelete(id);
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }


    function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
            if (id === task.id) {
                return {...task, name: newName}
            }
            return task;
        });
        setTasks(editedTaskList);
        const newTask = tasks.filter(task => {
            return task.id === id
        }).map(task => {
            return {...task, name: newName}
        });
        console.log(newTask[0]);
        taskUpdate(newTask[0]);
    }

    function sortTask() { // sort task according to priority
        const sortedTasks = tasks.map(task => {
            task.idx = PRIORITY_MAP[task.priority];
            return task
        })
        sortedTasks.sort((a, b) => (a.idx > b.idx) ? 1 : -1);
        sortedTasks.map(task => {
            delete task.idx;
            return task
        });
        setTasks(sortedTasks);
    }

    const sameDay = (a, b) => {
        return a.getDate() === b.getDate()
            && a.getMonth() === b.getMonth()
            && a.getFullYear() === b.getFullYear();
    }


    const taskList = tasks // filte the task according to date and user to be displayed
        .filter(FILTER_MAP[filter]).filter(task => sameDay(startDate, task.date)).filter(task => task.userEmail ===state.email )
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                status={task.status}
                priority={task.priority}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const formHeading = `${taskList.length} ${tasksNoun} left`;
    const dateHeading = `${startDate.getMonth() + 1}-${startDate.getUTCDate()}-${startDate.getFullYear()} To do List`


    const printRef = useRef();

    const handleDownloadImage = async () => {  // export task as image
            const element = printRef.current;
            const canvas = await html2canvas(element);

            const data = canvas.toDataURL('image/jpg');
            const link = document.createElement('a');

            if (typeof link.download === 'string') {
                link.href = data;
                link.download = 'image.jpg';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                window.open(data);
            }
        }

    return (
        <>
            <Navbar email = {userEmail}  google={google}/><MusicPlayer/>

            <div className="day-block"></div>
            <div className="todoapp stack-large" id="resize">
                <Set email = {userEmail}  google={google}/>
                <button className={"function"} style={{margin: "10px 20px 0px 600px"}} onClick={() => sortTask()}>Sort
                </button>
                <button className={"function"} onClick={handleDownloadImage}>Export</button>

                <h3 className="dateheading" id="dateheading">{dateHeading}</h3>

                <Form addTask={addTask} startDate={startDate} setStartDate={setStartDate}/>

                <div className="filters btn-group stack-exception" ref={printRef}>
                    {filterList}
                </div>
                <h3 id="list-heading" tabIndex="-1">
                    {formHeading}
                </h3>
                <ul
                    role="list"
                    className="todo-list stack-large stack-exception"
                    aria-labelledby="list-heading"
                    id="task-display"
                    ref={printRef}
                >
                    {taskList}
                </ul>
            </div>
            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
                </div>
            </footer>
        </>
    );
};


export default Day;
