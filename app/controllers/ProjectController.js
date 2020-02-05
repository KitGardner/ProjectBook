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
      Groups
      <ul class='groups'>
        `
  project.groups.forEach(group => {
    template += `<li style='background-color: #${group.color}; color: white'>${group.name}</li>`
  })

  template += `
      <img src='https://placehold.it/50x50' onclick="app.projectController.showGroupForm()">
      <form onsubmit="app.projectController.addGroup('${project.id}')" id='groupForm' hidden>
      <label for="groupName">Group Name</label>
      <input type="text" name="groupName" required />
      <select name="GroupColorPicker" id="ColorPicker">
        <option value="EE0000">Red</option>
        <option value="0000EE">Blue</option>
        <option value="00EE00">Green</option>
        <option value="EEEE00">Yellow</option>
        <option value="EE00EE">Purple</option>
        <option value="EE9900">Orange</option>
      </select>
      <button type="submit">Add Group</button>
      <label for="GroupColorPicker"></label>
    </form>`

  template += `</ul>
  <p>Contacts</p>
  <img src="https://placehold.it/50x50" onclick="app.projectController.showContactForm()">
  <div>
      <form onsubmit="app.projectController.addContact('${project.id}')" id="contactForm" hidden>
        <label for="contactName">Contact Name</label>
        <input type="text" name="contactName" required />
        <label for="groupName">Group Name</label>
        <input type="text" name="groupName" required />
        <button type="submit">Add Contact</button>
      </form>
  </div>
  `;
  project.contacts.forEach(contact => {
    template += `
    <div style="background-color: white" class="d-flex justify-content-between align-items-center p-3 mt-2">
      <img src="http://placehold.it/100x100" alt="">
      <h3>${contact.Name}</h3>
      <img src="http://placehold.it/100x100/${contact.Group.color}" alt="">
    </div>`
  });

  document.getElementById("project-details").innerHTML = template;
}

// The controllers job is to manage view
export class ProjectController {
  constructor() {
    drawProjects();
    drawProjectDetails();
  }

  // Public Parts
  showProjectForm() {
    let template = `
    <form onsubmit="app.projectController.createProject()">
      <label for="projectName">Project Name</label>
      <input name="projectName" type="text" required />
      <label for="projectDescription">Project Description</label>
      <input name="projectDescription" type="text" required>
      <label for="email">Email</label>
      <input type="text" name="email" required>
      <label for="projectColor">Project Color</label>
      <input type="text" name="projectColor">
      <button type="submit">Create Project</button>
    </form>
    `;

    document.getElementById("project-details").innerHTML = template;
  }

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

  showGroupForm() {
    let groupForm = document.getElementById("groupForm");

    if (groupForm.hidden) {
      groupForm.hidden = false;
    } else {
      groupForm.hidden = true;
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


  showContactForm() {
    let contactForm = document.getElementById("contactForm");

    if (contactForm.hidden) {
      contactForm.hidden = false;
    } else {
      contactForm.hidden = true;
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
      drawProjectDetails();
    } catch (error) {
      alert(error);
    }
  }
}
