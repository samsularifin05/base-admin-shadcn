import { GeneralError, MaintenanceError, NotFoundError } from "@/pages";
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
      { path: "*", Component: NotFoundError },
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
          Component: (
            await import("../pages/admin/masterData/masterUser/masterUser")
          ).default
        })
      }
    ]
  },
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("../pages/admin/login/loginForm")).default
    })
  },
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "*", Component: NotFoundError }
]);

export default router;
