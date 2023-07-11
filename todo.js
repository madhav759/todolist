// align the array for count
const tasks = [];
// Here we have called the all the required id
const addData = document.getElementById('task');
const counter = document.getElementById('task-counter');
const list = document.getElementById('list');
const showIcon = document.getElementById('circle-plus');

// function for add the task
function addTaskDom(){
    const text = addData.value.trim();

    // if input was empty
    if(!text){
        alert('Task cannot be empty');
        return;
    }

    // here create a li tag
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);

    // here we have push the text for count and show the count
    tasks.push('text');
    counter.textContent = tasks.length;

    // here we have created span tag for show the delete icon
    const span = document.createElement('span');
    span.innerHTML = '&#10683;';
    li.appendChild(span);

    // here the function which will hide the circle plus icon

    showIcon.style.visibility = 'hidden';
    addData.value = '';

    // here we have call the save data function
    saveData();
}

// here the function for checked item and delete the data checked item
function toggleTask(e){
    if(e.target.tagName == 'LI'){
        e.target.classList.toggle('checked');
        saveData();
    }else if(e.target.tagName == 'SPAN'){
        const parentLi = e.target.parentElement;
        if(parentLi.classList.contains('checked')){
            parentLi.remove();
            const removeTask = parentLi.textContent;
            tasks.splice(tasks.indexOf(removeTask), 1);
            counter.textContent = tasks.length;
            alert('Task is completed successfully');
            saveData();
        }
    }
}

// here the function which will show the plus icon when user add the task
function showIconVisibility(){
    showIcon.style.visibility = addData.value ? 'visible' : 'hidden';
}



// here the function for save the todo data after close or refresh the tab
function saveData(){
    localStorage.setItem('tasks', list.innerHTML);
    localStorage.setItem('count', counter.textContent);
}

// here save the data beforeunload the tab
window.addEventListener('beforeunload', () =>{
    saveData();
})
// here the function for show the real count after close or refresh the tab.
function loadData(){
    list.innerHTML = localStorage.getItem('tasks') || '';

    tasks.length = 0;
    tasks.push(...Array.from(list.children).map(li => li.textContent.trim()));
    counter.textContent = tasks.length;
}

function loadCount(){
    counter.textContent = localStorage.getItem('count') || '0';
}


addData.addEventListener('input', showIconVisibility);

addData.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        addTaskDom();
    }
});
list.addEventListener('click', toggleTask);

document.addEventListener('DOMContentLoaded', ()=>{
    loadData();
    loadCount();
});
