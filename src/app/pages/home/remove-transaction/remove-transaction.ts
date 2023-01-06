import { accountI, transactionsI } from '../../../@core/interfaces/account.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateColumnComponent } from '../create-column/create-column.component';
import { AccountService } from '../../../services/account.service';
import { Component, Input, Inject } from '@angular/core';

type dataT = {
  transaction: transactionsI
};

@Component({
  selector: 'app-remove-transaction',
  templateUrl: './remove-transaction.component.html',
  styleUrls: ['./remove-transaction.scss'],
})
export class RemoveTransactionComponent {
  @Input() textContent: string = '';
  column!: accountI;
  trasaction: transactionsI = {
    id: 0,
    category: '',
    data: '',
    value: 0,
    prevision:  '',
    pay: [],
    month:  ''
  }
  constructor(
    private accountService: AccountService,
    private matDialogRef: MatDialogRef<RemoveTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataT
  ) {}

  ngOnInit(): void {
    this.trasaction = this.data.transaction;
    console.log(this.column);
  }

  confirmDelete() {
    this.accountService.deleteTransaction(this.trasaction.id).subscribe({
      complete: ()=>{
        this.matDialogRef.close()
      }
    })
  }
}
