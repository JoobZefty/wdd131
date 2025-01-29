function newTask() {
    // get the list element
    const listElement = document.querySelector('#todoList');
    // get the value entered into the #todo input
    const task = document.querySelector('#todo').value;
    // render out the list
    listElement.innerHTML += `
    <li> ${task}
    <div>
    <span data-function="delete">❎</span>
    <span data-function="complete">✅</span>
    </div>
    </li>`;
    }
    
    function manageTasks(e) {
    // did they click the delete or complete icon?
    const parent = e.target.closest("li");
    if (e.target.getAttribute('data-function') === "delete") {
    parent.remove();
    }
    if (e.target.getAttribute('data-function') === "complete") {
    parent.classList.toggle('strike');
    }
    }
    let btn = document.querySelector('#submitTask');
    btn.addEventListener('click', newTask);

    document.querySelector('#todoList').addEventListener('click', manageTasks);

