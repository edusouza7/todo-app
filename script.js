import { loadTasks } from "./js/storage.js";
import { createTask } from "./js/tasks.js";
import { setupFilters, applyFilter, currentFilter } from "./js/filters.js";
import { updateCounter } from "./js/counter.js";

const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const clearCompletedBtn = document.querySelector(".clear-completed");

document.addEventListener("DOMContentLoaded", () => {
    loadTasks(createTask);
    setupFilters(applyFilter);
    updateCounter();
});

form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    createTask(text);
    input.value = "";
});

if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener("click", () => {
        document.querySelectorAll("#task-list li.completed").forEach(li => li.remove());
        updateCounter();
    });
}
