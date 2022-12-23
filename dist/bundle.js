"use strict";
const addForm = document.getElementById("add-form");
const addInput = document.getElementById("add-input");
const toDoListElement = document.getElementById("to-do-list");
class ToDoList {
    saveToDos() {
        localStorage.setItem("toDos", JSON.stringify(this.toDos));
    }
    loadTodos() {
        const toDos = localStorage.getItem("toDos");
        if (toDos) {
            this.toDos = JSON.parse(toDos, (key, value) => {
                if (key === 'time') {
                    return new Date(value);
                }
                return value;
            });
        }
    }
    constructor() {
        this.toDos = [];
        this.loadTodos();
    }
    addToDo(title, time) {
        this.toDos.unshift({ title, completed: false, time });
        this.saveToDos();
    }
    markAsComplete(index) {
        this.toDos[index].completed = !this.toDos[index].completed;
        this.saveToDos();
    }
    editTodo(index, title) {
        this.toDos[index].title = title;
        this.saveToDos();
    }
    deleteTodo(index) {
        this.toDos.splice(index, 1);
        this.saveToDos();
    }
    getTodos() {
        return this.toDos;
    }
}
const toDoList = new ToDoList();
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = addInput.value;
    const time = new Date();
    if (title) {
        toDoList.addToDo(title, time);
        addInput.value = "";
        updateTodoList();
    }
});
const updateTodoList = () => {
    toDoListElement.innerHTML = "";
    const toDos = toDoList.getTodos();
    for (let i = 0; i < toDos.length; i++) {
        const toDo = toDos[i];
        const li = document.createElement("li");
        li.innerHTML = `
        <span class="to-do-title${toDo.completed ? ' completed' : ''}">${toDo.title}</span>
        <span class="to-do-time">${toDo.time.toLocaleDateString()}</span>
        <div class="btn-contanier">
        <button class="edit_button">Edit</button>
        <button class="delete_button">Delete</button>
        </div>
        `;
        toDoListElement.appendChild(li);
        const editButton = li.querySelector(".edit_button");
        const deleteButton = li.querySelector(".delete_button");
        const toDoTitle = li.querySelector(".to-do-title");
        toDoTitle.addEventListener('dblclick', () => {
            toDoList.markAsComplete(i);
            updateTodoList();
        });
        editButton.addEventListener("click", () => {
            const newTitle = prompt("Enter the new to-do title: ");
            if (typeof newTitle === "string") {
                toDoList.editTodo(i, newTitle);
                updateTodoList();
            }
        });
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this to-do item?")) {
                toDoList.deleteTodo(i);
                updateTodoList();
            }
        });
    }
};
updateTodoList();
