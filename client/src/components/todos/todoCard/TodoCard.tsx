import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";

import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { ITodo } from "@/types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteTodoDialog from "./DeleteTodoDialog";
import EditTodoDialog from "./EditTodoDialog";

export default function TodoCard({ todo, index }: { todo: ITodo, index: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState<
    "EDIT_TODO" | "DELETE_TODO" | null
  >(null);

  const handleCloseDialog = () => {
    setIsDialogOpen(null);
  };

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Card
      draggable
      className="relative w-full px-4 py-3 select-none bg-primary-foreground flex flex-col gap-2"
    >
      <div className="flex w-full justify-between">
        <span className="text-xs font-poppins text-muted-foreground">
          {getTimeAgo(todo?.createdAt)}
        </span>
        {/* dropdown menu for edit and delete action  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="absolute top-2 right-3">
            <Button
              size="icon"
              variant={"ghost"}
              className="rounded-full overflow-hidden size-6"
            >
              <MoreHorizontalIcon size={15} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Todo actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setIsDialogOpen("EDIT_TODO")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDialogOpen("DELETE_TODO")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* edit todo dialog */}
        <EditTodoDialog
          isOpen={isDialogOpen === "EDIT_TODO"}
          handleClose={handleCloseDialog}
          todo={todo}
          index={index}
        />

        {/* delete todo dialog */}
        <DeleteTodoDialog
          isOpen={isDialogOpen === "DELETE_TODO"}
          handleClose={handleCloseDialog}
          todoId={todo?._id}
        />
      </div>

      <span className="flex-1 md:text-base text-sm text-secondary-foreground font-inter font-medium break-words leading-none">
        {todo?.content}
      </span>

      <div className="flex items-center gap-2 self-end">
        <label
          className="text-xs cursor-pointer text-secondary-foreground/60 font-roboto font-semibold"
          htmlFor="completed"
        >
          Mark as completed
        </label>
        <Input
          type="checkbox"
          id="completed"
          defaultChecked={todo?.completed}
          className="cursor-pointer size-5 md:size-4 rounded-sm"
        />
      </div>
    </Card>
  );
}
