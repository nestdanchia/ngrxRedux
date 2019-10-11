import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OperationsService } from "./operations.service";
import { Operation } from "./operation.class";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "cf-item",
  template: `
  <h2>Operation Details</h2>
  <h3>{{ operation | json }}</h3>
  <h4>{{ message }}</h4>
  <h5>{{ fullError | json }}</h5>
  `,
  styles: []
})
export class ItemComponent implements OnInit {
  private _id: string;
  public operation: Operation;
  public message: string;
  public fullError: any;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) {}

  ngOnInit() {
    this._id = this.getIdFromRoute();
    this.getDataById();
  }

  private getIdFromRoute() {
    return this.route.snapshot.params["id"];
  }

  private getDataById() {
    this.operationsService
      .getOperationById$(this._id)
      .subscribe(data => this.showData(data), err => this.catchError(err));
  }

  private showData(data) {
    this.operation = data;
    this.message = `Found data for _id: ${this._id}`;
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status == 404) {
      this.showNotFoundError();
    } else {
      this.showServerError(err);
    }
  }

  private showNotFoundError() {
    this.message = `NOT FOUND data for _id: ${this._id} !!!`;
    this.fullError = null;
  }

  private showServerError(err: HttpErrorResponse) {
    this.message = `Server returned code ${err.status}, text: ${
      err.statusText
    }`;
    this.fullError = err;
  }
}
