const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Event listener for form submission
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});

// Loop through all elements with the class 'edit_image' and make them visible
document.querySelectorAll('.edit_image').forEach(img => img.classList.remove('hidden'));

// Retrieve tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.checked));
});

// Function to create a task element
const createTaskElement = (taskText, isChecked) => {
    const listItemContainer = document.createElement('div');
    listItemContainer.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'border-b', 'border-gray-300');

    // Create a checkbox element
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('mr-2');
    checkbox.addEventListener('change', completeTask);
    checkbox.checked = isChecked; // Set checkbox state based on local storage

    // Append the checkbox to the container div
    listItemContainer.appendChild(checkbox);

    // Create a span for the text content
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    listItemContainer.appendChild(textSpan);

    // Create a div container for the images
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('flex', 'items-center');

    // Create the first image element (edit)
    const imgEdit = document.createElement('img');
    imgEdit.src = 'https://cdn.discordapp.com/attachments/1203974616566071357/1217511990415589436/edit.png?ex=66044b66&is=65f1d666&hm=09e04865d49820d254c4dfa3f0199c33ef7a2fe9286b20698df8d98bea4ffbed&';
    imgEdit.alt = 'Edit';
    imgEdit.classList.add('h-6', 'w-6', 'cursor-pointer');
    imgEdit.addEventListener('click', () => editTask(textSpan)); // Pass text span to editTask

    // Create the second image element (delete)
    const imgDelete = document.createElement('img');
    imgDelete.src = 'https://cdn.discordapp.com/attachments/1203974616566071357/1217511991044739194/trash-bin.png?ex=66044b66&is=65f1d666&hm=356cd607b982ab7025d175c8647a499e9e23da78f390239afded8429932f3c12&';
    imgDelete.alt = 'Delete';
    imgDelete.classList.add('h-6', 'w-6', 'ml-2', 'cursor-pointer');
    imgDelete.addEventListener('click', deleteTask);

    // Append both images to the images container
    imagesContainer.appendChild(imgEdit);
    imagesContainer.appendChild(imgDelete);

    // Append the images container to the container div
    listItemContainer.appendChild(imagesContainer);

    // Create a list item
    const li = document.createElement('li');
    li.appendChild(listItemContainer);
    taskList.appendChild(li);
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if (!savedTasks.some(task => task.text === taskText)) {
            createTaskElement(taskText, false); // New task is unchecked by default
            saveTaskToLocalStorage({ text: taskText, checked: false });
            taskInput.value = '';
        } else {
            alert("This task already exists!");
        }
    }
}

// Function to save a single task to local storage
function saveTaskToLocalStorage(task) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Function to delete a task
function deleteTask(event) {
    const task = event.target.closest('li');
    const taskText = task.querySelector('span').textContent;
    task.remove();
    removeTaskFromLocalStorage(taskText);
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Function to handle task completion
function completeTask(event) {
    const task = event.target;
    const textSpan = task.nextSibling;
    task.parentNode.classList.toggle('line-through');

    // Update task status in local storage
    const taskText = textSpan.textContent;
    updateTaskStatusInLocalStorage(taskText, task.checked);
}

// Function to update task status in local storage
function updateTaskStatusInLocalStorage(taskText, isChecked) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = savedTasks.findIndex(task => task.text === taskText);
    if (index !== -1) {
        savedTasks[index].checked = isChecked;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
}
// Retrieve tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Clear the taskList before adding tasks
    taskList.innerHTML = '';
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.checked);
        const listItem = taskList.lastChild;
        if (task.checked) {
            listItem.classList.add('line-through');
        }
    });
});

// Function to handle the click event on the edit image
// Function to handle the click event on the edit image
function editTask(textSpan) {
    const oldText = textSpan.textContent;
    const newText = prompt('Enter new task:', oldText);
    if (newText !== null && newText.trim() !== '') {
        textSpan.textContent = newText.trim();
        updateTaskInLocalStorage(oldText, newText.trim());
    }
}

// Function to update task in local storage
function updateTaskInLocalStorage(oldText, newText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = savedTasks.findIndex(task => task.text === oldText);
    if (index !== -1) {
        savedTasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
}
