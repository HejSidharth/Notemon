import React, { useState } from "react";
import { useIdeas } from "../../lib/context/codeSnip";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "../Dashboard";
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
            <ReactTextareaAutosize
              minRows={3}
              placeholder="Start typing..."
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              className="rounded-lg bg-base-100 focus:ring-0 outline-none placeholder:text-base placeholder:font-light border-none h-16 text-base font-light resize-none pl-4"/>
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
              className="btn btn-sm max-w-24"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
