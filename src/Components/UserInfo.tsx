import * as React from "react";
import { Text } from "theme-ui";
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
    <div className="flex items-center space-x-3">
      <img
        src={`${process.env.PUBLIC_URL}${user.image.webp.split("./")[1]}`}
        className="w-9"
      />
      <div>
        <h2 className="font-semibold">{user.username}</h2>
        {currentUser && <Text mr="5px" sx={youBadge}>you</Text>}
      </div>
      <span className="text-sm text-grayishBlue">Now</span>
    </div>
  );
};

export default UserInfo;
