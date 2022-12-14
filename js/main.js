"use strict";

function onInit() {
    renderTodos();
}

function renderTodos() {
    const todos = getTodosForDisplay();

    let strHTMLs = todos.length
        ? todos.map((todo) => getTodoStrHTML(todo))
        : `<h1>No ${getFilterByStatus()} todos</h1>`;

    document.querySelector(".todo-content").innerHTML = strHTMLs.join("");
    document.querySelector("span.total").innerText = getTotalCount();
    document.querySelector("span.active").innerText = getActiveCount();
}

function getTodoStrHTML(todo) {
    //prettier-ignore
    return `
    <li class="list-group-item ${todo.isDone ? "list-group-item-success text-decoration-line-through" : ""}" onclick="onToggleTodo('${todo.id}')">
        <div class="row text-center fs-5">
            <div class="col-4">${todo.txt}</div>
            <div class="col-4">importance: ${todo.importance}</div>
            <button type="button" class="btn-close col-4" onclick="onRemoveTodo(event,'${todo.id}')"></button>
        </div>
    </li>
    `;
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    console.log("Removing:", todoId);
    removeTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onAddTodo(ev) {
    ev.preventDefault();
    const elTxt = document.querySelector("[name=txt]");
    const elImportance = document.querySelector("[name=number]");
    const importance = +elImportance.value;
    const txt = elTxt.value;
    if (!txt || importance < 1 || importance > 3) return;
    addTodo(txt, importance);
    renderTodos();
    elTxt.value = elImportance.value = "";
}

function onSetFilter(filterBy) {
    console.log("filterBy:", filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetFilterByTxt(txt) {
    console.log("Filtering by txt", txt);
    setFilterByTxt(txt);
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderTodos();
}
