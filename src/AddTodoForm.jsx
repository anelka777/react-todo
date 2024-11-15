function AddTodoForm(props) {
    
    function handleAddTodo (event) {
        event.preventDefault()
        const todoTitle = event.target.title.value;
        console.log(todoTitle);
        props.onAddTodo(todoTitle);
        event.target.reset();
    }

    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title </label>
                <input id="todoTitle" type="text" name="title" />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddTodoForm