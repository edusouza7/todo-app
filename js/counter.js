export function updateCounter() {
    const total = document.querySelectorAll("#task-list li").length;
    const completed = document.querySelectorAll("#task-list li.completed").length;
    const pending = total - completed;

    document.querySelector(".task-counter").textContent =
        `${pending} pendentes · ${completed} concluídas · ${total} no total`;
}
