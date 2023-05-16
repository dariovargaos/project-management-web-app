import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

const theme = {
  colors: {
    headingColor: "#444",
    textColor: "#999",
    primaryColor: "#8d69f1",
    highlightColor: "#d13267",
    bgColor: "#f4f4f4",
  },
  styles: {
    global: {
      body: {
        margin: "0",
        fontSize: "1.1em",
        background: "#f4f4f4",
      },
      ul: {
        margin: "0",
        padding: "0",
        listStyleType: "none",
      },
      li: {
        margin: "0",
        padding: "0",
      },
      p: {
        margin: "0",
        padding: "0",
      },
      h1: {
        margin: "0",
        padding: "0",
        fontSize: "1em",
        color: "#444",
        display: "inline-block",
      },
      h2: {
        margin: "0",
        padding: "0",
        fontSize: "1em",
        color: "#444",
        display: "inline-block",
      },
      h3: {
        margin: "0",
        padding: "0",
        fontSize: "1em",
        color: "#444",
        display: "inline-block",
      },
      h4: {
        margin: "0",
        padding: "0",
        fontSize: "1em",
        color: "#444",
        display: "inline-block",
      },
      button: {
        background: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        color: "#8d69f1",
        cursor: "pointer",
        fontSize: "1em",
        border: "1px solid #8d69f1",
        _hover: {
          color: "#fff",
          background: "#8d69f1",
        },
      },
      label: {
        display: "block",
        margin: "24px auto",
      },
      span: {
        display: "block",
        marginBottom: "6px",
      },
      input: {
        padding: "8px 6px",
        fontSize: "1em",
        color: "#777",
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid #ddd",
        borderRadius: "4px",
      },
      textarea: {
        padding: "8px 6px",
        fontSize: "1em",
        color: "#777",
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid #ddd",
        borderRadius: "4px",
        minHeigth: "160px",
      },
    },
  },
  fonts: {
    body: "Poppins",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
