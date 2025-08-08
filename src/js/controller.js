import "../../src/style.css";
import iconMoon from "/src/images/icon-sun.svg"
import iconSun from '/src/images/icon-sun.svg'
import * as model from "./model";
import activeTodoView from "./views/activeTodoView";
import completedTodoView from "./views/completedTodoView";
import AllTodoView from "./views/allTodoView";

// // handling drag and drop
function reorderTodo(draggedId, targetId) {
  const draggedIndex = model.state.allTodo.findIndex(todo => todo.id === draggedId);
  const targetIndex = model.state.allTodo.findIndex(todo => todo.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1) return

  const [movedItem] = model.state.allTodo.splice(draggedIndex, 1);
  model.state.allTodo.splice(targetIndex, 0, movedItem);

  allTodoView.render(model.state.allTodo);
}

//expose the above function to view
window.controller = {
  reorderTodo,
};

// export function reorderTodos(draggedId, targetId) {
//   const dragIndex = model.state.allTodo.findIndex(todo => todo.id === draggedId);
//   const targetIndex = model.state.allTodo.findIndex(todo => todo.id === targetId);
//   const [movedItem] = model.state.allTodo.splice(dragIndex, 1);
//   model.state.allTodo.splice(targetIndex, 0, movedItem);

//   allTodoView.render(model.state.allTodo);
//   allTodoView._HandleDragandDropListeners()

// }

// creating an instance of the all todo view class
const allTodoView = new AllTodoView();

// setting up the theme toggling functionality
const themeToggleBtn = document.getElementById('theme-icon');
const html = document.documentElement;

// Load saved theme from localstorage
if(localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark')
}

themeToggleBtn.addEventListener('click', () => {
    console.log('clicked');
    html.classList.toggle('dark');
    if(html.classList.contains('dark')) {
      themeToggleBtn.src = `${iconSun}`
        localStorage.setItem('theme', 'dark')
    }else {
      themeToggleBtn.src = `${iconMoon}`
        localStorage.setItem('theme', 'light')
    }
})


//controlling the filter all/active/completed button to indicate active buttons
const buttons = document.querySelectorAll('#btn-group .btn');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('clicked');
    buttons.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
  })
})


// controlling creation of a todo from the todo form
const controlAddTodo = function (text) {
  //get todo from the todo list
  model.addTodo(text);

  //render the todos to the todo list
  allTodoView.render(model.state.allTodo);
  
  document.getElementById('items-count').innerText = `${model.state.activeTodo.length}`
};

//marking to do as completed or not 
const controlToggleTodo = function (id) {
  model.toggleTodo(id);
  allTodoView.render(model.state.allTodo);

  document.getElementById('items-count').innerText = `${model.state.activeTodo.length}`
};

//clearing the completed todos from the list
const controlClearCompleteTodo = function() {
    model.clearCompletedTodo()

    allTodoView.render(model.state.allTodo)
}

//deleting a todo from the list
const controlDeleteTodo = function (id) {
    // console.log(id);
  model.deleteTodo(id);
  allTodoView.render(model.state.allTodo);

  document.getElementById('items-count').innerText = `${model.state.allTodo.length}`

};



function init() {
  //get text from the todo form
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.querySelector("input");
    if (!input.value.trim()) return;
    controlAddTodo(input.value.trim());
    input.value = "";
  });


  allTodoView.addHandlerToggle(controlToggleTodo);
  allTodoView.addHandlerDelete(controlDeleteTodo);
  allTodoView.addHandlerClear(controlClearCompleteTodo);

  document.getElementById("btn-all").addEventListener("click", () => {
    allTodoView.render(model.state.allTodo);
  });

  document.getElementById("btn-active").addEventListener("click", () => {
    activeTodoView.render(model.state.activeTodo);
  });

  document.getElementById("btn-completed").addEventListener("click", () => {
    completedTodoView.render(model.state.completedTodo);
  });
}

init();
