import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {
          <PersistGate persistor={persistor} loading={null}>
          <ToastContainer 
            theme="dark"
            position="top-center"
            autoClose={3000}  // Ensure autoClose is set
            closeOnClick
            pauseOnHover={false}
            hideProgressBar={true}
            newestOnTop={true}
            closeButton={true}
            icon={false}
          />
            <App />
          </PersistGate>
        }
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
