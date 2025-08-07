export const state = {
  todo: {},
  allTodo: [],
  activeTodo: [],
  completedTodo: [],
};

//getting/creating the todo from the todo form
export function addTodo(text) {
    //creating the new todo object
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false
    }

    state.todo = newTodo;
    console.log(state.todo);
    state.allTodo.push(newTodo);
    updateFilter() 
}


//function for marking todo as completed
export function toggleTodo(id) {
  const todo = state.allTodo.find(t => t.id === id)
  if(todo) {
    todo.completed = !todo.completed;
    updateFilter();
  }
}

//logic for deleting the todo 
export function deleteTodo(id) {
  state.allTodo = state.allTodo.filter(t => t.id !== id);
  updateFilter();
}

// function clear completed todo
export function clearCompletedTodo() {
  state.allTodo = state.allTodo.filter(t => !t.completed);
  updateFilter()
}


//logic to update all todo list
function updateFilter () {
  state.activeTodo = state.allTodo.filter(t => !t.completed)
  state.completedTodo = state.allTodo.filter(t => t.completed)
  console.log(state.completedTodo);
  console.log(state.allTodo);
}
