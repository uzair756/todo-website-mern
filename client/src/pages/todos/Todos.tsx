import { useEffect } from "react";

import PageLayout from "../../layouts/PageLayout";
import AddTodoCard from "@/components/todos/AddTodoCard";
import TodoCard from "@/components/todos/todoCard/TodoCard";
import useTodoStore from "@/app/todoStore";
import useApi from "@/hooks/useApi";
import { todoApi } from "@/http/todoApi";
import LoaderSpinner from "@/components/LoaderSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquareWarningIcon } from "lucide-react";

export default function Todos() {
  const { handler: getTodos, isLoading, error } = useApi(todoApi.getTodos);
  const { allTodos, setAllTodos } = useTodoStore();

  const handleGetAllTodos = async () => {
    const { responseData, success } = await getTodos({ completed: undefined });
    if (success) {
      setAllTodos(responseData?.data?.todos);
    }
  };

  useEffect(() => {
    handleGetAllTodos();
  }, []);

  return (
    <PageLayout className="flex flex-col gap-8">
      <h1 className="text-3xl font-lato font-semibold text-primary">Todos</h1>
      <AddTodoCard />
      {isLoading ? (
        <LoaderSpinner />
      ) : error ? (
        <Alert className="mb-4" variant={"destructive"}>
          <MessageSquareWarningIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {allTodos?.map((todo, idx) => (
            <TodoCard todo={todo} index={idx} key={todo?._id} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
