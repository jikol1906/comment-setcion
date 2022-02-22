import * as React from "react";
import { Flex, Avatar, Heading, Text } from "theme-ui";
import { User } from "../interfaces";
import { youBadge } from "./Comment/CommentStyles";

interface IUserInfoProps {
  currentUser?: boolean;
  user: User;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = ({
  currentUser,
  user,
}) => {
  return (
    <div className="flex items-center">
      <Avatar
        src={`${process.env.PUBLIC_URL}${user.image.webp.split("./")[1]}`}
        mr="10px"
      />
      <Heading as="h2" mr="5px">{user.username}</Heading>
      {currentUser && <Text mr="5px" sx={youBadge}>you</Text>}
      <Text variant="muted">Now</Text>
    </div>
  );
};

export default UserInfo;
