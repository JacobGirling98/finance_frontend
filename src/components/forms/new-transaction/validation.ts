import {BankTransfer, CreditDebit, Income, PersonalTransfer, ValidationErrors} from "../../../types/NewMoney";

export interface ValidationErrorsWithFlag<T> {
  errors: ValidationErrors<T>;
  hasError: boolean;
}

export const isNotBlank = (value?: string): boolean => !!value && value !== ""

export const validateIsNotBlank = (field: string, value?: string): string => isNotBlank(value) ? "" : `${field} is required`

export const greaterThanZero = (value: number): boolean => value > 0

export const validateGreaterThanZero = (field: string, value: number) => greaterThanZero(value) ? "" : `${field} must be greater than zero`

export const validateCreditDebit = (transaction: CreditDebit): ValidationErrors<CreditDebit> => ({
  date: validateIsNotBlank("Date", transaction.date),
  category: validateIsNotBlank("Category", transaction.category),
  value: validateGreaterThanZero("Value", transaction.value),
  quantity: validateGreaterThanZero("Quantity", transaction.quantity),
  description: validateIsNotBlank("Description", transaction.description)
})

export const validateBankTransfer = (transaction: BankTransfer): ValidationErrors<BankTransfer> => ({
  recipient: validateIsNotBlank("Recipient", transaction.recipient),
  date: validateIsNotBlank("Date", transaction.date),
  category: validateIsNotBlank("Category", transaction.category),
  value: validateGreaterThanZero("Value", transaction.value),
  quantity: validateGreaterThanZero("Quantity", transaction.quantity),
  description: validateIsNotBlank("Description", transaction.description)
})

export const validatePersonalTransfer = (transaction: PersonalTransfer): ValidationErrors<PersonalTransfer> => ({
  inbound: validateIsNotBlank("Inbound", transaction.inbound),
  outbound: validateIsNotBlank("Outbound", transaction.outbound),
  date: validateIsNotBlank("Date", transaction.date),
  category: validateIsNotBlank("Category", transaction.category),
  value: validateGreaterThanZero("Value", transaction.value),
  description: validateIsNotBlank("Description", transaction.description)
})

export const validateIncome = (transaction: Income): ValidationErrors<Income> => ({
  source: validateIsNotBlank("Source", transaction.source),
  date: validateIsNotBlank("Date", transaction.date),
  category: validateIsNotBlank("Category", transaction.category),
  value: validateGreaterThanZero("Value", transaction.value),
  description: validateIsNotBlank("Description", transaction.description)
})