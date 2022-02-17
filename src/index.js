import Task from "./modules/task";
import Project from "./modules/project";
import ProjectStorage from "./modules/projectStorage";
let projectStorage = new ProjectStorage();

class UI {
    constructor() {
        this.formPages = [];
        this.idCounter = 2;
    }

    loadPage() {
        this.addElementToParent(this.createNewForm(), document.body);
        
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
        this.formPages.push(this.createFormBodyElementsTask());
        this.formPages.push(this.createFormBodyElementsProject());
        infoArea.appendChild(this.formPages[0]);
        body.appendChild(infoArea);
        
        form.appendChild(body);

        const button = document.createElement("button");
        button.classList.add("close-form");
        button.innerText = "Close";
        button.addEventListener("click", () => {
            this.resetFormValues();
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

        // for todo title
        const titleArea = document.createElement("textarea");
        titleArea.classList.add("form-textarea-title");
        titleArea.placeholder = "Enter Task Here";
        titleArea.classList.add("textarea-nonresize");
        titleArea.required = true;
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
        const wrapper = document.createElement("div");
        wrapper.classList.add("form-body-wrapper");

        const textarea = document.createElement("textarea");
        textarea.classList.add("form-textarea-title");
        textarea.classList.add("textarea-nonresize");
        textarea.placeholder = "Enter Name of Project Here";
        wrapper.appendChild(textarea);

        const confirmButton = document.createElement("button");
        confirmButton.classList.add("form-submit-task");
        confirmButton.setAttribute("id", "project");
        confirmButton.innerText = "Confirm";

        wrapper.appendChild(confirmButton);

        return wrapper;
    }

    initFormElements() {
        this.initFormSidebarElements();
        this.initFormBodyElementsTask();
        
    }

    initFormBodyElementsTask() {
        const form = document.querySelector(".form-body-wrapper");
        const boundHandleTaskCreation = this.handleTaskCreation.bind(this);
        form.addEventListener("submit", boundHandleTaskCreation);

        const priorityButtons = document.querySelectorAll(".form-textarea-label");
        console.log(priorityButtons);
        Array.from(priorityButtons).forEach(element => {
            
            element.addEventListener("click", this.handlePriorityChange);
        });
    }

    initFormSidebarElements() {
        
        const selectors = document.querySelectorAll(".form-sidebar-selector");
        console.log(selectors);
        
        const boundHandleChangeFormSelector = this.handleChangeFormSelector.bind(this);
        selectors.forEach(element => {
            console.log(this);
            element.addEventListener("click", boundHandleChangeFormSelector);
        });
    }

    handlePriorityChange(e) {
        const priorityButtons = document.querySelectorAll(".form-textarea-label");
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
        const formBody = document.querySelector(".form-infoarea");
        this.clearElementChildren(formBody);

        //console.log(this.formPages);
        
        if (target.getAttribute("id") === "task") this.addElementToParent(this.formPages[0], formBody);
        else if (target.getAttribute("id") === "project") this.addElementToParent(this.formPages[1], formBody);
        
    }

    handleTaskCreation(e) {
        console.log("HI");
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
    }

    handleProjectCreation(e) {
        const title = document.querySelector(".form-textarea-title").value;

        const newProject = new Project(title, this.idCounter);
        this.idCounter++;
        projectStorage.addProject(newProject);

        const sidebarBody = document.querySelector(".sidebar-body");
        this.clearElementChildren(sidebarBody);

        this.renderAllProjects();
        this.initProjectButtons();

        this.toggleForm();
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

        //console.log(projectStorage.getProjectList()[activeProject]);
        this.toggleForm();
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

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-project");
        deleteButton.innerText = "X";
        wrapper.appendChild(deleteButton);
    
        return wrapper;
    }

    createAllTaskListElement(id) {
        // get project from projectStorage
        const project = projectStorage.getProjectList().find(element => element.getID() == id);
        
        //container for all tasks
        const container = document.createElement("div");
        container.classList.add("task-container");

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("task-container-title");
        projectTitle.innerText = project.getName();
        container.appendChild(projectTitle);

        // for each task create its own div element and add it to container
        const taskList = project.getTaskList();
        taskList.forEach(element => {
            const taskContainer = this.createTaskDivElement(element);
            container.appendChild(taskContainer);
        });

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
        taskDelete.innerHTML += '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M3694.7,4987.6c-222.9-59.6-411.1-220.9-520.7-440l-65.3-132.6l-5.8-380.4l-7.7-380.4H1848.4c-1189.2,0-1252.6-1.9-1319.9-36.5c-134.5-69.2-190.2-267.1-107.6-380.4c84.5-111.4,130.6-130.6,345.8-136.4c186.4-7.7,199.8-9.6,209.4-48c3.8-23.1,220.9-1640.7,480.3-3596.6c259.4-1953.9,478.4-3575.4,484.2-3602.3c5.8-26.9,40.3-105.7,76.9-176.8c109.5-209.4,307.4-368.9,534.1-426.5c99.9-26.9,399.6-30.7,2449.6-30.7c2551.4,0,2457.3-3.8,2651.3,109.5c219,128.7,384.2,366.9,422.7,611c9.6,63.4,224.8,1681.1,480.3,3592.7c253.6,1913.6,464.9,3496.7,470.7,3519.7c9.6,38.4,23.1,40.3,209.4,48c167.1,3.8,209.4,13.4,253.6,46.1c90.3,67.2,128.7,134.5,128.7,224.8c0,105.7-49.9,190.2-140.2,242.1c-71.1,40.3-88.4,40.3-1321.8,40.3H6907l-7.7,380.4l-5.8,380.4l-65.3,132.6c-111.4,222.9-299.7,380.4-530.3,440C6132.8,5031.8,3856.1,5029.8,3694.7,4987.6z M6225,4422.7c107.6-65.3,121-115.3,121-461.1v-307.4H5001.1H3656.3v307.4c0,345.8,13.5,395.8,121,461.1c59.6,36.5,105.7,38.4,1223.8,38.4C6119.3,4461.2,6165.4,4459.2,6225,4422.7z M8455.5,2978c-7.7-67.2-222.9-1669.6-474.6-3563.9c-351.6-2635.9-466.9-3456.3-493.7-3498.6c-17.3-32.7-65.3-76.8-103.8-98c-73-40.3-73-40.3-2382.3-40.3c-2080.7,0-2315.1,3.8-2374.7,30.7c-142.2,67.2-101.8-165.2-612.9,3673.4c-257.4,1930.8-472.6,3533.2-476.5,3563.9l-7.7,51.9h3471.7h3471.7L8455.5,2978z"/><path d="M3051.1,2388.1c-65.3-38.4-111.4-101.8-130.6-172.9c-5.8-25,71.1-1283.4,171-2795.4c151.8-2267.1,188.3-2760.8,215.2-2816.5c99.9-205.6,388.1-201.7,489.9,3.8c34.6,69.2,32.7,119.1-149.9,2843.4c-201.7,3035.6-180.6,2839.6-317,2929.9C3250.9,2434.3,3131.8,2438.1,3051.1,2388.1z"/><path d="M4872.4,2393.9c-34.6-17.3-80.7-59.6-101.8-94.1c-38.4-61.5-38.4-92.2-38.4-2862.6c0-2774.3,0-2801.2,38.4-2862.6c99.9-163.3,361.2-163.3,461.1,0c38.4,61.5,38.4,88.4,38.4,2862.6s0,2801.2-38.4,2862.6C5160.6,2415,4999.2,2455.4,4872.4,2393.9z"/><path d="M6672.6,2380.5c-136.4-90.3-115.3,105.7-317-2928c-184.4-2739.7-186.4-2772.3-149.9-2843.4c101.8-207.5,390-211.3,489.9-5.8c26.9,55.7,63.4,528.3,207.5,2708.9c96.1,1452.5,176.8,2707,178.7,2785.8c3.8,123-1.9,153.7-40.3,207.5C6953.1,2428.5,6791.7,2461.1,6672.6,2380.5z"/></g></g></svg>';
        taskDelete.classList.add("task-container-delete");

        container.appendChild(taskCompleteBox);
        container.appendChild(taskName);
        container.appendChild(taskDetails);
        container.appendChild(taskDueDate);
        container.appendChild(taskEditWrap);
        container.appendChild(taskDelete);

        return container;
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
    
    renderAllProjects() {
        const sidebarBody = document.querySelector(".sidebar-body");
        const projectList = projectStorage.getProjectList();
        projectList.forEach(element => {
            const projectElement = this.createProjectElement(element);
            this.addElementToParent(projectElement, sidebarBody);
        });
    }

    handleDeleteProject(e) {
        const projectTag = e.target.parentElement.firstChild.getAttribute("id");
        projectStorage.removeProject(projectTag);

        const sidebarBody = document.querySelector(".sidebar-body");
        this.clearElementChildren(sidebarBody);

        this.renderAllProjects();
        this.initProjectButtons();
    }
    
    handleAddProject(e) {
        this.toggleForm();
    }

    handleProjectOpen(e) {
        const taskArea = document.querySelector(".task-area-body");
        this.clearElementChildren(taskArea);

        const projectList = document.querySelector(".sidebar-body").children;
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

    toggleForm() {
        const blurTarget = document.getElementById("content");
        blurTarget.classList.toggle("active");
        const form = document.getElementById("form-overlay");
        form.classList.toggle("active");
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


