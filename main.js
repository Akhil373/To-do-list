const tasksDiv = document.getElementById('tasks');
const list = document.createElement('ul');
let tasks = [];
const inputValue = document.getElementById('input');
const storageKey = 'tasks';

function loadItems() {
    const oldTasks = localStorage.getItem(storageKey);
    if (oldTasks) tasks = JSON.parse(oldTasks);
    renderItems();
}

function saveItems() {
    const stringItems = JSON.stringify(tasks);
    localStorage.setItem(storageKey, stringItems);
}

function updatePending() {
    const tasksContainer = document.getElementById('pending');
    tasksContainer.innerHTML = '';

    const items = tasks.length;
    const text = document.createElement('p');
    if (items === 0) {
        text.textContent = `All tasks done!🎉`;
    } else {
        text.textContent = `You have ${items} tasks pending.`;
    }
    tasksContainer.appendChild(text);
}

function renderItems() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const allItems = document.createElement('li');
    
        const item = document.createElement('input');
        item.id = 'checkbox';
        item.type = 'checkbox';
    
        const label = document.createElement('label');
        label.textContent = task;

        allItems.appendChild(item);
        allItems.appendChild(label);
    
        list.appendChild(allItems);
    });

    tasksDiv.appendChild(list);

    updatePending();
}

function addTask() {
    const value = inputValue.value.trim();
    if (!value) {
        alert('Enter a task');
        return;
    }

    tasks.push(value);
    renderItems();
    inputValue.value = '';
    saveItems();
}

function removeTask() {
    const checkboxes = list.querySelectorAll('input[type="checkbox"]:checked');

    for (let i = checkboxes.length - 1; i >= 0; i--) {
        const checkbox = checkboxes[i];
        const listItem = checkbox.parentNode;
        const taskIndex = Array.from(list.children).indexOf(listItem);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
        }
    }

    renderItems();
    saveItems();
}


inputValue.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

document.addEventListener('DOMContentLoaded', loadItems);
