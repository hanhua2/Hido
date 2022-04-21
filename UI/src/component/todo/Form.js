import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const priorityOptions = [
  { value: 'Primary', label: 'Primary'},
  { value: 'Urgent', label: 'Urgent'},
  { value: 'Normal', label: 'Normal'},
  { value: 'No rush', label: 'No rush'}
]

function Form(props) {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState("Normal");


  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addTask(name, priority);
    setName("");
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} id = "form">
      <DatePicker 
        selected={props.startDate} 
        onChange={date => props.setStartDate(date)} 
        className = "datepicker"
      />
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder = "What needs to be done?"
      />
      <Select id="priority-slt" className="btn" options={priorityOptions} onChange = {(e) => setPriority(e.value)} />
      <button type="submit" className="btn btn__primary btn__lg" id="add-button">
        Add
      </button>
    </form>
  );
}

export default Form;
