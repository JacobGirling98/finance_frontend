/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Entity } from "../Api"
import {
  BankTransferStandingOrder,
  CreditDebitStandingOrder,
  Frequency,
  IncomeStandingOrder,
  PersonalTransferStandingOrder,
  StandingOrder
} from "../StandingOrders"

const toFormattedfrequency = (
  unit: StandingOrder["frequency"]
): Frequency["frequency"] => (unit === "MONTHLY" ? "Months" : "Weeks")

export const toBankTransferStandingOrder = (
  standingOrder: Entity<StandingOrder>
): Entity<BankTransferStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.date,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequency: toFormattedfrequency(standingOrder.domain.frequency),
    quantity: standingOrder.domain.quantity,
    recipient: standingOrder.domain.recipient!,
    value: standingOrder.domain.value
  }
})

export const toCreditDebitStandingOrder = (
  standingOrder: Entity<StandingOrder>
): Entity<CreditDebitStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.date,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequency: toFormattedfrequency(standingOrder.domain.frequency),
    quantity: standingOrder.domain.quantity,
    value: standingOrder.domain.value
  }
})

export const toPersonalTransferStandingOrder = (
  standingOrder: Entity<StandingOrder>
): Entity<PersonalTransferStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.date,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequency: toFormattedfrequency(standingOrder.domain.frequency),
    value: standingOrder.domain.value,
    inbound: standingOrder.domain.inbound!,
    outbound: standingOrder.domain.outbound!
  }
})

export const toIncomeStandingOrder = (
  standingOrder: Entity<StandingOrder>
): Entity<IncomeStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.date,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequency: toFormattedfrequency(standingOrder.domain.frequency),
    value: standingOrder.domain.value,
    source: standingOrder.domain.source!
  }
})
