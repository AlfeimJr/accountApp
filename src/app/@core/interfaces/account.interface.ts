
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
  transactions:transactionsI[]
}

export class Account {
  month: string = '';
  accounts: accountI[] = []
}

export class Column {
  data: string = '';
  category: string = '';
  accountId: number = 2;
  description: string = '';
  value: string = '';
  prevision: string = '';
  pay: string = '';
  month: string = '';
}
