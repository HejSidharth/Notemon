import React, { useState } from "react";
import { useIdeas } from "../../lib/context/codeSnip";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "../Dashboard";
import ReactQuill from "react-quill";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function NewNote() {
  const ideas = useIdeas();
  const user = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userId = user?.user?.id;
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <form className="flex flex-col gap-1 form-control">
            <input
              type="text"
              placeholder="Untitled Note"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              theme="snow"
              className="rounded-lg bg-base-100 focus:ring-0 outline-none placeholder:text-5xl placeholder:font-bold border-none h-16 text-5xl font-bold"
            />
          </form>
        </div>
        <button
              type="button"
              onClick={() =>
                ideas.add({
                  userId: userId,
                  Title: title,
                  Content: description,
                  datetime: new Date(),
                })
              }
              className="btn btn-sm"
            >
              Submit
            </button>
      </div>
    </>
  );
}
