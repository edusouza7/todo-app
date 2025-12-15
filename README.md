# To-Do App

Este projeto é uma aplicação de lista de tarefas criada com **HTML, CSS e JavaScript puro**, com foco em **lógica de programação, organização de código e evolução incremental**.

O objetivo principal não é apenas “funcionar”, mas **entender como uma aplicação web é estruturada por dentro**.

---

## 🚀 Funcionalidades

- Criar tarefas
- Marcar tarefas como concluídas
- Editar tarefas com duplo clique
- Remover tarefas individualmente
- Limpar todas as tarefas concluídas
- Filtrar tarefas (todas, pendentes, concluídas)
- Persistência de dados com `localStorage`
- Contador de tarefas (pendentes, concluídas e total)

---

## 🧠 Lógica do Projeto

A lógica central da aplicação segue este ciclo:

1. O usuário interage com a interface
2. O estado da aplicação é alterado
3. A interface reflete esse novo estado
4. O estado é salvo no `localStorage`

A interface **não é a fonte de verdade**.  
O estado é sempre reconstruído a partir dos dados salvos.

---

## 🗂 Organização do Código

O JavaScript foi modularizado para separar responsabilidades:

### `script.js`
Arquivo principal. Orquestra a aplicação:
- Inicialização
- Eventos globais
- Integração entre módulos

### `tasks.js`
Responsável por:
- Criar tarefas
- Gerenciar eventos de cada tarefa (concluir, editar, remover)

### `storage.js`
Responsável por:
- Salvar tarefas no `localStorage`
- Carregar tarefas ao iniciar a aplicação

### `filters.js`
Responsável por:
- Controlar os filtros de visualização
- Gerenciar o estado do filtro atual

### `counter.js`
Responsável por:
- Calcular e exibir o contador de tarefas
- Trabalhar apenas com estado derivado

---

## 📐 Conceitos Aplicados

- Manipulação do DOM
- Eventos
- Estado e estado derivado
- Persistência de dados
- Separação de responsabilidades
- Modularização com ES Modules
- UX baseada em interação direta

---

## ▶️ Como executar o projeto

1. Clone o repositório
2. Abra a pasta no VSCode
3. Utilize a extensão **Live Server**
4. Abra o `index.html` no navegador

---

## 📌 Observação

Este projeto foi desenvolvido com foco em **aprendizado progressivo**.  
Cada funcionalidade foi adicionada em pequenos incrementos, com versionamento claro via Git.

---

## 👤 Autor

Projeto desenvolvido para estudo e evolução em lógica de programação e desenvolvimento frontend.
