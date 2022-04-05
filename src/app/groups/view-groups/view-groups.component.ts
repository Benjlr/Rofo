import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { Group } from '../group-models/Group';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.css'],
})
export class ViewGroupsComponent implements OnInit {
  constructor(private groups: GroupService,
    private cfr: ComponentFactoryResolver) {}

  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;

  error: string = '';
  isLoading = false;

  myGroups: Group[];

  ngOnInit(): void {
    this.isLoading = true;
    // this.showSpinner();

    this.groups.GetAllGroups().subscribe(
      (x) => {
        this.isLoading = false;

        if (x.errors) {
          this.error = x.errors;
          this.myGroups = [];
        } else {
          this.myGroups = x.groups;
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
