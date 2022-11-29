import {
  flagNewDescriptions,
  formatTransactions,
  parseSainsburysTransaction,
  receiptTransactionToCreditDebit
} from "./upload-receipt";
import {Description} from "../../../../types/NewMoney";


describe("can split Sainsbury's transaction to separate components", () => {
  test("with single item", () => {
    expect(parseSainsburysTransaction("1 Sainsbury's Pure Orange Juice 4x1L £3.50")).toEqual({
      quantity: 1,
      description: "Sainsbury's Pure Orange Juice 4x1L",
      value: 3.50
    })
  });

  test("with multiple items", () => {
    expect(parseSainsburysTransaction("4 Cadbury Dairy Milk Buttons Chocolate Dessert 75g £2.80")).toEqual({
      quantity: 4,
      description: "Cadbury Dairy Milk Buttons Chocolate Dessert 75g",
      value: 2.80
    })
  });
})

describe("can format multiple transactions", () => {
  test("with multiple transactions across two lines", () => {
    const content = "1 Sainsbury's Pure Orange Juice 4x1L £3.50\n" +
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol\n" +
      "250ml £2.00\n" +
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05"

    expect(formatTransactions(content)).toEqual([
      "1 Sainsbury's Pure Orange Juice 4x1L £3.50",
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol 250ml £2.00",
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05"
    ])
  });

  test("with multiple transactions across multiple lines", () => {
    const content = "1 Sainsbury's Pure Orange Juice 4x1L £3.50\n" +
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol\n" +
      "250ml\n" +
      "£2.00\n" +
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05"

    expect(formatTransactions(content)).toEqual([
      "1 Sainsbury's Pure Orange Juice 4x1L £3.50",
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol 250ml £2.00",
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05"
    ])
  });
});

describe("can flag if new description needed", () => {
  const existingDescriptions: Description[] = [
    {fullDescription: "Sainsbury's Pure Orange Juice 4x1L", shortDescription: "Orange Juice"},
    {fullDescription: "Sainsbury's Woodland Free Range Medium Eggs x12", shortDescription: "Eggs"},
    {fullDescription: "Peroni Nastro Azzurro Beer Lager Bottles 18x330ml", shortDescription: "Peroni"},
  ]

  test("all are true if they exist", () => {
    const newDescriptions = [
      {quantity: 1, description: "Sainsbury's Pure Orange Juice 4x1L", value: 3.50},
      {quantity: 2, description: "Sainsbury's Woodland Free Range Medium Eggs x12", value: 4.00}
    ]

    expect(flagNewDescriptions(existingDescriptions, newDescriptions)).toEqual([
      {quantity: 1, description: "Sainsbury's Pure Orange Juice 4x1L", value: 3.50, isNewDescription: false},
      {
        quantity: 2,
        description: "Sainsbury's Woodland Free Range Medium Eggs x12",
        value: 4.00,
        isNewDescription: false
      }
    ])
  });

  test("multiple new descriptions", () => {
    const newDescriptions = [
      {quantity: 1, description: "Coca-Cola Original Taste 1.75L", value: 2.25},
      {quantity: 2, description: "Magnum Mini Classic Ice Cream 6x55ml", value: 4.00},
      {quantity: 3, description: "Peroni Nastro Azzurro Beer Lager Bottles 18x330ml", value: 18.00},
    ]

    expect(flagNewDescriptions(existingDescriptions, newDescriptions)).toEqual([
      {quantity: 1, description: "Coca-Cola Original Taste 1.75L", value: 2.25, isNewDescription: true},
      {quantity: 2, description: "Magnum Mini Classic Ice Cream 6x55ml", value: 4.00, isNewDescription: true},
      {
        quantity: 3,
        description: "Peroni Nastro Azzurro Beer Lager Bottles 18x330ml",
        value: 18.00,
        isNewDescription: false
      },
    ])
  });
})

test("convert a receipt transaction to a regular transaction", () => {
  expect(receiptTransactionToCreditDebit({
    quantity: 1,
    description: "my item",
    value: 10.50
  }, "Food", "now")).toEqual({
    quantity: 1,
    description: "my item",
    value: 10.50,
    date: "now",
    category: "Food"
  })
});