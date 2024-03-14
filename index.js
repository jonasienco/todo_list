const taskForm = document.getElementById ("taskForm");
const taskInput = document.getElementById ("taskInput");
const taskList = document.getElementById ("taskList");

// Event listener for keypress event on taskInput
// taskForm.addEventListener("submit", function(event) {
//     // Check if Enter key is pressed (key code 13)
//     // if (event.key === "Enter") {
//         addTask(); // Call the addTask function
//     // }
// });

// Call the addTask function
taskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addTask()
});

      var editImages = document.querySelectorAll('.edit_image');

      // Loop through all elements with the class 'edit_image' and make them visible
      editImages.forEach(function(img) {
          img.classList.remove('hidden');
      });

const createTaskElement = (taskText) => {
    const listItemContainer = document.createElement('div');
        listItemContainer.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'border-b', 'border-gray-300');

        // Create a checkbox element
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('mr-2'); // Add Tailwind CSS classes to style the checkbox
        checkbox.addEventListener('change', completeTask); // Add event listener for task completion

        // Append the checkbox to the container div
        listItemContainer.appendChild(checkbox);        

        // Create a span for the text content
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        // Append the text span to the container div
        listItemContainer.appendChild(textSpan);

        // Create a div container for the images
        const imagesContainer = document.createElement('div');
        imagesContainer.classList.add('flex', 'items-center'); // Apply flexbox properties to align images horizontally

        // Create the first image element
        const img = document.createElement('img');
        img.src = 'https://cdn.discordapp.com/attachments/1203974616566071357/1217511990415589436/edit.png?ex=66044b66&is=65f1d666&hm=09e04865d49820d254c4dfa3f0199c33ef7a2fe9286b20698df8d98bea4ffbed&'; // Replace 'image.jpg' with the path to your image file
        img.alt = 'Image'; // Set alt text for accessibility
        img.classList.add('h-6', 'w-6', 'cursor-pointer'); // Add Tailwind CSS classes to style the image
        img.id = 'deleteButton'; // Assign id "deleteButton2" to the second image
        img.addEventListener('click', editTask)

        // Create the second image element
        const img2 = document.createElement('img');
        img2.src = 'https://cdn.discordapp.com/attachments/1203974616566071357/1217511991044739194/trash-bin.png?ex=66044b66&is=65f1d666&hm=356cd607b982ab7025d175c8647a499e9e23da78f390239afded8429932f3c12&'; // Replace 'image.jpg' with the path to your image file
        img2.alt = 'Image'; // Set alt text for accessibility
        img2.classList.add('h-6', 'w-6', 'ml-2', 'cursor-pointer'); // Add Tailwind CSS classes to style the image
        img2.id = 'deleteButton2'; // Assign id "deleteButton2" to the second image
        img2.addEventListener('click', deleteTask)

        // Append both images to the images container
        imagesContainer.appendChild(img);
        imagesContainer.appendChild(img2);

        // Append the images container to the container div
        listItemContainer.appendChild(imagesContainer);

        // Create a list item
        const li = document.createElement('li');

        // Append the container div to the list item
        li.appendChild(listItemContainer);

        // Append the list item to the task list
        taskList.appendChild(li);
}

 // ADD TASK - 0. FUNCTIONALITY
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText)

        taskInput.value = ''; /*make textfield empty again for further use*/
    }
}

 // ADD TASK - 0. FUNCTIONALITY

// CHECKBOX - 1. FUNCTIONALITY 
    function completeTask(event) {
    const task = event.target;
    task.parentNode.classList.toggle('line-through');
}
// CHECKBOX - 1. FUNCTIONALITY 


// EDIT TASK - 2. FUNCTIONALITY
// Function to handle the click event on the edit image
function editTask(event) {
    const task = event.target.closest('li'); // Get the parent li element of the clicked edit image
    const textSpan = task.querySelector('span'); // Find the span containing the task text

    // Prompt the user for new task text
    const newText = prompt('Enter new task:');
    if (newText !== null && newText.trim() !== '') {
        textSpan.textContent = newText.trim(); // Update the text content with the new text
    }
}

// Function to add a clickable edit image to the task item
function addEditButton(li) {
    const editImg = document.createElement('img');
    editImg.src = 'https://cdn.discordapp.com/attachments/1203974616566071357/1217511990415589436/edit.png';
    editImg.alt = 'Edit';
    editImg.classList.add('h-6', 'w-6', 'cursor-pointer'); // Add Tailwind CSS classes to style the edit image
    editImg.addEventListener('click', editTask); // Attach click event listener to the edit image
    li.querySelector('.edit-image-container').appendChild(editImg); // Append the edit image to the appropriate container
}

// Modified addTask function


// TASK DELETION - 3. FUNCTIONALITY




function deleteTask(event) {
    console.log(event.target.parentElement.parentElement)
    const task = event.target.parentElement.parentElement;
    task.remove();
    // taskList.removeChild(task);
}


/*
// Get the delete button image element with id "deleteButton2"
const deleteButton2 = document.getElementById('deleteButton2');

// Add click event listener to the delete button image
deleteButton2.addEventListener('click', deleteTask);



function deleteTask(event) {
    const task = event.target.parentNode.parentNode.parentNode; // Get the parent list item
    task.remove(); // Remove the list item from the DOM
}
*/

/*
// Get the delete button image element with id "deleteButton2"
const deleteButton2 = document.getElementById('deleteButton2');

// Add click event listener to the delete button image
deleteButton2.addEventListener('click', deleteTask);

*/

// TASK DELETION - 3. FUNCTIONALITY


// Local Storage

/*
const tasks = JSON.parse(localStorage.getItem('tasks' ));

// declare createTaskElement here

if （tasks)｛
  tasks.forEach(taskText => createTaskElement(taskText));
}

Example structure of the tasks:
[
    {id: 1, name: 'Groceries', checked: false},
    {id: 2, name: 'Walk the dog', checked: false},
    {id: 3, name: 'Read book', checked: false},
]

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText)
        tasks.push({ id: tasks.length + 1, name: taskName, checked: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
    }
}
*/

// function addTask() {

//     // Existing addTask code
    
//     // Save tasks to local storage
    
//     saveTasksToLocalStorage();
    
//     }
    
// ✅ 

//     function loadTasksFromLocalStorage() {
//     if （tasks)｛
//       tasks.forEach(taskText => createTaskElement(taskText));
//     }
// }
// // Call this function at the beginning to load saved tasks
// loadTasksFromLocalStorage();




