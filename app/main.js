import { ProjectController } from "./controllers/ProjectController.js";
import ContactController from "./controllers/ContactController.js";

// Entry Point

class App {
  // Container to hold all the things
  projectController = new ProjectController();
  contactController = new ContactController();
}

const APP = new App();
window["app"] = APP;
