let tasks = [];

// Loads tasks from localStorage and displays them on web page
function loadTasks() {
    // Read task array from localStorage and parse from JSON
    tasks = JSON.parse(localStorage.getItem("tasksArr"));
    displayTasks();
}

// Adds task to tasks array in code and displays up-to-date tasklist
function addNewTask() {

    if (!validateInput()) return;

    // Create object of task
    const newTask = {
        taskContent: document.getElementById("taskContentInput").value,
        taskDate: document.getElementById("taskDateInput").value,
        taskTime: document.getElementById("taskTimeInput").value,
        taskNew: true
    };

    // Add the new task to the task array
    tasks.push(newTask);

    // Save task array in localStorage as JSON
    localStorage.setItem("tasksArr", JSON.stringify(tasks));
    
    displayTasks();

    resetForm();
}

// Clears input in HTML form and clears error message
function resetForm() {
    document.getElementById("addTaskForm").reset();
    document.getElementById("errorMessage").innerText = "";
}

// Displays the up-to-date taskslist on HTML page
function displayTasks() {
    
    // Initialize html string as empty
    let html = "";
    
    // Iterate over every task in our array (using destructuring syntax to access index so I can send it as a parameter to deletion function)
    for(let [index, task] of tasks.entries()) {
        // Initialise class to give task
        let taskClass = "task";

        // Check if it's a new task. If yes, add appropriate class and mark as not new
        if (task.taskNew)
        {
            taskClass += " newTask";
            task.taskNew = false;
        }

        // Add each task as a div
        html += `<div class="${taskClass}">
                    <button class="deleteButton" onclick="deleteTask(${index})"><span class="glyphicon glyphicon-remove"></span></button>
                    <p class="taskContent">${task.taskContent}</p>
                    <p class="taskDateTime">${task.taskDate}</p>
                    <p class="taskDateTime">${task.taskTime}</p>
                </div>
        `;
    }
    
    // Replace taskBoard div on HTML with the up-to-date tasks
    document.getElementById("taskBoard").innerHTML = html;

    // Save task array in localStorage as JSON (deal with case that new task was added and then page refreshed)
    localStorage.setItem("tasksArr", JSON.stringify(tasks));
}

// Deletes a task from tasks array (based on index) and displays up-to-date tasklist
function deleteTask(index) {

    // Delete the task from the array using splice method
    tasks.splice(index, 1);

    // Save task array in localStorage as JSON
    localStorage.setItem("tasksArr", JSON.stringify(tasks));

    displayTasks();
}

// Validates that all input fields were filled
function validateInput() {
    
    // Get all the input objects that need to be validated - marked in HTML with class="taskInputField"
    let validationObjs = document.getElementsByClassName("taskInputField");
    
    // Iterate over the input objects to be validated
    for (let obj of validationObjs) {
        
        // Check if current object is empty
        if(obj.value === "")
        {
            // Get name of input missing - using query selector to search for corresponding label text
            let inputName = document.querySelector("label[for='" + obj.id + "']").innerText;
            
            // Set the error message appropriately so user will know what is wrong
            document.getElementById("errorMessage").innerText = "Error! Please fill in " + inputName;
            // Stylise error message red to draw user's attention
            document.getElementById("errorMessage").style.color = "red";
            
            // End function since validation is complete as containing an error
            return false;
        }
    }

    // If finished loop without returning false, validation is complete and no errors
    return true;
}