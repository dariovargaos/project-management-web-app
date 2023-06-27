import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from "@chakra-ui/react";

export default function ProjectComments() {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    console.log(commentToAdd);
  };
  return (
    <Box>
      <Heading size="sm">Project Comments</Heading>
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
