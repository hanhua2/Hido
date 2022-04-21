import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function Form(props) {
  const [name, setName] = useState('');



  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addTask(name);
    setName("");
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>

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

      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
