var tasksCount = 0

var addTaskButton = document.getElementById("add-task-button")

var removeTaskButtons = document.getElementsByClassName("remove-button")

var taskList = document.getElementById("task-list")


function getTaskName() {
    var taskName = document.getElementById("task-name").value
    return taskName
}

function getPriorityValue() {
    var priorityList = document.getElementById("priority")
    var priorityValue = priorityList.value
    return priorityValue
}

function getStatusValue() {
    var statusList = document.getElementById("status")
    var statusValue = statusList.value
    return statusValue
}

function getDate() {
    var date = document.getElementById("due-date").value
    return date
}

function getCategory() {
    var category = document.getElementById("category-input").value
    return category
}

function getDescription() {
    var description = document.getElementById("description-input").value
    return description
}

function addTask(taskName, priorityValue, statusValue, date, category, description) {
    taskList.innerHTML += `
<li id=task-${tasksCount}>
    <div class="the-task">
        <div class="task-inputs">
            <div id="short-inputs-div">
                <input type="text" name="task-input" id="task-name" value="${taskName}"
                    disabled="true" />

                <select name="" id="priority" disabled="true">
                    <option value="" disabled ${priorityValue == "" ? "selected" : ""}>Priority</option>
                    <option value="priority1" ${priorityValue == "priority1" ? "selected" : ""}>1 (low)</option>
                    <option value="priority2" ${priorityValue == "priority2" ? "selected" : ""}>2 (low-medium)</option>
                    <option value="priority3" ${priorityValue == "priority3" ? "selected" : ""}>3 (medium)</option>
                    <option value="priority4" ${priorityValue == "priority4" ? "selected" : ""}>4 (high-medium)</option>
                    <option value="priority5" ${priorityValue == "priority5" ? "selected" : ""}>5 (high)</option>
                </select>

                <select name="" id="status" disabled="true">
                    <option value="" disabled  ${statusValue == "" ? "selected" : ""}>Status</option>
                    <option value="status-todo"  ${statusValue == "status-todo" ? "selected" : ""}>TODO</option>
                    <option value="status-doing" ${statusValue == "status-doing" ? "selected" : ""}>DOING</option>
                    <option value="status1-done" ${statusValue == "status-done" ? "selected" : ""}>DONE</option>
                </select>

                <input type="date" id="due-date" disabled="true" value="${date}">

                <input type="text" name="category-input" id="category-input"
                    placeholder="Category (Home, Work...)" disabled="true" value="${category}"/>

            </div>
            <div id="description-input-div">
                <textarea name="" id="description" cols="92" rows="4" placeholder="The notes"
                    disabled="true">${description}</textarea>
            </div>
        </div>
        <div class="actions">
            <button class="edit-button" id="edit-${tasksCount}">Edit</button>
            <button class="remove-button" id="remove-${tasksCount}">Remove</button>
        </div>
    </div>
</li>
`
    tasksCount++
}

addTaskButton.onclick = function () {
    var taskName = getTaskName()
    var priorityValue = getPriorityValue()
    var statusValue = getStatusValue()
    var date = getDate()
    var category = getCategory()
    var description = getDescription()
    addTask(taskName, priorityValue, statusValue, date, category, description)
}

function generateRemoveTaskOnClick() {
    for (let button of removeTaskButtons) {
        button.onclick = function () {
            var removeId = button.id
            var taskId = removeId.replace("remove", "task")
            var taskToRemove = document.getElementById(taskId)
            taskToRemove.parentNode.removeChild(taskToRemove)
        }
    }
}

document.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
        generateRemoveTaskOnClick()
        console.log("teste");
    }
})