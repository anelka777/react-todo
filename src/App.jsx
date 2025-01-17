import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  function removeTodo(id) {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>Todo List</h1>
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
      <AddTodoForm onAddTodo={addTodo} />
    </React.Fragment>
  );
}

export default App;