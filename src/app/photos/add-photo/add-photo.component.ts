import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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
    signInObs = this.photoService.UploadPhoto(this.imageSrc);
    signInObs.subscribe(
      (respData: ErrorResponse) => {
        console.log(respData);
        this.isLoading = false;
        if (respData.errors) {
          this.error = respData.errors;
        }
        this.alertHost.viewcontainerRef.clear();
        this.success = 'Uploaded!';
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
  imageSrc: string|ArrayBuffer;

  UpdateFile(e: File[]) {
    this.myFile = e[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.myFile);
  }
}
