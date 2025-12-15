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
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return;

    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => createTask(task.text, task.completed));
}
