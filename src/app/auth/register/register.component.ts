import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  focus;
  focus1;
  focus2;
  error: string = '';
  success: string = '';
  isLoading = false;
  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    this.showSpinner();
    let registerObs: Observable<{ errors: string }> = new Observable<{
      errors: string;
    }>();

    registerObs = this.authService.register(form.value.Username, form.value.email, form.value.password);
    registerObs.subscribe(
      (respData: { errors: string }) => {
        console.log(respData);
        this.isLoading = false;
        if (respData.errors) {
          this.error = respData.errors;
        }
        else{
          this.RequestAccountConfirmationEmail(form);
        }
        this.alertHost.viewcontainerRef.clear();
      },
      (err) => {
        console.log(err.message ?? err);
        this.error = err.message ?? err;
        this.isLoading = false;
        this.alertHost.viewcontainerRef.clear();
      }
    );
  }

  RequestAccountConfirmationEmail(form: NgForm){
    let acoountConfirmObs : Observable< { errors: string } > = new Observable<{ errors: string }>();
    acoountConfirmObs = this.authService.requestConfirmationEmail(form.value.email, form.value.password, ``);
    acoountConfirmObs.subscribe(
      (respData: { errors: string } ) => {
        console.log(respData.errors);
        this.isLoading = false;
        this.alertHost.viewcontainerRef.clear();
        if (respData.errors) {
          this.error = respData.errors;
        }
        else{
          this.success = 'Email sent successfully'
        }
      },
      (err) => {
        console.log(err.status ?? err);
        this.error = (err.status) ?? err;
        this.isLoading = false;
        this.alertHost.viewcontainerRef.clear();
      }
    );
  }

  private showSpinner() {
    const alertCompFact = this.cfr.resolveComponentFactory(SpinnerComponent);
    const hostViewRef = this.alertHost.viewcontainerRef;
    const componentRef = hostViewRef.createComponent(alertCompFact);
  }
}
