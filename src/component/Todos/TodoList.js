import React from "react";
import TodoElem from "./TodoElem"

function TodoList({todos, removeTodo, toggleComplete}) {

    return (

        <ul>
            {todos.map(todo => (
                <TodoElem key = {todo.id} 
                todo = {todo} 
                removeTodo={removeTodo} 
                toggleComplete={toggleComplete}/>
            ))}
        </ul>
        );
    }
    

    export default TodoList;