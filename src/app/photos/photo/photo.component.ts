import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/shared/errorResponse';
import { IntersectionObserverService } from '../intersection-observer.service';
import { PhotoService } from '../photo.service';
import { Rofo } from '../photos-models/rofo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent {
  @Input() myPhoto: Rofo;
  @ViewChild('observer', { read: ElementRef })
  observer: ElementRef;

  drafting: boolean = false;
  isImageLoading: boolean = true;
  imageToShow: string;
  errorMessage: string;

  constructor(
    private photoService: PhotoService,
    private inter: IntersectionObserverService
  ) {}

  ngAfterViewInit(): void {
    this.inter
      .createAndObserve(this.observer)
      .pipe(
        filter((isVisible: boolean) => isVisible),
        switchMap(async (x) => this.PhotoSource())
      )
      .subscribe();
  }

  async PhotoSource() {
    await this.photoService
      .GetPhotoData(this.myPhoto.securityStamp)
      .then((x) => {
        x.subscribe((result) => {
          this.imageToShow = result.data;
          this.isImageLoading = false;
        });
      });
  }

  DraftComment(): void {
    this.drafting = true;
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let commentObs: Observable<ErrorResponse> = new Observable<ErrorResponse>();
    commentObs = await this.photoService.UploadComment(
      form.value.commentInput,
      this.myPhoto.securityStamp
    );
    commentObs.subscribe(
      (respData: ErrorResponse) => {
        if (respData.errors) {
          console.log(respData);
          this.errorMessage = respData.errors;
        }
        this.photoService
          .GetComments(this.myPhoto.securityStamp)
          .then(async (CommentResult) => {
            CommentResult.subscribe((comments) => {
              this.myPhoto.comments = comments.comments;
            });
          });
      },
      (err) => {
        console.log(err);
        this.errorMessage = err;
      }
    );
    this.drafting = false;
  }

  clearError() {
    this.errorMessage = null;
  }
}
