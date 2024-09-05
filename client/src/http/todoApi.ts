import { axiosInstance } from "./axiosInstance";

class TodoApi {
  async addTodo(data: { content: string }) {
    return await axiosInstance.post("/todos", data);
  }

  async updateTodo({
    todoId,
    data,
  }: {
    todoId: string;
    data: { content: string };
  }) {
    return await axiosInstance.put(`/todos/${todoId}`, data);
  }

  async toggleTodoCompletion(todoId: string) {
    return await axiosInstance.put(`/todos/toggle-completed/${todoId}`)
  }

  async deleteTodo(todoId: string) {
    return await axiosInstance.delete(`/todos/${todoId}`);
  }

  async getTodos(queryParams: { completed?: boolean }) {
    return await axiosInstance.get("/todos", { params: queryParams });
  }
}

export const todoApi = new TodoApi()