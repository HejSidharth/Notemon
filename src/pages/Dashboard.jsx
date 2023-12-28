import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIdeas } from "../lib/context/codeSnip";
import { useCodeShots } from "../lib/context/codeshot";
import toast from "react-hot-toast";

export default function Sidebar() {
  const location = useLocation();
  const note = location.pathname === "/note";
  const dashboard = location.pathname === "/dashboard";
  const codeshotCreation = location.pathname === "/codeshot-creation";
  const [isOpen, setIsOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ideas = useIdeas();
  const user = useUser();

  const newNote = async () => {
    const note = await ideas.add({
      userId: user?.user?.id,
      Title: "Untitled Note",
      Content: null,
      datetime: new Date(),
      editTime: new Date().toLocaleString(),
    });
    return note.$id;
  };

  const createAndRedirectToNote = async () => {
    toast.loading("Creating new note...");
    const noteId = await newNote();
    window.location.href = `/note/${noteId}`;
  };

  const code = useCodeShots();
  return (
    <>
      <aside
        id="default"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-base-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-base-200 [&::-webkit-scrollbar-thumb]:bg-base-300">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 rounded-lg group hover:bg-base-100`}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <SignedIn>
              <li>
                <Link
                  to="/dashboard"
                  className={`flex items-center p-2 rounded-lg group hover:bg-base-100 ${
                    dashboard ? "bg-base-100" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-6 transition duration-75"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <div
                  onClick={createAndRedirectToNote}
                  className={`flex items-center p-2 rounded-lg group hover:bg-base-100 ${
                    note ? "bg-base-100" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-6 hover:cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap hover:cursor-pointer">
                    New Note
                  </span>
                </div>
              </li>
              <li>
                <Link
                  to="/codeshot-creation"
                  className={`flex items-center p-2 rounded-lg group hover:bg-base-100 ${
                    codeshotCreation ? "bg-base-100" : ""
                  }`}
                >
                  <svg
                    class="w-5 h-5 group-hover:rotate-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    New CodeSnap
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium bg-base-300 rounded-full">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  class="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-base-100"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:rotate-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Notes
                  </span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  class={`${isOpen ? "" : "hidden"} py-2 space-y-2`}
                >
                  {ideas.current
                    .map((idea) => (
                      <li key={idea.$id}>
                        <div className="flex justify-between items-center">
                          <Link to={`/note/${idea.$id}`}>
                            <button className="flex items-center p-2 text-base transition duration-75 rounded-lg group hover:bg-base-100">
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                                />
                              </svg>
                              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                {idea.Title}
                              </span>{" "}
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              ideas.remove(idea.$id);
                              toast.success("Note deleted!");
                            }}
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))
                    .concat(
                      ideas.current.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No ideas set.
                          </td>
                        </tr>
                      ) : null
                    )}
                  <li></li>
                </ul>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCodeOpen(!codeOpen)}
                  className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-base-100"
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                  </svg>
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    CodeSnap
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${codeOpen ? "" : "hidden"} py-2 space-y-2`}
                >
                  {code.current
                    .map((coding) => (
                      <li key={coding.$id}>
                        <div className="flex justify-between items-center">
                          <Link to={`/codeshot/${coding.$id}`}>
                            <button className="flex items-center p-2 text-base transition duration-75 rounded-lg group hover:bg-base-100">
                              <svg
                                class="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 20"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 1v4a1 1 0 0 1-1 1H1m5 8.514L4 12.5l2-2m4 4.014 2-2.014-2-2m5 7.5a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16Z"
                                />
                              </svg>
                              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                {coding.title}
                              </span>
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              code.remove(coding.$id);
                            }}
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))
                    .concat(
                      code.current.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No CodeSnap set.
                          </td>
                        </tr>
                      ) : null
                    )}
                  <li></li>
                </ul>
              </li>
            </SignedIn>
            <SignedOut>
              <li>
                <a className="flex items-center p-2 rounded-lg group hover:bg-base-100">
                  <svg
                    className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:rotate-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    <SignInButton />
                  </span>
                </a>
              </li>
              <li>
                <a className="flex items-center p-2 rounded-lg group hover:bg-base-100">
                  <svg
                    className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:rotate-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    <SignUpButton />
                  </span>
                </a>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <a className="flex items-center p-2 rounded-lg group hover:bg-base-100">
                  <svg
                    className="w-5 h-5 group-hover:rotate-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    <SignOutButton />
                  </span>
                </a>
              </li>
            </SignedIn>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-neutral">
            <li>
              <a
                href="https://github.com/HejSidharth"
                className="flex items-center p-2 rounded-lg group hover:bg-base-100"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="ms-3">GitHub</span>
              </a>
            </li>
            
          </ul>
        </div>
      </aside>
    </>
  );
}