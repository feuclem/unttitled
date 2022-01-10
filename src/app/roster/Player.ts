export class Player {
  firstName: String = ""
  team: String = ""
  lastName: String = ""
  position: String = ""
  number: String = ""
  pointPerMatch: String = ""
  reboundPerMatch: String = ""
  assistPerMatch: String = ""
  totalCost: String = ""

  constructor(
    firstName: String,
    team: String,
    lastName: String,
    position: String,
    number: String,
    ppg: String,
    rpg: String,
    apg: String,
    totalCost: String,
  ) {
    this.firstName = firstName
    this.team = team
    this.lastName = lastName
    this.position = position
    this.number = number
    this.pointPerMatch = ppg
    this.reboundPerMatch = rpg
    this.assistPerMatch = apg
    this.totalCost = totalCost
  }
}
