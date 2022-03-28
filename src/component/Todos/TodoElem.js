import React from "react";


function TodoElem({ todo, toggleComplete, removeTodo }) {
    function handleCheckboxClick() {
        toggleComplete(todo.id);
    }

    function handleRemoveClick() {
        removeTodo(todo.id);
    }
    return (
        <div className = "todoelem"   >
            <input type = "checkbox" onClick={handleCheckboxClick}/>
            <li style = {{
                textDecoration: todo.completed ? "line-through" : null
            }}>
            {todo.task}</li>
            <button onClick={handleRemoveClick}> X </button>
        </div>

    );
    }
    

    export default TodoElem;