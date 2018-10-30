import { Component, OnInit } from "@angular/core";
import { Operation } from "./operation.class";
import { OperationsService } from "./operations.service";
//import { StoreService } from "../../lib/store.service";
import { Store } from "@ngrx/store";
// este componente actua como controlador
// para guardar o modificar datos
import { AppState } from "../../Redux/app.state";
import { SetuserMessageAction } from "../../Redux/userMessage/userMessage.actions";
@Component({
  selector: "cf-operations",
  template: `
    <cf-new 
      [numberOfOperations]="numberOfOperations" 
      [kindsOfOperations]="kindsOfOperations"
      (save)="saveOperation($event)">
    </cf-new>
    <cf-list 
      [numberOfOperations]="numberOfOperations" 
      [operations]="operations" 
      (delete)="deleteOperation($event)" >
    </cf-list>
  `,
  styles: []
})
export class OperationsComponent implements OnInit {
  public numberOfOperations = 0;
  public operations: Operation[] = [];
  public kindsOfOperations = ["Income", "Expense"];
  //private store: StoreService
  constructor(
    private operationsService: OperationsService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService
      .saveOperation$(operation)
      .subscribe(data => this.refreshData());
  }

  public deleteOperation(operation: Operation) {
    this.operationsService
      .deleteOperation$(operation)
      .subscribe(data => this.refreshData());
  }

  private refreshData() {
    this.operationsService
      // si no esta logeado servidor retorna 401
      // catch-interceptor service redirije a pagina de login
      .getOperationsList$()
      .subscribe(data => (this.operations = data));
    this.operationsService.getNumberOfOperations$().subscribe(data => {
      this.numberOfOperations = data.count;
      const actionMessage = new SetuserMessageAction(
        `Ops: ${this.numberOfOperations}`
      );
      this.store.dispatch(actionMessage);
      //this.store.emitUserMessage(`Ops: ${this.numberOfOperations}`);
    });
  }
}
