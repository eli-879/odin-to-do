/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/task */ \"./src/modules/task.js\");\n/* harmony import */ var _modules_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/project */ \"./src/modules/project.js\");\n/* harmony import */ var _modules_projectStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/projectStorage */ \"./src/modules/projectStorage.js\");\n\n\n\nlet projectStorage = new _modules_projectStorage__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\nclass UI {\n    constructor() {\n        this.formPages = [];\n    }\n\n    loadPage() {\n        this.addElementToParent(this.createNewForm(), document.body);\n        this.addToDocumentContent(this.createNav());\n        this.addToDocumentContent(this.createBodyElements());\n        \n        let defaultProject = this.newProject(\"Today's Tasks\", 0);\n        let defaultTask1 = this.newTask(\"washing\", \"\", \"\", \"priority ONE\");\n        defaultProject.addTask(defaultTask1);\n        this.addToProjectStorage(defaultProject);\n\n        let defaultProject2 = this.newProject(\"Today's Tasks 2\", 1);\n        this.addToProjectStorage(defaultProject2);\n        \n        this.renderAllProjects();\n        this.initProjectButtons();\n    }\n\n    createNewForm() {\n        const form = this.createFormDomElements();\n        return form;\n    }\n\n    createFormDomElements() {\n        const container = document.createElement(\"div\");\n        container.id =\"form-overlay\";\n\n        const form = document.createElement(\"div\");\n        form.classList.add(\"new-item-form\");\n        //container.classList.toggle(\"active\");\n        form.id = \"form\";\n                \n        const header = document.createElement(\"div\");\n        header.classList.add(\"form-header\");\n        header.innerText = \"Add A...\";\n        form.appendChild(header);\n\n        const body = document.createElement(\"div\");\n        body.classList.add(\"form-body\");\n\n        const sidebar = document.createElement(\"div\");\n        sidebar.classList.add(\"form-sidebar\");\n        sidebar.appendChild(this.createFormSidebarElements());\n        body.appendChild(sidebar);\n\n        const infoArea = document.createElement(\"div\");\n        infoArea.classList.add(\"form-infoarea\");\n        this.formPages.push(this.createFormBodyElementsTask());\n        this.formPages.push(this.createFormBodyElementsProject());\n        infoArea.appendChild(this.formPages[0]);\n        \n        body.appendChild(infoArea);\n        \n        form.appendChild(body);\n\n        const button = document.createElement(\"button\");\n        button.classList.add(\"close-form\");\n        button.innerText = \"Close\";\n        button.addEventListener(\"click\", this.toggleForm);\n        form.appendChild(button);\n\n        container.appendChild(form);\n\n        return container;\n    }\n\n    createFormSidebarElements() {\n        const container = document.createElement(\"div\");\n        container.classList.add(\"form-sidebar-container\");\n\n        const taskButton = document.createElement(\"div\");\n        taskButton.classList.add(\"form-sidebar-selector\");\n        taskButton.innerText = \"Task\";\n        container.appendChild(taskButton);\n\n        const projectButton = document.createElement(\"div\");\n        projectButton.classList.add(\"form-sidebar-selector\");\n        projectButton.innerText = \"Project\";\n        container.appendChild(projectButton);\n\n        return container;\n    }\n\n    createFormBodyElementsProject() {\n        const wrapper = document.createElement(\"div\");\n        wrapper.classList.add(\"form-body-wrapper\");\n\n        const textarea = document.createElement(\"textarea\");\n        textarea.classList.add(\"form-textarea-title\");\n        textarea.classList.add(\"textarea-nonresize\");\n        textarea.placeholder = \"Enter Name of Project Here\";\n        wrapper.appendChild(textarea);\n\n        return wrapper;\n    }\n\n    createFormBodyElementsTask() {\n        const wrapper = document.createElement(\"div\");\n        wrapper.classList.add(\"form-body-wrapper\");\n\n        const titleArea = document.createElement(\"textarea\");\n        titleArea.classList.add(\"form-textarea-title\");\n        titleArea.placeholder = \"Enter Task Here\";\n        titleArea.classList.add(\"textarea-nonresize\");\n        wrapper.appendChild(titleArea);\n\n        const descArea = document.createElement(\"textarea\");\n        descArea.classList.add(\"form-textarea-desc\");\n        descArea.placeholder = \"Enter Task description here\";\n        descArea.classList.add(\"textarea-nonresize\");\n        wrapper.appendChild(descArea);\n\n        const confirmButton = document.createElement(\"button\");\n        confirmButton.classList.add(\"form-submit-task\");\n        confirmButton.innerText = \"Confirm\";\n        wrapper.appendChild(confirmButton);\n\n        return wrapper;\n    }\n\n    initFormBodyElementsTask() {\n        const formBody = document.querySelector(\"form-submit-task\");\n        formBody.addEventListener\n\n    }\n\n    createNav() {\n        const header = document.createElement(\"nav\");\n        header.classList.add(\"navbar\");\n    \n        const title = document.createElement(\"div\");\n        title.classList.add(\"title\");\n        title.innerText = \"What I Gotta Do?\";\n        header.appendChild(title);\n    \n        return header;\n    }\n\n    createBodyElements() {\n        const container = document.createElement(\"div\");\n        container.classList.add(\"container\");\n    \n        const sidebar = this.createBodySideBar();\n        container.appendChild(sidebar);\n    \n        const taskArea = this.createBodyTaskArea();\n        container.appendChild(taskArea);\n    \n        return container;\n    }\n\n    createBodySideBar() {\n        const sidebar = document.createElement(\"div\");\n        sidebar.classList.add(\"sidebar\");\n    \n        const sidebarTitle = document.createElement(\"div\");\n        sidebarTitle.classList.add(\"sidebar-title\");\n        sidebarTitle.innerText = \"Projects\";\n        sidebar.appendChild(sidebarTitle);\n\n        const sidebarBody = document.createElement(\"div\");\n        sidebarBody.classList.add(\"sidebar-body\");\n        sidebar.appendChild(sidebarBody);\n\n        const sidebarAddProjectButton = document.createElement(\"button\");\n        sidebarAddProjectButton.classList.add(\"sidebar-button\");\n        sidebarAddProjectButton.innerText = \"Add Project +\";\n        sidebar.appendChild(sidebarAddProjectButton);\n    \n        return sidebar;\n    }\n\n    createBodyTaskArea() {\n        const taskArea = document.createElement(\"div\");\n        taskArea.classList.add(\"task-area\");\n        \n        const taskAreaTitle = document.createElement(\"div\");\n        taskAreaTitle.classList.add(\"task-area-title\");\n        taskAreaTitle.innerText = \"Tasks\";\n        taskArea.appendChild(taskAreaTitle);\n\n        const taskAreaBody = document.createElement(\"div\");\n        taskAreaBody.classList.add(\"task-area-body\");\n        taskArea.appendChild(taskAreaBody);\n    \n        return taskArea;\n    }\n\n    createProjectElement(project) {\n        const name = project.getName();\n        const tag = document.createElement(\"div\");\n        tag.classList.add(\"project-tag\");\n        tag.innerText = name;\n        tag.setAttribute(\"id\", project.getID());\n    \n        return tag;\n    }\n\n    createTaskListElement(id) {\n        const project = projectStorage.getProjectList().find(element => element.getID() == id);\n        console.log(project);\n        const container = document.createElement(\"div\");\n        container.classList.add(\"task-container\");\n\n        const projectTitle = document.createElement(\"div\");\n        projectTitle.classList.add(\"task-container-title\");\n        projectTitle.innerText = project.getName();\n        container.appendChild(projectTitle);\n\n        const taskList = project.getTaskList();\n        taskList.forEach(element => {\n            const taskContainer = document.createElement(\"div\");\n            taskContainer.classList.add(\"task-container-task\");\n            taskContainer.innerText = element.getName();\n\n            container.appendChild(taskContainer);\n        });\n\n        return container;\n    }\n\n    initProjectButtons() {\n        const addProjectButton = document.querySelector(\".sidebar-button\");\n        addProjectButton.addEventListener(\"click\", this.handleAddProject);\n\n        const projectButtons = document.querySelectorAll(\".project-tag\");\n        projectButtons.forEach(element => {\n            element.addEventListener(\"click\", this.handleProjectOpen);\n        });\n    }\n    \n    renderAllProjects() {\n        const sidebarBody = document.querySelector(\".sidebar-body\");\n        const projectList = projectStorage.getProjectList();\n        projectList.forEach(element => {\n            const projectElement = this.createProjectElement(element);\n            this.addElementToParent(projectElement, sidebarBody);\n        });\n    }\n    \n    handleAddProject(e) {\n        this.toggleForm();\n    }\n\n    handleProjectOpen(e) {\n        const taskArea = document.querySelector(\".task-area-body\");\n        this.clearElementChildren(taskArea);\n\n        const projectID = e.target.getAttribute(\"id\");\n        const taskListElement = this.createTaskListElement(projectID);\n        this.addElementToParent(taskListElement, taskArea);\n    }\n\n    addElementToParent(element, parent) {\n        parent.appendChild(element);\n    }\n\n    clearElementChildren(element) {\n        while (element.firstChild) {\n            element.removeChild(element.lastChild);\n        }\n    }\n    \n    addToDocumentContent(item) {\n        document.getElementById(\"content\").appendChild(item);\n    }\n\n    newProject(name, id) {\n        let project = new _modules_project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](name, id);\n        return project;\n    }\n\n    newTask(name, description, dueDate, priority) {\n        let task = new _modules_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, description, dueDate, priority);\n        return task;\n    }\n    \n    addToProjectStorage(project) {\n        projectStorage.addProject(project);\n    }\n\n    toggleForm() {\n        const blurTarget = document.getElementById(\"content\");\n        blurTarget.classList.toggle(\"active\");\n        const form = document.getElementById(\"form-overlay\");\n        form.classList.toggle(\"active\");\n    }\n}\nconst thisManager = new UI();\n\nthisManager.loadPage();\n\n\n\n\n//# sourceURL=webpack://odin-to-do/./src/index.js?");

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n    constructor(name, id) {\n        this.name = name;\n        this.id = id;\n        this.taskList = [];\n    }\n\n    getTaskList() {\n        return this.taskList;\n    }\n\n    addTask(task) {\n        this.taskList.push(task);\n    }\n\n    removeTask(taskIndex) {\n        this.taskList.splice(taskIndex, 1);\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    setName(name) {\n        this.name = name;\n    }\n\n    getID() {\n        return this.id;\n    }\n}\n\n//# sourceURL=webpack://odin-to-do/./src/modules/project.js?");

/***/ }),

/***/ "./src/modules/projectStorage.js":
/*!***************************************!*\
  !*** ./src/modules/projectStorage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectStorage)\n/* harmony export */ });\nclass ProjectStorage {\n    constructor() {\n        this.projectList = [];\n    }\n\n    getProjectList() {\n        return this.projectList;\n    }\n\n    addProject(project) {\n        this.projectList.push(project);\n    }\n\n    removeProject(index) {\n        this.projectList.splice(index, 1);\n    }\n}\n\n//# sourceURL=webpack://odin-to-do/./src/modules/projectStorage.js?");

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n    constructor(name, description, dueDate, priority) {\n        this.name = name;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n    }\n\n    setName(newName) {\n        this.name = newName;\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    setDescription(newDescription) {\n        this.description = newDescription;\n    }\n\n    getDescription() {\n        return this.description;\n    }\n\n    setDueDate(newDate) {\n        this.dueDate = newDate;\n    }\n\n    getDueDate() {\n        return this.dueDate;\n    }\n\n    setPriority(newPriority) {\n        this.priority = newPriority;\n    }\n\n    getPriority() {\n        return this.getPriority();\n    }\n\n}\n\n//# sourceURL=webpack://odin-to-do/./src/modules/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;