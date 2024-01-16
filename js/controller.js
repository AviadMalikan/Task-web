
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""} ${getImportanceClass(todo.importance)}"
         onclick="onToggleTodo('${todo.id}')">
         <span class="task">${todo.txt}</span>
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const elImpotence = document.querySelector('input[name=todo-importance')
    const txt = elTxt.value
    if (txt === '') return
    const importance = +elImpotence.value
    addTodo(txt, importance)
    elTxt.value = ''
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm('Are u sure that u made the task ?')) {
        // console.log('Removing', todoId)
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortedBy) {
    setSort(sortedBy)
    renderTodos()
}
