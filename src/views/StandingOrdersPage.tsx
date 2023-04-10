import React, { FC } from "react";
import Table from "../components/table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { StandingOrder } from "../types/StandingOrders";
import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const StandingOrdersPage: FC = () => {
  const { data } = useQuery<StandingOrder[]>("standingOrders", async () => {
    const response = await axios.get(`${BASE_URL}/standing-orders`);
    return response.data;
  });

  const columnHelper = createColumnHelper<StandingOrder>();

  const columns = [
    columnHelper.accessor("nextDate", {
      header: () => <span>Next Date</span>,
    }),
    columnHelper.accessor("value", {
      header: () => <span>Value</span>,
    }),
    columnHelper.accessor("frequency", {
      header: () => <span>Frequency</span>,
    }),
    columnHelper.accessor("outgoing", {
      cell: (x) => x.getValue().toString(),
      header: () => <span>Outgoing</span>,
    }),
    columnHelper.accessor("transactionType", {
      header: () => <span>Transaction Type</span>,
    }),
    columnHelper.accessor("description", {
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("category", {
      header: () => <span>Category</span>,
    }),
    columnHelper.accessor("quantity", {
      header: () => <span>Quantity</span>,
    }),
  ];

  return (
    <>
      {data && (
        <Table data={data} columns={columns}/>
      )}
    </>
  );
};

export default StandingOrdersPage;
