import { FaTrash } from 'react-icons/fa';
import styles from './TodoListItem.module.css';

function TodoListItem ({ todo, onRemoveTodo, isDarkMode }) {

    return (
        <div>
            <li className={styles.listItem}>
                {todo.title}
                <button 
                    className={isDarkMode ? styles.deleteBtnLight :  styles.deleteBtnDark }
                    type="button"
                    onClick={() => onRemoveTodo(todo.id)}
                >
                    <FaTrash style={{ color: "var(--icon-color)" }} />
                </button>
            </li>           
        </div>
    )
}


export default TodoListItem