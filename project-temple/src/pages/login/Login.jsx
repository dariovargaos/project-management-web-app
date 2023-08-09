import { useState } from "react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useGuestLogin } from "../../hooks/useGuestLogin";
import {
  Flex,
  Box,
  Button,
  FormLabel,
  FormControl,
  Heading,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isPending } = useLogin();
  const { guestLogin, guestError, isGuestPending } = useGuestLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Flex justifyContent="center">
      <Box
        w={["90%", "50%", "40%", "30%"]}
        bg="#fff"
        border="1px solid #ddd"
        p="40px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
        overflow="hidden"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h2" fontSize="1.5em" mb="8px">
            Log in
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
              />
              <InputRightElement>
                <Button
                  colorScheme="whatsapp"
                  variant="ghost"
                  onClick={handleClick}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {error && (
            <Text fontWeight="bold" color="red">
              {error}
            </Text>
          )}
          {!isPending && (
            <Button colorScheme="whatsapp" type="submit">
              Log in
            </Button>
          )}
          {isPending && (
            <Button
              colorScheme="whatsapp"
              isLoading
              loadingText="Logging in..."
            ></Button>
          )}
          {!isGuestPending && (
            <Button colorScheme="whatsapp" variant="ghost" onClick={guestLogin}>
              Log in as guest
            </Button>
          )}
          {isGuestPending && (
            <Button
              colorScheme="whatsapp"
              isLoading
              loadingText="Logging in as guest..."
            ></Button>
          )}
        </form>
        <Link as={RouterLink} to="/resetpassword" color="whatsapp.500">
          Forgot password?
        </Link>
        <Text color="whatsapp.500">
          Not registered yet?{" "}
          <Link as={RouterLink} to="/signup" fontWeight="bold">
            Create an account
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
