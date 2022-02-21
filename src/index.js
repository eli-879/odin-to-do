import Task from "./modules/task";
import Project from "./modules/project";
import ProjectStorage from "./modules/projectStorage";
let projectStorage = new ProjectStorage();

class UI {
    constructor() {
        this.formPages = [];
        this.currentEdit = "";
        this.idCounter = 2;
    }

    loadPage() {
        document.getElementById("content").classList.toggle("active");
        this.addElementToParent(this.createNewForm(), document.body);
        this.addElementToParent(this.createEditPage(), document.body);
        
        this.addToDocumentContent(this.createNav());
        this.addToDocumentContent(this.createBodyElements());
        
        let defaultProject = this.newProject("Today's Tasks", 0);
        let defaultTask1 = this.newTask("washing", "wash the clothes", "tomorrow", "high");
        defaultProject.addTask(defaultTask1);
        this.addToProjectStorage(defaultProject);

        let defaultProject2 = this.newProject("Today's Tasks 2", 1);
        this.addToProjectStorage(defaultProject2);
        
        this.renderAllProjects();
        this.initProjectButtons();
        this.initFormElements();
        
        document.querySelectorAll(".sidebar-wrapper")[0].firstChild.click();
    }

    createNewForm() {
        const form = this.createFormDomElements();
        return form;
    }

    createFormDomElements() {
        const container = document.createElement("div");
        container.id ="form-overlay";

        const form = document.createElement("div");
        form.classList.add("new-item-form");
        //container.classList.toggle("active");
        form.id = "form";
                
        const header = document.createElement("div");
        header.classList.add("form-header");
        header.innerText = "Add A...";
        form.appendChild(header);

        const body = document.createElement("div");
        body.classList.add("form-body");

        const sidebar = document.createElement("div");
        sidebar.classList.add("form-sidebar");
        sidebar.appendChild(this.createFormSidebarElements());
        body.appendChild(sidebar);

        const infoArea = document.createElement("div");
        infoArea.classList.add("form-infoarea");
        //this.formPages.push(this.createFormBodyElementsTask());
        //this.formPages.push(this.createFormBodyElementsProject());
        infoArea.appendChild(this.createFormBodyElementsTask());
        infoArea.appendChild(this.createFormBodyElementsProject());
        infoArea.firstChild.classList.toggle("active");

        body.appendChild(infoArea);
        
        form.appendChild(body);

        const button = document.createElement("button");
        button.classList.add("close-form");
        button.innerText = "Close";
        button.addEventListener("click", () => {
            this.toggleOverlay("content");
            
        });
        form.appendChild(button);

        container.appendChild(form);

        return container;
    }

    createFormSidebarElements() {
        const container = document.createElement("div");
        container.classList.add("form-sidebar-container");

        const taskButton = document.createElement("div");
        taskButton.classList.add("form-sidebar-selector");
        taskButton.classList.toggle("active");
        taskButton.setAttribute("id", "task");
        taskButton.innerText = "Task";
        container.appendChild(taskButton);

        const projectButton = document.createElement("div");
        projectButton.classList.add("form-sidebar-selector");
        projectButton.setAttribute("id", "project");
        projectButton.innerText = "Project";
        container.appendChild(projectButton);

        return container;
    }

