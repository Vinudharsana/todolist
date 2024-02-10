const todoListItem = JSON.parse(localStorage.getItem('todoListItem')) || [{
  name: 'Good Morning',
  date: '2025-01-01',
  checked: false
}];

renderTodo();

function renderTodo(){
  let htmlList = '';
  todoListItem.forEach((todoObject,index) => {
    const {name,date,checked} = todoObject;
    let html = `
    <div><button class="name">${name}</button></div>
    <div><button class="date">${date}</button></div>
    <button 
      onclick="deleteConfirmation();"
      class="js-delete-button delete"
    >Delete</button>
    <input type="Checkbox" class="js-check check" id="${index}" ${checked ? 'checked' : ''}>	
    `;
    htmlList += html;
  });

  document.querySelector('.js-message-input').innerHTML = htmlList;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton,index) => {
      deleteButton.addEventListener('click', () => {
        document.querySelector('.js-delete-yes')
        todoListItem.splice(index,1);			
      });
    });
  
  document.querySelectorAll('.js-check')
    .forEach((checkButton,index) => {
      checkButton.addEventListener('change', (event) => {
        todoListItem[index].checked = checkButton.checked;
        saveToStorage();				
        if(checkButton.checked === true){
          alert('Congrats!!! Todo Completed...');
        }		
      });
    });
      
saveToStorage();	
}	

function addTodo(){
  const nameInput = document.querySelector('.js-todo');
  const name = nameInput.value;
	
	const dateInput = document.querySelector('.js-date');
	const date = dateInput.value;

  if(name === '' || date === ''){
    alert('Please Fill All Fields');
    return false;
  }

  todoListItem.push({name, date, checked: false});
	
	nameInput.value = "";
	dateInput.value = "";

  renderTodo();
	alert('Todo Added!!');
	saveToStorage();

  document.body.addEventListener('keydown',(event) => {
		if(todoListItem.name !== '' || todoListItem.date !== ''){
			if(event.key === 'Enter'){
				addTodo();
			}
		}
	});
}

function deleteConfirmation(){
  document.querySelector('.js-delete-confirm').innerHTML = `
		Are You sure want to delete?
		<button 
			onclick ="
				renderTodo();
				hideDeleteConfirmation();
				alert('Todo Deleted');
			"
			class=" js-delete-yes delete-yes">
			Yes
		</button>
		<button 
			onclick="hideDeleteConfirmation();"
			class="delete-no">
			No
		</button>`;	
}

function hideDeleteConfirmation(){
	document.querySelector('.js-delete-confirm').innerHTML = '';
}

function saveToStorage(){
	localStorage.setItem('todoListItem',JSON.stringify(todoListItem));
}