import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { interval } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {
  fullUrl =  this.data.url;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
               ) { }

  ngOnInit(): void {

  }

}
