import { payOptionsI } from './pay-options.interface';
export interface transactionsI {
  id: number;
  data: string;
  category: string;
  value: number;
  prevision: string;
  pay: payOptionsI[];
  month: string;
}

export interface accountI {
  id: number;
  month: string;
  transactions: transactionsI[];
  totalValue: number;
}

export class Account {
  month: string = '';
  accounts: accountI[] = [];
  totalValue: number = 0;
}

export class Column {
  data: string = '';
  category: string = '';
  description: string = '';
  value: number = 0;
  prevision: string = '';
  pay: string = '';
  month: string = '';
}