    createFormBodyElementsTask() {
        const wrapper = document.createElement("form");
        wrapper.classList.add("form-body-wrapper");
        wrapper.setAttribute("onsubmit", "return false");
        wrapper.setAttribute("id", "task-wrapper");

        // for todo title
        const titleArea = document.createElement("textarea");
        titleArea.classList.add("form-textarea-title");
        titleArea.placeholder = "Enter Task Here";
        titleArea.classList.add("textarea-nonresize");
        titleArea.required = true;
        titleArea.maxLength = "30";
        wrapper.appendChild(titleArea);

        // for todo description
        const descArea = document.createElement("textarea");
        descArea.classList.add("form-textarea-desc");
        descArea.placeholder = "Enter Task description here";
        descArea.classList.add("textarea-nonresize");
        
        wrapper.appendChild(descArea);

        // for todo due date
        const dateArea = document.createElement("div");
        dateArea.classList.add("form-textarea-date");
        const dateText = document.createElement("div");
        dateText.classList.add("form-textarea-datetext");
        dateText.innerText = "Due Date: ";
        dateArea.appendChild(dateText);
        const dateCalendar = document.createElement("input");
        dateCalendar.classList.add("form-textarea-datecalendar");
        dateCalendar.type = "date";
        dateCalendar.required = true;
        dateArea.appendChild(dateCalendar);
        wrapper.appendChild(dateArea);

        //for todo priority
        const priorityArea = document.createElement("div");
        priorityArea.classList.add("form-textarea-priority");

        const priorityLow = document.createElement("input");
        priorityLow.classList.add("form-textarea-priority-indicator");
        //priorityLow.classList.add("low");
        priorityLow.setAttribute("id", "priorityLow");
        priorityLow.type = "radio";
        priorityLow.value = "low";
        priorityLow.required = true;
        priorityLow.setAttribute("name", "create-priority");

        const priorityLowLabel = document.createElement("label");
        priorityLowLabel.setAttribute("for", "priorityLow");
        priorityLowLabel.classList.add("form-textarea-label");
        priorityLowLabel.classList.add("priority-button");
        priorityLowLabel.classList.add("low");
        priorityLowLabel.value = "low";
        priorityLowLabel.innerText = "LOW";

        const priorityMedium = document.createElement("input");
        priorityMedium.classList.add("form-textarea-priority-indicator");
        //priorityMedium.classList.add("medium");
        priorityMedium.setAttribute("id", "priorityMedium");
        priorityMedium.type = "radio";
        priorityMedium.value = "medium";
        priorityMedium.required = true;
        priorityMedium.setAttribute("name", "create-priority");

        const priorityMediumLabel = document.createElement("label");
        priorityMediumLabel.setAttribute("for", "priorityMedium");
        priorityMediumLabel.classList.add("form-textarea-label");
        priorityMediumLabel.classList.add("priority-button");
        priorityMediumLabel.classList.add("medium");
        priorityMediumLabel.value = "medium";
        priorityMediumLabel.innerText = "MEDIUM";

        const priorityHigh = document.createElement("input");
        priorityHigh.classList.add("form-textarea-priority-indicator");
        //priorityHigh.classList.add("high");
        priorityHigh.setAttribute("id", "priorityHigh");
        priorityHigh.type = "radio";
        priorityHigh.value = "high";
        priorityHigh.required = true;
        priorityHigh.setAttribute("name", "create-priority");

        const priorityHighLabel = document.createElement("label");
        priorityHighLabel.setAttribute("for", "priorityHigh");
        priorityHighLabel.classList.add("form-textarea-label");
        priorityHighLabel.classList.add("priority-button");
        priorityHighLabel.classList.add("high")
        priorityHighLabel.value = "high";
        priorityHighLabel.innerText = "HIGH";

        priorityArea.appendChild(priorityLow);
        priorityArea.appendChild(priorityLowLabel);
        priorityArea.appendChild(priorityMedium);
        priorityArea.appendChild(priorityMediumLabel);
        priorityArea.appendChild(priorityHigh);
        priorityArea.appendChild(priorityHighLabel);

        wrapper.appendChild(priorityArea);

        // for submit button
        const confirmButton = document.createElement("input");
        confirmButton.classList.add("form-submit-task");
        confirmButton.type = "submit";
        confirmButton.value = "Confirm";
        confirmButton.setAttribute("id", "task");

        wrapper.appendChild(confirmButton);

        return wrapper;
    }

    createFormBodyElementsProject() {
        const wrapper = document.createElement("form");
        wrapper.classList.add("form-body-wrapper");
        wrapper.setAttribute("onsubmit", "return false");
        wrapper.setAttribute("id", "project-wrapper");

        const textarea = document.createElement("textarea");
        textarea.classList.add("form-textarea-title");
        textarea.classList.add("textarea-nonresize");
        textarea.classList.add("project-textarea");
        textarea.placeholder = "Enter Name of Project Here";
        textarea.required = true;
        textarea.maxLength = "30";
        wrapper.appendChild(textarea);

        const confirmButton = document.createElement("input");
        confirmButton.classList.add("form-submit-project");
        confirmButton.type = "submit";
        confirmButton.value = "Confirm";
        confirmButton.setAttribute("id", "project");

        wrapper.appendChild(confirmButton);

        return wrapper;
    }

