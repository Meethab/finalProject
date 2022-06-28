import { AuthUser } from './auth-user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(user: AuthUser) {
    if (user.userName !== '' && user.password !== '' ) { 
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() { 
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
