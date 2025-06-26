import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FlashProvider } from "./context/FlashContext";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FlashProvider>
      <App />
    </FlashProvider>
  </StrictMode>
);
