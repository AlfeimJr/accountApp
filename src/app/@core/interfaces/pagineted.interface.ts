import { transactionsI, accountI, Account } from './account.interface';
export interface paginatedI {
  items: accountI[],
	_page: number,
	_limit: number,
}
