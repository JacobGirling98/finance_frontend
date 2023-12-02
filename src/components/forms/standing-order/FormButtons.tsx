import Button from "../../button/Button"

interface FormButtonsProps {
  closeDialog: () => void
  submit: () => void
}

const FormButtons: React.FC<FormButtonsProps> = ({ closeDialog, submit }) => {
  return (
    <div>
      <Button onClick={submit}>Add</Button>
      <Button onClick={closeDialog}>Cancel</Button>
    </div>
  )
}

export default FormButtons
