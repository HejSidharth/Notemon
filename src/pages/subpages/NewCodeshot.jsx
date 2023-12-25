import React, { useEffect, useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import Sidebar from "../Dashboard";
import { useCodeShots } from "../../lib/context/codeshot";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function NewCodeshot() {
  const editorRef = useRef(null);
  const code = useCodeShots();
  const user = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userId = user?.user?.id;
  const [editorTheme, setEditorTheme] = useState("light");
  const clerk = useClerk();
  const [view, setView] = useState(false);
  const [language, setLanguage] = useState("JavaScript");
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "business") {
      setEditorTheme("vs-dark");
    } else if (theme === "light") {
      setEditorTheme("light");
    }
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editor.getAction("editor.action.formatDocument").run();
    editorRef.current = editor;
  };
  return (
    <>
      <Sidebar />
      <div className=" sm:ml-64">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <form className="flex flex-col gap-1 form-control">
            <input
              type="text"
              placeholder="Untitled"
              className="rounded-lg bg-base-100 focus:ring-0 outline-none placeholder:text-5xl placeholder:font-bold border-none h-16 text-5xl font-bold"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              autoComplete="off"
            />
            <TextareaAutosize
              placeholder="Enter Text..."
              value={description}
              className="focus:ring-0 outline-none resize-none h-24 text-base placeholder:italic rounded-lg border-none bg-base-100 p-4 pt-0"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              autoComplete="off"
            />
            <div className="bg-base-200 rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 p-4 bg-base-200 rounded-xl">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center justify-center bg-base-100 font-medium rounded-lg text-sm px-4 py-2 btn"
                    onClick={() => {
                      setView(!view);
                    }}
                  >
                    {view ? (
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
                      </svg>
                    ) : (
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15.077.019a4.658 4.658 0 0 0-4.083 4.714V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1.006V4.68a2.624 2.624 0 0 1 2.271-2.67 2.5 2.5 0 0 1 2.729 2.49V8a1 1 0 0 0 2 0V4.5A4.505 4.505 0 0 0 15.077.019ZM9 15.167a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z" />
                      </svg>
                    )}
                    {view ? "Private" : "Sharable"}
                  </button>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <div className="dropdown dropdown-hover bg-base">
                      <button
                        id="actionsDropdownButton"
                        data-dropdown-toggle="actionsDropdown"
                        className="btn m-1 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg focus:z-10 bg-base-100"
                        type="button"
                      >
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                          />
                        </svg>
                        {language}
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu-dropdown p-2 shadow bg-base-100 rounded-box w-52 flex flex-col overflow-y-auto h-64"
                        style={{ zIndex: 1000 }}
                      >
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("TypeScript");
                            toast.success("TypeScript is your set language");
                          }}
                        >
                          TypeScript
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("JavaScript");
                            toast.success("JavaScript is your set language");
                          }}
                        >
                          JavaScript
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("CSS");
                            toast.success("CSS is your set language");
                          }}
                        >
                          CSS
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("LESS");
                            toast.success("LESS is your set language");
                          }}
                        >
                          LESS
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("SCSS");
                            toast.success("SCSS is your set language");
                          }}
                        >
                          SCSS
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("JSON");
                            toast.success("JSON is your set language");
                          }}
                        >
                          JSON
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("HTML");
                            toast.success("HTML is your set language");
                          }}
                        >
                          HTML
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("XML");
                            toast.success("XML is your set language");
                          }}
                        >
                          XML
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("PHP");
                            toast.success("PHP is your set language");
                          }}
                        >
                          PHP
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("C#");
                            toast.success("C# is your set language");
                          }}
                        >
                          C#
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("C++");
                            toast.success("C++ is your set language");
                          }}
                        >
                          C++
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Razor");
                            toast.success("Razor is your set language");
                          }}
                        >
                          Razor
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Markdown");
                            toast.success("Markdown is your set language");
                          }}
                        >
                          Markdown
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Diff");
                            toast.success("Diff is your set language");
                          }}
                        >
                          Diff
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Java");
                            toast.success("Java is your set language");
                          }}
                        >
                          Java
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("VB");
                            toast.success("VB is your set language");
                          }}
                        >
                          VB
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("CoffeeScript");
                            toast.success("CoffeeScript is your set language");
                          }}
                        >
                          CoffeeScript
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Handlebars");
                            toast.success("Handlebars is your set language");
                          }}
                        >
                          Handlebars
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Batch");
                            toast.success("Batch is your set language");
                          }}
                        >
                          Batch
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Pug");
                            toast.success("Pug is your set language");
                          }}
                        >
                          Pug
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("F#");
                            toast.success("F# is your set language");
                          }}
                        >
                          F#
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Lua");
                            toast.success("Lua is your set language");
                          }}
                        >
                          Lua
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Powershell");
                            toast.success("Powershell is your set language");
                          }}
                        >
                          Powershell
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Python");
                            toast.success("Python is your set language");
                          }}
                        >
                          Python
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Ruby");
                            toast.success("Ruby is your set language");
                          }}
                        >
                          Ruby
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("SASS");
                            toast.success("SASS is your set language");
                          }}
                        >
                          SASS
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("R");
                            toast.success("R is your set language");
                          }}
                        >
                          R
                        </li>
                        <li
                          className="btn btn-ghost"
                          onClick={() => {
                            setLanguage("Objective-C");
                            toast.success("Objective-C is your set language");
                          }}
                        >
                          Objective-C
                        </li>
                      </ul>
                    </div>
                    <button
                      id="filterDropdownButton"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium focus:outline-none rounded-lg focus:z-10 btn bg-base-100"
                      type="button"
                      onClick={() => {
                        code.add({
                          userId: userId,
                          title,
                          description,
                          code: editorRef.current.getValue(),
                          view,
                          language,
                        });
                      }}
                    >
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 17 20"
                      >
                        <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {clerk.loaded && (
                <Editor
                  key={editorTheme}
                  height="30vh"
                  defaultLanguage={language}
                  defaultValue="//Paste Your Code Here"
                  onMount={handleEditorDidMount}
                  theme={editorTheme}
                  loading="Loading.."
                  />
              )}
            </div>
          </form>
          <div className="rounded-lg"></div>
        </div>
      </div>
    </>
  );
}
