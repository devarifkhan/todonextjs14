"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/components/shared/store";
import { addTodo } from "@/components/shared/slices/todoSlice";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const Card: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  // console.log("Hi", todos);

  const TodoSchema = Yup.object().shape({
    task: Yup.string()
      .min(2, "Task is too short!")
      .required("Task is required"),
    date: Yup.string().required("Date is required"),
    priority: Yup.string().required("Priority is required"),
    note: Yup.string().required("Note is required"),
  });

  return (
    <>
      <div className="bg-purple-400 p-10 border-2 rounded-lg w-96">
        <Formik
          initialValues={{
            task: "",
            date: "",
            priority: "",
            note: "",
          }}
          validationSchema={TodoSchema}
          onSubmit={(values) => {
            dispatch(
              addTodo(
                values.task.trim(),
                values.date.trim(),
                values.priority.trim(),
                values.note.trim()
              )
            );
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
                  Create a New Task! 📝
                </h1>

                <div className="label">
                  <span className="label-text font-bold text-white">
                    What is your TASK?
                  </span>
                </div>
                <Field
                  name="task"
                  className="mb-2 text-lime-900 input w-full input-bordered  gap-2"
                />

                {touched.task && errors.task && (
                  <div
                    className="bg-orange-100 mb-2 rounded-lg border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <p className="font-bold">{errors.task}</p>
                  </div>
                )}
              </div>

              <div>
                <div className="label">
                  <span className="label-text font-bold text-white">
                    Estimated Time
                  </span>
                </div>
                <Field
                  name="date"
                  type="date"
                  className="w-full rounded-lg border-2 mb-2 p-3 bg-orange-500"
                />

                {touched.date && errors.date && (
                  <div
                    className="bg-orange-100 mb-2 rounded-lg border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <p className="font-bold">{errors.date}</p>
                  </div>
                )}
              </div>

              <div>
                <div className="label">
                  <span className="label-text font-bold text-white">
                    Priority of the task
                  </span>
                </div>

                <Field
                  as="select"
                  name="priority"
                  className="select mb-5 w-full max-w-xs"
                >
                  <option value="noselect">Select an option</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Field>

                {touched.priority && errors.priority && (
                  <div
                    className="bg-orange-100 mb-2 rounded-lg border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <p className="font-bold">{errors.priority}</p>
                  </div>
                )}
              </div>

              <div>
                <div className="label">
                  <span className="label-text font-bold text-white">Note</span>
                </div>
                <Field
                  as="textarea"
                  name="note"
                  className="textarea  block w-full text-lime-900  text-md mb-2"
                />

                {touched.note && errors.note && (
                  <div
                    className="bg-orange-100 mb-2 rounded-lg border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <p className="font-bold">{errors.note}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 mt-2 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Card;
