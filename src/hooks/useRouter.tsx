import { useRoutes } from "react-router-dom";
import HomePage from "../views/HomePage/HomePage";

interface NavType {
  name: string;
  path: string;
  current: boolean;
  element: JSX.Element;
}

export const navigation: NavType[] = [
  {
    name: "Add Transaction",
    path: "/new",
    current: false,
    element: <p>New</p>,
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

const useRouter = () => {
  const landingRoute = {
    path: "/",
    element: <HomePage />,
  };

  return useRoutes([landingRoute, ...navigation]);
};

export default useRouter;
