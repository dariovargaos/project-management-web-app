import { useState } from "react";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

import {
  Flex,
  Box,
  Input,
  FormLabel,
  FormControl,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const toast = useToast();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
      setResetError(null);
      toast({
        title: "Please check your email.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setEmail("");
    } catch (err) {
      setResetSuccess(false);
      setResetError(err.message);
      toast({
        title: "Please check if you entered correct email.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
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
        <form onSubmit={handleResetPassword}>
          <FormControl>
            <FormLabel>enter your email:</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="whatsapp" variant="link">
            Send password reset link
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
