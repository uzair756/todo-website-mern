import { toast } from "sonner";

import useApi from "@/hooks/useApi";
import { todoApi } from "@/http/todoApi";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useTodoStore from "@/app/todoStore";

export default function DeleteTodoDialog({
  isOpen,
  handleClose,
  todoId,
}: {
  isOpen: boolean;
  handleClose: () => void;
  todoId: string;
}) {
  const { removeTodo } = useTodoStore();
  const { handler, isLoading } = useApi(todoApi.deleteTodo);

  const handleDeleteTodo = async () => {
    const { responseData, success, error } = await handler(todoId);
    if (success) {
      toast.success(responseData?.message);
      removeTodo(todoId);
      handleClose();
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the todo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is not reversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button disabled={isLoading} onClick={handleDeleteTodo}>
            Delete
          </Button>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
