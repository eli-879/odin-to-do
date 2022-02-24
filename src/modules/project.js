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

	getTaskAt(index) {
		return this.taskList[index];
	}

	removeTaskAtIndex(taskIndex) {
		this.taskList.splice(taskIndex, 1);
	}

	removeTask(task) {
		for (let i = 0; i < this.taskList.length; i++) {
			if (task == this.taskList[i]) {
				this.taskList.splice(i, 1);
			}
		}
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
