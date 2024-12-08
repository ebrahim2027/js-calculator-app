// Step1 ---> get todos
let todos = localStorage.getItem("todos");
try {
  todos = JSON.parse(todos);
  todos = todos.length ? todos : null;
} catch (e) {
  todos = null;
}
console.log(todos);

// Step2 ---> set default values if todos null
if (!todos) {
  todos = [
    { content: "shopping", status: true },
    { content: "study", status: true },
    { content: "watch movie", status: true },
  ];

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Step3 ---> func(); ---> to create or update todos list
function createTodos(todos) {
  let todosList = document.getElementById("todos-list");
  todosList.innerHTML = "";

  // create element for each todo
  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.className = "list-group-item";

    let content = document.createElement("span");
    content.textContent = todo.content;
    content.style.textDecoration = todo.status ? "initial" : "line-through";

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "./assets/trash-can-solid.svg";
    deleteBtn.alt = "delete-icon";
    deleteBtn.className = "float-end";

    li.append(content);
    li.append(deleteBtn);
    todosList.append(li);

    // Step4 ---> delete functionality
    deleteBtn.addEventListener("click", (e) => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      createTodos(todos);
    });

    // Step5 ---> complete functionality
    content.addEventListener("click", (e) => {
      todos[index].status = !todos[index].status;
      localStorage.setItem("todos", JSON.stringify(todos));
      createTodos(todos);
    });
  });
}
createTodos(todos);

// Step6 ---> add & search actions
let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");

Array.from(actions.children).forEach((action) => {
  // add todo
  if (action.dataset.action == "add") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = `<form id="add">
        <input
          class="form-control"
          type="text"
          name="add"
          placeholder="add todo..."
        />
      </form>`;

      // Step7 ---> add functionality
      createTodos(todos);
      let add = document.getElementById("add");
      add.addEventListener("submit", (e) => {
        e.preventDefault();
        if (add.add.value) {
          todos.push({ content: add.add.value, status: true });
          localStorage.setItem("todos", JSON.stringify(todos));
          createTodos(todos);
          add.add.value = "";
        }
      });
    });
  }
  //   search todo
  else if (action.dataset.action == "search") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = ` <form id="search">
        <input
          class="form-control"
          type="text"
          name="search"
          placeholder="search todos..."
        />
      </form>`;

      // Step8 ---> add functionality
      let search = document.getElementById("search");
      search.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (search.search.value) {
          let filteredTodos = todos.filter((todo) =>
            todo.content
              .toLowerCase()
              .includes(search.search.value.toLowerCase())
          );
          createTodos(filteredTodos);
        } else {
          createTodos(todos);
        }
      });
    });
  }
});
