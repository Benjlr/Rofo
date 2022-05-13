import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Observable, Subject } from 'rxjs';
import { DomPlaceHolder } from 'src/app/shared/domplaceholder.directive';
import { ErrorResponse } from 'src/app/shared/errorResponse';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { PhotoService } from '../photo.service';
import { Rofo } from '../photos-models/rofo';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent implements OnInit {
  @Input() groupId: string;
  uploadedId: string;

  focus: any;
  focus1: any;
  error: string = '';
  isLoading = false;
  success: string = '';
  public onClose: Subject<string>;

  constructor(
    private photoService: PhotoService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  async onSubmit(form: NgForm) {
    if (!this.imageSrc) {
      this.error = 'No image';
      return;
    }

    if (!form.valid) {
      return;
    }

    this.success = '';
    this.error = '';
    this.isLoading = true;

    let addPhotoOb: Observable<{ errors: string; uploadedPhotoId: string }> =
      new Observable<{ errors: string; uploadedPhotoId: string }>();
    addPhotoOb = await this.photoService.UploadPhoto({
      Photo: this.imageSrc,
      Description: form.value.photoDesc,
      GroupId: this.groupId,
    });
    addPhotoOb.subscribe(
      (respData) => {
        this.isLoading = false;
        if (respData.errors) {
          this.error = respData.errors;
        } else {
          this.success = 'Uploaded!';
          this.uploadedId = respData.uploadedPhotoId;
          setTimeout(() => {
            this.activeModal.dismiss();
          }, 1500);
        }
      },
      (err) => {
        console.log(err.message ?? err);
        this.error = err.message ?? err;
        this.isLoading = false;
      }
    );
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
