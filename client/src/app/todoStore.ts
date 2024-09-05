import { create } from "zustand";
import { ITodo } from "@/types";

export interface TodoState {
  allTodos: ITodo[];
  completedTodos: ITodo[];
  pendingTodos: ITodo[];
  addTodo: (todo: ITodo) => void;
  removeTodo: (todoId: string) => void;
  updateTodo: (index: number, newTodo: ITodo) => void;
  setAllTodos: (todos: ITodo[]) => void;
  setCompletedTodos: (todos: ITodo[]) => void;
  setPendingTodos: (todos: ITodo[]) => void;
}

const useTodoStore = create<TodoState>()((set) => ({
  allTodos: [],
  completedTodos: [],
  pendingTodos: [],
  addTodo: (todo) => {
    set((state) => ({ allTodos: [todo, ...state.allTodos] }));
  },
  removeTodo: (todoId) => {
    set((state) => ({
      allTodos: state.allTodos.filter((todo) => todo?._id !== todoId),
    }));
  },
  updateTodo: (index, newTodo) => {
    set((state) => {
      const updatedTodos = [...state.allTodos]
      updatedTodos[index] = newTodo
      return { allTodos: updatedTodos }
    });
  },
  setAllTodos: (todos) => {
    set({ allTodos: todos });
  },
  setCompletedTodos: (todos) => {
    set({ completedTodos: todos });
  },
  setPendingTodos: (todos) => {
    set({ pendingTodos: todos });
  },
}));

export default useTodoStore;
