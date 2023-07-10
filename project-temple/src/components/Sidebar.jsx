import { Box, Text, List, ListItem, Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { CalendarIcon, AddIcon } from "@chakra-ui/icons";

import UserAvatar from "./UserAvatar";

export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <Flex
      flexDirection="column"
      color="white"
      gap="10px"
      wordBreak="break-word"
    >
      <Box
        textAlign="center"
        p="40px 30px"
        borderBottom="1px solid rgba(255,255,255, 0.2)"
      >
        <UserAvatar src={user.photoURL} name={user.displayName} />
        <Text fontWeight="bold">Hey {user.displayName}</Text>
      </Box>

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
    </Flex>
  );
}
