import iconCheck from '/src/images/icon-check.svg'
import AllTodoView from "./allTodoView";

class CompletedTodoView extends AllTodoView {
    _parentElement = document.getElementById('todo-list')
    _completeBtnEl = document.getElementById('btn-completed');
    _btnParentEl = document.querySelector('.btn-div')

    render(todos) {
    if (!todos) return;

    this._clear();

    todos.forEach(todo => {
      if (!todo.completed) return
      const markup = `
        <div
        data-id="${todo.id}" class="todo-div bg-white dark:bg-purple-950 p-5 rounded flex items-center justify-between border-b-1 border-b-gray-300 transition-colors duration-300"
        >
        <label class="relative flex items-center cursor-pointer">
        <input
        id="todo-checkbox"
        type="checkbox"
        checked
        class="todo-checkbox peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-full checked:bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
        />
        
        <!-- Checkmark Icon -->
        <img  class="absolute left-1 top-2 opacity-0 peer-checked:opacity-100 transition-opacity" src="${iconCheck}" alt="icon-check">
        <span class="todo-text ml-2 text-gray-300 dark:text-gray-500 transition-colors duration-300">${todo.text}</span>
        </label>
        </div>
      `
      this._parentElement.insertAdjacentHTML('beforeend', markup);
    })
  }

}

export default new CompletedTodoView()