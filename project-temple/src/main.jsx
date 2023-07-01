import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const colors = {
  color: {
    headingColor: "#444",
    textColor: "#999",
    primaryColor: "#8d69f1",
    highlightColor: "#d13267",
    bgColor: "#f4f4f4",
  },
};
const fonts = {
  body: "Tahoma",
};

// const components = {
//   Progress: {
//     baseStyle: {
//       filledTrack: (props) => ({
//         bg: getColor(props.value),
//         transition: "width 0.5s ease-out",
//       }),
//     },
//   },
// };

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  </ChakraProvider>
);
