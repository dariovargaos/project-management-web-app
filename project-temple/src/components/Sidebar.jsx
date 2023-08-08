import { Box, Text, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
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
      {!user.isAnonymous ? (
        <Box
          textAlign="center"
          p="40px 30px"
          borderBottom="1px solid rgba(255,255,255, 0.2)"
        >
          <UserAvatar src={user.photoURL} name={user.displayName} />
          <Text fontWeight="bold">Hey {user.displayName}</Text>
        </Box>
      ) : (
        <Box
          textAlign="center"
          p="40px 30px"
          borderBottom="1px solid rgba(255,255,255, 0.2)"
        >
          <UserAvatar src={user.photoURL} />
          <Text fontWeight="bold">Hey guest</Text>
          <Text fontSize="xs">
            As guest user, you have limited access to the app.
          </Text>
        </Box>
      )}

      <Link as={RouterLink} to="/">
        <Button
          leftIcon={<CalendarIcon />}
          variant="link"
          colorScheme="white"
          size="lg"
        >
          Dashboard
        </Button>
      </Link>
      <Link as={RouterLink} to="/create">
        <Button
          leftIcon={<AddIcon />}
          variant="link"
          colorScheme="white"
          size="lg"
        >
          Create Project
        </Button>
      </Link>
    </Flex>
  );
}
