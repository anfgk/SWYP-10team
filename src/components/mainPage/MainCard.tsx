import { cn } from "@/lib/utils";

function MainCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-[var(--card-text)] flex flex-col rounded-[16px] overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

export default MainCard;
