import { createAccountT } from './../../../@core/types/create.d';

import { Account } from '../../../@core/interfaces/account.interface';
import { AccountService } from './../../../services/account.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  month: FormControl = new FormControl('');
  accounts!: FormGroup;
  column!: FormGroup;
  ngOnInit(): void {
    this.createForm(new Account());
  }

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CreateAccountComponent>
  ) {}

  createForm(account: Account) {
    this.accounts = this.formBuilder.group({
      month: [account.month],
      totalValue: [account.totalValue],
    });
  }

  submit() {
    this.accountService
      .createAccount(this.accounts.value as createAccountT)
      .subscribe({
        complete: () => {
          this.matDialogRef.close();
        },
      });
  }
}
