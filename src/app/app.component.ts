import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nba fantasia';

  isUserConnected: boolean = false

  constructor(private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {
    this.isUserConnected = window.localStorage.getItem('userId') != '';

    this.socialAuthService.authState.subscribe(value => {
      this.isUserConnected = value != null;
    })
  }

  isModalVisible: boolean = false

  openConnectionModal() {
    this.isModalVisible = true
  }

  closeConnectionModal() {
    this.isModalVisible = false
  }

  signInWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
      window.localStorage.setItem('userId', socialUser.id)
      this.closeConnectionModal()
      this.isUserConnected = true
    })
  }

  signOut() {
    this.socialAuthService.signOut().then(_ => {
      window.localStorage.clear()
      this.isUserConnected = false
    }).catch(reason => {
      if (reason === "Not logged in") {
        window.localStorage.clear()
        this.isUserConnected = false
      }
    })
  }
}
