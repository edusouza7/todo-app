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
    li.textContent = taskText;

    // Adiciona na tela
    taskList.appendChild(li);

    // Limpa o campo
    input.value = "";
});
