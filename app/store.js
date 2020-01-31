import { Project } from "./models/Project.js";

class Store {
  state = {
    projects: [],
    activeProject: {}
  };
}

export const STORE = new Store();
