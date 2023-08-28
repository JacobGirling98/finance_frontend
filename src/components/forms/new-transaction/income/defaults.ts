import { Income, ValidationErrors } from "../../../../types/NewMoney";

export const emptyIncome = (date: string, category: string): Income => ({
  ...{
    category,
    date,
    description: "",
    source: "",
    value: 0,
  },
});

export const emptyIncomeErrors = (): ValidationErrors<Income> => ({
  ...{
    category: "",
    date: "",
    description: "",
    source: "",
    value: "",
  },
});
