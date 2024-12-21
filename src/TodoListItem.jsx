

function TodoListItem ({ todo, onRemoveTodo }) {

    return (
        <div>
            <li>{todo.title}</li>
            <button type="button" onClick={() => onRemoveTodo(todo.id)}>
                Remove
            </button>
        </div>
    )
}


export default TodoListItem