export default class ProjectStorage {
    constructor() {
        this.projectList = [];
    }

    getProjectList() {
        return this.projectList;
    }

    getProject(id) {
        for (const project of this.projectList) {
            if (project.getID() === id) return project;
        }
        return -1;
    }

    addProject(project) {
        this.projectList.push(project);
    }

    removeProject(index) {
        for (let i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].getID() === parseInt(index)) {
                this.projectList.splice(i, 1);
            }
        }
    }
}