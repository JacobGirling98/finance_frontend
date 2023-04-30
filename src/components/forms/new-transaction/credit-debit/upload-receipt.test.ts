import {
  flagNewDescriptions,
  formatSainsburysTransactions,
  formatWaitroseTransactions,
  parseSainsburysTransaction,
  parseWaitroseTransaction,
  receiptTransactionToCreditDebit,
} from "./upload-receipt";
import { Description } from "../../../../types/NewMoney";

describe("can split Sainsbury's transaction to separate components", () => {
  test("with single item", () => {
    expect(
      parseSainsburysTransaction("1 Sainsbury's Pure Orange Juice 4x1L £3.50")
    ).toEqual({
      quantity: 1,
      description: "Sainsbury's Pure Orange Juice 4x1L",
      value: 3.5,
    });
  });

  test("with multiple items", () => {
    expect(
      parseSainsburysTransaction(
        "4 Cadbury Dairy Milk Buttons Chocolate Dessert 75g £2.80"
      )
    ).toEqual({
      quantity: 4,
      description: "Cadbury Dairy Milk Buttons Chocolate Dessert 75g",
      value: 2.8,
    });
  });
});

describe("can format multiple transactions", () => {
  test("with multiple transactions across two lines", () => {
    const content =
      "1 Sainsbury's Pure Orange Juice 4x1L £3.50\n" +
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol\n" +
      "250ml £2.00\n" +
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05";

    expect(formatSainsburysTransactions(content)).toEqual([
      "1 Sainsbury's Pure Orange Juice 4x1L £3.50",
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol 250ml £2.00",
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05",
    ]);
  });

  test("with multiple transactions across multiple lines", () => {
    const content =
      "1 Sainsbury's Pure Orange Juice 4x1L £3.50\n" +
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol\n" +
      "250ml\n" +
      "£2.00\n" +
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05";

    expect(formatSainsburysTransactions(content)).toEqual([
      "1 Sainsbury's Pure Orange Juice 4x1L £3.50",
      "1 Dove Men+Care Clean Comfort Anti-Perspirant Deodorant Aerosol 250ml £2.00",
      "1 Sainsbury's Woodland Free Range Medium Eggs x12 £2.05",
    ]);
  });
});

describe("can flag if new description needed", () => {
  const existingDescriptions: Description[] = [
    {
      fullDescription: "Sainsbury's Pure Orange Juice 4x1L",
      shortDescription: "Orange Juice",
    },
    {
      fullDescription: "Sainsbury's Woodland Free Range Medium Eggs x12",
      shortDescription: "Eggs",
    },
    {
      fullDescription: "Peroni Nastro Azzurro Beer Lager Bottles 18x330ml",
      shortDescription: "Peroni",
    },
  ];

  test("all are true if they exist", () => {
    const newDescriptions = [
      {
        quantity: 1,
        description: "Sainsbury's Pure Orange Juice 4x1L",
        value: 3.5,
      },
      {
        quantity: 2,
        description: "Sainsbury's Woodland Free Range Medium Eggs x12",
        value: 4.0,
      },
    ];

    expect(flagNewDescriptions(existingDescriptions, newDescriptions)).toEqual([
      {
        quantity: 1,
        description: "Sainsbury's Pure Orange Juice 4x1L",
        value: 3.5,
        isNewDescription: false,
      },
      {
        quantity: 2,
        description: "Sainsbury's Woodland Free Range Medium Eggs x12",
        value: 4.0,
        isNewDescription: false,
      },
    ]);
  });

  test("multiple new descriptions", () => {
    const newDescriptions = [
      {
        quantity: 1,
        description: "Coca-Cola Original Taste 1.75L",
        value: 2.25,
      },
      {
        quantity: 2,
        description: "Magnum Mini Classic Ice Cream 6x55ml",
        value: 4.0,
      },
      {
        quantity: 3,
        description: "Peroni Nastro Azzurro Beer Lager Bottles 18x330ml",
        value: 18.0,
      },
    ];

    expect(flagNewDescriptions(existingDescriptions, newDescriptions)).toEqual([
      {
        quantity: 1,
        description: "Coca-Cola Original Taste 1.75L",
        value: 2.25,
        isNewDescription: true,
      },
      {
        quantity: 2,
        description: "Magnum Mini Classic Ice Cream 6x55ml",
        value: 4.0,
        isNewDescription: true,
      },
      {
        quantity: 3,
        description: "Peroni Nastro Azzurro Beer Lager Bottles 18x330ml",
        value: 18.0,
        isNewDescription: false,
      },
    ]);
  });
});

test("convert a receipt transaction to a regular transaction", () => {
  expect(
    receiptTransactionToCreditDebit(
      {
        quantity: 1,
        description: "my item",
        value: 10.5,
      },
      "Food",
      "now"
    )
  ).toEqual({
    quantity: 1,
    description: "my item",
    value: 10.5,
    date: "now",
    category: "Food",
  });
});

