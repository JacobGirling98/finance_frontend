import Button from "../../button/Button"

interface FormButtonsProps {
  closeDialog: () => void
  submit: () => void
}

const FormButtons: React.FC<FormButtonsProps> = ({ closeDialog, submit }) => {
  return (
    <div>
      <Button value="Add" onClick={submit}/>
      <Button value="Cancel" onClick={closeDialog}/>
    </div>
  )
}

export default FormButtons
