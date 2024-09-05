export interface IUser {
  name: string;
  email: string;
}

export interface ITodo {
  _id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
}
