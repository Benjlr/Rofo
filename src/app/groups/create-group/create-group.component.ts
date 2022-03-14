import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from '../group.service';
import { Observable, Subscription } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  focus: any;
  focus1: any;
  public success:boolean = false;
  isLoading = false;
  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;
  private closeSub: Subscription;
  error: string = '';

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

    let groupObs: Observable<string> = new Observable<string>();
    groupObs = this.groupService.CreateGroup(form.value.name, form.value.description);
    groupObs.subscribe(
      (respData: string) => {
        console.log(respData);
        this.isLoading = false;
        if (respData) {
          this.error = respData;
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
  private showSpinner() {
    const alertCompFact = this.cfr.resolveComponentFactory(SpinnerComponent);
    const hostViewRef = this.alertHost.viewcontainerRef;
    const componentRef = hostViewRef.createComponent(alertCompFact);
  }


}
