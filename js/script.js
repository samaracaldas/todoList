const taskinput = document.querySelector(".taskInput input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".botaoApagar"),
taskBox = document.querySelector(".taskBox");

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let isFeito = todo.status == "feito" ? "checked" : "";
            if(filter == todo.status || filter == "todos") {
                li +=`<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isFeito}>
                            <p class="${isFeito}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="taskMenu">
                                <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i></li>
                                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i></li>
                            </ul>
                            </div>
                  </li>`; 
            }
             
       });
    }
    taskBox.innerHTML = li || `<span>Você não tem nenhuma tarefa aqui</span>`; ;
}
showTodo("todos");

function showMenu(selectedTask) {
   let taskMenu = selectedTask.parentElement.lastElementChild;
   taskMenu.classList.add("show");
   document.addEventListener("click", e => {
       if(e.target.tagName != "I" || e.target != selectedTask) {
           taskMenu.classList.remove("show");
       }
   });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskinput.value = taskName;
}

function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("todos");
}

clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("todos");
});


function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "feito";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pendente";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskinput.addEventListener("keyup", e => {
    let userTask = taskinput.value.trim();
    if(e.key == "Enter" && userTask) {
       if (!isEditedTask) {
          if(!todos) {
             todos = []; 
           }  
           let taskInfo = {name: userTask, status: "pendente"};
           todos.push(taskInfo);
       } else {
           isEditedTask = false;
           todos[editId].name = userTask;
       }
      
       taskinput.value = "";
       localStorage.setItem("todo-list", JSON.stringify(todos));
       showTodo("todos");
    }
});


