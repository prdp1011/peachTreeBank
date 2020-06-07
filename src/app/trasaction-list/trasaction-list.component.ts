import { TransactionService } from './../services/transaction.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trasaction-list',
  templateUrl: './trasaction-list.component.html',
  styleUrls: ['./trasaction-list.component.scss']
})
export class TrasactionListComponent implements OnInit {
  displayedColumns = ['date', 'beneficiaryName', 'paymentType', 'amount'];
  uiTable = [
    {key: this.displayedColumns[0], value: 'Date', footer: ''},
    {key: this.displayedColumns[1], value: 'Beneficiary Name', footer: ''},
    {key: this.displayedColumns[2], value: 'Payment Type', footer: 'Total'},
    {key: this.displayedColumns[3], value: 'Amount', footer: '456'},
  ];
  transactions = [];
  sum = 0;
  loading: boolean;
  buttonLoading: boolean;
  dataSource = new MatTableDataSource<any>();
  form: FormGroup;
  constructor(private trnsac: TransactionService) { }
  ngOnInit(): void {
    this.loading = true;
    this.trnsac.getTransaction().subscribe(res => {
      this.transactions = res || [];
      this.dataSource = new MatTableDataSource(this.transactions);
      this.loading = false;
    });
  }
  addForm() {

  }
  submitTrn(res) {
    this.buttonLoading = true;
    this.transactions.push(res);
    this.transactions.forEach(t => {
      t.amount = +t.amount.toFixed(2);
      this.sum += t.amount;
    });
    this.trnsac.createTransaction(this.transactions).subscribe(
      () => {
        this.dataSource = new MatTableDataSource(this.transactions);
        this.buttonLoading = false;
      },
      () => this.buttonLoading = false
      );
  }



}
