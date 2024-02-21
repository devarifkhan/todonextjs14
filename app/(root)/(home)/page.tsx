"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/components/shared/store";
import { toggleTodoCompletion } from "@/components/shared/slices/todoSlice";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  const todos = useSelector((state: RootState) => state.todo);

  console.log("Hi", todos);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <SignedOut>
        <div
          className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mt-4"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 14.5A6.5 6.5 0 1 1 16.5 10 6.51 6.51 0 0 1 10 16.5zM9 7V5h2v4H9V7z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">You are logged out</p>
              <p className="text-sm">
                Please log in to access your account and make necessary updates.
              </p>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent  bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            All of{" "}
          </span>
          <span className="dark:text-dark-100">Your Task 🙂</span>
        </h1>
        <table className="table card p-5 bg-green-400 flex flex-row">
          {/* head */}
          <thead className="bg-red-400 rounded-lg p-2">
            <tr>
              <th>TASK</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Note</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <th>{todo.task}</th>
                <td>{todo.date}</td>
                <td>{todo.priority}</td>
                <td>{todo.note}</td>
                <td>{todo.completed ? "Complete" : "Not Completed"}</td>
                <th>
                  <button
                    className=" bg-red-400 rounded-lg dark:bg-red-400 btn-xs"
                    onClick={() => dispatch(toggleTodoCompletion(todo.id))}
                  >
                    {todo.completed ? "done" : "pending"}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </SignedIn>
    </div>
  );
}
