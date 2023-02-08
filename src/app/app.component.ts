import { HttpClient } from '@angular/common/http';
import { Component, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment as env} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  info = new BehaviorSubject<any>({})
  infoArray: [string, unknown][] = [];

  apiUrl = env.API_URL;
  refreshedAt: Date | null = null;

  constructor(private http: HttpClient, private title: Title, private router: Router) {
    this.info.subscribe((newInfo) => {
      this.infoArray = Object.entries(newInfo)
    })

    this.refresh();
    setInterval(() => this.refresh(), 5000);

    if (isDevMode()) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          let currentTitle = this.title.getTitle();
          this.title.setTitle(`${currentTitle} (dev)`)
        }
      })
    }

  }

  refresh() {
    this.http.get(`${this.apiUrl}/ping`).subscribe((data) => {
      this.info.next(data);
      this.refreshedAt = new Date();
    })
  }
}
