import { useState } from "react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
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
        minW="400px"
        bg="#fff"
        border="1px solid #ddd"
        p="40px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
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
          {!isPending && (
            <Button colorScheme="whatsapp" type="submit">
              Login
            </Button>
          )}
          {isPending && (
            <Button
              colorScheme="whatsapp"
              isLoading
              loadingText="Logging in..."
            ></Button>
          )}
          {error && <Text>{error}</Text>}
        </form>
        <Link as={RouterLink} to="/resetpassword" color="whatsapp.500">
          Forgot password?
        </Link>
      </Box>
    </Flex>
  );
}
