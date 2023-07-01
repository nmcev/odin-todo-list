import { projectsOpenTodo } from "./inbox.js";
class Project {
    constructor(projectName) {
        this.name = projectName;
    }
}

function createProjectNameInput() {
    const projectButtonContainer = document.querySelector('.project-btn-container');

    // Create div for button and input 
    const inputAndButton = document.createElement('div');
    inputAndButton.classList.add('input-and-button');

    // Create input element
    const inputElement = document.createElement('input');
    inputElement.classList.add('input');
    inputElement.setAttribute('type', 'text');
    inputAndButton.appendChild(inputElement);

    // Create button element
    const button = document.createElement('button');
    button.id = 'addProjectButton';
    button.innerHTML = 'Add Project';
    // Make the button clickable
    button.addEventListener('click', createProject);
    inputAndButton.appendChild(button);

    projectButtonContainer.appendChild(inputAndButton);
}

export const renderProjectNameInput = () => {
    const projectButton = document.getElementById('project-btn');
    projectButton.addEventListener('click', () => {
        createProjectNameInput();
    }, { once: true });
};

const projectsContainer = document.createElement('div');
projectsContainer.classList.add('projects-container');

function createProject() {
    const inputValue = document.querySelector('.input').value;
    const project = new Project(inputValue);

    const projectContainer = document.createElement('div');

    const projectName = document.createElement('h3');
    projectName.classList.add('projectName');
    projectName.style.cursor = 'pointer';

    const input = document.querySelector('.input');

    if (inputValue) {
        projectName.innerText = project.name;

        projectContainer.appendChild(projectName);
        input.value = '';
        projectsOpenTodo();
    }

    const buttonAndInput = document.querySelector('.project-btn-container');
    projectsContainer.appendChild(projectContainer);
    buttonAndInput.appendChild(projectsContainer);
}
// creating todo 