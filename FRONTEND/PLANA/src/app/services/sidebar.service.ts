import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarActive = new BehaviorSubject<boolean>(false);
  sidebarActive$ = this.sidebarActive.asObservable();

  toggleSidebar() {
    this.sidebarActive.next(!this.sidebarActive.value);
  }
}
