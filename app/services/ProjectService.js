import { Project } from "../models/Project.js";
import { STORE } from "../store.js";
import { Group } from "../models/Group.js";
import { Contact } from "../models/Contact.js";

// The services job is to control data access
class ProjectService {
  addContact(contactData) {
    let project = STORE.state.projects.find(p => p.id == contactData.projectId);

    if (!project) {
      throw new Error("No project found");
    }

    console.log(contactData.Group);


    let contactGroup = project.groups.find(g => g.name == contactData.Group);

    if (!contactGroup) {
      throw new Error("Could not find a group with the name of " + contactData.Group);
    }

    contactData.Group = contactGroup;
    let newContact = new Contact(contactData);
    let index = STORE.state.projects.indexOf(project);

    STORE.state.projects[index].contacts.push(newContact);
  }
  addGroup(groupData) {
    let project = STORE.state.projects.find(p => p.id == groupData.projectId);

    if (!project) {
      throw new Error("Project does not exist")
    }

    let newGroup = new Group(groupData);
    let index = STORE.state.projects.indexOf(project);

    STORE.state.projects[index].groups.push(newGroup)

  }
  setActiveProject(projectId) {
    let project = STORE.state.projects.find(p => p.id == projectId);

    if (!project) {
      throw new Error("Invalid Id");
    }

    // TODO check project members

    STORE.state.activeProject = project;
  }
  createProject(projectData) {
    if (STORE.state.projects.length >= 3) {
      throw new Error("You've exceeded your limit! Send us Money!!!");
    }

    let project = new Project(projectData);
    STORE.state.projects.push(project);
  }
}

export const projectService = new ProjectService();
