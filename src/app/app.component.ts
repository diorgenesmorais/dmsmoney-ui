import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private toastyconfig: ToastyConfig,
    private router: Router
  ) {
    this.toastyconfig.theme = 'bootstrap';
  }

  get exibirNavBar(): boolean {
    return Boolean(this.router.url !== '/login');
  }
}
