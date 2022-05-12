import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() showBackdrop;

  constructor() {
    this.showBackdrop= true;

   }

  ngOnInit(): void {
    if(!this.showBackdrop){

    }
  }

}
