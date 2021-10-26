import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  error: string = '';
  success: string = '';

  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;
  private closeSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.success = params.accountConfirmed
        }
, null)}

  onSubmit(form: NgForm) {

  }
}


