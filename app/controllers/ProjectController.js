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
      <label for="GroupColorPicker"></label>
      <select name="GroupColorPicker" id="ColorPicker">
        <option value="#EE0000">Red</option>
        <option value="#0000EE">Blue</option>
        <option value="#00EE00">Green</option>
        <option value="#EEEE00">Yellow</option>
        <option value="#EE00EE">Purple</option>
        <option value="#EE9900">Orange</option>
      </select>
    </form>
      Groups
      <ul>
        `
  project.groups.forEach(group => {
    template += `<li style='color: ${group.color}'>${group.name}</li>`
  })

  template += "</ul>"
  project.contacts.forEach(contact => {
    template += `<img src="http://placehold.it/50x50" alt="">
      <h3>${contact.Name}</h3>
      <img src="http://placehold.it/50x50" alt="">`
  });


  template += `<div class="Contact-Card"></div>
      <form onsubmit="app.projectController.addContact('${project.id}')">
        <label for="contactName">Contact Name</label>
        <input type="text" name="contactName" required />
        <label for="groupName">Group Name</label>
        <input type="text" name="groupName" required />
        <button type="submit">Add Contact</button>
      </form>
  </div>`;
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
        projectId: projectId,
        color: form.GroupColorPicker.value
      })
      drawProjectDetails();
    } catch (error) {
      alert(error);
    }
  }

  addContact(projectId) {
    event.preventDefault();
    let form = event.target;
    try {
      projectService.addContact({
        Name: form.contactName.value,
        projectId: projectId,
        Group: form.groupName.value
      });

    } catch (error) {
      alert(error);
    }
  }
}
