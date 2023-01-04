import { createT } from './../@core/types/create.d';
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

  createAccount(account: createT){
    return this.http.post(apiUrl + '/account', account)
  }

  createColumn(id: number, transaction: createT){
    return this.http.post(apiUrl + `/account/${id}/transactions`, transaction)
  }

  deleteColumn(){}
}
