import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  players = []

  constructor() { }

  ngOnInit(): void {

    window.fetch('http://localhost:8080/players',
      {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
      }
    ).then(r => console.log(r.json()))
  }

}
