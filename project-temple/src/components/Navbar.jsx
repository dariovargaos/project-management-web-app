import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Flex, Heading, Spacer, HStack } from "@chakra-ui/react";

//images
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="center">
      <Heading as="h3" fontSize="1.5em">
        Temple
      </Heading>
      <Spacer />

      <HStack spacing="20px">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {!isPending && user && <Button onClick={logout}>Logout</Button>}
        {isPending && user && <Button disabled>Logging out...</Button>}
      </HStack>
    </Flex>
  );
}