    initFormElements() {
        this.initFormSidebarElements();
        this.initFormBodyElementsTask();
        this.initFormBodyElementsProject();
        
    }

    initFormBodyElementsTask() {
        const form = document.getElementById("task-wrapper");
        const boundHandleTaskCreation = this.handleTaskCreation.bind(this);
        form.addEventListener("submit", boundHandleTaskCreation);

        const priorityButtons = document.querySelectorAll(".form-textarea-label");
        console.log(priorityButtons);
        Array.from(priorityButtons).forEach(element => {
            
            element.addEventListener("click", this.handlePriorityChange);
        });
    }

    initFormBodyElementsProject() {
        const form = document.getElementById("project-wrapper");
        console.log(form);

        const boundHandleProjectCreation = this.handleProjectCreation.bind(this);
        form.addEventListener("submit", boundHandleProjectCreation);
    }

    initFormSidebarElements() {
        
        const selectors = document.querySelectorAll(".form-sidebar-selector");
        console.log(selectors);
        
        const boundHandleChangeFormSelector = this.handleChangeFormSelector.bind(this);
        selectors.forEach(element => {
            element.addEventListener("click", boundHandleChangeFormSelector);
        });
    }

    handlePriorityChange(e) {
        const priorityButtons = document.querySelectorAll(".priority-button");
        Array.from(priorityButtons).forEach(element => {
            element.classList.remove("active");
        });

        const target = e.target;
        target.classList.toggle("active");
    }

    handleChangeFormSelector(e) {
        // setting selector active
        const selectors = document.querySelectorAll(".form-sidebar-selector");
        console.log(selectors);
        Array.from(selectors).forEach(element => {
            element.classList.remove("active"); 
        });

        const target = e.target;
        target.classList.toggle("active");

        // wipe and redraw 
        //const formBody = document.querySelector(".form-infoarea");
        //this.clearElementChildren(formBody);

        //console.log(this.formPages);

        const taskBody = document.getElementById("task-wrapper");
        const projectBody = document.getElementById("project-wrapper");

        taskBody.classList.remove("active");
        projectBody.classList.remove("active");
        
        if (target.getAttribute("id") === "task") {
            taskBody.classList.toggle("active");
        }
        else if (target.getAttribute("id") === "project") {
            projectBody.classList.toggle("active");
        }
    }

    handleTaskCreation(e) {
        const title = document.querySelector(".form-textarea-title").value;
        const desc = document.querySelector(".form-textarea-desc").value;
        const dueDate = document.querySelector(".form-textarea-datecalendar").value;
        const priority = document.getElementsByClassName("form-textarea-label active")[0].value;

        const newTask = new Task(title, desc, dueDate, priority);

        // finds ID of current project open and adds task to project
        const activeProjectID = Array.from(document.getElementsByClassName("project-tag active"))[0].getAttribute("id");
        projectStorage.getProjectList()[activeProjectID].addTask(newTask);
        
        // creates a new DOM element with contents from project ID just selected
        // and adds it to body
        const taskListElement = this.createAllTaskListElement(activeProjectID);
        const taskArea = document.querySelector(".task-area-body");
        this.clearElementChildren(taskArea);
        this.addElementToParent(taskListElement, taskArea);
        
        this.resetFormValues();
        this.toggleOverlay("content");
    }

    handleProjectCreation(e) {
        const title = document.querySelector(".project-textarea").value;

        const newProject = new Project(title, this.idCounter);
        this.idCounter++;
        projectStorage.addProject(newProject);

        const sidebarBody = document.querySelector(".sidebar-body");
        this.clearElementChildren(sidebarBody);
        console.log(projectStorage.getProjectList());
        this.renderAllProjects();
        this.initProjectButtons();

        this.resetFormValues();
        this.toggleOverlay("content");

    }

