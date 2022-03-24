import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from '../group.service';
import { Observable, Subscription } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { ErrorResponse } from 'src/app/shared/errorResponse';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  focus: any;
  focus1: any;
  isLoading = false;
  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;
  private closeSub: Subscription;
  errorMessage: string = '';
  successMessage:string ='';

  constructor(
    private groupService: GroupService,

    private cfr: ComponentFactoryResolver

  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.showSpinner();

    let groupObs: Observable<ErrorResponse> = new Observable<ErrorResponse>();
    groupObs = this.groupService.CreateGroup(form.value.name, form.value.description);
    groupObs.subscribe(
      ( respData: ErrorResponse) => {
        console.log(respData);
        this.isLoading = false;
        if (respData.errors) {
          this.errorMessage = respData.errors;
        }
        else{
          this.successMessage = form.value.name + ' created!'
        }
        this.alertHost.viewcontainerRef.clear();
      },
      (err) => {
        console.log(err.message ?? err);
        this.errorMessage = err.message ?? err;
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
