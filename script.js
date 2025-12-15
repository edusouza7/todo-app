// ==============================
// Conexão com o DOM
// ==============================

const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const filters = document.querySelector(".filters");
const clearCompletedBtn = document.querySelector(".clear-completed");
const counter = document.querySelector(".task-counter");

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

    updateCounter();
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
    updateCounter();
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
        updateCounter();
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

    // Remover tarefa individual
    removeBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
        updateCounter();
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    applyFilter(currentFilter);
    updateCounter();
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

// ==============================
// Limpar tarefas concluídas
// ==============================

clearCompletedBtn.addEventListener("click", function () {
    document.querySelectorAll("#task-list li.completed").forEach(li => {
        li.remove();
    });

    saveTasks();
    applyFilter(currentFilter);
    updateCounter();
});

// ==============================
// Contador de tarefas (NOVO)
// ==============================

function updateCounter() {
    const total = document.querySelectorAll("#task-list li").length;
    const completed = document.querySelectorAll("#task-list li.completed").length;
    const pending = total - completed;

    counter.textContent = `${pending} pendentes · ${completed} concluídas · ${total} no total`;
}
