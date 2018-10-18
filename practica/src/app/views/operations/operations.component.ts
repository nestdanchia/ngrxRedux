import { Component, OnInit } from "@angular/core";
import { Operation } from "./operation.class";
import { OperationsService } from "./operations.service";
import { StoreService } from "../../lib/store.service";
//! la llamada a operation corresponde a una ruta privada priv
// ! el servidor retorna un 401 de no autorizado
// ! rederige al usuario a login hace si entonces un post a login
// ! y retornado un token
@Component({
  selector: "cf-operations",
  template: `
    <cf-new 
      [numberOfOperations]="numberOfOperations" 
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
  constructor(
    private operationsService: OperationsService,
    private store: StoreService
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
    console.log("se inicio operation!!!!!!!!!!!!!!!!!!!!!!!!");
    this.operationsService
      .getOperationsList$()
      .subscribe(data => (this.operations = data));
    this.operationsService.getNumberOfOperations$().subscribe(data => {
      this.numberOfOperations = data.count;
      //! usa el store para comunicar a la barra de navegacion el numero de operaciones
      this.store.emitUserMessage(`Ops: ${this.numberOfOperations}`);
    });
  }
}
/**
 export class OperationsComponent implements OnInit {
  public numberOfOperations = 0;
  public operations: Operation[] = [];
  public message: string;
  public fullError: any;
  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService
      .saveOperation$(operation)
      // aca solo termino bien y lo refresco

      // pero si los datos son de un serv con BD FALLARA
      //porque se resfrecara antes de la comunicacion
      //
      //! hacerlo asi el callback dentro de la subscripcion
      .subscribe(this.refreshData.bind(this));
      //! no asi .subscribe()
      //!this.refreshData.bind(this)
  }

  public deleteOperation(operation: Operation) {
    this.operationsService
      .deleteOperation$(operation)
      // aca solo termino bien y lo refresco
      .subscribe(this.refreshData.bind(this));
  }

  private refreshData() {
    this.message = `Refreshing Data`;
    this.fullError = "";
    this.operationsService
      // invoca dos vaces para pedir la lista de operaciones
      // y luego el numero de op.eraciones
      //let x = this.operationsService.getOperationsList$
      // x tendra los metodos disponibles para un observable no es directamente
      // consumible le pasaremos funciones de callback que se ejecutaran cuando el obserbable
      // cambie el primer argumento seria el succes de una promesa
      // luego el error que retorne el api
      // luego una que se ejecutaria siempre finally
      // codigo asincrono se ejecutara cuando los datos lleguen



      .getOperationsList$()
      // sin necesidad del bind
      //  .subscribe(operation =>this.showOperations(operation)
      // nos debemos suscribir paar que se produzca la llamada
      // si no nos subscribimos no se producira la llamada
      .subscribe(this.showOperations.bind(this), this.catchError.bind(this));

    this.operationsService
      .getNumberOfOperations$()
      .subscribe(this.showCount.bind(this), this.catchError.bind(this));

  }
  private showOperations(operations: Operation[]) {
    this.operations = operations;
    this.message = `operations Ok`;
  }
  private showCount(data: any) {
    this.numberOfOperations = data.count;
    this.message = `count Ok`;
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.message = `Http Error: ${err.status}, text: ${err.statusText}`;
    } else {
      this.message = `Unknown error, text: ${err.message}`;
    }
    this.fullError = err;
  }
}

 */
