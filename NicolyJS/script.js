
let tasks = [];


const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const dueDateInput = document.getElementById('dueDate');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const filterBtn = document.getElementById('filterBtn');


function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    
    filteredTasks.sort((a, b) => {
        if (a.priority === 'alta' && b.priority !== 'alta') return -1;
        if (a.priority !== 'alta' && b.priority === 'alta') return 1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add(task.status ? 'concluida' : '', task.urgente ? 'urgente' : '');

        taskItem.innerHTML = `
            <input type="checkbox" ${task.status ? 'checked' : ''} onclick="toggleTaskStatus(${index})">
            <span>${task.name}</span>
            <span> - ${task.dueDate}</span>
            <span> - Prioridade: ${task.priority}</span>
            <button class="edit-btn" onclick="editTask(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Excluir</button>
        `;
        taskList.appendChild(taskItem);
    });
}


taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskName && dueDate) {
        const task = {
            name: taskName,
            dueDate: dueDate,
            priority: priority,
            status: false, 
            urgente: new Date(dueDate) <= new Date(), 
        };

        tasks.push(task);
        renderTasks();
        
        
        taskNameInput.value = '';
        dueDateInput.value = '';
    }
});


function toggleTaskStatus(index) {
    tasks[index].status = !tasks[index].status;
    renderTasks();
}


function editTask(index) {
    const task = tasks[index];
    taskNameInput.value = task.name;
    dueDateInput.value = task.dueDate;
    prioritySelect.value = task.priority;

    tasks.splice(index, 1); 
    renderTasks(); 
}


function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


let showCompleted = true;
filterBtn.addEventListener('click', function() {
    showCompleted = !showCompleted;
    filterBtn.textContent = showCompleted ? 'Mostrar Pendentes' : 'Mostrar Concluídas';
    const filteredTasks = showCompleted ? tasks.filter(task => task.status) : tasks.filter(task => !task.status);
    renderTasks(filteredTasks);
});


renderTasks();
