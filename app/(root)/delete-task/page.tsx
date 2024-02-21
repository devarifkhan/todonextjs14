"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/components/shared/store";
import { deleteTodo } from "@/components/shared/slices/todoSlice";

import { FaNoteSticky } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

const Card: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo);

  console.log("Hi", todos);

  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: number) => {
    console.log("delete", id);
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <h1 className="mb-4 ml-5 dark:text-dark-200 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        Delete
        <span className="text-blue-600 dark:text-blue-500"> Task 🥲</span>
      </h1>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="card m-6 w-3/4 bg-neutral text-neutral-content"
        >
          <div className="card-body">
            <h2 className="card-title"> {todo.task}</h2>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <FaNoteSticky />
                </div>
                <label className="ms-2  dark:text-white text-sm font-medium text-white ">
                  {todo.note}
                </label>
              </div>

              <div className="flex flex-col ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                <div className="flex items-center">
                  <FaBusinessTime />
                  <span className="ml-2 dark:text-white text-white">
                    {todo.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaStar />{" "}
                  <span className="ml-2 dark:text-white text-white">
                    {todo.priority}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
