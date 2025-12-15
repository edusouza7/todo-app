// Captura dos elementos do DOM
const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const filters = document.querySelector(".filters");

// ==============================
// Persistência
// ==============================

document.addEventListener("DOMContentLoaded", loadTasks);

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

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return;

    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => createTask(task.text, task.completed));
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

function createTask(text, completed = false) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");

    if (completed) li.classList.add("completed");

    // Concluir tarefa
    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        applyFilter(currentFilter);
        saveTasks();
    });

    // Editar tarefa
    span.addEventListener("dblclick", function () {
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = span.textContent;

        li.replaceChild(inputEdit, span);
        inputEdit.focus();

        function finishEdit() {
            span.textContent = inputEdit.value.trim() || span.textContent;
            li.replaceChild(span, inputEdit);
            saveTasks();
        }

        inputEdit.addEventListener("blur", finishEdit);
        inputEdit.addEventListener("keydown", function (e) {
            if (e.key === "Enter") finishEdit();
        });
    });

    // Remover tarefa
    removeBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    applyFilter(currentFilter);
}

// ==============================
// Filtros
// ==============================

let currentFilter = "all";

filters.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;

    const filter = event.target.dataset.filter;
    currentFilter = filter;

    document.querySelectorAll(".filters button").forEach(btn =>
        btn.classList.remove("active")
    );
    event.target.classList.add("active");

    applyFilter(filter);
});

function applyFilter(filter) {
    document.querySelectorAll("#task-list li").forEach(li => {
        const isCompleted = li.classList.contains("completed");

        if (filter === "all") {
            li.style.display = "";
        } else if (filter === "completed") {
            li.style.display = isCompleted ? "" : "none";
        } else if (filter === "pending") {
            li.style.display = !isCompleted ? "" : "none";
        }
    });
}
