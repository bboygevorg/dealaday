import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    // <StrictMode>
    <>
      <BrowserRouter>
        <Provider store={store}>
          <HelmetProvider>
            <App />
            <ToastContainer />
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </>

    // </StrictMode>
  );
}
