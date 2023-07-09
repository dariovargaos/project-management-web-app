import { Box, Text, List, ListItem, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { CalendarIcon, AddIcon } from "@chakra-ui/icons";

import UserAvatar from "./UserAvatar";

export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <Box
        fontWeight="bold"
        textAlign="center"
        letterSpacing="1px"
        p="40px 30px"
        borderBottom="1px solid rgba(255,255,255, 0.2)"
      >
        <UserAvatar src={user.photoURL} name={user.displayName} />
        <Text>Hey {user.displayName}</Text>
      </Box>
      <ListItem>
        <NavLink to="/">
          <Button
            leftIcon={<CalendarIcon />}
            variant="link"
            colorScheme="white"
            size="lg"
          >
            Dashboard
          </Button>
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/create">
          <Button
            leftIcon={<AddIcon />}
            variant="link"
            colorScheme="white"
            size="lg"
          >
            Create Project
          </Button>
        </NavLink>
      </ListItem>
    </List>
  );
}
