import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {
    this.info.subscribe((newInfo) => {
      this.infoArray = Object.entries(newInfo)
    })

    this.refresh();
    setInterval(() => this.refresh(), 5000);

  }

  refresh() {
    this.http.get(`${this.apiUrl}/ping`).subscribe((data) => {
      this.info.next(data);
      this.refreshedAt = new Date();
    })
  }
}
