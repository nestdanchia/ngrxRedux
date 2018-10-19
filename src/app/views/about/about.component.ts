import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cf-about",
  template: `
  <h3><a href="http://www.linkedin.com/in/nestordanielchiariello">  Angular 6 Tutorial ngrx</a></h3>
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
