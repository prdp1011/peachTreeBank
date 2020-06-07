import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  createTransaction(arr) {
    localStorage.setItem('transaction', JSON.stringify(arr));
    return of({success: true}).pipe(delay(1000));
  }
  getTransaction() {
    const arr = JSON.parse(localStorage.getItem('transaction'));
    return of(arr).pipe(delay(1000));
  }
}
