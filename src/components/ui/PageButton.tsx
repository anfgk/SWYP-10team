import * as React from "react";
import { Button } from "@/components/ui/button";

type PageButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: "default" | "primary";
};

const PageButton = ({
  text,
  onClick,
  variant = "default",
}: PageButtonProps) => {
  // shadcn Button의 variant prop 활용
  return (
    <Button
      variant={variant === "primary" ? "default" : "secondary"}
      onClick={onClick}
      className={`transition-all duration-200 hover:scale-105 ${
        variant === "primary"
          ? "hover:bg-[var(--foreground)] hover:text-[var(--card)]"
          : "hover:bg-[var(--foreground)] hover:text-[var(--card)]"
      }`}
    >
      {text}
    </Button>
  );
};

export default PageButton;
