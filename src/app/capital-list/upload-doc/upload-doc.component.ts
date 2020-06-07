import { MatSnackBar } from '@angular/material/snack-bar';
import { CapitalService } from './../../services/capital.service';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.scss']
})
export class UploadDocComponent implements OnInit {
  form: FormGroup;
  files: any = [];
  isLoading: boolean;
  @Output() submitLoan = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private snackbar: MatSnackBar,
              private fb: FormBuilder,
              private cServ: CapitalService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    if (this.form.valid){
      if (this.files.length) {
        this.isLoading =true;
        // tslint:disable-next-line: deprecation
        const all: any = forkJoin(...this.files.map((e) => this.uploadFile(e)));
        all.subscribe(res => {
          this.submitLoan.emit({...this.form.value, files: res});
          this.formGroupDirective.resetForm();
          this.files = [];
          this.isLoading = false;
        }, () => this.isLoading = false );
      } else {
        this.snackbar.open('Upload atleast one proof');
      }
    }

  }
  initForm() {
    this.form = this.fb.group({
      document: ['', Validators.required],
      amount: [null, Validators.required]
    });
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      const obj = {
        progress: 0,
        customSize: this.fileSize(item.size),
        name: item.name,
        file: item
      };
      this.files.push(obj);
    }
  }

  fileSize(bytes) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  uploadFile(file) {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file.file);
    return this.cServ.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            const {customSize, name} = file;
            return  {...event.body, name, customSize};
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.snackbar.open(`${file.name} upload failed.`, 'OK', {
          duration: 2000,
        });
        return throwError(error);
      }));
  }
}
