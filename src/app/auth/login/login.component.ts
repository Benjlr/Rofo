import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  focus2: any;
  error: string = '';

  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;
  private closeSub: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {}
}
