import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [],
          },
        });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);


  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);


  function addTodo(newTodo) {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }

  function removeTodo(id) {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <React.Fragment>
      <h1>Todo List</h1>
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
      <AddTodoForm onAddTodo={addTodo} />
    </React.Fragment>
  );
}

export default App;