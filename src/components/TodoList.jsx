import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem'
import styles from './TodoList.module.css';


function TodoList( {todoList, onRemoveTodo, onToggleComplete, isDarkMode}) {  
    return (
        <div className={styles.todoCont}>
            <ul>
                {todoList.map((todo) => (
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo}
                        onRemoveTodo={onRemoveTodo}
                        onToggleComplete={onToggleComplete}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool,
        })
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool
};

export default TodoList