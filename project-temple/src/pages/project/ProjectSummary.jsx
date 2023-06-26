import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";

//components
import UserAvatar from "../../components/UserAvatar";

export default function ProjectSummary({ project }) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{project.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Project due by: {project.dueDate.toDate().toDateString()}</Text>
        <Text>{project.details}</Text>
      </CardBody>
      <CardFooter display="flex" flexDirection="column">
        <Heading size="md" color="color.headingColor">
          {" "}
          Project is assinged to:
        </Heading>
        {project.assignedUsersList.map((user) => (
          <Box key={user.id}>
            <UserAvatar src={user.photoURL} />
          </Box>
        ))}
      </CardFooter>
    </Card>
  );
}
