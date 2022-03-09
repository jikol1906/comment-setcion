import * as React from "react";
import { User } from "../interfaces";

interface IUserInfoProps {
  currentUser?: boolean;
  createdAt:string;
  user: User;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = ({
  currentUser,
  user,
  createdAt
}) => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={`${process.env.PUBLIC_URL}${user.image.webp.split("./")[1]}`}
        className="w-7"
      />
      <div className="flex items-center space-x-2">
        <h2 className="font-semibold">{user.username}</h2>
        {currentUser && (
          <div className="bg-moderateblue text-white text-xs rounded px-2 flex items-center">
            <span className="relative bottom-[1px]">you</span>
          </div>
        )}
      </div>
      <span className="text-sm text-grayishBlue">{createdAt}</span>
    </div>
  );
};

export default UserInfo;
