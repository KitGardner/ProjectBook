import { projectService } from "../services/ProjectService.js";
import { STORE } from "../store.js";

// Private Parts
function drawProjects() {
  let template = "";
  STORE.state.projects.forEach(project => {
    template += /*html*/ `
      <div>
        <img src="http://placehold.it/100x100" alt="" onclick="app.projectController.viewProject('${project.id}')">
        <h1>${project.name.charAt(0)}</h1>
      </div>
      `;
  });

  document.getElementById("project-thumbnails").innerHTML = template;
}

function drawProjectDetails() {
  let project = STORE.state.activeProject;
  if (!project.id) {
    return;
  }

  let template = /*html*/ `
    <h2>${project.name}</h2>
    <button>Contacts</button>
    <button>Tasks</button>
    <div id="PageContent">
    <form onsubmit="app.projectController.addGroup('${project.id}')">
      <label for="groupName">Group Name</label>
      <input type="text" name="groupName" required />
      <button type="submit">Add Group</button>
    </form>
      Groups
      <ul>
        `
  project.groups.forEach(group => {
    template += `<li>${group.name}</li>`
  })

  template += `</ul >
  <div class="Contact-Card">
    <img src="http://placehold.it/50x50" alt="">
      <h3>Contact Name</h3>
      <img src="http://placehold.it/50x50" alt="">
    </div>
      <form onsubmit="app.projectController.addContact('${project.id}')">
        <label for="contactName">Contact Name</label>
        <input type="text" name="contactName" required />
        <label for="groupName">Group Name</label>
        <input type="text" name="groupName" required />
        <button type="submit">Add Contact</button>
      </form>
  </div>
      `;
  document.getElementById("project-details").innerHTML = template;
}

// The controllers job is to manage view
export class ProjectController {
  constructor() {
    drawProjects();
    drawProjectDetails();
  }

  // Public Parts
  createProject() {
    event.preventDefault();
    let form = event.target;
    try {
      // @ts-ignore
      projectService.createProject({
        name: form.projectName.value,
        description: form.projectDescription.value
      });
      // @ts-ignore
      form.reset();
      drawProjects();
    } catch (error) {
      alert(error);
    }
  }

  viewProject(projectId) {
    try {
      projectService.setActiveProject(projectId);
      drawProjectDetails();
    } catch (error) {
      alert(error);
    }
  }

  addGroup(projectId) {
    event.preventDefault();
    let form = event.target;
    try {
      projectService.addGroup({
        name: form.groupName.value,
        projectId: projectId
      })
      drawProjectDetails();
    } catch (error) {
      alert(error);
    }
  }
}
