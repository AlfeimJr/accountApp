import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { payOptionsI } from './../../../@core/interfaces/pay-options.interface';
import { Column } from './../../../@core/interfaces/account.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from './../../../services/account.service';
import { transactionsI } from '../../../@core/interfaces/account.interface';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

type dataT = {
  account: transactionsI;
};
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent {
  account!: transactionsI;
  column!: FormGroup;
  payOptions: payOptionsI[] = [
    { label: 'Pendente', class: 'pending' },
    { label: 'Pago', class: 'pay' },
  ];
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
  filtredMonths!: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dataT,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EditAccountComponent>
  ) {}

  ngOnInit(): void {
    this.account = this.data.account;
    this.account.category;
    this.createForm(new Column());
    this.isFiltredMonths()
  }

  createForm(collumn: Column) {
    this.column = this.formBuilder.group({
      data: this.account.data,
      category: this.account.category,
      value: this.account.value,
      pay: this.account.pay,
      month: this.account.month,
    });
  }

  editTransaction() {
    this.accountService
      .editColumn(this.account.id, this.column.value)
      .subscribe({
        next: () => {
          this.matDialogRef.close();
        },
      });
  }

  isFiltredMonths(){
    this.filtredMonths = this.column.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.month;
        return name ? this._filter(name as string) : this.months.slice();
      })
    );
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
