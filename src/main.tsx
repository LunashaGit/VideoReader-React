import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App";
import FleurTwo from "./assets/Video/fleurstwo.mp4";
import Fleur from "./assets/Video/fleurs.mp4";
import "./assets/Css/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App src={Fleur} />
  </React.StrictMode>
);
