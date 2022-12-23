const addForm = document.getElementById("add-form") as HTMLFormElement;
const addInput = document.getElementById("add-input") as HTMLInputElement;
const toDoListElement = document.getElementById("to-do-list") as HTMLUListElement;

interface ToDo{
    title: string;
    completed: boolean;
    time: Date
}

class ToDoList {
    private toDos: ToDo [] = [];

    private saveToDos(): void {
        localStorage.setItem("toDos", JSON.stringify(this.toDos))
    }

    private loadTodos(): void {
        const toDos = localStorage.getItem("toDos");
        if(toDos) {
            this.toDos = JSON.parse(toDos, (key, value) => {
                if(key === 'time') {
                    return new Date(value);
                }

                return value;
            }) 
        }
    }

    constructor () {
        this.loadTodos();
    }

    public addToDo (title: string, time: Date): void{
        this.toDos.unshift({title, completed: false, time});
        this.saveToDos();
        
    }

    public markAsComplete(index: number): void {
       this.toDos[index].completed = !this.toDos[index].completed;
       this.saveToDos();
    }

    public editTodo(index: number, title: string): void{
        this.toDos[index].title = title;
        this.saveToDos();
    }

    public deleteTodo(index: number):void {
        this.toDos.splice(index, 1);
        this.saveToDos();
    }

    public getTodos(): ToDo[] {
        return this.toDos;
    }

    
}

const toDoList = new ToDoList ();



addForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const title = addInput.value;
    const time  = new Date();
    if(title) {
        toDoList.addToDo(title, time);
        addInput.value = "";
        updateTodoList();  
    }
});

const updateTodoList = ():void => {
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

        const editButton = li.querySelector(".edit_button") as HTMLButtonElement;
        const deleteButton = li.querySelector(".delete_button") as HTMLButtonElement;
        const toDoTitle = li.querySelector(".to-do-title") as HTMLSpanElement;

        toDoTitle.addEventListener('dblclick', () => {
            toDoList.markAsComplete(i);
            updateTodoList();
          });


        editButton.addEventListener("click", () => {
            const newTitle = prompt("Enter the new to-do title: ")
            if(typeof newTitle === "string") {
                toDoList.editTodo(i, newTitle);
                updateTodoList();
            }
        });

        deleteButton.addEventListener("click", () => {
            if(confirm("Are you sure you want to delete this to-do item?")) {
                toDoList.deleteTodo(i);
                updateTodoList();
            }
        })

    }
}



updateTodoList();