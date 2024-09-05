import { cn } from "@/lib/utils";
import { LucideTimer } from "lucide-react";

export default function Logo({
  onClick = () => {},
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={cn("flex items-center gap-2 text-lg text-primary", className)}
    >
      <LucideTimer className="h-6 w-6" />
      <span className="font-poppins font-semibold">Todo App</span>
    </div>
  );
}
