import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userRole: Observable<string>;
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
  }

  switchRole(role: string) {
    this.userService.switchUserRole(role);
  }
}
