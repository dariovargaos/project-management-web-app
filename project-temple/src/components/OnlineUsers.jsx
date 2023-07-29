import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

import {
  Box,
  Heading,
  List,
  ListItem,
  Avatar,
  AvatarBadge,
  Flex,
  Button,
} from "@chakra-ui/react";

// components
import UserAvatar from "./UserAvatar";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");

  //probat za svakog usera napravit link prvo umjesto liste
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
            <Link to={`/user/${user.id}`}>
              <Button variant="link">
                <ListItem color="black">{user.displayName}</ListItem>
              </Button>
            </Link>

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
