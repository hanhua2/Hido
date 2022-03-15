import React, {useEffect, useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList"; 

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function Todo() {
    const [todos, setTodo] = useState([]);

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageTodos) {
            setTodo(storageTodos);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]) 

    function addTodo(todo) {
        setTodo([todo, ...todos]);
    }

    function toggleComplete(id) {
        setTodo(
          todos.map(todo => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: !todo.completed
              };
            }
            return todo;
          })
        );
      }

      function removeTodo(id) {
        setTodo(todos.filter(todo => todo.id !== id));
      }
    

    return (
        <div className="todo">
            <h2>Todo Task List</h2> 
            <TodoForm addTodo = {addTodo}/>
            <TodoList 
            todos = {todos}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}/>
            
        </div> 
        );
    }
    

    export default Todo; 