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

export default TodoList