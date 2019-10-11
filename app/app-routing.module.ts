import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// path camino cuando este vacio carga Home en <router-outlet>
// en forma dinamica cuando se activa la ruta
// con lazzy loading monta un bundle por cada loadChildren
const routes: Routes = [
	{
		path: "",
		loadChildren: "@home/home.module#HomeModule"
	},
	{
		path: "about",
		loadChildren: "@routes/about/about.module#AboutModule"
	},
	{
		path: "month/:y/:m",
		loadChildren: "@routes/month/month.module#MonthModule"
	},
	{
		path: "credentials",
		loadChildren:
			"@routes/credentials/credentials.module#CredentialsModule"
	},
	{
		path: "not-found",
		loadChildren:
			"@routes/not-found/not-found.module#NotFoundModule"
	},
	{
		path: "**",
		redirectTo: "not-found"
	}
];
// Este modulo no construye nada solo configura las rutas con
// forRoot para toda la aplicacion y exporta esas rutas
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
