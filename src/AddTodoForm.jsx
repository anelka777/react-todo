import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('');


    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }
    
    function handleAddTodo (event) {
        event.preventDefault()
        const newTodo = {
            title: todoTitle,
            id: Date.now(),
        };
        onAddTodo(newTodo);
        setTodoTitle('');
    }


    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title </label>
                <input
                    id="todoTitle"
                    type="text"
                    name="title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddTodoForm