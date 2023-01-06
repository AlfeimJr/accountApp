import { createTransactionT, createAccountT } from './../@core/types/create.d';
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
  getAccount(filters: any): Observable<accountI[]>{
    return this.http
    .get<accountI[]>(apiUrl + '/account?_embed=transactions', {params: filters})
    .pipe(map((response: accountI[]) => response));
  }

  createAccount(account: createAccountT){
    return this.http.post(apiUrl + '/account', account)
  }

  createColumn( transaction: createTransactionT){
    return this.http.post(apiUrl + `/transactions`, transaction)
  }

  editColumn(id: number, transaction: transactionsI){
    return this.http.patch(apiUrl + `/transactions/${id}`, transaction)
  }

  deleteTransaction(id: number ): Observable<transactionsI>{
    return this.http.delete<transactionsI>(apiUrl + `/transactions/${id}` )
  }

  deleteAccount(id:number): Observable<accountI>{
    return this.http.delete<accountI>(apiUrl + `/account/${id}`)
  }
}
