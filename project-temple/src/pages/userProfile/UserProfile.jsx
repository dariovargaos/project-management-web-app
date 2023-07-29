import { useParams, Link } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

//components
import UserAvatar from "../../components/UserAvatar";

import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Button,
  List,
  ListItem,
  Progress,
} from "@chakra-ui/react";
export default function UserProfile() {
  const { id } = useParams();
  const { document, error } = useDocument("users", id);
  const { documents } = useCollection("projects");

  if (!document || !documents) {
    return <Progress size="sm" isIndeterminate colorScheme="whatsapp" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const userProjects = documents.filter((project) =>
    project.assignedUsersList.some((userMap) => userMap.id === id)
  );

  return (
    <Box>
      <Flex align="center" gap="12px">
        <Heading size="md">{document.displayName} profile</Heading>
        <Avatar>
          <UserAvatar src={document.photoURL} name={document.displayName} />
        </Avatar>
      </Flex>
      <Text>Currently on these projects: </Text>
      <List>
        {userProjects.map((project) => (
          <ListItem key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <Button variant="link">{project.name}</Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
