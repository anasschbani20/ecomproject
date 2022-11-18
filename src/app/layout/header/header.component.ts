import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connectedUser = null;
  constructor(
    private userService: UserService
  ) {
    this.connectedUser = this.userService.getConnectedUser();
  }

  ngOnInit(): void {
  }

}
