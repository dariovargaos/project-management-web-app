import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

import {
  Flex,
  Box,
  Input,
  FormControl,
  Button,
  useToast,
  FormHelperText,
  Heading,
} from "@chakra-ui/react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const navigate = useNavigate();
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
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
    } catch (err) {
      setResetSuccess(false);
      setResetError(err.message);
      toast({
        title: "Please check if you entered correct email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex justifyContent="center" maxH="100vh">
      <Box
        w={["90%", "50%", "40%", "30%"]}
        bg="#fff"
        border="1px solid #ddd"
        p="30px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
      >
        <form
          onSubmit={handleResetPassword}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Heading size="md">Recover your password</Heading>
          <FormControl>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="youremail@email.com"
            />
            <FormHelperText>
              We'll send a link to your email to create a new one.
            </FormHelperText>
          </FormControl>
          <Button type="submit" colorScheme="whatsapp" size="sm">
            Send link
          </Button>
          <Button
            w="40%"
            size="sm"
            colorScheme="whatsapp"
            onClick={() => navigate("/login")}
          >
            Go back
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
