import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  const { user } = useAuthContext();
  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="gray.100">
      {user && (
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          minH={{ lg: "100vh" }}
          bg="color.primaryColor"
          p={{ base: "20px", lg: "30px" }}
        >
          <Sidebar />
        </GridItem>
      )}
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
