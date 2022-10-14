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
    todos.sort((a, b) => {
        if (gSortBy === "txt") a.txt.localeCompare(b.txt);
        else a[gSortBy] - b[gSortBy];
    });
    // switch (gSortBy) {
    //     case "txt":
    //         todos.sort((todo1, todo2) => {
    //             if (todo1.txt.toLowerCase() < todo2.txt.toLowerCase()) return -1;
    //             if (todo1.txt.toLowerCase() > todo2.txt.toLowerCase()) return 1;
    //             else 0;
    //         });
    //         console.log(todos);
    //         break;
    //     case "createdAt":
    //         todos.sort((todo1, todo2) => todo1.createdAt - todo2.createdAt);
    //         break;
    //     case "importance":
    //         todos.sort((todo1, todo2) => todo1.importance - todo2.importance);
    //         break;
    // }
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
    var todos = loadFromStorage(STORAGE_KEY);

    if (!todos || !todos.length) {
        todos = [
            {
                id: "t101",
                txt: "Learn HTML",
                isDone: true,
                createdAt: Date.now(),
                importance: 1,
            },
            {
                id: "t102",
                txt: "Master JS",
                isDone: false,
                createdAt: Date.now(),
                importance: 1,
            },
            {
                id: "t103",
                txt: "Study CSS",
                isDone: false,
                createdAt: Date.now(),
                importance: 1,
            },
        ];
    }

    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance,
    };
    return todo;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}

function _makeId(length = 5) {
    var txt = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}
