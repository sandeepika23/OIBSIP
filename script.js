function addTask(){

    let taskInput =
    document.getElementById("taskInput");

    let task =
    taskInput.value.trim();

    let dueDate =
    document.getElementById("dueDate").value;

    let priority =
    document.getElementById("priority").value;

    if(task === ""){
        alert("Please enter a task");
        return;
    }

    let li =
    document.createElement("li");

    li.classList.add(
        priority.toLowerCase()
    );

    li.innerHTML = `
        <span>
            <strong>${task}</strong><br>
            📅 Due: ${dueDate || "No Date"}<br>
            ⭐ Priority: ${priority}
        </span>

        <div class="task-buttons">

            <button
            class="complete-btn"
            onclick="completeTask(this)">
            Complete
            </button>

            <button
            class="edit-btn"
            onclick="editTask(this)">
            Edit
            </button>

            <button
            class="delete-btn"
            onclick="deleteTask(this)">
            Delete
            </button>

        </div>
    `;

    document
    .getElementById("taskList")
    .appendChild(li);

    taskInput.value = "";
    document.getElementById("dueDate").value = "";

    saveTasks();
}

function deleteTask(button){
    button.parentElement.parentElement.remove();
    saveTasks();
}

function completeTask(button){

    let li =
    button.parentElement.parentElement;

    li.classList.add("completed");

    button.remove();

    document
    .getElementById("completedList")
    .appendChild(li);

    saveTasks();
}

function editTask(button){

    let li =
    button.parentElement.parentElement;

    let taskText =
    li.querySelector("strong");

    let updatedTask =
    prompt(
        "Edit Task",
        taskText.innerText
    );

    if(updatedTask &&
       updatedTask.trim() !== ""){

        taskText.innerText =
        updatedTask;

        saveTasks();
    }
}

function searchTasks(){

    let input =
    document.getElementById("searchTask")
    .value
    .toLowerCase();

    let tasks =
    document.querySelectorAll("li");

    tasks.forEach(task=>{

        let text =
        task.innerText.toLowerCase();

        task.style.display =
        text.includes(input)
        ? ""
        : "none";
    });
}

function updateCount(){

    document
    .getElementById("pendingCount")
    .innerText =
    document
    .getElementById("taskList")
    .children.length;

    document
    .getElementById("completedCount")
    .innerText =
    document
    .getElementById("completedList")
    .children.length;
}

function saveTasks(){

    localStorage.setItem(
        "pendingTasks",
        document
        .getElementById("taskList")
        .innerHTML
    );

    localStorage.setItem(
        "completedTasks",
        document
        .getElementById("completedList")
        .innerHTML
    );

    updateCount();
}

function loadTasks(){

    document
    .getElementById("taskList")
    .innerHTML =
    localStorage.getItem(
        "pendingTasks"
    ) || "";

    document
    .getElementById("completedList")
    .innerHTML =
    localStorage.getItem(
        "completedTasks"
    ) || "";

    updateCount();
}

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    let btn =
    document.getElementById("themeBtn");

    if(
        document.body.classList
        .contains("dark-mode")
    ){

        btn.innerHTML =
        "☀️ Bright Mode";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }
    else{

        btn.innerHTML =
        "🌙 Dark Mode";

        localStorage.setItem(
            "theme",
            "light"
        );
    }
}

if(
localStorage.getItem("theme")
=== "dark"
){

    document.body.classList
    .add("dark-mode");

    document.getElementById("themeBtn")
    .innerHTML =
    "☀️ Bright Mode";
}

loadTasks();