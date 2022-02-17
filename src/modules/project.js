export default class Project {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.taskList = [];
    }

    getTaskList() {
        return this.taskList;
    }

    addTask(task) {
        this.taskList.push(task);
    }

    removeTask(taskIndex) {
        this.taskList.splice(taskIndex, 1);
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getID() {
        return this.id;
    }
}