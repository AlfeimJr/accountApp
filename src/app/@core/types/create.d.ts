import { accountI, transactionsI } from './../interfaces/account.interface'
export type createAccountT = Omit<accountI, 'id'>

export type createTransactionT = Omit<transactionsI, 'id'>
