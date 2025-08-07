import iconDelete from '/src/images/icon-cross.svg'
import iconCheck from '/src/images/icon-check.svg'

export default class AllTodoView {
    _parentElement = document.getElementById('todo-list')
     _todoParentEl = document.querySelector('.todo-div')
     _clearBtn = document.getElementById('clear-btn')

    render(todos) {
    if (!todos) return;
      // console.log(todos);
    this._clear();

    todos.forEach(todo => {
      const markup = `
        <div
         data-id="${todo.id}" class="todo-div text-black dark:text-white bg-white dark:bg-purple-950 p-5 rounded flex items-center justify-between border-b-1 border-b-gray-300 transition-colors duration-300"
        >
        <label data-id="${todo.id}" class="relative flex items-center cursor-pointer">
        <input
        id="todo-checkbox"
        type="checkbox"
        ${todo.completed ? 'checked' : ''}
        class="todo-checkbox peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-full checked:bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
        />
        
        <!-- Checkmark Icon -->
        <img  class="absolute left-1 top-2 opacity-0 peer-checked:opacity-100 transition-opacity" src="${iconCheck}" alt="icon-check">
        <span class="todo-text ${todo.completed ? 'line-through' : ''} ml-2  ${todo.completed ? 'text-gray-200' : ''} dark:${todo.completed ? 'text-gray-500' : ''} transition-colors duration-300"> ${todo.text}</span>
        </label>
        <img class="delete-btn cursor-pointer" src="${iconDelete}" alt="icon-delete" />
        </div>
      `
      this._parentElement.insertAdjacentHTML('beforeend', markup);
    })
  }

    addHandlerToggle(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const label = e.target.closest('label')
            if(!label) return
            const span = label.querySelector('span');
            console.log(span);
            // label.classList.toggle('line-through')
            span.classList.toggle('line-through');
            console.log(label.dataset.id);
              handler(label.dataset.id)
            
        })
    }

    addHandlerClear(handler) {
      this._clearBtn.addEventListener('click', function() {
        handler()
      })
    }
    
    addHandlerDelete(handler) {
      this._parentElement.addEventListener('click', function(e) {
        const todoDiv = e.target.closest('.todo-div')
        // const btnDelete = e.target.closest('.delete-btn')
        if (!todoDiv || !e.target.classList.contains('delete-btn')) return
        // if (!btnDelete) return
        console.log(todoDiv);
        handler(todoDiv.dataset.id)
      })
    }
    _clear() {
        this._parentElement.innerHTML = '';
    }
}