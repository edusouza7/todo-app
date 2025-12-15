// Captura dos elementos do DOM
const form = document.querySelector(".task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// Escuta o envio do formulário
form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita recarregar a página

    const taskText = input.value.trim();

    // Regra de negócio básica
    if (taskText === "") {
        return;
    }

    // Criação do item da lista
    const li = document.createElement("li");

    // Texto da tarefa
    const span = document.createElement("span");
    span.textContent = taskText;

    // Botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");

    // Marcar como concluída
    span.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Remover tarefa
    removeBtn.addEventListener("click", function () {
        li.remove();
    });

    // Montagem do item
    li.appendChild(span);
    li.appendChild(removeBtn);

    // Adiciona na lista
    taskList.appendChild(li);

    // Limpa o input
    input.value = "";
});
