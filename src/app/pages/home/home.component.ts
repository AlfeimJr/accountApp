import { AccountService } from './../../services/account.service';
import { paginatedI } from '../../@core/interfaces/pagineted.interface';
import { accountI, transactionsI } from '../../@core/interfaces/account.interface';
import { AlertComponent } from './alert/alert.component';
import { CreateColumnComponent } from './create-column/create-column.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

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
    'delete'

  ];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  accounts: accountI[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: paginatedI = {
    items: [],
    _page: 1,
    _limit: 10,
  };
  account!: [{accountI: accountI[]}]
  panelOpenState = false;
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  openDialog() {
    this.dialog.open(CreateAccountComponent, {
      width: '500px',
      data: {
        items: this.pagination.items
      },
    }).afterClosed().subscribe(result =>{
      this.getProducts()
    });
  }

  openAlert(accountI: transactionsI[], column: accountI){
    this.dialog.open(AlertComponent,{
      data: {
        account: accountI,
        column: column
      },
      width: '500px'
    }).afterClosed().subscribe(result =>{

      this.getProducts()
    });
  }

  openCreateColumn(account: transactionsI){
    this.dialog.open(CreateColumnComponent, {
      width: '500px',
      data: {
        account: account
      }
    }).afterClosed().subscribe(result =>{

      this.getProducts()
    });
  }

  openEdit(account: accountI){
    this.dialog.open(EditAccountComponent, {
      data: {
        account: account
      }
    }).afterClosed().subscribe(result =>{
      this.getProducts()
    })
  }

  public setPaginationData(data: transactionsI[]): void {
    this.pagination.items = data
  }
  private getFilters(): { [key: string]: string | number } {
    return {
      _page: this.pagination._page,
      _limit: this.pagination._limit,
    };
  }

  getProducts() {
    this.accountService.getProducts(this.getFilters()).subscribe({
      next: (accounts) => {
        this.setPaginationData(accounts);
      },
      complete: () => {},
    });
  }
}
