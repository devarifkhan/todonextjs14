import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  id: number;
  task: string;
  date: string;
  priority: string;
  note: string;
  completed: boolean;
}

let nextTodoId = 6;
const initialState: CounterState[] = [
  {
    id: 1,
    task: "Implement authentication module",
    date: "2024-02-21",
    priority: "High",
    note: "Using JWT for secure authentication",
    completed: false,
  },
  {
    id: 2,
    task: "Refactor API endpoints",
    date: "2024-02-22",
    priority: "Medium",
    note: "Improve code readability and efficiency",
    completed: false,
  },
  {
    id: 3,
    task: "Write unit tests for user service",
    date: "2024-02-23",
    priority: "High",
    note: "Ensure robustness and reliability",
    completed: true,
  },
  {
    id: 4,
    task: "Optimize database queries",
    date: "2024-02-24",
    priority: "Medium",
    note: "Reduce response time by indexing frequently used fields",
    completed: false,
  },
  {
    id: 5,
    task: "Prepare tech talk presentation",
    date: "2024-02-25",
    priority: "Low",
    note: "Cover latest trends in front-end development",
    completed: false,
  },
];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<CounterState>) {
        state.push(action.payload);
      },
      prepare(task: string, date: string, priority: string, note: string) {
        return {
          payload: {
            id: nextTodoId++,
            task,
            date,
            priority,
            note,
            completed: false,
          },
        };
      },
    },
    deleteTodo(state, action: PayloadAction<number>) {
      const idToDelete = action.payload;
      return state.filter((todo) => todo.id !== idToDelete);
    },

    toggleTodoCompletion(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      const todo = state.find((todo) => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodoCompletion } = todoSlice.actions;
export default todoSlice.reducer;
