import { accountI } from './../../../@core/interfaces/account.interface';
import { createT } from './../../../@core/types/create.d';
import { AccountService } from './../../../services/account.service';
import {
  transactionsI,
  Column,
} from '../../../@core/interfaces/account.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject } from '@angular/core';

type dataT = {
  account: accountI;
  transactions: transactionsI[];
};

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent {
  column!: FormGroup;
  account!: accountI;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CreateColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataT
  ) {}

  ngOnInit(): void {
    this.createForm(new Column());
    this.account = this.data.account;
  }

  createForm(account: Column) {
    this.column = this.formBuilder.group({
      data: account.data,
      category: account.category,
      value: account.value,
      pay: account.pay,
      month: account.month,
    });
  }

  onSubmit() {
    this.accountService
      .createColumn(this.account.id, this.column.value as createT)
      .subscribe((account: any) => {});
  }
}
