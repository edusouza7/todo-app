import { loadTasks } from "./js/storage.js";
import { createTask } from "./js/tasks.js";
import { setupFilters } from "./js/filters.js";
import { updateCounter } from "./js/counter.js";

const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const clearCompletedBtn = document.querySelector(".clear-completed");

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
    loadTasks(createTask);
    setupFilters(() => {});
    updateCounter();
});

// Criar tarefa
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();
    if (taskText === "") return;

    createTask(taskText);
    input.value = "";
});

// Limpar concluídas
clearCompletedBtn.addEventListener("click", function () {
    document.querySelectorAll("#task-list li.completed").forEach(li => li.remove());
    updateCounter();
});
