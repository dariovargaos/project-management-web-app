import { Grid, GridItem, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OnlineUsers from "../components/OnlineUsers";

export default function RootLayout() {
  const { user } = useAuthContext();
  return (
    <Box bg="gray.100" minH="100vh">
      <Grid templateColumns="repeat(6, 1fr)">
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
        <GridItem as="main" colSpan={{ base: 6, lg: 3, xl: 4 }} p="40px">
          <Navbar />
          <Outlet />
        </GridItem>
        {user && (
          <GridItem
            as="aside"
            colSpan={{ base: 6, lg: 1, xl: 1 }}
            minH={{ lg: "100vh" }}
            bg="#fbfbfb"
            p={{ base: "20px", lg: "30px" }}
            borderLeft="1px solid black"
          >
            <OnlineUsers />
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}
