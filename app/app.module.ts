import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ComponentsModule } from "@tools/components/components.module";
import { GlobalModule } from "@tools/global/global.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//import { ReduxModule } from "./redux/redux/redux.module";
import { StoreModule } from "@ngrx/store";
import { globalStoreReducer } from "./redux/global/global.reducer";
//https://www.intertech.com/Blog/ngrx-tutorial-quickly-adding-ngrx-to-your-angular-6-project/
//import { ReduxComponent } from "./redux/redux/redux.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// convertimos a la clase en un modulo con @NgModule
// cualquier aplicacion Angular se puede ver como un arbol de modulos
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		GlobalModule,
		ComponentsModule,
		//ReduxModule,
		/**
     * StoreModule.provideStore({mainState: mainStoreReducer,
                           otherState: otherReducer}),
     */
		StoreModule.forRoot({
			//applicationState:globalStoreReducer

			stateApp: globalStoreReducer
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 25 //  Retains last 25 states
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