describe("can split Waitrose transaction to separate components", () => {
  test("with single item", () => {
    expect(
      parseWaitroseTransaction(
        "McVitie's Jaffa Cakes\n" +
          "Product Name\n" +
          "McVitie's Jaffa Cakes\n" +
          "Product Size\n" +
          "30s\n" +
          "Offer\n" +
          "Quantity\n" +
          "Qty:\n" +
          "1Cost:\n" +
          "£2.00"
      )
    ).toEqual({
      quantity: 1,
      description: "McVitie's Jaffa Cakes",
      value: 2.0,
    });
  });

  test("with multiple items", () => {
    expect(
      parseWaitroseTransaction(
        "McVitie's Jaffa Cakes\n" +
          "Product Name\n" +
          "McVitie's Jaffa Cakes\n" +
          "Product Size\n" +
          "30s\n" +
          "Offer\n" +
          "Quantity\n" +
          "Qty:\n" +
          "4Cost:\n" +
          "£8.00"
      )
    ).toEqual({
      quantity: 4,
      description: "McVitie's Jaffa Cakes",
      value: 8.0,
    });
  });
});

describe("can parse multiple waitrose transactions", () => {
  test("without category", () => {
    const transactions =
      "Pringles Original Crisps\n" +
      "Product Name\n" +
      "Pringles Original Crisps\n" +
      "Product Size\n" +
      "200g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "2Cost:\n" +
      "£4.00\n" +
      "Product Image\n" +
      "McVitie's Jaffa Cakes\n" +
      "Product Name\n" +
      "McVitie's Jaffa Cakes\n" +
      "Product Size\n" +
      "30s\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£2.00\n" +
      "Product Image\n" +
      "Waitrose Duchy Wholewheat Penne Pasta\n" +
      "Product Name\n" +
      "Waitrose Duchy Wholewheat Penne Pasta\n" +
      "Product Size\n" +
      "500g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£1.60";

    expect(formatWaitroseTransactions(transactions)).toEqual([
      { quantity: 2, description: "Pringles Original Crisps", value: 4.0 },
      { quantity: 1, description: "McVitie's Jaffa Cakes", value: 2.0 },
      {
        quantity: 1,
        description: "Waitrose Duchy Wholewheat Penne Pasta",
        value: 1.6,
      },
    ]);
  });

  test("with category", () => {
    const transactions =
      "Food Cupboard\n" +
      "Product Image\n" +
      "Pringles Original Crisps\n" +
      "Product Name\n" +
      "Pringles Original Crisps\n" +
      "Product Size\n" +
      "200g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "2Cost:\n" +
      "£4.00\n" +
      "Product Image\n" +
      "McVitie's Jaffa Cakes\n" +
      "Product Name\n" +
      "McVitie's Jaffa Cakes\n" +
      "Product Size\n" +
      "30s\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£2.00\n" +
      "Product Image\n" +
      "Waitrose Duchy Wholewheat Penne Pasta\n" +
      "Product Name\n" +
      "Waitrose Duchy Wholewheat Penne Pasta\n" +
      "Product Size\n" +
      "500g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£1.60";
    expect(formatWaitroseTransactions(transactions)).toEqual([
      { quantity: 2, description: "Pringles Original Crisps", value: 4.0 },
      { quantity: 1, description: "McVitie's Jaffa Cakes", value: 2.0 },
      {
        quantity: 1,
        description: "Waitrose Duchy Wholewheat Penne Pasta",
        value: 1.6,
      },
    ]);
  });

  test("with multiple categories", () => {
    const transactions =
      "Bakery\n" +
      "Product Image\n" +
      "Fitzgeralds 2 Sourdough Baguettes\n" +
      "Product Name\n" +
      "Fitzgeralds 2 Sourdough Baguettes\n" +
      "Product Size\n" +
      "250g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£2.00\n" +
      "Food Cupboard\n" +
      "Product Image\n" +
      "Pringles Original Crisps\n" +
      "Product Name\n" +
      "Pringles Original Crisps\n" +
      "Product Size\n" +
      "200g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "2Cost:\n" +
      "£4.00\n" +
      "Product Image\n" +
      "McVitie's Jaffa Cakes\n" +
      "Product Name\n" +
      "McVitie's Jaffa Cakes\n" +
      "Product Size\n" +
      "30s\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£2.00\n" +
      "Product Image\n" +
      "Waitrose Duchy Wholewheat Penne Pasta\n" +
      "Product Name\n" +
      "Waitrose Duchy Wholewheat Penne Pasta\n" +
      "Product Size\n" +
      "500g\n" +
      "Offer\n" +
      "Quantity\n" +
      "Qty:\n" +
      "1Cost:\n" +
      "£1.60";
    expect(formatWaitroseTransactions(transactions)).toEqual([
      {
        quantity: 1,
        description: "Fitzgeralds 2 Sourdough Baguettes",
        value: 2.0,
      },
      { quantity: 2, description: "Pringles Original Crisps", value: 4.0 },
      { quantity: 1, description: "McVitie's Jaffa Cakes", value: 2.0 },
      {
        quantity: 1,
        description: "Waitrose Duchy Wholewheat Penne Pasta",
        value: 1.6,
      },
    ]);
  });
});
