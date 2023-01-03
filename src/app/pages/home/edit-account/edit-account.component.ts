import { transactionsI } from '../../../@core/interfaces/account.interface';
import { accountI } from '../../../@core/interfaces/account.interface'

import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

type dataT = {
  account: transactionsI
}
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent {
  account!: transactionsI

  constructor(@Inject(MAT_DIALOG_DATA) public data: dataT) {}

  ngOnInit(): void {
    this.account = this.data.account
  }

}
