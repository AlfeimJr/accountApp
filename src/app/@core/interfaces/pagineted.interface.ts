import { transactionsI, accountI } from './account.interface';
export interface paginatedI {
  items: accountI[],
	_page: number,
	_limit: number,
}
