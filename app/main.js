import { ProjectController } from "./controllers/ProjectController.js";

// Entry Point

class App {
  // Container to hold all the things
  projectController = new ProjectController();
}

const APP = new App();
window["app"] = APP;