    resetFormValues() {
        // reset textarea
        const textareas = document.querySelectorAll(".textarea-nonresize");
        Array.from(textareas).forEach(element => element.value = "");
        //reset date
        const dueDateElement = document.querySelector(".form-textarea-datecalendar");
        dueDateElement.value = "";
        // reset priority
        const priorityElements = document.querySelectorAll(".form-textarea-label");
        console.log(priorityElements);
        Array.from(priorityElements).forEach(element => {element.classList.remove("active")});

        const priorityInputs = document.querySelectorAll(".form-textarea-priority-indicator");
        Array.from(priorityInputs).forEach(element => {
            element.checked = false;
        });

        // reset which tab open
        const taskBody = document.getElementById("task-wrapper");
        const projectBody = document.getElementById("project-wrapper");
        taskBody.classList.remove("active");
        projectBody.classList.remove("active");
        taskBody.classList.toggle("active");

        //reset tab selector
        const selectors = document.querySelectorAll(".form-sidebar-selector");
        Array.from(selectors).forEach(element => {
            element.classList.remove("active");
        })
        Array.from(selectors)[0].classList.toggle("active");
        //console.log(projectStorage.getProjectList()[activeProject]);
        
    }

    resetEditPageValues() {
        // reset textarea
        const textareas = document.querySelectorAll(".textarea-nonresize");
        Array.from(textareas).forEach(element => element.value = "");

        const dueDateElement = document.querySelector(".edit-textarea-datecalendar");
        dueDateElement.value = "";
        // reset priority
        const priorityElements = document.querySelectorAll(".edit-textarea-label");
        console.log(priorityElements);
        Array.from(priorityElements).forEach(element => {element.classList.remove("active")});

        const priorityInputs = document.querySelectorAll(".edit-textarea-priority-indicator");
        Array.from(priorityInputs).forEach(element => {
            element.checked = false;
        });
    }

    createNav() {
        const header = document.createElement("nav");
        header.classList.add("navbar");
    
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerText = "What I Gotta Do?";
        header.appendChild(title);
    
        return header;
    }

    createBodyElements() {
        const container = document.createElement("div");
        container.classList.add("container");
    
        const sidebar = this.createBodySideBar();
        container.appendChild(sidebar);
    
        const taskArea = this.createBodyTaskArea();
        container.appendChild(taskArea);
    
        return container;
    }

    createBodySideBar() {
        const sidebar = document.createElement("div");
        sidebar.classList.add("sidebar");
    
        const sidebarTitle = document.createElement("div");
        sidebarTitle.classList.add("sidebar-title");
        sidebarTitle.innerText = "Projects";
        sidebar.appendChild(sidebarTitle);

        const sidebarBody = document.createElement("div");
        sidebarBody.classList.add("sidebar-body");
        sidebar.appendChild(sidebarBody);

        const sidebarAddProjectButton = document.createElement("button");
        sidebarAddProjectButton.classList.add("sidebar-button");
        sidebarAddProjectButton.innerText = "Add Project +";
        sidebar.appendChild(sidebarAddProjectButton);
    
        return sidebar;
    }

    createBodyTaskArea() {
        const taskArea = document.createElement("div");
        taskArea.classList.add("task-area");
        
        const taskAreaTitle = document.createElement("div");
        taskAreaTitle.classList.add("task-area-title");
        taskAreaTitle.innerText = "Tasks";
        taskArea.appendChild(taskAreaTitle);

        const taskAreaBody = document.createElement("div");
        taskAreaBody.classList.add("task-area-body");
        taskArea.appendChild(taskAreaBody);
    
        return taskArea;
    }

    createProjectElement(project) {
        const name = project.getName();
        const wrapper = document.createElement("div");
        wrapper.classList.add("sidebar-wrapper");

        const tag = document.createElement("div");
        tag.classList.add("project-tag");
        tag.innerText = name;
        tag.setAttribute("id", project.getID());
        wrapper.appendChild(tag);

        if (project.getID() > 1) {
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-project");
            deleteButton.innerText = "X";
            wrapper.appendChild(deleteButton);
        }
        
        return wrapper;
    }

    createAllTaskListElement(id) {
        // get project from projectStorage
        const project = projectStorage.getProjectList().find(element => element.getID() == id);
        
        //container for all tasks
        const container = document.createElement("div");
        container.classList.add("project-container");

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("task-container-title");
        projectTitle.innerText = project.getName();
        container.appendChild(projectTitle);

        const tasksContainer = document.createElement("div");
        tasksContainer.classList.add("tasklist-container")

        // for each task create its own div element and add it to container
        const taskList = project.getTaskList();
        taskList.forEach(element => {
            const taskContainer = this.createTaskDivElement(element);
            tasksContainer.appendChild(taskContainer);
        });

        container.appendChild(tasksContainer);

        return container;
    }

