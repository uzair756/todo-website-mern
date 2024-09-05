import { useState } from "react";
import { toast } from "sonner";

import useApi from "@/hooks/useApi";
import { todoApi } from "@/http/todoApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { ITodo } from "@/types";
import useTodoStore from "@/app/todoStore";

export default function EditTodoDialog({
  isOpen,
  handleClose,
  todo,
  index,
}: {
  isOpen: boolean;
  handleClose: () => void;
  todo: ITodo;
  index: number;
}) {
  const [todoContent, setTodoContent] = useState(todo?.content);
  const { handler, isLoading } = useApi(todoApi.updateTodo);
  const { updateTodo } = useTodoStore();

  const handleUpdateTodo = async () => {
    const { responseData, success, error } = await handler({
      todoId: todo?._id,
      data: { content: todoContent },
    });
    if (success) {
      toast.success(responseData?.message);
      updateTodo(index, {
        ...todo,
        content: todoContent,
      });
      handleClose();
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <textarea
            rows={3}
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
            className="w-full bg-transparent text-accent-foreground px-2 py-1 border-border focus:border-primary border-[1px] text-lg font-noto_sans"
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleUpdateTodo}
            disabled={isLoading || todo?.content === todoContent}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
