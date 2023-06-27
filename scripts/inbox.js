class TodoItem {
    constructor(title, description, completed, dueDate) {
        this._title = title || '';
        this._description = description || '';
        this._completed = completed || false;
        this._createdAt = new Date();
        this._dueDate = dueDate || null;
    }
}


const getInformation = (() => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector("#description").value;
    const checkedValue = document.querySelector('#completed').checked;
    const date = document.querySelector('#createdAt').value;
    return {
        title,
        description,
        checkedValue,
        date,
    };
})();

const assignValuesInClass = (() => {
    const { title, description, checkedValue, date } = getInformation;
    const todo = new TodoItem(title, description, checkedValue);
})();


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


const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const completed = document.querySelector('#completed').checked;
    const dueDateInput = document.querySelector('#createdAt').value;
    const dueDate = dueDateInput ? new Date(dueDateInput) : null;

    const todo = new TodoItem(title, description, completed, dueDate);

    let todos = [];

    // Retrieve existing todos from local storage
    const todosJson = localStorage.getItem('todos');
    if (todosJson) {
        todos = JSON.parse(todosJson);
    }

    // Add the new todo to the array
    todos.push(todo);

    // Save the updated todos array in local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Render the todos
    renderTodo();

    // Clear the form input values
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#completed').checked = false;
    document.querySelector('#createdAt').value = '';
});

const renderTodo = () => {
    const todoContainer = document.querySelector('.todos');
    todoContainer.innerHTML = ''; // Clear the existing todos

    let todos = [];

    // Retrieve todos from local storage
    const todosJson = localStorage.getItem('todos');
    if (todosJson) {
        todos = JSON.parse(todosJson);
    }

    todos.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');

        const todoTitle = document.createElement('h2');
        const todoNumber = document.createElement('span');
        todoNumber.textContent = `#${index + 1}`; // Index + 1 for the task number
        todoTitle.appendChild(todoNumber);
        todoTitle.appendChild(document.createTextNode(todo._title));
        todoElement.appendChild(todoTitle);

        const todoItems = document.createElement('div');
        todoItems.classList.add('todo-items');

        const todoDescription = document.createElement('p');
        todoDescription.textContent = todo._description;
        todoItems.appendChild(todoDescription);

        const todoDetails = document.createElement('small');
        const formattedDueDate = todo._dueDate ? `${todo._dueDate.getMonth() + 1}/${todo._dueDate.getDate()}/${todo._dueDate.getFullYear()}` : 'N/A';
        todoDetails.textContent = `Due: ${formattedDueDate}, Completed: ${todo._completed ? 'Yes' : 'No'}`;
        todoItems.appendChild(todoDetails);

        todoElement.appendChild(todoItems);
        todoContainer.appendChild(todoElement);
    });
};

// Render the initial todos when open inbox
const renderSavedTodo = (() => {
    const inboxBtn = document.querySelector('.inbox-btn')
    inboxBtn.addEventListener("click", function () {
        renderTodo();
    })
})()

// delete todo's from ui when user click on the cross icon