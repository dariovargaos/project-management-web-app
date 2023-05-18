import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailErorr, setThumbnailError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be and image");
      return;
    }

    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb.");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);

    console.log("thumbnail updated");
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        maxW="480px"
        bg="#fff"
        border="1px solid #ddd"
        p="40px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h2" fontSize="1.5em" mb="8px">
            Sign up
          </Heading>
          <FormControl isRequired mb="10px">
            <FormLabel>email:</FormLabel>
            <Input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl isRequired mb="10px">
            <FormLabel>password:</FormLabel>
            <Input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <FormControl isRequired mb="10px">
            <FormLabel>display name:</FormLabel>
            <Input
              type="text"
              required
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </FormControl>
          <FormControl isRequired isInvalid={thumbnailErorr} mb="10px">
            <FormLabel>profile thumbnail:</FormLabel>
            <Input type="file" required onChange={handleFileChange} />
            <FormErrorMessage>{thumbnailErorr}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="whatsapp" type="submit">
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
}