    createTaskDivElement(task) {
        const container = document.createElement("div");
        container.classList.add("task-container-task");

        if (task.getPriority() === "high") container.classList.add("priority-high");
        else if (task.getPriority() === "medium") container.classList.add("priority-medium");
        else if (task.getPriority() === "low") container.classList.add("priority-low");

        const taskCompleteBox = document.createElement("input");
        taskCompleteBox.type = "checkbox";
        taskCompleteBox.classList.add("task-container-checkbox");

        const taskName = document.createElement("div");
        taskName.classList.add("task-container-name");
        taskName.innerText = task.getName();

        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-container-details");
        taskDetails.innerText = "DETAILS";

        const taskDueDate = document.createElement("div");
        taskDueDate.classList.add("task-container-duedate");
        taskDueDate.innerText = task.getDueDate();

        const taskEditWrap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        taskEditWrap.classList.add("task-container-edit");
        taskEditWrap.setAttributeNS(null, "viewBox", "0 0 117.74 122.88");

        const taskEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
        taskEdit.setAttributeNS(null, "d", "M94.62,2c-1.46-1.36-3.14-2.09-5.02-1.99c-1.88,0-3.56,0.73-4.92,2.2L73.59,13.72l31.07,30.03l11.19-11.72 c1.36-1.36,1.88-3.14,1.88-5.02s-0.73-3.66-2.09-4.92L94.62,2L94.62,2L94.62,2z M41.44,109.58c-4.08,1.36-8.26,2.62-12.35,3.98 c-4.08,1.36-8.16,2.72-12.35,4.08c-9.73,3.14-15.07,4.92-16.22,5.23c-1.15,0.31-0.42-4.18,1.99-13.6l7.74-29.61l0.64-0.66 l30.56,30.56L41.44,109.58L41.44,109.58L41.44,109.58z M22.2,67.25l42.99-44.82l31.07,29.92L52.75,97.8L22.2,67.25L22.2,67.25z");
        taskEdit.style.stroke = "#000";
        taskEdit.style.strokeWidth = "4px";
        taskEditWrap.appendChild(taskEdit);

        const taskDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        taskDelete.innerHTML += '<path d="M0 281.296l0 -68.355q1.953 -37.107 29.295 -62.496t64.449 -25.389l93.744 0l0 -31.248q0 -39.06 27.342 -66.402t66.402 -27.342l312.48 0q39.06 0 66.402 27.342t27.342 66.402l0 31.248l93.744 0q37.107 0 64.449 25.389t29.295 62.496l0 68.355q0 25.389 -18.553 43.943t-43.943 18.553l0 531.216q0 52.731 -36.13 88.862t-88.862 36.13l-499.968 0q-52.731 0 -88.862 -36.13t-36.13 -88.862l0 -531.216q-25.389 0 -43.943 -18.553t-18.553 -43.943zm62.496 0l749.952 0l0 -62.496q0 -13.671 -8.789 -22.46t-22.46 -8.789l-687.456 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 62.496zm62.496 593.712q0 25.389 18.553 43.943t43.943 18.553l499.968 0q25.389 0 43.943 -18.553t18.553 -43.943l0 -531.216l-624.96 0l0 531.216zm62.496 -31.248l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm31.248 -718.704l374.976 0l0 -31.248q0 -13.671 -8.789 -22.46t-22.46 -8.789l-312.48 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 31.248zm124.992 718.704l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm156.24 0l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224z"/>';
        taskDelete.classList.add("task-container-delete");
        taskDelete.setAttributeNS(null, "viewBox", "0 0 900 875");

        this.initTaskListButtons(taskDelete, taskEditWrap);

        container.appendChild(taskCompleteBox);
        container.appendChild(taskName);
        container.appendChild(taskDetails);
        container.appendChild(taskDueDate);
        container.appendChild(taskEditWrap);
        container.appendChild(taskDelete);

        return container;
    }

