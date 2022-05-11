import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { Group } from '../group-models/Group';
import { GroupService } from '../group.service';
import { InviteModalComponent } from './invite-modal/invite-modal.component';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.css'],
})
export class ViewGroupsComponent implements OnInit {
  constructor(
    private groupService: GroupService,
    private modalService: NgbModal,
    private router: Router,
    private cfr: ComponentFactoryResolver) {

    }

  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;

  error: string = '';
  isLoading = false;

  myGroups: Group[];

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

    this.isLoading = true;
    this.showSpinner();

    this.groupService.GetAllGroups().subscribe(
      (x) => {
        console.log(x);
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

  goToPhotos(group:Group){
    this.groupService.UpdateCurrentGroup(group);
    this.router.navigate(["../photos/view"]);
  }

  openModal(group: Group) {
    const modalRef = this.modalService.open(InviteModalComponent,
      {
        centered: true,
        windowClass: 'myCustomModalClass',
        size: 'md'
        // keyboard: false,
        // backdrop: 'static'
      });

    let data = group;

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }
}
