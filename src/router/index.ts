import { GeneralError, MaintenanceError, NotFoundError } from "@/pages";
import { SignIn, SignIn2 } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("../components/app-shell");
      return { Component: AppShell.default };
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("../pages/dashboard")).default
        })
      }
    ]
  },
  { path: "/sign", Component: SignIn },
  { path: "/sign2", Component: SignIn2 },
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError }
]);

export default router;
