import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Text,
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
    <Flex flexDir="column" gap="8px">
      <Heading size="md" color="color.headingColor">
        Project Comments
      </Heading>

      {project.comments.length > 0 &&
        project.comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader
              display="flex"
              alignItems="center"
              gap="8px"
              wordBreak="break-word"
            >
              <UserAvatar src={comment.photoURL} name={comment.displayName} />
              <Text color="color.headingColor">{comment.displayName}</Text>
            </CardHeader>
            <CardBody>
              <Text color="color.textColor">
                {formatDistanceToNow(comment.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </Text>
              <Text color="color.textColor">{comment.content}</Text>
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
    </Flex>
  );
}
