import { AuthServiceService } from './../../auth/auth-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})
export class SearchBarComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined; 
  
  @Output() textEntered: EventEmitter<string> = new EventEmitter();
  
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onSearch(event: any) {
    this.textEntered.emit(event.target.value);
  }
}
