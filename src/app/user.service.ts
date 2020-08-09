import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRoleSubject = new BehaviorSubject<string>('role-a');
  private userRole = this.userRoleSubject.asObservable();
  constructor() { }

  switchUserRole(role: string): void {
    this.userRoleSubject.next(role);
  }

  getUserRole(): Observable<string> {
    return this.userRole;
  }

  getCurrentUserRole(): string {
    return this.userRoleSubject.value;
  }
}
