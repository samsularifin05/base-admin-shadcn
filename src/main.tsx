import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, Toaster } from "./components/index.ts";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reduxStore/store.ts";
import { FormResetProvider } from "./components/form/FormResetContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <FormResetProvider>
          <RouterProvider router={router} />
        </FormResetProvider>
        <Toaster />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
