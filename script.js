var tasksCount = 0

var addTaskButton = document.getElementById("add-task-button")

var removeTaskButtons = document.getElementsByClassName("remove-button")

var taskList = document.getElementById("task-list")
// Populate taskList with local storage
var taskListInnerHTMLLocalStorage = localStorage.getItem("taskListInnerHTML")
if (taskListInnerHTMLLocalStorage) {
    taskList.innerHTML = taskListInnerHTMLLocalStorage
}

var editTaskButton = document.getElementsByClassName("edit-button")
var saveTaskButton = document.getElementsByClassName("save-button")

function getTaskName(id) {
    var taskName = document.getElementById(id).value
    return taskName
}

function getPriorityValue(id) {
    var priorityList = document.getElementById(id)
    var priorityValue = priorityList.value
    return priorityValue
}

function getStatusValue(id) {
    var statusList = document.getElementById(id)
    var statusValue = statusList.value
    return statusValue
}

function getDate(id) {
    var date = document.getElementById(id).value
    return date
}

function getCategory(id) {
    var category = document.getElementById(id).value
    return category
}

function getDescription(id) {
    var description = document.getElementById(id).value
    return description
}

function getListItemTemplate(taskName, priorityValue, statusValue, date, category, description) {
    var template = `
    <li id=task-${tasksCount}>
        <div class="the-task">
            <div class="task-inputs">
                <div id="short-inputs-div">
                    <input type="text" name="task-input" id="task-name-${tasksCount}" value="${taskName}"
                        disabled="true" />
    
                    <select name="" id="priority-${tasksCount}" disabled="true">
                        <option value="" disabled ${priorityValue == "" ? "selected" : ""}>Priority</option>
                        <option value="priority1" ${priorityValue == "priority1" ? "selected" : ""}>1 (low)</option>
                        <option value="priority2" ${priorityValue == "priority2" ? "selected" : ""}>2 (low-medium)</option>
                        <option value="priority3" ${priorityValue == "priority3" ? "selected" : ""}>3 (medium)</option>
                        <option value="priority4" ${priorityValue == "priority4" ? "selected" : ""}>4 (high-medium)</option>
                        <option value="priority5" ${priorityValue == "priority5" ? "selected" : ""}>5 (high)</option>
                    </select>
    
                    <select name="" id="status-${tasksCount}" disabled="true">
                        <option value="" disabled  ${statusValue == "" ? "selected" : ""}>Status</option>
                        <option value="status-todo"  ${statusValue == "status-todo" ? "selected" : ""}>TODO</option>
                        <option value="status-doing" ${statusValue == "status-doing" ? "selected" : ""}>DOING</option>
                        <option value="status1-done" ${statusValue == "status-done" ? "selected" : ""}>DONE</option>
                    </select>
    
                    <input type="date" id="due-date-${tasksCount}" disabled="true" value="${date}">
    
                    <input type="text" name="category-input" id="category-input-${tasksCount}"
                        placeholder="Category (Home, Work...)" disabled="true" value="${category}"/>
    
                </div>
                <div id="description-input-div">
                    <textarea name="" id="description-${tasksCount}" cols="92" rows="4" placeholder="The notes"
                        disabled="true">${description}</textarea>
                </div>
            </div>
            <div class="actions">
                <button class="edit-button" id="edit-${tasksCount}">Edit</button>
                <button class="save-button" id="save-${tasksCount}">Save</button>
                <button class="remove-button" id="remove-${tasksCount}">Remove</button>
            </div>
        </div>
    </li>
    `
    return template
}

function addTask(taskName, priorityValue, statusValue, date, category, description) {
    taskList.innerHTML += getListItemTemplate(taskName, priorityValue, statusValue, date, category, description)
    tasksCount++
}

addTaskButton.onclick = function () {
    var taskName = getTaskName("task-name")
    var priorityValue = getPriorityValue("priority")
    var statusValue = getStatusValue("status")
    var date = getDate("due-date")
    var category = getCategory("category-input")
    var description = getDescription("description-input")
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


function setEditModeOnClick() {
    for (let button of editTaskButton) {
        button.onclick = function () {
            var editId = button.id
            var id = editId.replace("edit-", "")
            var taskToEdit = document.getElementById("task-" + id)
            var saveButton = document.getElementById("save-" + id)
            saveButton.style.display = "block"
            button.style.display = "none"
            var innerHTML = taskToEdit.childNodes[1].innerHTML
            innerHTML = innerHTML.replaceAll('disabled="true"', '"disabled"')
            taskToEdit.childNodes[1].innerHTML = innerHTML
        }
    }
}

function setSaveModeOnClick() {
    for (let button of saveTaskButton) {
        button.onclick = function () {
            var saveId = button.id
            var id = saveId.replace("save-", "")
            var taskToSave = document.getElementById("task-" + id)
            var editButton = document.getElementById("edit-" + id)
            editButton.style.display = "block"
            button.style.display = "none"

            var taskName = getTaskName(`task-name-${id}`)
            var priorityValue = getPriorityValue(`priority-${id}`)
            var statusValue = getStatusValue(`status-${id}`)
            var date = getDate(`due-date-${id}`)
            var category = getCategory(`category-input-${id}`)
            var description = getDescription(`description-${id}`)

            var editListItemHTML = getListItemTemplate(taskName, priorityValue, statusValue, date, category, description)

            taskToSave.childNodes[1].innerHTML = editListItemHTML
        }
    }
}

document.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
        generateRemoveTaskOnClick()
        setEditModeOnClick()
        setSaveModeOnClick()
        localStorage.setItem("taskListInnerHTML", taskList.innerHTML)
    }
})
