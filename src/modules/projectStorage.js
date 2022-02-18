export default class ProjectStorage {
    constructor() {
        this.projectList = [];
    }

    getProjectList() {
        return this.projectList;
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