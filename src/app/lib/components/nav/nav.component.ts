import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cf-nav",
  template: `
    <nav>
      <ul class="row">
        <li class="button button-outline">
          <cf-title></cf-title>
        </li>
        <li class="button button-outline">
          <a routerLink="/operations">Operations</a>
        </li>
        <li class="button button-outline">
          <a routerLink="/about">About Us</a>
        </li>
        <li class="button button-outline">
        <cf-user-login></cf-user-login>
        </li>
        <li>
          <cf-user-message></cf-user-message>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
    nav{
      border-bottom: .1rem solid;
    }
    `
  ]
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
