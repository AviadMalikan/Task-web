'use strict'


const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'


_createTodos()

function getTodosForDisplay() {

    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, importance) {
    if (importance === 0) importance = 1
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortedBy) {
    _sortedBy(sortedBy)
    console.log('gTodos: ', gTodos)
}

function getImportanceClass(importance) {
    switch (importance) {
        case 1: return 'not-important'
        case 2: return 'important'
        case 3: return 'very-important'
    }
}

function getTotalTodos() {
    if (!gTodos.length) return 'No tasks todo'
    return gTodos.length
}

function getActiveTodos() {
    if (!gTodos.length) return 'No active tasks'
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance = _getRandomInt(1, 3)) {

    return {
        id: _makeId(),
        txt,
        isDone: false,
        time: Date.now(),
        importance,
    }
}


// UTILS---------------------------------------------------
function _sortedBy(value = 'time') {
    console.log('value: ', value)

    switch (value) {
        case 'time':
            return gTodos.sort((todo1, todo2) => todo2.time - todo1.time)
        case 'importance':
            return gTodos.sort((todo1, todo2) => todo2.importance - todo1.importance)
        case 'txt':
            return gTodos.sort((a, b) => {
                if (a.txt < b.txt) { return -1; }
                if (a.txt > b.txt) { return 1; }
                return 0;
            })
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _getRandomInt(min, max) { // Inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}