import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  List,
  ListItem,
  Text,
  Flex,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

//components
import UserAvatar from "../../components/UserAvatar";

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <Box>
      <Heading size="sm" color="color.headingColor">
        Project Comments
      </Heading>

      {project.comments.length > 0 &&
        project.comments.map((comment) => (
          <Card key={comment.id} mb="10px">
            <CardHeader display="flex" alignItems="center" gap="8px">
              <UserAvatar src={comment.photoURL} />
              <Text>{comment.displayName}</Text>
            </CardHeader>
            <CardBody>
              <Text color="color.textColort">date here</Text>
              <Text color="color.textColort">{comment.content}</Text>
            </CardBody>
          </Card>
        ))}

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Add new comment:</FormLabel>
          <Textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            bg="white"
          />
        </FormControl>
        <Button type="submit">Add Comment</Button>
      </form>
    </Box>
  );
}
