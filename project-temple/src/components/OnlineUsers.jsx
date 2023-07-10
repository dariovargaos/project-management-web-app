import { useCollection } from "../hooks/useCollection";

import {
  Box,
  Heading,
  List,
  ListItem,
  Avatar,
  AvatarBadge,
  Flex,
} from "@chakra-ui/react";

// components
import UserAvatar from "./UserAvatar";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  return (
    <Flex flexDir="column" gap="10px" wordBreak="break-word">
      <Box textAlign="center" borderBottom="1px solid black">
        <Heading size="lg">All Users</Heading>
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
            <Avatar>
              <UserAvatar src={user.photoURL} name={user.displayName} />
              {user.online && (
                <AvatarBadge
                  width="1.1em"
                  h="1.1em"
                  bg="green.500"
                ></AvatarBadge>
              )}
            </Avatar>
          </List>
        ))}
    </Flex>
  );
}
