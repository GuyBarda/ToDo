"use strict";

function onInit() {
    renderTodos();
}

function renderTodos() {
    const todos = getTodosForDisplay();

    let strHTMLs = todos.length
        ? todos.map((todo) => getTodoStrHTML(todo))
        : `<h1>No ${getFilterByStatus()} todos</h1>`;

    document.querySelector("ul").innerHTML = strHTMLs.join("");
    document.querySelector("span.total").innerText = getTotalCount();
    document.querySelector("span.active").innerText = getActiveCount();
}

function getTodoStrHTML(todo) {
    return `
    <li class="${todo.isDone ? "done" : ""}" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
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
    console.log("Toggling:", todoId);
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
