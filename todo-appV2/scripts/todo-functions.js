'use strict'

// steps for x button
// 1. wireup the button event
// 2. Remove todo by id
// 3. Save and render the todo list

// steps for checkbox
// 1. Add eventhandler to checkbox
// 2. MOdify the correct object completed property
// 3. Save and rerender

// Fetch existing todos from localStorage
// getSavedTodos
const getSavedTodos = function(){
  const todosJscon = localStorage.getItem('todos'); // here todos is a key which 
  try{
    if(todosJscon !== null){
      return JSON.parse(todosJscon);
    }
    else{
      return []
    }
  }
  catch(e){
    return []
  }
  
}

// Save todos to localStorage
// saveTodos
const saveTodos = function(todos){
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render application todos based on filters
// renderTodos
const renderTodos = function(todos, filters){
  const todoEl = document.querySelector('#todo')
  const filteredTodos = todos.filter(function(todo){
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  })
  
  let incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  })
   
  todoEl.innerHTML = '';
  generateSummaryDOM(incompleteTodos)
  
  if(filteredTodos.length > 0) {
    filteredTodos.forEach(function(todo){
      todoEl.appendChild(generateTodoDOM(todo));
    })
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('empty-message');
    emptyMessage.textContent = 'No to-dos to show';
    todoEl.appendChild(emptyMessage);
  }
}

// 1. Setup a root div
// 2. Setup and append a checkbox (set type attribute)
// someNode.setAttribute('type', 'checkbox');
// 3. Setup and append a span (set text)
// 4. setup and append a button (set text)

// remove todo of todos
let removeTodo = function(id){
  const index = todos.findIndex(function(todo){
    return todo.id === id;
  })
  if(id !== -1){
    todos.splice(index, 1);
  }
}

// toogle the completed value of given todos
let toggleTodo = function(id){
  const todo = todos.find(function(todo){
    return todo.id === id;
  })
  if(todo !== undefined){
    // get the corrent value flip it and then store as the new value 
    todo.completed = !todo.completed;
  }
}

// Get the DOM elements for an individual note
// generateTodoDOM
let generateTodoDOM = function(todo){
  const todoEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button')

  // setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', function(){
    // if(e.target.checked){
    //   todo.completed = true;
    // }
    // else{
    //   todo.completed = false;
    // }
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  // setup todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // setup container
  todoEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  todoEl.appendChild(containerEl);

  // setup remove button
  removeButton.textContent = "remove"
  removeButton.classList.add('button', 'button--text')
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', function(){
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  return todoEl;
}

// Get the DOM elements for list summary
// generateSummaryDOM
const generateSummaryDOM = function(incompleteTodos){
  const summary = document.createElement('h2');
  summary.classList.add('list-title')
  if(incompleteTodos.length > 1 || incompleteTodos.length == 0){
    summary.textContent = `You have ${incompleteTodos.length} todos left.`;
  } else {
    summary.textContent = `You have ${incompleteTodos.length} todo left.`;
  }
  document.querySelector('#todo').appendChild(summary);
}