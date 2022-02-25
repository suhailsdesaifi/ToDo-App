// form open and close code
function openForm() {
    document.getElementById('popUpForm').style.display = "block";
}
function closeForm() {
    document.getElementById('popUpForm').style.display = "none";
}
// end



let myForm = document.getElementById('myForm');
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById('dateInput');
let taskInput = document.getElementById('taskInput');
let msg = document.getElementById('msg');
let todoTasks = document.getElementById('todoTasks');

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    formValidation()
})

let formValidation = () => {
    if(titleInput.value == "") {
        msg.innerHTML = "Task cannot be blank!";
    }
    else {
        msg.innerHTML = "";
        document.getElementById('popUpForm').style.display = "none";
        acceptData()
    }
}

let data = []

let acceptData = () => {
    data.push({
        title: titleInput.value,
        date: dateInput.value,
        task: taskInput.value,
    })

    localStorage.setItem("data", JSON.stringify(data));

    console.log( data );
    createTasks()
}


let createTasks = () => {
    todoTasks.innerHTML = "";
      data.map((x, y) => {
      return (todoTasks.innerHTML += `
    <div class="taskCard" id="${y}">
		<div id="heading">
			<h3 id="taskTitle">${x.title}</h3>
			<div id="actions">
				<i onclick="editTask(this)" title="Edit the task" class="fa-solid fa-pen"></i>
				<i onclick="deleteTask(this)" title="Delete the task" class="fa-solid fa-trash"></i>
			</div>
		</div>
		<p id="taskText">${x.task}</p>
		<p id="taskDate">${x.date}</p>
	</div>
    `);
    })
    
    resetForm()
}


let deleteTask = (e) => {
    let confirmation = confirm('Are you Sure!')
    if(confirmation) {
       e.parentElement.parentElement.parentElement.remove();
       data.splice(e.parentElement.parentElement.parentElement.id, 1);
       localStorage.setItem("data", JSON.stringify(data));
       console.log(data);
    } else {
        console.log( 'no' );
        return;
    }
  }

let editTask = (e) => {
    document.getElementById('popUpForm').style.display = "block";
    e.parentElement.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));

    let selectedTask =  e.parentElement.parentElement.parentElement
    let selectedTitle = e.parentElement.parentElement

    titleInput.value = selectedTitle.children[0].innerHTML
    taskInput.value = selectedTask.children[1].innerHTML
    dateInput.value = selectedTask.children[2].innerHTML
}


let resetForm = () => {
    titleInput.value = "";
    dateInput.value = "";
    taskInput.value = "";
}


(() => {
    data = JSON.parse(localStorage.getItem("data"));
    createTasks();
    console.log(data);
})();