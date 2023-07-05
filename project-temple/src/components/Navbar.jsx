import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Flex, Heading, Spacer, Image } from "@chakra-ui/react";

//images
import Temple from "/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <Flex as="nav" p="10px" alignItems="center" gap="20px" mb="20px">
      <Image src={Temple} alt="temple icon" />
      <Heading as="h3" fontSize="1.5em">
        Temple
      </Heading>

      <Spacer />

      {!user && (
        <Link to="/login">
          <Button variant="link" colorScheme="black">
            Login
          </Button>
        </Link>
      )}
      {!user && (
        <Link to="/signup">
          <Button variant="link" colorScheme="black">
            Signup
          </Button>
        </Link>
      )}
      {!isPending && user && <Button onClick={logout}>Logout</Button>}
      {isPending && user && <Button disabled>Logging out...</Button>}
    </Flex>
  );
}
