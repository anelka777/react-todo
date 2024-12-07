
import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'


function App() {
const [todoList, setTodoList] = useState([]);


function addTodo(newTodo) {
  setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
}
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App
