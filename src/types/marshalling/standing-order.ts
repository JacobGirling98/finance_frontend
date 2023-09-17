/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Entity } from "../Api";
import { BankTransferStandingOrder, Frequency, StandingOrder } from "../StandingOrders";

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