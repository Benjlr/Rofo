import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../AuthData/AuthenticateResponse';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  error: string = '';
  isLoading = false;
  success: string = '';
  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.success = params.accountConfirmed;
    }, null);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.showSpinner();

    let signInObs: Observable<AuthResponse> = new Observable<AuthResponse>();
    signInObs = this.authService.login(form.value.email, form.value.password);
    signInObs.subscribe(
      (respData: AuthResponse) => {
        console.log(respData);
        this.isLoading = false;
        if (respData.errors) {
          this.error = respData.errors;
        }
        this.alertHost.viewcontainerRef.clear();
        this.router.navigate(['groups/view'])
      },
      (err) => {
        console.log(err.message ?? err);
        this.error = err.message ?? err;
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
