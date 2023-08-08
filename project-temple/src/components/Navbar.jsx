import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Flex, Heading, Spacer, Image, Link } from "@chakra-ui/react";

//images
import Temple from "/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <Flex as="nav" p="10px" alignItems="center" gap="20px" mb="20px">
      <Image src={Temple} alt="temple icon" />
      <Heading size="md">Temple</Heading>

      <Spacer />

      {/* {!user && (
        <Link as={RouterLink} to="/login" fontWeight="bold">
          Login
        </Link>
      )}
      {!user && (
        <Link as={RouterLink} to="/signup" fontWeight="bold">
          Signup
        </Link>
      )} */}
      {!isPending && user && (
        <Button onClick={logout} variant="ghost" colorScheme="whatsapp">
          Logout
        </Button>
      )}
      {isPending && user && (
        <Button
          variant="ghost"
          colorScheme="whatsapp"
          isLoading
          loadingText="Logging out..."
        ></Button>
      )}
    </Flex>
  );
}
