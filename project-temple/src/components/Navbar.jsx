import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Button, Flex, Heading, Spacer, HStack } from "@chakra-ui/react";

//images
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="center">
      <Heading as="h3" fontSize="1.5em">
        Temple
      </Heading>
      <Spacer />

      <HStack spacing="20px">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        {!isPending && <Button onClick={logout}>Logout</Button>}
        {isPending && <Button disabled>Logging out...</Button>}
      </HStack>
    </Flex>
  );
}
