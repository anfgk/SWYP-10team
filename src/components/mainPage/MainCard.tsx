import { cn } from "@/lib/utils";

function MainCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-[16px]",
        className
      )}
      {...props}
    />
  );
}

export default MainCard;
