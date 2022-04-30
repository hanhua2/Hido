import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

const SET_DATE = "SET_DATE";
const SET_TASK = "SET_TASK";
const SAVE_TASK = "SAVE_TASK";
const DELETE_TASK = "DELETE_TASK";

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
      date, name, color, status, priority, comment, id, userEmail
    }
  }`
  const data = await graphQLFetch(query);
  let db = data.taskList;
  db.map(task=> task.date = new Date(task.date));
  return db;
}

async function taskAdd(task) {
  const query = `mutation myMutation($task:TaskInput!){
    taskAdd(task: $task) {
      id 
      name 
      priority
    }
  }`
  const data = await graphQLFetch(query, {task});
}

async function taskDelete(taskID) {
  const query = `mutation myMutation($taskID:String!){
    taskDelete(taskID: $taskID) {
    name
    id }
  }`
  const data = await graphQLFetch(query, {taskID});
}


async function taskUpdate(task) {
  const query = `mutation myMutation($task:TaskInput!){
    taskUpdate(task: $task) {
      id 
      name 
      priority
    }
  }`
  const data = await graphQLFetch(query, {task});
}

/*
const getDatabase = ()=> {
  let db = localStorage.getItem("$calendar_db");

  if(!db) {
    db = [];
    setDatabase(db);
  } else {
    db = JSON.parse(db);
    db.map(task=> task.date = new Date(task.date));
  }
  return db;
} */

/*
const setDatabase = (db)=> {
  localStorage.setItem("$calendar_db", JSON.stringify(db));
} */

export const CalendarContext = createContext();

export const sameDay = (a, b) => {
  return a.getDate()     === b.getDate()
      && a.getMonth()    === b.getMonth()
      && a.getFullYear() === b.getFullYear();
}


function CalendarState(props) {


  const initialState = {
    date: new Date(),
    days: [],
    task: null
  };


  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_DATE: // Set current date
        const date = action.payload.date;
        const db = action.payload.db;

        const d1 = new Date(date.getFullYear(), date.getMonth()    , 1);
        d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));
        // Calendart End Day
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if(d2.getDay() !== 0) d2.setDate(d2.getDate() + (7 - d2.getDay()));
        const days = [];
        do { // Obtain tasks
          d1.setDate(d1.getDate() + 1); // iterate
          days.push({
            date: new Date(d1.getTime()),
            tasks: db.filter((task)=> sameDay(d1, task.date))
          });
        } while(!sameDay(d1, d2));

        return { // Update state
          ...state,
          date: date,
          days: days
        }
      case SET_TASK:
        return {
          ...state,
          task: action.payload
        }

      case SAVE_TASK: {
        let db = action.payload.db;
        const task = action.payload.task;
        if(!task.id) {
          task.id = uuidv4();
          db.push(task);
        } else {
          db = db.map(t=> {
            return t.id === task.id ? task : t;
          })
        }

        return {
          ...state
        }
      }
      case DELETE_TASK : {
        let db = action.payload.db;
        const taskID = action.payload.taskID;
        db = db.filter((task)=> {
          return task.id !== taskID;
        });

        return {
          ...state,
        }
      }
      default:
        break;
    }
  }, initialState);


  async function setDate(date) {
    const db = await getDatabase();
    dispatch({
      type: SET_DATE,
      payload: {date: date, db: db}
    });
  }

  function setTask(task) {
    dispatch({
      type: SET_TASK,
      payload: task
    });
  }

  async function saveTask(task) {
    const db = await getDatabase();
    dispatch({
      type: SAVE_TASK,
      payload: {task: task, db: db}
    })
    if (db.filter((tk)=> {
      return tk.id === task.id;
    })) {
      await taskUpdate(task);
    } else {
      await taskAdd(task);
    }

  }

  async function deleteTask(taskId) {
    const db = await getDatabase();
    dispatch({
      type: DELETE_TASK,
      payload: {taskId: taskId, db: db}
    })
    await taskDelete(taskId);
  }

  return (
    <CalendarContext.Provider
      value={{

        date: state.date,
        days: state.days,
        task: state.task,

        setDate,
        setTask,
        saveTask,
        deleteTask
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}

export default CalendarState;
