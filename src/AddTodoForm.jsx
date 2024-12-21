import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

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
                <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
                    Title
                </InputWithLabel>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddTodoForm