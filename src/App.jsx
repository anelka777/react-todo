import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.modules.css'
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import pic from './assets/pic1.jpg';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [isNewestFirst, setIsNewestFirst] = useState(true);


  const toggleAlphabeticalSort = () => {
    setIsAscending(prev => !prev);
    
    setTodoList(prevList => {
      const sortedList = [...prevList].sort((a, b) => {
        if (!a.title || !b.title) return 0;
        return isAscending ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
      });
      return sortedList;
    });
  };
  
  const toggleDateSort = () => {
    setIsNewestFirst(prev => !prev);
  
    setTodoList(prevList => {
      const sortedList = [...prevList].sort((a, b) => {
        if (!a.createdTime || !b.createdTime) return 0;
        return isNewestFirst
          ? new Date(a.createdTime) - new Date(b.createdTime)
          : new Date(b.createdTime) - new Date(a.createdTime);
      });
      return sortedList;
    });
  };



const toggleComplete = async (id) => {
  
  const updatedTodo = todoList.find(todo => todo.id === id);
  if (!updatedTodo) return;

  const updatedStatus = !updatedTodo.done;

  setTodoList(prevList =>
    prevList.map(todo =>
      todo.id === id ? { ...todo, done: updatedStatus } : todo
    )
  );

  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: { done: updatedStatus }
      })
    });
    if (!response.ok) {
      throw new Error(`Error updating task in Airtable: ${response.statusText}`);
    }
    console.log(`Task status updated: ${id} -> ${updatedStatus}`);
  } catch (error) {
    console.error('Task update error in Airtable:', error.message);
  }
};


  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
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
        createdTime: record.createdTime,
        done: record.fields.done || false,
      }));

      todos.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));

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
          createdTime: newTodo.createdTime,
          done: newTodo.done || false,
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
          createdTime: data.fields.createdTime,
        };

      setTodoList((prevTodoList) => 
        [...prevTodoList, createdTodo].sort((a, b) => a.title.localeCompare(b.title))
      );
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
            {isDarkMode ? <FaSun /> : <FaMoon /> }
        </button>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <div className="home-container">
              <div className ="app-container">
                <h1>Welcome to the Todo App</h1>
                <img src={pic} alt="thinking" className="pic" />
              </div>              
            </div>          
          </>
          }
        />
        <Route path="/todo" element={
          <div className='todo-container'>
            <h1>Todo List</h1>
            <div className="sort-buttons">
              <button className="theme-toggle" onClick={toggleAlphabeticalSort}>
                {isAscending ? "Sort: A-Z" : "Sort: Z-A"}
              </button>
              <button className="theme-toggle" onClick={toggleDateSort}>
                {isNewestFirst ? 'Sort: Newest' : 'Sort: Oldest'}
              </button>
            </div>
            {isLoading ? <p>Loading...</p> : 
            <TodoList 
              todoList={todoList} 
              onRemoveTodo={removeTodo}
              onToggleComplete={toggleComplete}
              isDarkMode={isDarkMode}/>}
            <AddTodoForm onAddTodo={addTodo} />
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;