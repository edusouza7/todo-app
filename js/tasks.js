import { saveTasks } from "./storage.js";
import { applyFilter, currentFilter } from "./filters.js";
import { updateCounter } from "./counter.js";

export function createTask(text, completed = false) {
    const taskList = document.querySelector("#task-list");
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");

    if (completed) li.classList.add("completed");

    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        applyFilter(currentFilter);
        saveTasks();
        updateCounter();
    });

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
        inputEdit.addEventListener("keydown", e => {
            if (e.key === "Enter") finishEdit();
        });
    });

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
