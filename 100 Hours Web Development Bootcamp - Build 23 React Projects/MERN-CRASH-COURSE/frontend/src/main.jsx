import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserProvider>
  </StrictMode>
);
