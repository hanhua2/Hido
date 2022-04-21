import React, { useState, useRef, useEffect } from "react";
import Form from "./todo/Form";
import FilterButton from "./todo/FilterButton";
import Todo from "./todo/Todo";
import Set from "./Set";
import { v4 as uuidv4 } from 'uuid';
import "../Day.css"

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const initialTasks = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Exercise", completed: false }
];

const FILTER_NAMES = Object.keys(FILTER_MAP);

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

//[{"date":"2022-04-13T16:00:00.000Z","name":"tutorial5","color":"#2196f3","status":"To do","priority":"Normal","comment":"IT5007","id":"b2b9c260-17b3-462b-99e7-bb1bd933a172"}]
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
      date, name, color, status, priority, comment, id,
    }
  }`
  const data = await graphQLFetch(query);
  let db = data.taskList;
  db.map(task=> task.date = new Date(task.date));
  return db;
}


async function Day(props) {

  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');
  const db = await getDatabase();

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function addTask(name) {
    const newTask = { id: "todo-" + uuidv4(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
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

  return (
    <div className="todoapp stack-large" style={{
      padding: '0px 30px 0px 280px'
  }}>
      
      <h3 style={{textAlign:"left", margin:"-30px"}}>2022.2.24 To do List</h3>
      <button className={"function"} style={{margin:"20px 20px 20px 800px"}}>Sort</button>
      <button className={"function"}>Export</button>
      <Form addTask={addTask} />
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
