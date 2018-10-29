import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cf-footer",
  template: `
    <footer>
      Developed by Nestor Chiariello NGRX sobre un Ejemplo de  Angular 6 Alberto Basalo <a href="http://www.linkedin.com/in/nestordanielchiariello">Nestor Chiariello</a>
    </footer>
  `,
  styles: [
    `
      footer {
        border-top: 0.1rem solid;
        text-align: center;
      }
    `
  ]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
