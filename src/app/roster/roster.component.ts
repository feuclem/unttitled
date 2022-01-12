import {Component, OnInit} from '@angular/core';
import {Player} from "./Player";
import {LightPlayer} from "./LightPlayer";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  players: Player[] = []

  pointGuard: LightPlayer = new LightPlayer()
  shootingGuard: LightPlayer = new LightPlayer()
  smallForward: LightPlayer = new LightPlayer()
  powerForward: LightPlayer = new LightPlayer()
  center: LightPlayer = new LightPlayer()

  positionSorting: String = ""
  priceSorting: String = ""

  isLoading: boolean = true
  isOutOfCreditMessageVisible: boolean = false
  isImpossibleToAddPlayerMessageVisible: boolean = false

  constructor() {
  }

  ngOnInit(): void {
    window.fetch('http://localhost:8080/players',
      {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
      }
    ).then(r => {
      r.json().then(dataPlayers => {
        this.players = dataPlayers.map((data: Player) => {
          return new Player(
            data.firstName,
            data.team,
            data.lastName,
            data.position,
            data.number,
            data.pointPerMatch,
            data.reboundPerMatch,
            data.assistPerMatch,
            data.totalCost,
          )
        })
        this.isLoading = false
      })
    })
  }

  addTitularPlayer(firstName: String, lastName: String, team: String) {
    this.isOutOfCreditMessageVisible = false
    this.isImpossibleToAddPlayerMessageVisible = false

    let addTitularPlayerParameters = {
      userId: "1",
      firstName: firstName,
      lastName: lastName,
      team: team,
    }
    window.fetch('http://localhost:8080/rosters/addTitular',
      {
        method: 'POST',
        headers: new Headers({"Content-Type": "application/json"}),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(addTitularPlayerParameters)
      }
    ).then(r => {
      if(r.status != 400) {
        r.json().then(data => {
          data.titularPlayers.forEach((player => {
              if (player.position === "POINT_GUARD") {
                this.pointGuard = new LightPlayer(player.firstName, player.lastName, player.team, player.position)
              } else if (player.position === "SHOOTING_GUARD") {
                this.shootingGuard = new LightPlayer(player.firstName, player.lastName, player.team, player.position)
              } else if (player.position === "SMALL_FORWARD") {
                this.smallForward = new LightPlayer(player.firstName, player.lastName, player.team, player.position)
              } else if (player.position === "POWER_FORWARD") {
                this.powerForward = new LightPlayer(player.firstName, player.lastName, player.team, player.position)
              } else {
                this.center = new LightPlayer(player.firstName, player.lastName, player.team, player.position)
              }
            }),
          )
          this.isLoading = false
        })
      } else {
        r.json().then(data => {
          if(data['message'] === "OUT_OF_CREDIT") this.isOutOfCreditMessageVisible = true
          if(data['message'] === "IMPOSSIBLE_TO_UPDATE_ROSTER") this.isOutOfCreditMessageVisible = true
        })

      }
    })
  }

  removeTitularPlayer(lightPlayer: LightPlayer) {
    this.isOutOfCreditMessageVisible = false
    this.isImpossibleToAddPlayerMessageVisible = false

    let removeTitularPlayerParameters = {
      userId: "1",
      firstName: lightPlayer.firstName,
      lastName: lightPlayer.lastName,
      team: lightPlayer.team,
    }
    window.fetch('http://localhost:8080/rosters/removeTitular',
      {
        method: 'POST',
        headers: new Headers({"Content-Type": "application/json"}),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(removeTitularPlayerParameters)
      }
    ).then(() => {
      if (lightPlayer.position === "POINT_GUARD") {
        this.pointGuard = new LightPlayer()
      } else if (lightPlayer.position === "SHOOTING_GUARD") {
        this.shootingGuard = new LightPlayer()
      } else if (lightPlayer.position === "SMALL_FORWARD") {
        this.smallForward = new LightPlayer()
      } else if (lightPlayer.position === "POWER_FORWARD") {
        this.powerForward = new LightPlayer()
      } else {
        this.center = new LightPlayer()
      }
      this.isLoading = false
    })
  }

  filterPlayerPosition(position: String) {
    this.positionSorting = position
    this.filterPlayer()
  }

  filterPlayerPrice(price: String) {
    this.priceSorting = price
    this.filterPlayer()
  }

  private filterPlayer() {
    this.isLoading = true
    window.fetch('http://localhost:8080/players/filter?position='+this.positionSorting+'&price='+this.priceSorting,
      {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
      }
    ).then(r => {
      r.json().then(dataPlayers => {
        this.players = dataPlayers.map((data: Player) => {
          return new Player(
            data.firstName,
            data.team,
            data.lastName,
            data.position,
            data.number,
            data.pointPerMatch,
            data.reboundPerMatch,
            data.assistPerMatch,
            data.totalCost,
          )
        })
        this.isLoading = false
      })
    })
  }

}
