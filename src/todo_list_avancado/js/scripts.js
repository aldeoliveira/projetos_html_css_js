const doneIconHtml = '<i class="fa-solid fa-check"></i>';
const editIconHtml = '<i class="fa-solid fa-pen"></i>';
const deleteIconHtml = '<i class="fa-solid fa-xmark"></i>';

// Element selection

let todoForm = document.querySelector("#todo-form");
let todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");
let editForm = document.querySelector("#edit-form");
let editInput = document.querySelector("#edit-input");
let cancelEditBtn = document.querySelector("#cancel-edit-btn");
let searchInput = document.querySelector("#search-input");
let eraseBtn = document.querySelector("#erase-button");
let filterSelect = document.querySelector("#filter-select");

let oldInputValue;


// Functions

let saveTodo = (text, done=0, save=1) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    let doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = doneIconHtml;
    todo.appendChild(doneBtn);

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = editIconHtml;
    todo.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = deleteIconHtml;
    todo.appendChild(deleteBtn);

    // Using local storage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoInLocalStorage({text, done})
    }
    // Using local storage

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

let toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

let updateTodo = (text) => {
    let todos = document.querySelectorAll(".todo");

    todos.forEach(currentTodo => {
        let currentTodoTitle = currentTodo.querySelector("h3");

        if (currentTodoTitle.innerText === oldInputValue) {
            currentTodoTitle.innerText = text;

            updateTodoLocalStorage(oldInputValue, text);
        }
    });
}

let getSearchTodos = (searchText) => {
    let todos = document.querySelectorAll(".todo");
    let normalizedSearchText = searchText.toLowerCase();

    todos.forEach(currentTodo => {
        let currentTodoTitle = currentTodo.querySelector("h3").innerText.toLowerCase();
        currentTodo.style.display = "flex";

        if (!currentTodoTitle.includes(normalizedSearchText)) {
            currentTodo.style.display = "none";
        }
    });
}

let filterTodoList = (selected) => {
    let todos = document.querySelectorAll(".todo");

    todos.forEach(todo => {
        todo.style.display = "flex";
        if (selected === "todo" && todo.classList.contains("done")) {
            todo.style.display = "none";
        } else if (selected === "done" && !todo.classList.contains("done")) {
            todo.style.display = "none";
        }
    });
}


// Events

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
    
    filterSelect.dispatchEvent(new Event("change"));
});

document.addEventListener("click", (e) => {
    let targetElement = e.target;
    let parentElement = targetElement.closest("div");
    let todoTitle;

    if (parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    if (targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");
        filterSelect.dispatchEvent(new Event("change"));

        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetElement.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetElement.classList.contains("remove-todo")) {
        parentElement.remove();

        removeTodoFromLocalStorage(todoTitle);
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    let search = e.target.value;

    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup"));
});

filterSelect.addEventListener("change", () => {
    let selectedValue = filterSelect.value;

    filterTodoList(selectedValue);
});


// Local storage

let getTodosFromLocalStorage = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
}

let loadTodos = () => {
    let todos = getTodosFromLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    })
}

let saveTodoInLocalStorage = (todo) => {
    // get all todos from local storage
    let todos = getTodosFromLocalStorage();

    // add the new todo into the array
    todos.push(todo);

    // save everything in the local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

let removeTodoFromLocalStorage = (todoText) => {
    let todos = getTodosFromLocalStorage();
    let filteredTodos = todos.filter((todo) => todo.text != todoText)

    localStorage.setItem("todos", JSON.stringify(filteredTodos))
}

let updateTodoStatusLocalStorage = (todoText) => {
    let todos = getTodosFromLocalStorage();

    todos.map((todo) => (
        (todo.text === todoText) ? (todo.done = !todo.done) : null
    ));

    localStorage.setItem("todos", JSON.stringify(todos));
}

let updateTodoLocalStorage = (todoOldText, todoNewText) => {
    let todos = getTodosFromLocalStorage();

    todos.map((todo) => (
        (todo.text === todoOldText) ? (todo.text = todoNewText) : null
    ));

    localStorage.setItem("todos", JSON.stringify(todos));
}

loadTodos();
