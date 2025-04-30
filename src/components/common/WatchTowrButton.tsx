import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

type CustomButtonProps = {
  children: React.ReactNode;
  colorScheme?: string;
  mr?: number | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
} & Omit<
  ButtonProps,
  "colorScheme" | "mr" | "onClick" | "isLoading" | "children"
>;

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  colorScheme = "teal",
  mr = 0,
  onClick,
  isLoading = false,
  ...rest
}) => {
  return (
    <Button
      colorScheme={colorScheme}
      mr={mr}
      onClick={onClick}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
