import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cf-footer",
  template: `
    <footer>
      Developed by <a href="https://twitter.com/albertobasalo">Alberto Basalo</a>
    </footer>
  `,
  styles: [
    `
    footer{
      border-top: .1rem solid;
      text-align: center;
    }
  `
  ]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
