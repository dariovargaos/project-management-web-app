import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OnlineUsers from "../components/OnlineUsers";

export default function DashboardLayout() {
  const { user } = useAuthContext();
  return (
    user && (
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.100">
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          bg="whatsapp.300"
          minH={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <Sidebar />
        </GridItem>

        <GridItem
          as="main"
          colSpan={{ base: 6, lg: 3, xl: 4 }}
          p={{ base: "20px", lg: "30px" }}
        >
          <Navbar />
          <Outlet />
        </GridItem>

        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 1, xl: 1 }}
          minH={{ lg: "100vh" }}
          bg="#fbfbfb"
          p={{ base: "20px", lg: "30px" }}
        >
          <OnlineUsers />
        </GridItem>
      </Grid>
    )
  );
}
