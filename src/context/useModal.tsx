import React, {Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {ProviderProps} from "../Providers";

interface IModalContext {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  body: string;
  toggleSuccessModal: (body: string) => void;
  toggleErrorModal: (body: string) => void;
  isSuccess: boolean
}

const defaultState: IModalContext = {
  isOpen: false,
  setIsOpen: () => {},
  body: "",
  toggleSuccessModal: (body: string) => {},
  toggleErrorModal: (body: string) => {},
  isSuccess: true
}

const ModalContext = React.createContext<IModalContext>(defaultState)

export const ModalProvider: FC<ProviderProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [body, setBody] = useState("")
  const [isSuccess, setIsSuccess] = useState(true)

  const toggle = (body: string) => {
    setBody(body)
    setIsOpen(true)
  }

  const toggleSuccessModal = (body: string) => {
    toggle(body)
    setIsSuccess(true)
  }

  const toggleErrorModal = (body: string) => {
    toggle(body)
    setIsSuccess(false)
  }

  return(
    <ModalContext.Provider value={{isOpen, setIsOpen, body, toggleSuccessModal, toggleErrorModal, isSuccess}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)