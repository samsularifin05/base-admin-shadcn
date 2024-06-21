import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, Toaster } from "./components";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reduxStore/store.ts";
import { ThemeWrapper } from "./components/theme/themeWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ThemeWrapper>
          <RouterProvider router={router} />
        </ThemeWrapper>
        <Toaster />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
