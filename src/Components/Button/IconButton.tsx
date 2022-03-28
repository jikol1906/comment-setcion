import * as React from "react";
import ButtonLoadingSpinner from "../Loadingspinner/ButtonLoadingSpinner/ButtonLoadingSpinner";

interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  loading?:boolean;
  variant: "normal" | "danger";
}

const IconButton: React.FunctionComponent<IIconButtonProps> = ({
  children,
  icon,
  variant,
  loading,
  ...rest
}) => {
  return (
    <button
      className={`flex items-center space-x-1 btn-hover-styles font-semibold text-sm ${
        variant === "normal" ? "text-moderateblue" : "text-softRed"
      }`}
      {...rest}
    >
      {loading ? <ButtonLoadingSpinner/> : <div className="w-3 fill-current">{icon}</div>}
      <span>{children}</span>
    </button>
  );
};

export default IconButton;
