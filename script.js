function addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority');
    const dueDateInput = document.getElementById('due-date');
    const descriptionInput = document.getElementById('task-description');

    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const description = descriptionInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
        <div class="task-header">
            <span class="task-title">${taskText}</span>
            <span class="task-priority">Priority: ${priority}</span>
        </div>
        <div class="task-body">
            <p class="task-description">${description}</p>
            <p class="task-due-date">Due Date: ${dueDate}</p>
        </div>
        <div class="task-actions">
            <button onclick="editTask(this)">Edit</button>
            <button onclick="markTaskDone(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    taskList.appendChild(task);

    taskInput.value = '';
    prioritySelect.value = 'low';
    dueDateInput.value = '';
    descriptionInput.value = '';
}

function editTask(button) {
    const task = button.closest('.task');
    const taskTitle = task.querySelector('.task-title').textContent;
    const taskPriority = task.querySelector('.task-priority').textContent.replace('Priority: ', '');
    const taskDescription = task.querySelector('.task-description').textContent;
    const taskDueDate = task.querySelector('.task-due-date').textContent.replace('Due Date: ', '');

    task.innerHTML = `
        <div class="task-header">
            <input type="text" class="edit-task-title" value="${taskTitle}">
            <select class="edit-task-priority">
                <option value="low" ${taskPriority === 'Low' ? 'selected' : ''}>Low Priority</option>
                <option value="medium" ${taskPriority === 'Medium' ? 'selected' : ''}>Medium Priority</option>
                <option value="high" ${taskPriority === 'High' ? 'selected' : ''}>High Priority</option>
            </select>
        </div>
        <div class="task-body">
            <textarea class="edit-task-description">${taskDescription}</textarea>
            <input type="date" class="edit-task-due-date" value="${taskDueDate}">
        </div>
        <div class="task-actions">
            <button onclick="saveTaskChanges(this)">Save</button>
            <button onclick="cancelTaskEdit(this)">Cancel</button>
        </div>
    `;
}

function saveTaskChanges(button) {
    const task = button.closest('.task');
    const taskTitle = task.querySelector('.edit-task-title').value;
    const taskPriority = task.querySelector('.edit-task-priority').value;
    const taskDescription = task.querySelector('.edit-task-description').value;
    const taskDueDate = task.querySelector('.edit-task-due-date').value;

    task.innerHTML = `
        <div class="task-header">
            <span class="task-title">${taskTitle}</span>
            <span class="task-priority">Priority: ${taskPriority}</span>
        </div>
        <div class="task-body">
            <p class="task-description">${taskDescription}</p>
            <p class="task-due-date">Due Date: ${taskDueDate}</p>
        </div>
        <div class="task-actions">
            <button onclick="editTask(this)">Edit</button>
            <button onclick="markTaskDone(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
}

function cancelTaskEdit(button) {
    const task = button.closest('.task');
    const taskTitle = task.querySelector('.edit-task-title').value;
    const taskPriority = task.querySelector('.edit-task-priority').value;
    const taskDescription = task.querySelector('.edit-task-description').value;
    const taskDueDate = task.querySelector('.edit-task-due-date').value;

    task.innerHTML = `
        <div class="task-header">
            <span class="task-title">${taskTitle}</span>
            <span class="task-priority">Priority: ${taskPriority}</span>
        </div>
        <div class="task-body">
            <p class="task-description">${taskDescription}</p>
            <p class="task-due-date">Due Date: ${taskDueDate}</p>
        </div>
        <div class="task-actions">
            <button onclick="editTask(this)">Edit</button>
            <button onclick="markTaskDone(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
}

function markTaskDone(button) {
    const task = button.closest('.task');
    task.classList.toggle('completed');

    const taskHeader = task.querySelector('.task-header');
    if (task.classList.contains('completed')) {
        taskHeader.insertAdjacentHTML('beforeend', '<span class="completed-indicator">Completed</span>');
    } else {
        const completedIndicator = task.querySelector('.completed-indicator');
        if (completedIndicator) {
            completedIndicator.remove();
        }
    }
}

function deleteTask(button) {
    const task = button.closest('.task');
    task.remove();
}
