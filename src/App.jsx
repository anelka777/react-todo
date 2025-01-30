import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.modules.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', darkMode);
    document.body.classList.toggle('light-theme', !darkMode);
  };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const todos = data.records.map(record => ({
        title: record.fields.title,
        id: record.id,
      }));

      console.log(todos);
      setTodoList(todos);
      
    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

const postTodo = async (newTodo) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
    body: JSON.stringify({
      fields: {
        title: newTodo.title,
      },
    }),
  };


  try {
    const response = await fetch(url, options);
    if(!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Added to Airtable:', data);

    return data;
  } catch (error) {
    console.error('POST error', error.message);
    throw error;
  }
};

function addTodo(newTodo) {
  postTodo(newTodo)
    .then((data) => {
      const createdTodo = {
        title: data.fields.title,
        id: data.id,
      };

    setTodoList((prevTodoList) => [...prevTodoList, createdTodo]);
  })
  .catch((error) => {
    console.error('Error adding todo:', error.message);
  });
}

const deleteTodo = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
};

  try {
    const response = await fetch(`${url}/${id}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    console.log(`Deletes todo with id: ${id}`);
    setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !==id));
  } catch (error) {
    console.log('DELETE error:', error.message);
  }
};

function removeTodo(id) {
  deleteTodo(id);
}

useEffect(() => {
  fetchData();
}, []);


  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/todo" className={({ isActive }) => isActive ? "active" : ""}>Todo List</NavLink>
        <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Welcome to the Todo App</h1>
          </>
          }
        />
        <Route path="/todo" element={
          <>
            <h1>Todo List</h1>
            {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} darkMode={darkMode}/>}
            <AddTodoForm onAddTodo={addTodo} />
          </>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}


export default App;