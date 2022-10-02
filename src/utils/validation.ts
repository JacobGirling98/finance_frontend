import {
  BankTransfer,
  CreditDebit, Income,
  PersonalTransfer,
  Transaction,
  TransactionType,
  ValidationErrors
} from "../types/NewMoney";

export interface ValidationErrorsWithFlag<T> {
  errors: ValidationErrors<T>;
  hasError: boolean;
}

export const isNotBlank = (value?: string): boolean => !!value && value !== ""

export const validateIsNotBlank = (field: string, value?: string): string => isNotBlank(value) ? "" : `${field} is required`

export const greaterThanZero = (value: number): boolean => value > 0

export const validateGreaterThanZero = (field: string, value: number) => greaterThanZero(value) ? "" : `${field} must be greater than zero`

export const validateCreditDebit = (transaction: CreditDebit): ValidationErrors<CreditDebit> => {
  const errors: ValidationErrors<CreditDebit> = {
    date: validateIsNotBlank("Date", transaction.date),
    category: validateIsNotBlank("Category", transaction.date),
    value: validateGreaterThanZero("Value", transaction.value),
    quantity: validateGreaterThanZero("Quantity", transaction.quantity),
    description: validateIsNotBlank("Description", transaction.description)
  };
  return {
    ...errors,
  }
}

export const validateBankTransfer = (transaction: BankTransfer): ValidationErrorsWithFlag<BankTransfer> => {
  const errors: ValidationErrors<BankTransfer> = {
    recipient: validateIsNotBlank("Recipient", transaction.recipient),
    date: validateIsNotBlank("Date", transaction.date),
    category: validateIsNotBlank("Category", transaction.date),
    value: validateGreaterThanZero("Value", transaction.value),
    quantity: validateGreaterThanZero("Quantity", transaction.quantity),
    description: validateIsNotBlank("Description", transaction.description)
  };
  return {
    errors,
    hasError: false
  }
}

export const validatePersonalTransfer = (transaction: PersonalTransfer): ValidationErrorsWithFlag<PersonalTransfer> => {
  const errors: ValidationErrors<PersonalTransfer> = {
    inbound: validateIsNotBlank("Inbound", transaction.inbound),
    outbound: validateIsNotBlank("Outbound", transaction.outbound),
    date: validateIsNotBlank("Date", transaction.date),
    category: validateIsNotBlank("Category", transaction.date),
    value: validateGreaterThanZero("Value", transaction.value),
    description: validateIsNotBlank("Description", transaction.description)
  };
  return {
    errors,
    hasError: false
  }
}

export const validateIncome = (transaction: Income): ValidationErrorsWithFlag<Income> => {
  const errors: ValidationErrors<Income> = {
    source: validateIsNotBlank("Source", transaction.source),
    date: validateIsNotBlank("Date", transaction.date),
    category: validateIsNotBlank("Category", transaction.date),
    value: validateGreaterThanZero("Value", transaction.value),
    description: validateIsNotBlank("Description", transaction.description)
  };
  return {
    errors,
    hasError: false
  }
}

export const validate = (transaction: Transaction, type: TransactionType): ValidationErrors<Transaction> => {
  switch (type) {
    case TransactionType.CREDIT:
      return validateCreditDebit(transaction as CreditDebit)
    default:
      return validateCreditDebit(transaction as CreditDebit)
  }
}