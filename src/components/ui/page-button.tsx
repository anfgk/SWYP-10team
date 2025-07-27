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
  return (
    <Button
      variant={variant === "primary" ? "default" : "secondary"}
      onClick={onClick}
      className={`transition-all duration-200 ${
        variant === "primary"
          ? "hover:bg-[var(--main-color)] hover:text-white"
          : "hover:bg-[var(--main-color)] hover:text-white"
      }`}
    >
      {text}
    </Button>
  );
};

export default PageButton;
