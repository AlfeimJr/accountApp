import { transactionsI, accountI } from '../@core/interfaces/account.interface';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getProducts(filters: any): Observable<transactionsI[]>{
    return this.http
    .get<transactionsI[]>(apiUrl + 'account', {
      params: filters,
    })
    .pipe(map((response: transactionsI[]) => response));
  }

  createAccount(account: Omit<accountI, 'id'>){
    return this.http.post(apiUrl + 'account', account)
  }

  createColumn(transaction: Omit<transactionsI, 'id'>){
    return this.http.post(apiUrl + `transactions`, transaction)
  }

  deleteColumn(){}
}
