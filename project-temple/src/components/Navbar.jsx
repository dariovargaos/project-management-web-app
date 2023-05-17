import { Link } from "react-router-dom";
import { Box, List, ListItem, Image, Button } from "@chakra-ui/react";

//images
import Temple from "../assets/temple.svg";

export default function Navbar() {
  return (
    <Box width="100%" p="30px 0" boxSizing="border-box" mb="80px">
      <List
        display="flex"
        margin="0 auto"
        alignItems="center"
        justifyContent="flex-end"
      >
        <ListItem
          fontWeight="bold"
          color="headingColor"
          letterSpacing="1px"
          display="flex"
          alignItems="center"
          mr="auto"
        >
          <Image
            src={Temple}
            alt="Temple logo"
            mr="10px"
            w="36px"
            mt="-8px"
            sx={{ filter: "invert(25%)" }}
          />
          <Box as="span">Temple</Box>
        </ListItem>
        <ListItem color="#333" textDecoration="none" mr="20px">
          <Link to="/login">Login</Link>
        </ListItem>
        <ListItem color="#333" textDecoration="none" mr="20px">
          <Link to="/signup">Signup</Link>
        </ListItem>
        <ListItem>
          <Button>Logout</Button>
        </ListItem>
      </List>
    </Box>
  );
}
