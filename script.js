// Captura dos elementos do DOM
const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

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

    if (completed) {
        li.classList.add("completed");
    }

    // Concluir tarefa
    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    // Editar tarefa (duplo clique)
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
            if (e.key === "Enter") {
                finishEdit();
            }
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
}
