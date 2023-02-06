import { finalize, Observable, switchMap, tap } from 'rxjs';
import { AccountService } from './../../services/account.service';
import { paginatedI } from '../../@core/interfaces/pagineted.interface';
import {
  accountI,
  transactionsI,
} from '../../@core/interfaces/account.interface';
import { RemoveTransactionComponent } from './remove-transaction/remove-transaction';
import { CreateColumnComponent } from './create-column/create-column.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RemoveAccountComponent } from './remove-account/remove-account.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'data',
    'category',
    'value',
    'month',
    'pay',
    'edit',
    'delete',
  ];
  values: number[] = [];
  value: number = 0;
  sumValue: number[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  accounts: accountI[] = [];
  account!: accountI;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: paginatedI = {
    items: [],
    _page: 1,
    _limit: 10,
  };
  panelOpenState = false;
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAccount().subscribe();
  }
  openDialog() {
    this.dialog
      .open(CreateAccountComponent, {
        width: '500px',
        data: {
          items: this.pagination.items,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.getAccount().subscribe();
      });
  }

  openDeleteTransaction(transactions: transactionsI) {
    this.dialog
      .open(RemoveTransactionComponent, {
        data: {
          transaction: transactions,
        },
        width: '500px',
      })
      .afterClosed()
      .subscribe((result: { isRemoved: boolean }) => {
        if (result.isRemoved == true) {
          this.values = [];
          this.value = 0;
          this.getAccount().subscribe();
        }
      });
  }

  openDeleteAccount(account: accountI) {
    this.dialog
      .open(RemoveAccountComponent, {
        data: {
          account: account,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.getAccount().subscribe();
      });
  }

  openCreateColumn(launch: accountI) {
    this.dialog
      .open(CreateColumnComponent, {
        width: '500px',
        data: {
          account: launch,
        },
      })
      .afterClosed()
      .subscribe((result: { isCreate: boolean }) => {
        if (result.isCreate == true) {
          this.values = [];
          this.value = 0;
          this.getAccount().subscribe();
        }
      });
  }

  openEdit(account: accountI) {
    this.dialog
      .open(EditAccountComponent, {
        data: {
          account: account,
        },
        width: '500px',
      })
      .afterClosed()
      .subscribe((response: { isEdit: boolean }) => {
        if (response.isEdit == true) {
          this.values = [];
          this.value = 0;
          this.getAccount().subscribe();
        }
      });
  }

  public setPaginationData(data: accountI[]): void {
    this.pagination.items = data;
  }
  private getFilters(): { [key: string]: string | number } {
    return {
      _page: this.pagination._page,
      _limit: this.pagination._limit,
    };
  }

  getAccount(): Observable<accountI> {
    return new Observable((observer) => {
      this.accountService.getAccount(this.getFilters()).subscribe((account) => {
        this.accounts = account;
        this.setPaginationData(account);
        this.someValues();
      });
      observer.next();
    });
  }

  someValues() {
    this.pagination.items.forEach(item => {
      item.totalValue = 0;
      item.transactions.forEach(transaction => {
        item.totalValue += transaction.value;
      });
    });

  }
}
