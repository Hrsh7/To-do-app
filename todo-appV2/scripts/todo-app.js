'use strict'

// const uuidv4 = require("./uuidv4");

let todos = getSavedTodos();
const filters ={
  searchText: '',
  hideCompleted : false
}

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', function(e){
  filters.searchText = e.target.value;
  renderTodos(todos, filters); 
})

document.querySelector('#form').addEventListener('submit', function(e){
  e.preventDefault();
  let text = e.target.elements.todoText.value;
  if(text.trim().length > 0){
    todos.push({
      id: uuidv4(),
      text: text,
      completed: false
    })
    
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.todoText.value = '';
  }
});


document.querySelector('#checkbox').addEventListener('change', function(e){
  console.log(e.target.checked);
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
})

// Fetch existing todos from localStorage
// getSavedTodos

// Save todos to localStorage
// saveTodos

// Render application todos based on filters
// renderTodos

// Get the DOM elements for an individual note
// generateTodoDOM

// Get the DOM elements for list summary
// generateSummaryDOM