import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import './style.css'

const LOCAL_STORAGE_KEY = 'todoAPP.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleEnterTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    if (e.key === 'Enter') {
      setTodos(PrevTodos => {
        return [...PrevTodos, { id: uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null
    }
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(PrevTodos => {
      return [...PrevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div class="todos"><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
      <div class="static">
        <input ref={todoNameRef} type="text" onKeyPress={handleEnterTodo} />
        <div class="buttons">
          <button onClick={handleAddTodo}>Add ToDo</button>
          <button onClick={handleClearTodos}>Clear Completed ToDos</button>
        </div>
        <div class="left">{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    </>
  );
}

export default App;
