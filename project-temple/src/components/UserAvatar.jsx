import { Avatar } from "@chakra-ui/react";

export default function UserAvatar({ src }) {
  return <Avatar src={src} alt="user name" overflow="hidden" />;
}
