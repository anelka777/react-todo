import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css';
import PropTypes from  "prop-types";



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
            <form className={styles.form} onSubmit={handleAddTodo} >
                <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
                    Title
                </InputWithLabel>
                <button className={styles.inputBtn}>Add</button>
            </form>
        </div>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm