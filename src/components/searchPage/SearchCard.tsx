import { cn } from "@/lib/utils";

function SearchCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card text-card-foreground flex flex-col", className)}
      {...props}
    />
  );
}

export default SearchCard;
