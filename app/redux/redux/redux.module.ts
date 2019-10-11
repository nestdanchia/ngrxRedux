import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { ReduxComponent } from "./redux.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppReducer } from "../global/combina.reducer";
@NgModule({
	imports: [
		CommonModule,
		BrowserModule
		//StoreModule.forRoot(AppReducer)
	],
	declarations: [ReduxComponent]
	//exports: [ReduxComponent]
})
export class ReduxModule {}
