import React from "react";
import { Button } from "@/components/ui/button";

interface AddButtonProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

const AddButton = ({ onClick, size = "lg" }: AddButtonProps) => {
  const sizeClasses = {
    sm: "w-16 h-16 text-3xl",
    md: "w-20 h-20 text-4xl",
    lg: "w-24 h-24 text-5xl",
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        className={`${sizeClasses[size]} rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors`}
        onClick={onClick}
      >
        +
      </Button>
    </div>
  );
};

export default AddButton;
