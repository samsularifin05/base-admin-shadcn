import { GeneralError, MaintenanceError, NotFoundError } from "@/pages";
import { LoginForm } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin",
    lazy: async () => {
      const AppShell = await import("../components/app-shell");
      return { Component: AppShell.default };
    },
    children: [
      {
        index: true,
        path: "dashboard",
        lazy: async () => ({
          Component: (await import("../pages/dashboard")).default
        })
      },
      { path: "", Component: NotFoundError }
    ]
  },
  { path: "/", Component: LoginForm },
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "*", Component: NotFoundError }
]);

export default router;
