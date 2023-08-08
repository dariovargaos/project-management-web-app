import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import {
  EmailIcon,
  LockIcon,
  AtSignIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailErorr, setThumbnailError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
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

    if (selected.size > 1e6) {
      setThumbnailError("Image file size must be less than 1mb.");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);

    console.log("thumbnail updated");
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        minW="400px"
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
            <InputGroup>
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
              <Input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mb="10px">
            <FormLabel>password:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <LockIcon />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                minLength="8"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  colorScheme="whatsapp"
                  onClick={handleClick}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              Password must contain at least 8 characters.
            </FormHelperText>
          </FormControl>
          <FormControl isRequired mb="10px">
            <FormLabel>display name:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <AtSignIcon />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                maxLength="18"
              />
            </InputGroup>
            <FormHelperText>
              Display name contain maximum of 18 characters.
            </FormHelperText>
          </FormControl>
          <FormControl isInvalid={thumbnailErorr} mb="10px">
            <FormLabel>profile thumbnail:</FormLabel>
            <Input type="file" onChange={handleFileChange} />
            <FormHelperText>
              If you do not want to upload your picture, we will upload an
              anonymous one for you.
            </FormHelperText>
            <FormErrorMessage>{thumbnailErorr}</FormErrorMessage>
          </FormControl>
          {!isPending && (
            <Button colorScheme="whatsapp" type="submit">
              Sign up
            </Button>
          )}
          {isPending && (
            <Button
              colorScheme="whatsapp"
              type="submit"
              isLoading
              loadingText="Signing up..."
            ></Button>
          )}
          {error && <Text>{error}</Text>}
        </form>
        <Text color="whatsapp.500">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" fontWeight="bold">
            Log in
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
