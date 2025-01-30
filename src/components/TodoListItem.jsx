import { FaTrash } from 'react-icons/fa';
import styles from './TodoListItem.module.css';

function TodoListItem ({ todo, onRemoveTodo, darkMode }) {

    return (
        <div>
            <li className={styles.listItem}>
                {todo.title}
                <button 
                    className={darkMode ? styles.deleteBtnLight :  styles.deleteBtnDark }
                    type="button"
                    onClick={() => onRemoveTodo(todo.id)}
                >
                    <FaTrash style={{ color: darkMode ? "black": "#ff9800" }} />
                </button>
            </li>           
        </div>
    )
}


export default TodoListItem