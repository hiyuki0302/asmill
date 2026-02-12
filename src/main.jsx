import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CsvImporter from "./Importer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <CsvImporter />
  </React.StrictMode>,
);
