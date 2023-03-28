import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss'],
})
export class FormComponentComponent {
  input = new FormControl('');
  url = env.API_URL;
  displayValue: string = this.url;
  result: Object | undefined = undefined;
  constructor(private httpClient: HttpClient) {
    this.input.valueChanges.subscribe({
      next: (value) => {
        if (value !== null) {
          this.displayValue = this.url + value;
        } else {
          this.displayValue = this.url;
        }
      },
    });
  }

  submit() {
    let val = this.input.value;
    let url = this.url + val;
    this.httpClient.get(url).subscribe((res) => {
      this.result = res;
    }, (err) => {
      this.result = err;
    });
  }
}
