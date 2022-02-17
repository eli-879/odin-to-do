export default class Task {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    setName(newName) {
        this.name = newName;
    }

    getName() {
        return this.name;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getDescription() {
        return this.description;
    }

    setDueDate(newDate) {
        this.dueDate = newDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    getPriority() {
        return this.priority;
    }

}