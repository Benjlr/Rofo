import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { ErrorResponse } from 'src/app/shared/errorResponse';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { Group } from '../../group-models/Group';
import { GroupService } from '../../group.service';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.css']
})
export class InviteModalComponent implements OnInit {

  @Input() fromParent;

  selectedGroup: Group;

  focus: any;
  focus1: any;
  error: string = '';
  isLoading = false;
  success: string = '';
  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;

  constructor(
    private groupService: GroupService,
    public activeModal: NgbActiveModal,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.selectedGroup = this.fromParent;
    console.log(this.selectedGroup);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.showSpinner();


    let signInObs: Observable<ErrorResponse> = new Observable<ErrorResponse>();
    signInObs = this.groupService.InviteToGroup(
      form.value.email,
      form.value.emailMessage,
      this.selectedGroup);
    signInObs.subscribe(
      (respData: ErrorResponse) => {
        console.log(respData);
        this.isLoading = false;
        if (respData.errors) {
          this.error = respData.errors;
        }
        else{
          this.alertHost.viewcontainerRef.clear();
          this.success = 'Invited!'
        }
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
