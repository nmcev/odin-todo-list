class TodoItem {
    constructor(title, description, completed, dueDate) {
        this._title = title || '';
        this._description = description || '';
        this._completed = completed || false;
        this._dueDate = dueDate || null;
    }
}

const inboxUI = {
    renderButton() {
        const addTaskBtn = document.querySelector('.addTask-btn');
        addTaskBtn.style.display = "block";
    },
    renderHeader() {
        const header = document.querySelector('.header-display');
        header.classList.remove('header-display');
        header.textContent = "Your Tasks";
        header.classList.add('header-h2');
    },
    renderForm() {
        const form = document.querySelector('.hide-form');
        form.classList.remove('hide-form');
        form.id = "taskForm";
    },
};

export const inboxBtnRenderContent = (() => {
    const inboxBtn = document.querySelector(".inbox-btn");

    function inboxBtnRenderContent() {
        inboxBtn.addEventListener("click", () => {
            inboxUI.renderHeader();
            inboxUI.renderButton();
        });
    }
    return inboxBtnRenderContent;
})();

const addTaskBtnRenderForm = (() => {
    const button = document.querySelector('.addTask-btn');

    button.addEventListener('click', () => {
        inboxUI.renderForm();
    });
    return button;
})();

const todos = [];

function makeTodo() {
    const todoContainer = document.querySelector('.todos');
    todoContainer.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        const todoTitle = document.createElement('h2');
        const todoNumber = document.createElement('span');
        todoNumber.textContent = `#${i + 1}`; // Index + 1 for the task number
        todoTitle.appendChild(todoNumber);
        todoTitle.appendChild(document.createTextNode(todos[i]._title));
        todoDiv.appendChild(todoTitle);

        // Apply line-through style for completed todos
        if (todos[i].completed) {
            todoTitle.classList.add("completed");
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todos[i].completed;
        checkbox.addEventListener('change', () => {
            toggleTodoCompletion(i);
        });
        todoDiv.appendChild(checkbox);

        const todoItem = document.createElement('div');
        const todoParagraph = document.createElement('p');
        todoParagraph.textContent = todos[i]._description;
        todoItem.appendChild(todoParagraph);

        const todoDate = document.createElement('small');
        const formattedDueDate = todos[i]._dueDate
            ? `${todos[i]._dueDate.getMonth() + 1}/${todos[i]._dueDate.getDate()}/${todos[i]._dueDate.getFullYear()}`
            : 'N/A';
        todoDate.textContent = `Due: ${formattedDueDate}, Completed: ${todos[i]._completed ? 'Yes' : 'No'}`;
        todoItem.appendChild(todoDate);
        todoDiv.appendChild(todoItem);
        todoContainer.appendChild(todoDiv);
        if (!todos[i].completed) {
            const deleteButton = makeDeleteButton(i); // Pass the index to makeDeleteButton
            todoDiv.appendChild(deleteButton);
        }
        todoContainer.appendChild(todoDiv);
    }
}

function makeDeleteButton(index) {
    const todoContainer = document.querySelector('.todos')
    let deleteButton = document.createElement("BUTTON");
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/20/svg" width="16" height="16" fill="currentColor" class=" bi bi-trash text-danger"></svg>'
    deleteButton.innerText = 'X ';
    deleteButton.style.cursor = "pointer"
    deleteButton.addEventListener('click', () => {
        deleteTodo(index);
    });
    return deleteButton;
}

function deleteTodo(index) {
    todos.splice(index, 1)
    makeTodo()
}

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    handleFormSubmission()
});

function handleFormSubmission() {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const completed = document.querySelector('#completed').checked;
    const dueDateInput = document.querySelector('#createdAt').value;
    const dueDate = dueDateInput ? new Date(dueDateInput) : null;

    const todo = new TodoItem(title, description, completed, dueDate);

    todos.push(todo);
    makeTodo();

    // clear the inputs 
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#completed').checked = false;
    document.querySelector('#createdAt').value = '';
}


function toggleTodoCompletion(index) {
    todos[index].completed = !todos[index].completed;
    makeTodo();

    // Check if the todo is completed
    if (todos[index].completed) {
        completedTodos.push(todos[index]);
    } else {
        // If it was previously completed, remove it from the completedTodos array
        const completedIndex = completedTodos.findIndex(todo => todo === todos[index]);
        if (completedIndex !== -1) {
            completedTodos.splice(completedIndex, 1);
        }
    }
}

// const deleteSingleTodo = (() => {
//     const deleteButton = makeDeleteButton()
//     console.log(deleteButton)
//     for (let i = 0; i < todos.length; ++i) {
//         deleteButton.addEventListener('click', () => {
//             deleteTodo(i)
//             console.log('testing')
//         })
//     }
// })()