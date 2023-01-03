import { transactionsI } from './account.interface';
export interface paginatedI {
  items: transactionsI[],
	_page: number,
	_limit: number,
}
