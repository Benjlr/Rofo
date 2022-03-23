import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DomPlaceHolder } from "./domplaceholder.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations:[
    DomPlaceHolder,
    SpinnerComponent
  ],
  imports:[
    CommonModule
  ],
  providers:[],
  exports:[
    DomPlaceHolder,
    SpinnerComponent,
    CommonModule
  ]
})

export class SharedModule{}
