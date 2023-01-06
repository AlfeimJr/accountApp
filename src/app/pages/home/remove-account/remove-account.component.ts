import { accountI } from './../../../@core/interfaces/account.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from './../../../services/account.service';
import { Component, Inject } from '@angular/core';

type dataT = {
  account: accountI;
};

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.scss'],
})
export class RemoveAccountComponent {
  account!: accountI

  constructor(
    private accountService: AccountService,
    private matDialogRef: MatDialogRef<RemoveAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataT
  ) {}

  ngOnInit(): void {
    this.account = this.data.account
  }

  confirmDelete() {
    this.accountService.deleteAccount(this.account.id).subscribe({
      complete: ()=>{
        this.matDialogRef.close()
      }
    })
  }
}
