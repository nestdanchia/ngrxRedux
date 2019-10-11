import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
// | async asegura subscripcion a un objeto nuevo y asi le pasa al
// presentador siempre un objeto nuevo
@Component({
	selector: "ab-home",
	template: `
  <main>
    <ab-dashboard [balances]="balances$ | async"></ab-dashboard>
  </main>
  `,
	styles: []
})
//estrategia OnPush HomeComponent componente contenedor
export class HomeComponent implements OnInit {
	public balances$;

	constructor(private http: HttpClient) {}

	ngOnInit() {
		// solicita balances mensuales
		// contenedor se subscribe con el pipe async balances$
		// al presentador no se le envia un obserbable
		const urlMonthBalances =
			environment.apiUrl + "priv/monthbalances/";
		// el get siempre da un objeto nuevo
		this.balances$ = this.http.get<MonthBalance[]>(
			urlMonthBalances
		);
	}
}
