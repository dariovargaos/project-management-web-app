import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
