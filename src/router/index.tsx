import { GeneralError, MaintenanceError, NotFoundError } from "@/pages";
import { LoginForm } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin",
    lazy: async () => {
      const AppShell = await import("../components/theme/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <NotFoundError />,
    children: [
      {
        index: true,
        path: "dashboard",
        lazy: async () => ({
          Component: (await import("../pages/admin/dashboard")).default
        })
      },
      {
        path: "master-user",
        lazy: async () => ({
          Component: (await import("../pages/admin/masterData/masterUser"))
            .default
        })
      }
    ]
  },
  { path: "/", Component: LoginForm },
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "*", Component: NotFoundError }
]);

export default router;
