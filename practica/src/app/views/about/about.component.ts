import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cf-about",
  template: `
  <h3><a href="https://academia-binaria.com/categories/Tutorial/Angular/">  Angular 5 Tutorial</a></h3>
  <blockquote>
  <p><em>Learn, Code, Enjoy, Repeat.</em></p>
</blockquote>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
