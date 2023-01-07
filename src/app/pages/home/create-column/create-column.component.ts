import { Observable } from 'rxjs';
import { accountI } from './../../../@core/interfaces/account.interface';
import { createTransactionT } from './../../../@core/types/create.d';
import { AccountService } from './../../../services/account.service';
import {
  transactionsI,
  Column,
} from '../../../@core/interfaces/account.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
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
  myControl = new FormControl<string>('');
  months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  isCreate: boolean = false;
  filtredMonths!: Observable<string[]>;
  payOptions: string[] = ['Pendente', 'Pago'];
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CreateColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataT
  ) {}

  ngOnInit(): void {
    this.createForm(new Column());
    this.account = this.data.account;

    this.filtredMonths = this.column.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.month;
        return name ? this._filter(name as string) : this.months.slice();
      })
    );
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
      .createColumn({
        ...this.column.value,
        accountId: this.account.id,
      } as createTransactionT)
      .subscribe({
        next: (account: any) => {
          this.accountService.editColumn(account.id, account).subscribe();
          this.isCreate = true
          this.matDialogRef.close({
            isCreate: this.isCreate
          });
        },
      });
  }

  displayFn(month: string): string {
    return month && month ? month : '';
  }

  private _filter(month: string): string[] {
    const filterValue = month.toLowerCase();

    return this.months.filter((month) =>
      month.toLowerCase().includes(filterValue)
    );
  }
}
