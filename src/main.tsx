import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider, Toaster } from './components/index.ts';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './pages/errors/errorBoundary.tsx';
import { Suspense } from 'react';
import SkeletonLoader from './pages/errors/skeletonLoading.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Suspense fallback={<SkeletonLoader />}>
            <RouterProvider router={router} />
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
