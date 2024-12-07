import TodoListItem from './TodoListItem'

// const todoList = [
//     { id: 1, title: 'complete assignment' },
//     { id: 2, title: 'make a dinner' },
//     { id: 3, title: 'go shopping'},
// ];

function TodoList( {todoList}) {  
    return (
        <div>
            <ul>
                {todoList.map((todo) => (
                    <TodoListItem key={todo.id} todo={todo}/>
                ))}
            </ul>
        </div>
    )
}

export default TodoList