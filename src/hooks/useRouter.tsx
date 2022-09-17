import { useRoutes } from "react-router-dom";
import NewMoneyPage from "../views/NewMoneyPage/NewMoneyPage";

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
    element: <p>View</p>,
  },
  {
    name: "Standing Orders",
    path: "/standing",
    current: false,
    element: <p>Standing</p>,
  },
];

const useRouter = () => useRoutes(navigation);

export default useRouter;
