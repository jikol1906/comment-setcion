import * as React from "react";
import { User } from "../interfaces";


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
        className="w-7"
      />
      <div className="flex items-center space-x-1">
        <h2 className="font-semibold">{user.username}</h2>
        {currentUser && <span className="bg-moderateblue  text-white text-xs rounded px-2 py-[.1rem]">you</span>}
      </div>
      <span className="text-sm text-grayishBlue">Now</span>
    </div>
  );
};

export default UserInfo;
