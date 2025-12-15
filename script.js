// Captura dos elementos do DOM
const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// ==============================
// Persistência
// ==============================

// Carrega tarefas ao iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

// Salva tarefas no localStorage
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carrega tarefas do localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return;

    const tasks = JSON.parse(storedTasks);

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}

// ==============================
// Criação de tarefa
// ==============================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();
    if (taskText === "") return;

    createTask(taskText);
    input.value = "";

    saveTasks();
});

// Função central de criação (reutilizável)
function createTask(text, completed = false) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");

    if (completed) {
        li.classList.add("completed");
    }

    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    removeBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
}
