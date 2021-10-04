import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceHolder]'
})
export class DomPlaceHolder {

  constructor(public viewcontainerRef: ViewContainerRef){

  }

}
