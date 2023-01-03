export interface transactionsI {
  id: number,
  data: string;
  category: string;
  value: string;
  prevision: string;
  pay: string;
  month: string;
}

export interface accountI {
  id:number
  month: string;
}

export class Account {
  month: string = '';
  accounts: accountI[] = []
}

export class Column {
  accounts: [] = []
  data: string = '';
  category: string = '';
  description: string = '';
  value: string = '';
  prevision: string = '';
  pay: string = '';
  month: string = '';
}
