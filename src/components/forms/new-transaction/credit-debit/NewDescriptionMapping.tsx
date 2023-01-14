import React, {FC, useState} from "react";
import Select from "../../../inputs/Select";
import {Description, ReceiptTransaction} from "../../../../types/NewMoney";
import Button from "../../../button/Button";

interface NewDescriptionMappingProps {
  transactions: ReceiptTransaction[],
  options: string[];
  onCreate: (s: Description) => void;
  finishReceiptUpload: () => void;
  addNewDescriptionMapping: (description: Description) => void;
}

interface DescriptionsAndIndices {
  description: Description;
  index: number;
}

const NewDescriptionMapping: FC<NewDescriptionMappingProps> = (
  {
    transactions, options, onCreate, finishReceiptUpload, addNewDescriptionMapping
  }
) => {
  const indicesRequired = transactions
    .map((transaction, index) => ({transaction, index}))
    .filter(transaction => transaction.transaction.isNewDescription)
    .map(transaction => transaction.index)

  const [newDescriptions, setNewDescriptions] = useState<DescriptionsAndIndices[]>(indicesRequired.map(index => ({
    index,
    description: {
      fullDescription: transactions[index].description,
      shortDescription: ""
    }
  })))
  const [index, setIndex] = useState<number>(0)

  const handleCreate = (shortDescription: string) => {
    const newDescription: Description = {
      fullDescription: transactions[index].description,
      shortDescription: shortDescription
    }
    onCreate(newDescription)
  }

  const handleNewDescription = (description: string) => {
    const newDescription: Description = {
      ...newDescriptions[index].description,
      shortDescription: description
    }
    setNewDescriptions(prevState => prevState.map((desc, stateIndex) =>
      stateIndex === index ? {
        ...desc,
        description: newDescription
      } : desc))
    addNewDescriptionMapping(newDescription)
  }

  const handleNext = () => {
    if (newDescriptions.filter(desc => desc.description.shortDescription === "").length === 0) {
      finishReceiptUpload()
    } else {
      setIndex(prevState => prevState + 1)
    }
  }

  const isLastNewDescription = index === newDescriptions.length - 1

  return (
    <>
      {newDescriptions.length > 0 && (
        <>
          <div className="flex justify-center">
            <div className="text-text-light dark:text-text-dark my-2 overflow-auto flex-wrap">
              {newDescriptions[index].description.fullDescription}
            </div>
          </div>
          <Select
            title="Description"
            selected={newDescriptions[index].description.shortDescription}
            setSelected={handleNewDescription}
            options={options}
            allowCreate={true}
            onCreate={handleCreate}
            showAllOptions={false}
          />
          <div className="flex justify-center mt-4">
            <Button
              value="Back"
              onClick={() => setIndex(prevState => prevState - 1)}
              disabled={index === 0}
            />
            <Button
              value={isLastNewDescription ? "Finish" : "Next"}
              onClick={handleNext}
              disabled={newDescriptions[index].description.shortDescription === ""}
            />
          </div>
        </>
      )}
    </>
  )
}

export default NewDescriptionMapping;