import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Error from "./router/Error.jsx";
import "./index.css";
import { ContextProvider } from "./Context/ContextProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Error>
      <body>
        <ContextProvider>
          <App className="container_index" />
        </ContextProvider>
      </body>
    </Error>
  </StrictMode>
);
