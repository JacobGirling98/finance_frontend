import { useRoutes } from "react-router-dom";
import NewMoneyPage from "../views/NewMoneyPage/NewMoneyPage";
import StandingOrdersPage from "../views/StandingOrdersPage";
import ViewMoneyPage from "../views/ViewMoneyPage/ViewMoneyPage";

interface NavType {
  name: string;
  path: string;
  current: boolean;
  element: JSX.Element;
}

export const navigation: NavType[] = [
  {
    name: "Add Transaction",
    path: "/",
    current: false,
    element: <NewMoneyPage />,
  },
  {
    name: "View Spending",
    path: "/view",
    current: false,
    element: <ViewMoneyPage />,
  },
  {
    name: "Standing Orders",
    path: "/standing",
    current: false,
    element: <StandingOrdersPage />,
  },
];

const useRouter = () => useRoutes(navigation);

export default useRouter;
