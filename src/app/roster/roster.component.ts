import {Component, OnInit} from '@angular/core';
import {Player} from "./Player";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  players: Player[] = []
  isLoading: boolean = true

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
              data.ppg,
              data.rpg,
              data.apg,
              data.totalCost,
            )
        })
        this.isLoading = false
      })
    })
  }

}
