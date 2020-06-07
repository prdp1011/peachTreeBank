import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapitalService {

  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
    return this.httpClient.post<any>('https://file.io/?expires=1w', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  createLoan(arr): Observable<any>  {
    localStorage.setItem('loan', JSON.stringify(arr));
    return of({success: true}).pipe(delay(1000));
  }
  getLoan(): Observable<any> {
    const arr = JSON.parse(localStorage.getItem('loan'));
    return of(arr).pipe(delay(1000));
  }
}
