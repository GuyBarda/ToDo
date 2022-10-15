"use strict";

const STORAGE_KEY = "todoDB";
var gSortBy = "txt";
var gFilterBy = {
    txt: "",
    status: "",
};
var gTodos;

_createTodos();

function getTodosForDisplay() {
    var todos = gTodos;

    // not working
    // todos.sort((a, b) => {
    //     if (gSortBy === "txt") a.txt.localeCompare(b.txt);
    //     else a[gSortBy] - b[gSortBy];
    // });
    switch (gSortBy) {
        case "txt":
            todos.sort((todo1, todo2) => {
                if (todo1.txt.toLowerCase() < todo2.txt.toLowerCase()) return -1;
                if (todo1.txt.toLowerCase() > todo2.txt.toLowerCase()) return 1;
                else 0;
            });
            console.log(todos);
            break;
        case "createdAt":
            todos.sort((todo1, todo2) => todo1.createdAt - todo2.createdAt);
            break;
        case "importance":
            todos.sort((todo1, todo2) => todo1.importance - todo2.importance);
            break;
    }
    if (gFilterBy.status) {
        todos = todos.filter(
            (todo) => (todo.isDone && gFilterBy.status === "done") || (!todo.isDone && gFilterBy.status === "active")
        );
    }
    todos = todos.filter((todo) => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()));
    return todos;
}

function removeTodo(todoId) {
    let isSure = confirm(`Are you sure you want to delete this todo?`);
    if (!isSure) return;
    const todoIdx = gTodos.findIndex((todo) => todo.id === todoId);
    gTodos.splice(todoIdx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    const todo = gTodos.find((todo) => todo.id === todoId);
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance);
    gTodos.push(todo);
    _saveTodosToStorage();
}

function setFilter(status) {
    gFilterBy.status = status;
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt;
}

function getFilterByStatus() {
    return gFilterBy.status;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTotalCount() {
    return gTodos.length;
}

function getActiveCount() {
    return gTodos.filter((todo) => !todo.isDone).length;
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY);
    if (!gTodos || !gTodos.length) gTodos = _getDemoTodos();
    _saveTodosToStorage();
}

function _createTodo(txt, importance, isDone = false) {
    return {
        id: _makeId(),
        txt,
        importance,
        isDone,
        createdAt: Date.now(),
    };
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}

function _getDemoTodos() {
    return [
        _createTodo("Master JS", 3),
        _createTodo("Learn HTML", 1, true),
        _createTodo("Study CSS", 2, true),
        _createTodo("Buy a chair", 3),
        _createTodo("Buy a new PC", 1),
        _createTodo("Learn Bootstrap", 3),
    ];
}