    createEditPage() {
        const container = document.createElement("div");
        container.id ="edit-overlay";

        const editPage = document.createElement("div");
        editPage.classList.add("edit-page");
        editPage.id = "edit-page";
                
        const header = document.createElement("div");
        header.classList.add("edit-header");
        header.innerText = "Edit";
        editPage.appendChild(header);

        const body = document.createElement("div");
        body.classList.add("edit-body");

        const infoArea = document.createElement("div");
        infoArea.classList.add("edit-infoarea");
        infoArea.appendChild(this.createEditBodyElements());
        infoArea.firstChild.classList.toggle("active");

        body.appendChild(infoArea);
        
        editPage.appendChild(body);

        const button = document.createElement("button");
        button.classList.add("close-edit");
        button.innerText = "Close";
        button.addEventListener("click", () => {
            this.toggleOverlay("content");

            
        });
        editPage.appendChild(button);

        container.appendChild(editPage);

        return container;
    }

    createEditBodyElements() {
        const wrapper = document.createElement("form");
        wrapper.classList.add("edit-body-wrapper");
        wrapper.setAttribute("onsubmit", "return false");
        wrapper.setAttribute("id", "edit-wrapper");

        // for todo title
        const titleArea = document.createElement("textarea");
        titleArea.classList.add("edit-textarea-title");
        titleArea.placeholder = "Enter Task Here";
        titleArea.classList.add("textarea-nonresize");
        titleArea.required = true;
        titleArea.maxLength = "30";
        wrapper.appendChild(titleArea);

        // for todo description
        const descArea = document.createElement("textarea");
        descArea.classList.add("edit-textarea-desc");
        descArea.placeholder = "Enter Task description here";
        descArea.classList.add("textarea-nonresize");
        
        wrapper.appendChild(descArea);

        // for todo due date
        const dateArea = document.createElement("div");
        dateArea.classList.add("edit-textarea-date");
        const dateText = document.createElement("div");
        dateText.classList.add("edit-textarea-datetext");
        dateText.innerText = "Due Date: ";
        dateArea.appendChild(dateText);
        const dateCalendar = document.createElement("input");
        dateCalendar.classList.add("edit-textarea-datecalendar");
        dateCalendar.type = "date";
        dateCalendar.required = true;
        dateArea.appendChild(dateCalendar);
        wrapper.appendChild(dateArea);

        //for todo priority
        const priorityArea = document.createElement("div");
        priorityArea.classList.add("edit-textarea-priority");

        const priorityLow = document.createElement("input");
        priorityLow.classList.add("edit-textarea-priority-indicator");
        //priorityLow.classList.add("low");
        priorityLow.setAttribute("id", "priorityLowEdit");
        priorityLow.type = "radio";
        priorityLow.value = "low";
        priorityLow.required = true;
        priorityLow.setAttribute("name", "create-priority");

        const priorityLowLabel = document.createElement("label");
        priorityLowLabel.setAttribute("for", "priorityLowEdit");
        priorityLowLabel.classList.add("edit-textarea-label");
        priorityLowLabel.classList.add("priority-button");
        priorityLowLabel.classList.add("low");
        priorityLowLabel.value = "low";
        priorityLowLabel.innerText = "LOW";

        const priorityMedium = document.createElement("input");
        priorityMedium.classList.add("edit-textarea-priority-indicator");
        //priorityMedium.classList.add("medium");
        priorityMedium.setAttribute("id", "priorityMediumEdit");
        priorityMedium.type = "radio";
        priorityMedium.value = "medium";
        priorityMedium.required = true;
        priorityMedium.setAttribute("name", "create-priority");

        const priorityMediumLabel = document.createElement("label");
        priorityMediumLabel.setAttribute("for", "priorityMediumEdit");
        priorityMediumLabel.classList.add("edit-textarea-label");
        priorityMediumLabel.classList.add("priority-button");
        priorityMediumLabel.classList.add("medium");
        priorityMediumLabel.value = "medium";
        priorityMediumLabel.innerText = "MEDIUM";

        const priorityHigh = document.createElement("input");
        priorityHigh.classList.add("edit-textarea-priority-indicator");
        //priorityHigh.classList.add("high");
        priorityHigh.setAttribute("id", "priorityHighEdit");
        priorityHigh.type = "radio";
        priorityHigh.value = "high";
        priorityHigh.required = true;
        priorityHigh.setAttribute("name", "create-priority");

        const priorityHighLabel = document.createElement("label");
        priorityHighLabel.setAttribute("for", "priorityHighEdit");
        priorityHighLabel.classList.add("edit-textarea-label");
        priorityHighLabel.classList.add("priority-button");
        priorityHighLabel.classList.add("high")
        priorityHighLabel.value = "high";
        priorityHighLabel.innerText = "HIGH";

        priorityArea.appendChild(priorityLow);
        priorityArea.appendChild(priorityLowLabel);
        priorityArea.appendChild(priorityMedium);
        priorityArea.appendChild(priorityMediumLabel);
        priorityArea.appendChild(priorityHigh);
        priorityArea.appendChild(priorityHighLabel);

        wrapper.appendChild(priorityArea);

        // for submit button
        const confirmButton = document.createElement("input");
        confirmButton.classList.add("edit-submit-task");
        confirmButton.type = "submit";
        confirmButton.value = "Confirm";
        confirmButton.setAttribute("id", "task");

        wrapper.appendChild(confirmButton);

        return wrapper;
    }

    

