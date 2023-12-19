/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Entity } from "../Api"
import {
  BankTransfer,
  CreditDebit,
  Income,
  PersonalTransfer
} from "../NewMoney"
import { Transaction } from "../ViewMoney"

export const toBankTransfer = (
  transaction: Entity<Transaction>
): Entity<BankTransfer> => ({
  id: transaction.id,
  domain: {
    category: transaction.domain.category,
    date: transaction.domain.date,
    description: transaction.domain.description,
    quantity: transaction.domain.quantity,
    recipient: transaction.domain.recipient!,
    value: transaction.domain.value
  }
})

export const toCreditDebit = (
  transaction: Entity<Transaction>
): Entity<CreditDebit> => ({
  id: transaction.id,
  domain: {
    category: transaction.domain.category,
    date: transaction.domain.date,
    description: transaction.domain.description,
    quantity: transaction.domain.quantity,
    value: transaction.domain.value
  }
})

export const toPersonalTransfer = (
  transaction: Entity<Transaction>
): Entity<PersonalTransfer> => ({
  id: transaction.id,
  domain: {
    category: transaction.domain.category,
    date: transaction.domain.date,
    description: transaction.domain.description,
    value: transaction.domain.value,
    inbound: transaction.domain.inbound!,
    outbound: transaction.domain.outbound!
  }
})

export const toIncome = (transaction: Entity<Transaction>): Entity<Income> => ({
  id: transaction.id,
  domain: {
    category: transaction.domain.category,
    date: transaction.domain.date,
    description: transaction.domain.description,
    value: transaction.domain.value,
    source: transaction.domain.source!
  }
})
