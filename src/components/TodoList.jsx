import TodoListItem from './TodoListItem'



function TodoList( {todoList, onRemoveTodo, darkMode}) {  
    return (
        <div>
            <ul>
                {todoList.map((todo) => (
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo}
                        onRemoveTodo={onRemoveTodo}
                        darkMode={darkMode}
                        />
                ))}
            </ul>
        </div>
    )
}

export default TodoList