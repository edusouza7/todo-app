export function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks(createTask) {
    const stored = localStorage.getItem("tasks");
    if (!stored) return;

    const tasks = JSON.parse(stored);
    tasks.forEach(task => createTask(task.text, task.completed));
}
