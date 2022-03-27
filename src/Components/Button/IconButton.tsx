import * as React from "react";

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
      className={`flex items-center btn-hover-styles font-semibold text-sm ${
        variant === "normal" ? "text-moderateblue" : "text-softRed"
      }`}
      {...rest}
    >
      <div className="mr-2 w-3 fill-current">{icon}</div>
      {children}
    </button>
  );
};

export default IconButton;
