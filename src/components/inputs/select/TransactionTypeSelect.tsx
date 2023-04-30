import { Dispatch, FC } from "react";
import Select from "./Select";
import { TransactionType } from "../../../types/NewMoney";

interface TransactionTypeSelectProps {
  value: TransactionType;
  setValue: Dispatch<TransactionType>;
}

const TransactionTypeSelect: FC<TransactionTypeSelectProps> = ({
  value,
  setValue,
}) => {
  const enumFrom = (key: string): TransactionType => {
    switch (key) {
      case "Credit":
        return TransactionType.CREDIT;
      case "Debit":
        return TransactionType.DEBIT;
      case "Bank Transfer":
        return TransactionType.BANK_TRANSFER;
      case "Personal Transfer":
        return TransactionType.PERSONAL_TRANSFER;
      case "Income":
        return TransactionType.INCOME;
      default:
        return TransactionType.CREDIT;
    }
  };

  return (
    <Select
      value={value.valueOf()}
      onChange={(s) => setValue(enumFrom(s))}
      options={Object.values(TransactionType)}
    />
  );
};

export default TransactionTypeSelect;
