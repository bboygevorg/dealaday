import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Flip, ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    // <StrictMode>
    <>
      <ToastContainer
        toastClassName="toastContainerBox"
        transition={Flip}
        position="top-left"
      />
      <BrowserRouter>
        <Provider store={store}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </>

    // </StrictMode>
  );
}
