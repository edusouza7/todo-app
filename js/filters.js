export let currentFilter = "all";

export function setupFilters(applyFilter) {
    const filters = document.querySelector(".filters");

    filters.addEventListener("click", function (event) {
        if (event.target.tagName !== "BUTTON") return;

        currentFilter = event.target.dataset.filter;

        document.querySelectorAll(".filters button").forEach(btn =>
            btn.classList.remove("active")
        );

        event.target.classList.add("active");
        applyFilter(currentFilter);
    });
}

export function applyFilter(filter) {
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
