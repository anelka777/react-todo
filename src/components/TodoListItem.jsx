import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import styles from './TodoListItem.module.css';

function TodoListItem ({ todo, onRemoveTodo, onToggleComplete, isDarkMode }) {

    return (
        <div>
            <li className={`${styles.listItem} ${todo.completed ? styles.completed : ''}`}>
                <input className={styles.checkbox}
                    type="checkbox" 
                    checked={todo.completed || false} 
                    onChange={() => onToggleComplete(todo.id)}
                />
                <span>{todo.title}</span>
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

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool
};

export default TodoListItem