import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  connectedUser = null;

  constructor(
    private userService: UserService
  ) {
    this.connectedUser = this.userService.getConnectedUser();
  }

  ngOnInit(): void {
  }

}
