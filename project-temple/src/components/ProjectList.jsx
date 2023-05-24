import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import {
  Box,
  SimpleGrid,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  List,
  ListItem,
  Heading,
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
                <Heading fontSize="1.5em">{project.name}</Heading>
              </CardHeader>
              <CardBody borderBottom="1px solid black" w="80%">
                <Text>Due by: {project.dueDate.toDate().toDateString()}</Text>
              </CardBody>
              <CardFooter>
                <List>
                  {project.assignedUsersList.map((user) => (
                    <ListItem key={user.photoURL}>
                      <UserAvatar src={user.photoURL} />
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
