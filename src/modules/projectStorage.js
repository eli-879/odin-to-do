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
        this.projectList.splice(index, 1);
    }
}