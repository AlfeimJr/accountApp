import { accountI, transactionsI } from '../../../@core/interfaces/account.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateColumnComponent } from './../create-column/create-column.component';
import { AccountService } from './../../../services/account.service';
import { Component, Input, Inject } from '@angular/core';

type dataT = {
  account: transactionsI[];
  column: accountI;
};

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() textContent: string = '';
  column!: accountI;
  account: transactionsI[] = [];
  constructor(
    private accountService: AccountService,
    private matDialogRef: MatDialogRef<CreateColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataT
  ) {}

  ngOnInit(): void {
    this.column = this.data.column;
    this.account = this.data.account;
    console.log(this.column);
  }

  // confirmDelete() {
  //   this.account[0].accounts = this.account[0].accounts.filter((account) => {
  //     if (account == this.column) {
  //       this.account[0].accounts.shift();
  //       this.accountService
  //         .createColumn(this.account[0].id, this.account[0])
  //         .subscribe((column) => this.matDialogRef.close());
  //     }
  //   });
  // }
}
