/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Entity } from "../Api";
import { BankTransferStandingOrder, CreditDebitStandingOrder, Frequency, IncomeStandingOrder, PersonalTransferStandingOrder, StandingOrder } from "../StandingOrders";

const toFormattedFrequencyUnit = (unit: StandingOrder["frequencyUnit"]): Frequency["frequencyUnit"] => unit === "MONTHLY" ? "Months" : "Weeks"

export const toBankTransferStandingOrder = (standingOrder: Entity<StandingOrder>): Entity<BankTransferStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.nextDate,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequencyUnit: toFormattedFrequencyUnit(standingOrder.domain.frequencyUnit),
    quantity: standingOrder.domain.quantity,
    recipient: standingOrder.domain.recipient!,
    value: standingOrder.domain.value
  }
})

export const toCreditDebitStandingOrder = (standingOrder: Entity<StandingOrder>): Entity<CreditDebitStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.nextDate,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequencyUnit: toFormattedFrequencyUnit(standingOrder.domain.frequencyUnit),
    quantity: standingOrder.domain.quantity,
    value: standingOrder.domain.value
  }
})

export const toPersonalTransferStandingOrder = (standingOrder: Entity<StandingOrder>): Entity<PersonalTransferStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.nextDate,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequencyUnit: toFormattedFrequencyUnit(standingOrder.domain.frequencyUnit),
    value: standingOrder.domain.value,
    inbound: standingOrder.domain.inbound!,
    outbound: standingOrder.domain.outbound!
  }
})

export const toIncomeStandingOrder = (standingOrder: Entity<StandingOrder>): Entity<IncomeStandingOrder> => ({
  id: standingOrder.id,
  domain: {
    category: standingOrder.domain.category,
    date: standingOrder.domain.nextDate,
    description: standingOrder.domain.description,
    frequencyQuantity: standingOrder.domain.frequencyQuantity,
    frequencyUnit: toFormattedFrequencyUnit(standingOrder.domain.frequencyUnit),
    value: standingOrder.domain.value,
    source: standingOrder.domain.source!
  }
})