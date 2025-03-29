document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const clearTasksBtn = document.getElementById("clearTasksBtn");
  const noTasksMessage = document.getElementById("noTasksMessage");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      addTaskToDOM(task.text, task.completed);
    });
    updateUI();
  }

  function saveTasks() {
    const tasks = Array.from(taskList.children).map((taskItem) => {
      return {
        text: taskItem.querySelector("span").textContent,
        completed: taskItem.querySelector("input").checked,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskToDOM(text, completed = false) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function () {
      saveTasks();
    });

    const span = document.createElement("span");
    span.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
    updateUI();
  }

  addTaskBtn.addEventListener("click", function () {
    if (taskInput.value.trim() !== "") {
      addTaskToDOM(taskInput.value);
      saveTasks();
      taskInput.value = "";
    }
  });

  clearTasksBtn.addEventListener("click", function () {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    updateUI();
  });

  function updateUI() {
    if (taskList.children.length === 0) {
      noTasksMessage.style.display = "block";
      clearTasksBtn.disabled = true;
    } else {
      noTasksMessage.style.display = "none";
      clearTasksBtn.disabled = false;
    }
  }

  loadTasks();
});
