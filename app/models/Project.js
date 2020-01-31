export class Project {
  constructor({ name, description, id = generateId() }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.contacts = [];
    this.groups = [];
  }
}

function generateId() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var characterLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return result;
}
