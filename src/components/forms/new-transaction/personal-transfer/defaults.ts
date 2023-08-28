import { PersonalTransfer, ValidationErrors } from "../../../../types/NewMoney";

export const emptyPersonalTransfer = (
  date: string,
  category: string
): PersonalTransfer => ({
  ...{
    category,
    date,
    description: "",
    inbound: "",
    outbound: "",
    value: 0,
  },
});

export const emptyPersonalTransferErrors = (): ValidationErrors<PersonalTransfer> => ({
  ...{
    category: "",
    date: "",
    description: "",
    inbound: "",
    outbound: "",
    value: "",
  },
});