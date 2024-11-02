import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = [
  { id: 1, title: 'complete assignment' },
  { id: 2, title: 'make a dinner' },
  { id: 3, title: 'go shopping'},
];

function App() {

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
