export class LightPlayer {
  firstName: String
  lastName: String
  team: String
  position: String

  constructor(firstName: String = "", lastName: String = "", team: String = "", position: String = "") {
    this.firstName = firstName
    this.lastName = lastName
    this.team = team
    this.position = position
  }

  display() {
    return this.firstName + " " + this.lastName + "-" + this.team
  }
}
