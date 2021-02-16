'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

let lsData = JSON.parse(localStorage.getItem('list'));
let todoData = [];

const render = function () {
  todoList.textContent ='';
  todoCompleted.textContent ='';

  todoData = lsData;

  todoData.forEach(function (item, i) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span>
\t\t\t<div class="todo-buttons">
\t\t\t\t<button class="todo-remove"></button>
\t\t\t\t<button class="todo-complete"></button>
\t\t\t</div>`;
    if(item.completed){
      todoCompleted.append(li);
    }else{
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function (){
      delete todoData[i];
      render();
    })
    localStorage.setItem('list', JSON.stringify(todoData));
  });

};

todoControl.addEventListener('submit', function (e) {
  e.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  }
  if(headerInput.value.trim() !== ''){
    todoData.push(newTodo);
    localStorage.setItem('list', JSON.stringify(todoData));
  }
  headerInput.value = '';

  render();
})

render();