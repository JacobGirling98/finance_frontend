import { BankTransfer, CreditDebit, Income, PersonalTransfer } from "../../../types/NewMoney";

export const changeSingleTransaction = <T extends CreditDebit | BankTransfer | PersonalTransfer | Income>(
  transaction: T,
  value: string | number,
  field: keyof T
): T => ({ ...transaction, [field]: typeof value === "number" && isNaN(value) ? 0 : value })