    renderAllProjects() {
        const sidebarBody = document.querySelector(".sidebar-body");
        const projectList = projectStorage.getProjectList();
        projectList.forEach(element => {
            const projectElement = this.createProjectElement(element);
            this.addElementToParent(projectElement, sidebarBody);
        });
    }

    initProjectButtons() {
        const addProjectButton = document.querySelector(".sidebar-button");
        if (addProjectButton.getAttribute("listener") !== "true") {
            const boundHandleAddProject = this.handleAddProject.bind(this);
            addProjectButton.addEventListener("click", boundHandleAddProject);
            addProjectButton.setAttribute("listener", "true");
        }
        const projectButtons = document.querySelectorAll(".project-tag");
        const boundHandleProjectOpen = this.handleProjectOpen.bind(this);
        projectButtons.forEach(element => {
            element.addEventListener("click", boundHandleProjectOpen);
        });
        const deleteProjectButtons = document.querySelectorAll(".delete-project");
        const boundHandleDeleteProject = this.handleDeleteProject.bind(this);
        deleteProjectButtons.forEach(element => {
            element.addEventListener("click", boundHandleDeleteProject);
        })
    }

    initTaskListButtons(deleteElement, editElement) {
        this.initDeleteTaskButton(deleteElement);
        this.initEditTaskButton(editElement);
        this.initEditTaskPageElements();
    }

    initEditTaskButton(element) {
        const boundOpenEditTaskPage = this.handleOpenEditTaskPage.bind(this);
        element.addEventListener("click", (e) => {
            boundOpenEditTaskPage(e);
        });
    }

    initDeleteTaskButton(element) {
        element.addEventListener("click", this.handleDeleteTask);
        element.firstChild.addEventListener("click", this.handleDeleteTask);
    }

    initEditTaskPageElements() {
        // initialising priority switching labels        
        const priorityButtons = document.querySelectorAll(".edit-textarea-label");
        Array.from(priorityButtons).forEach(element => {
            element.addEventListener("click", this.handlePriorityChange);
        });

        // initialising form submissions
        const form = document.getElementById("edit-wrapper");
        const boundHandleEditTask = this.handleEditTask.bind(this);
        form.addEventListener("submit", boundHandleEditTask);

    }

