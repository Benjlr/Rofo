import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupedObservable, interval, Observable, timer } from 'rxjs';
import { Group } from 'src/app/groups/group-models/Group';
import { GroupService } from 'src/app/groups/group.service';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { ErrorResponse } from 'src/app/shared/errorResponse';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { PhotoModule } from '../photo.module';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent implements OnInit {
  @Input() fromParent;

  focus: any;
  focus1: any;
  error: string = '';
  isLoading = false;
  success: string = '';
  @ViewChild(DomPlaceHolder, { static: false })
  alertHost: DomPlaceHolder;

  constructor(
    private photoService: PhotoService,
    private groupService: GroupService,
    public activeModal: NgbActiveModal,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.showSpinner();

    let signInObs: Observable<ErrorResponse> = new Observable<ErrorResponse>();
    signInObs = this.photoService.UploadPhoto({
      Photo: this.imageSrc,
      Description: form.value.photoDesc,
      GroupId: this.groupService.ActiveGroup.securityStamp,
    });
    signInObs.subscribe(
      (respData: ErrorResponse) => {
        console.log(respData);
        this.isLoading = false;
        if (respData.errors) {
          this.error = respData.errors;
        } else {
          this.alertHost.viewcontainerRef.clear();
          this.success = 'Uploaded!';
          interval(1800).subscribe(x=> this.photoService.GetPhotos());
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

  myFile: File;
  imageSrc: ArrayBuffer;

  UpdateFile(files: File[]) {
    if (files && files.length > 0) {
      this.myFile = files[0];
      var reader = new FileReader();
      reader.onload = (fr) => (this.imageSrc = reader.result as ArrayBuffer);
      reader.readAsDataURL(this.myFile);
    }
  }
}
