import { Box, Text, List, ListItem, ListIcon, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CalendarIcon } from "@chakra-ui/icons";

// images
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <Box
        fontWeight="bold"
        textAlign="center"
        letterSpacing="1px"
        p="40px 30px"
        borderBottom="1px solid rgba(255,255,255, 0.2)"
      >
        {/*avatar and username here later */}
        <Text>Hey user</Text>
      </Box>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={CalendarIcon} />
          Dashboard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/create">
          <ListIcon as={CalendarIcon} />
          Create Project
        </NavLink>
      </ListItem>
    </List>

    // <Box
    //   w="300px"
    //   minW="300px"
    //   bg="primaryColor"
    //   minH="100vh"
    //   boxSizing="border-box"
    //   position="relative"
    //   color="#fff"
    // >
    //   <Box position="fixed" w="inherit">
    //     <Box
    //       fontWeight="bold"
    //       textAlign="center"
    //       letterSpacing="1px"
    //       p="40px 30px"
    //       borderBottom="1px solid rgba(255,255,255, 0.2)"
    //     >
    //       {/*avatar and username here later */}
    //       <Text>Hey user</Text>
    //     </Box>
    //     <Box as="nav" mt="80px" ml="20px" className="links">
    //       <List>
    //         <ListItem mt="10px">
    //           <NavLink
    //             to="/"
    //             style={{
    //               display: "flex",
    //               padding: "10px",
    //               textDecoration: "none",
    //               width: "100%",
    //               color: "#fff",
    //               boxSizing: "border-box",
    //             }}
    //           >
    //             <ListIcon
    //               as={CalendarIcon}
    //               mr="10px"
    //               style={{ filter: "invert(100%" }}
    //             />
    //             Dashboard
    //           </NavLink>
    //         </ListItem>
    //         <ListItem>
    //           <NavLink
    //             to="/create"
    //             style={{
    //               display: "flex",
    //               padding: "10px",
    //               textDecoration: "none",
    //               width: "100%",
    //               color: "#fff",
    //               boxSizing: "border-box",
    //             }}
    //           >
    //             <ListIcon
    //               as={CalendarIcon}
    //               mr="10px"
    //               style={{ filter: "invert(100%" }}
    //             />
    //             <Box as="span">New Project</Box>
    //           </NavLink>
    //         </ListItem>
    //       </List>
    //     </Box>
    //   </Box>
    // </Box>
  );
}
