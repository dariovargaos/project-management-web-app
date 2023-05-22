import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import {
  Box,
  Button,
  FormLabel,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
        <form onSubmit={handleSubmit} style={{ width: "380px" }}>
          <Heading as="h2" fontSize="1.5em" mb="8px">
            Log in
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
          {!isPending && (
            <Button colorScheme="whatsapp" type="submit">
              Login
            </Button>
          )}
          {isPending && (
            <Button colorScheme="whatsapp" disabled>
              Loading
            </Button>
          )}
          {error && <Text>{error}</Text>}
        </form>
      </Box>
    </Box>
  );
}
