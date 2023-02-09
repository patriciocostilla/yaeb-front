import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  info = new BehaviorSubject<any>({});
  infoArray: [string, unknown][] = [];
  urlArray: [string, unknown][] = [
    ['window.location.host', window.location.host],
    ['window.location.href', window.location.href],
    ['window.location.protocol', window.location.protocol]
  ];

  apiUrl = env.API_URL;
  refreshedAt: Date | null = null;

  constructor(
    private http: HttpClient,
    private title: Title,
    private router: Router,
    private location: Location
  ) {
    this.info.subscribe((newInfo) => {
      this.infoArray = Object.entries(newInfo);
    });

    this.refresh();
    setInterval(() => this.refresh(), 5000);

    if (isDevMode()) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          let currentTitle = this.title.getTitle();
          this.title.setTitle(`${currentTitle} (dev)`);
        }
      });
    }

    this.urlArray.push(['angularLocation.path()', this.location.path()]);
    this.urlArray.push([
      'angularLocation.prepareExternalUrl(\'\')',
      this.location.prepareExternalUrl(''),
    ]);
    this.urlArray.push([
      "angularLocation.prepareExternalUrl('v2')",
      this.location.prepareExternalUrl('v2'),
    ]);
    let redirectUrl = `${window.location.protocol}//${window.location.host}${this.location.prepareExternalUrl('v2/login')}`
    this.urlArray.push(['Redirect URL', redirectUrl])
  }

  refresh() {
    this.http.get(`${this.apiUrl}/ping`).subscribe((data) => {
      this.info.next(data);
      this.refreshedAt = new Date();
    });
  }
}
