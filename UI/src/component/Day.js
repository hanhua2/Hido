import React, { useState, useRef, useEffect } from "react";
import Form from "./todo/Form";
import FilterButton from "./todo/FilterButton";
import Todo from "./todo/Todo";
import Set from "./Set";
import { v4 as uuidv4 } from 'uuid';
import "../Day.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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


const FILTER_MAP = {
  All: () => true,
  Todo: task => task.status === "To do" || task.status === "Doing",
  Done: task => task.status === "Done"
};  

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Day(props) {
  const [filter, setFilter] = useState('Todo');
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const fetchData = async() => {
    const query = `query {
      taskList {
        date, name, color, status, priority, comment, id,
      }
    }`
    const data = await graphQLFetch(query);
    let tasks = data.taskList;
    tasks.map(task=> task.date = new Date(task.date));
    setTasks(tasks);
    return;
  };

  useEffect(() => {
    fetchData();
  }, []); 

  console.log(startDate);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {   
      if (id === task.id) {
        return {...task, status: task.status === "Done" ? "To do": "Done" }
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  async function addTask(name) {
    const newTask = { id: "todo-" + uuidv4(), name: name, status: "To do", color : "#d2635b", priority : "Normal", comment : "", date : startDate  };
    taskAdd(newTask);
    setTasks([...tasks, newTask]);
  }

  async function deleteTask(id) {
    taskDelete(id);
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }


  async function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
    const newTask = tasks.filter(task => {return task.id === id}).map(task => {return {...task, name: newName}});
    console.log(newTask[0]);
    taskUpdate(newTask[0]);
  }

  const sameDay = (a, b) => {
    return a.getDate()     === b.getDate()
        && a.getMonth()    === b.getMonth()
        && a.getFullYear() === b.getFullYear();
  }
  
  const taskList = tasks
  .filter(FILTER_MAP[filter]).filter(task=>sameDay(startDate, task.date))
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      status={task.status}
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
  const formHeading = `${taskList.length} ${tasksNoun}`;
  const dateHeading = `${startDate.getMonth()+1}-${startDate.getUTCDate()}-${startDate.getFullYear()} To do List`

  return (
    <div className="todoapp stack-large" id = "resize">
      <button className={"function"} style={{margin:"10px 20px 0px 600px"}}>Sort</button>
      <button className={"function"}>Export</button>
      <h3 className="dateheading" id="dateheading" >{dateHeading}</h3>
    
      <Form addTask={addTask} startDate={startDate} setStartDate={setStartDate} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" >
        {formHeading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>

  );
}


export default Day;
