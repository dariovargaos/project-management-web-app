import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  List,
  ListItem,
  Heading,
  Divider,
} from "@chakra-ui/react";

export default function ProjectList({ projects }) {
  return (
    <Box>
      {projects.length === 0 && <Text>No projects yet!</Text>}
      <SimpleGrid p="10px" spacing={10} minChildWidth="250px">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <Card>
              <CardHeader>
                <Heading size="md" color="color.headingColor">
                  {project.name}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text color="color.textColor">
                  Due by: {project.dueDate.toDate().toDateString()}
                </Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <List display="flex" flexWrap="wrap" gap="6px">
                  {project.assignedUsersList.map((user) => (
                    <ListItem key={user.photoURL}>
                      <UserAvatar src={user.photoURL} name={user.displayName} />
                    </ListItem>
                  ))}
                </List>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
