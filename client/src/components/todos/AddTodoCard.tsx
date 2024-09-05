import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import useApi from "@/hooks/useApi";
import { todoApi } from "@/http/todoApi";
import useTodoStore from "@/app/todoStore";
import { ITodo } from "@/types";

export default function AddTodoCard() {
  const [todoContent, setTodoContent] = useState("");
  const { handler, isLoading } = useApi(todoApi.addTodo);
  const { addTodo } = useTodoStore();

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();

    const { responseData, success, error } = await handler({
      content: todoContent,
    });
    if (success) {
      setTodoContent("");
      toast.success("Todo Added");
      const { _id, content, completed, createdAt } = responseData?.data
        ?.todo as ITodo;
      addTodo({ _id, content, completed, createdAt });
    } else {
      toast.error("Failed to add todo", { description: error?.message });
    }
  };

  return (
    <Card className="py-7 px-5 flex flex-col gap-4">
      <h2 className="text-xl font-inter text-secondary-foreground">Add todo</h2>
      <form onSubmit={handleAddTodo} className="flex flex-col gap-4 w-full">
        <Input
          className="w-full text-2xl py-7 px-5"
          placeholder="Enter your todo here..."
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
        ></Input>
        <div className="flex gap-3 self-end">
          <Button
            type="button"
            variant={"destructive"}
            disabled={!todoContent?.length}
            onClick={() => setTodoContent("")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!todoContent?.length || isLoading}>
            {isLoading ? "Adding todo" : "Add Todo"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
