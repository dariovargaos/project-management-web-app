import { useCollection } from "../hooks/useCollection";

import { Box, Heading, List, ListItem } from "@chakra-ui/react";

// components
import UserAvatar from "./UserAvatar";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  return (
    <List color="black" fontSize="1.2em" spacing={4}>
      <Box
        fontWeight="bold"
        textAlign="center"
        borderBottom="1px solid black"
        letterSpacing="1px"
      >
        <Heading>All Users</Heading>
        {error && <Box>{error}</Box>}
      </Box>
      {documents &&
        documents.map((user) => (
          <List
            key={user.id}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={4}
          >
            <ListItem>{user.displayName}</ListItem>
            <ListItem>
              <UserAvatar src={user.photoURL} />
            </ListItem>
          </List>
        ))}
    </List>
  );
}