    handleEditTask(e) {
        //get active project ID, then get task and edit it
        const activeProjectID = Array.from(document.getElementsByClassName("project-tag active"))[0].getAttribute("id");
        const activeProject = projectStorage.getProject(parseInt(activeProjectID));

        const taskListContainer = document.querySelector(".tasklist-container");

        // getting task index and then task       
        const taskIndex = Array.from(taskListContainer.children).indexOf(this.currentEdit);
        let task;
        if (taskIndex >= 0) task = activeProject.getTaskAt(taskIndex);
        console.log(taskIndex, task, this.currentEdit);   

        // get values from DOM elements
        const title = document.querySelector(".edit-textarea-title").value;
        const desc = document.querySelector(".edit-textarea-desc").value;
        const dueDate = document.querySelector(".edit-textarea-datecalendar").value;
        const priority = document.getElementsByClassName("edit-textarea-label active")[0].value;

        // update new task attributes
        task.setName(title);
        task.setDescription(desc);
        task.setDueDate(dueDate);
        task.setPriority(priority);

        // update task DOM elemeent
        const divChildren = Array.from(this.currentEdit.children);
        divChildren[1].innerText = title;
        //divChildren[2].innerText = desc;
        divChildren[3].innerText = dueDate;
        
        //update priority
        this.currentEdit.classList.remove(this.currentEdit.classList.item(1));
        switch (priority) {
            case ("low"):
                this.currentEdit.classList.toggle("priority-low");
            case ("medium"):
                this.currentEdit.classList.toggle("priority-medium");
            case ("high"):
                this.currentEdit.classList.toggle("priority-high");
        }

        this.toggleOverlay("content");
        this.resetEditPageValues();


    }   

    handleOpenEditTaskPage(e) {
        const editPage = document.getElementById("edit-overlay");
        this.toggleOverlay("edit");
        
        if (e.target.nodeName === "svg") this.currentEdit = e.target.parentElement;
        else if (e.target.nodeName === "path") this.currentEdit = e.target.parentElement.parentElement;
    }

    handleDeleteTask(e) {
        const target = e.target;
        const taskContainer = e.target.parentElement;

        // delete from project
        const projectID = document.getElementsByClassName("project-tag active")[0].getAttribute("id");
        const project = projectStorage.getProject(parseInt(projectID));

        const taskListContainer = document.querySelector(".tasklist-container");
        const taskIndex = Array.from(taskListContainer.children).indexOf(taskContainer);
        project.removeTaskAtIndex(taskIndex);

        console.log(project.getTaskList(), taskContainer, target);
        //delete DOM element
        
        taskContainer.remove();
    }
    
    handleDeleteProject(e) {
        const projectTag = e.target.parentElement.firstChild;
        const projectID = projectTag.getAttribute("id")
        
        if ((projectTag.classList.contains("active"))) {
            console.log(projectTag);
            const taskContainer = document.querySelector(".task-container");
            this.clearElementChildren(taskContainer);
        }

        const sidebarBody = document.querySelector(".sidebar-body");
        this.clearElementChildren(sidebarBody);
        
        projectStorage.removeProject(projectID);

        this.renderAllProjects();
        this.initProjectButtons();

        document.getElementById("0").click();
    }
    
    handleAddProject(e) {
        this.resetFormValues();
        this.toggleOverlay("form");

    }

    handleProjectOpen(e) {
        const taskArea = document.querySelector(".task-area-body");
        this.clearElementChildren(taskArea);

        const projectList = document.querySelectorAll(".project-tag");
        Array.from(projectList).forEach((element) => {  
            element.classList.remove("active"); 
        });
        
        const project = e.target;
        project.classList.toggle("active");

        const projectID = project.getAttribute("id");
        const taskListElement = this.createAllTaskListElement(projectID);
        this.addElementToParent(taskListElement, taskArea);
    }

    addElementToParent(element, parent) {
        parent.appendChild(element);
    }

    clearElementChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
    
    addToDocumentContent(item) {
        document.getElementById("content").appendChild(item);
    }

    newProject(name, id) {
        let project = new Project(name, id);
        return project;
    }

    newTask(name, description, dueDate, priority) {
        let task = new Task(name, description, dueDate, priority);
        return task;
    }
    
    addToProjectStorage(project) {
        projectStorage.addProject(project);
    }

    toggleOverlay(activeOverlay) {
        // remove active for each overlay
        const overlays = document.body.children;
        Array.from(overlays).forEach(element => {
            element.classList.remove("active");
        });

        switch (activeOverlay){
            case ("content"):
                document.getElementById("content").classList.toggle("active");
                break;
            case ("edit"):
                document.getElementById("edit-overlay").classList.toggle("active");
                break;
            case ("form"):
                document.getElementById("form-overlay").classList.toggle("active");
                break;
        }

    }

    setActive(elementList) {
        elementList.forEach((button) => {
            if (elementList !== this) {
                elementList.classList.remove("active");
            }
        });
        button.classList.add("active");
    }
}
const UIManager = new UI();

UIManager.loadPage();


