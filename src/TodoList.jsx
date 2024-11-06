

const todoList = [
    { id: 1, title: 'complete assignment' },
    { id: 2, title: 'make a dinner' },
    { id: 3, title: 'go shopping'},
];

function TodoList() {
    return (
        <div>
            <ul>
                {todoList.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList