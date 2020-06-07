import { CapitalService } from './../services/capital.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DocViewerComponent } from '../tabs/components/doc-viewer/doc-viewer.component';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-capital-list',
  templateUrl: './capital-list.component.html',
  styleUrls: ['./capital-list.component.scss']
})
export class CapitalListComponent implements OnInit {
  displayedColumns = ['date', 'doc', 'preview', 'amount', 'status'];
  uiTable = [
    {key: this.displayedColumns[0], value: 'Date'},
    {key: this.displayedColumns[3], value: 'Amount'},
    {key: this.displayedColumns[4], value: 'Status'},
    {key: this.displayedColumns[1], value: 'Document'}
  ];
  transactions = [];
  loading: boolean;
  dataSource = new MatTableDataSource();
  constructor(private domSanitizer: DomSanitizer,
              public dialog: MatDialog,
              private capServ: CapitalService) { }

  ngOnInit(): void {
    this.loading = true;
    this.capServ.getLoan().subscribe(res => {
      this.transactions = res || [];
      this.dataSource = new MatTableDataSource(this.transactions);
      this.loading = false;
    });
  }
  addList(list) {
    this.transactions.push({
      date: new Date(),
      doc: list.document,
      preview: list.files,
      amount: list.amount,
      status: 'Pending'
    });
    this.dataSource = new MatTableDataSource(this.transactions);
    this.capServ.createLoan(this.transactions).subscribe();
  }
  previewDoc(link) {
    const kurl = `https://docs.google.com/gview?url=${link}&embedded=true`;
    const url = this.domSanitizer.bypassSecurityTrustResourceUrl(kurl) as any;

    const dialogRef = this.dialog.open(DocViewerComponent, {
      width: window.screen.width - 100  + 'px',
      data: {url}
    });
  }

}

