import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem'
import styles from './TodoList.module.css';


function TodoList( {todoList, onRemoveTodo, isDarkMode}) {  
    return (
        <div className={styles.todoCont}>
            <ul>
                {todoList.map((todo) => (
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo}
                        onRemoveTodo={onRemoveTodo}
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
        })
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool
};

export default TodoList