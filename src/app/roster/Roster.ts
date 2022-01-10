import {Player} from "./Player";

export class Roster {
  titularPlayers: Player[] = []

  constructor(
    titularPlayers: Player[],
  ) {
    this.titularPlayers = titularPlayers
  }

  getTitularPlayersByPosition(position: String) {
    console.log(position)
    return this.titularPlayers.find(data => data.position === position)
  }

}
