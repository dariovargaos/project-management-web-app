import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

//components
import Navbar from "../components/Navbar";

export default function LoginSignupLayout() {
  return (
    <Box bg="gray.100" minH="100vh" display="flex" flexDir="column" gap={100}>
      <Navbar />
      <Outlet />
    </Box>
  );
}
