import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { databases } from "../../lib/appwrite";
import Sidebar from "../Dashboard";
import Editor from "@monaco-editor/react";
import { useCodeShots } from "../../lib/context/codeshot";
import toast from "react-hot-toast";
import { useClerk, useUser } from "@clerk/clerk-react";
import Oops from "./Oops";
import ErrorDocument from "./404Document";
import { debounce } from "lodash";

function CodeShotPage() {
  const [codeShot, setCodeShot] = useState(null);
  const [editorTheme, setEditorTheme] = useState("light");
  const code = useCodeShots();
  const { id } = useParams(); // Get the document ID from URL
  const editorRef = useRef();
  const [currentCode, setCurrentCode] = useState("");
  const clerk = useClerk();
  const [documentExists, setDocumentExists] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const [view, setView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);



  useEffect(() => {
    if (codeShot && codeShot.view !== undefined) { // Check if codeShot is not null and has the 'view' property
      setView(codeShot.view);
    }
  }, [codeShot]);



  const renderToggleButton = () => {
    if (view === null) {
      return null; // Don't render the button until view is properly set
    }
    return (
      <button
        type="button"
        className="flex items-center justify-center bg-base-100 font-medium rounded-lg text-sm px-4 py-2 btn"
        onClick={() => {
          setView(!view);
          toast.success("Note is now " + (view ? "Sharable" : "Private"));
          // You may need to handle saving the updated view state here
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
        )}{" "}
        {/* Button content based on view */}
        {view ? "Private" : "Sharable"}
      </button>
    );
  };

  const handleEditorDidMount = (editor, _monaco) => {
    editorRef.current = editor;
    setCurrentCode(editor.getValue());
    editor.onDidChangeModelContent(() => {
      setCurrentCode(editor.getValue());
    });
  };

  const handleCopy = () => {
    const editorValue = editorRef.current.getValue();
    navigator.clipboard.writeText(editorValue);
    setCopied(true);
  };

  const debouncedUpdate = debounce((title, codeText, description, language) => {
    code.update(codeShot.$id, {
      title,
      code: codeText,
      description,
      view,
      language,
    });
  }, 1000);


  const editText = () => {
    if (codeShot) {
      const title = codeShot.title;
      const codeText = currentCode;
      const description = codeShot.description;
      const language = codeShot.language;
      debouncedUpdate(title, codeText, description, language);
    }
  };

  useEffect(() => {
    editText();
  }, [editText, editorRef.current?.getValue()]);


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "business") {
      setEditorTheme("vs-dark");
    } else if (theme === "light") {
      setEditorTheme("light");
    }
  }, []);

  useEffect(() => {
    setCopied(false);
    async function fetchCodeShot() {
      setIsLoading(true);
      try {
        const response = await databases.getDocument("notes", "codeshot", id);
        if (response) {
          setCodeShot(response);
        } else {
          setCodeShot(null);
        }
      } catch (error) {
        setCodeShot(null);
      }
      setIsLoading(false);
    }

    fetchCodeShot();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
              <span className="loading loading-infinity loading-lg mb-64"></span>
           </div>;
  }

  if (notFound) {
    return (
      <ErrorDocument />
    );
  }

  if (!codeShot) {
    return(
      <ErrorDocument />
    )
  }


  if (codeShot) {
  if (codeShot.view && user?.user?.id !== codeShot.userId) {
    return (
      <Oops />
    );
  }
}

  

  return (
    <>
      {documentExists ? (
        <>
          <Sidebar />
          <div className="sm:p-5 p-4 sm:ml-64">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12 p-2">
              <h1 className="text-5xl font-bold mx-auto mb-4">
                {codeShot && codeShot.title}
              </h1>
              <div className="bg-base-200 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 p-4 bg-base-200 rounded-xl">
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start md:space-x-3 flex-shrink-0">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-base-100 font-medium rounded-lg text-sm px-4 py-2 btn"
                      onClick={() => {
                        handleCopy();
                        toast.success("Note Copied");
                      }}
                    >
                      {copied ? (
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      )}
                      Copy
                    </button>

                    {user?.user?.id === codeShot?.userId && (
                      <div className="flex items-center space-x-3 w-full md:w-auto">
                        {renderToggleButton()}
                        <Link to="/dashboard">
                          <button
                            id="actionsDropdownButton"
                            data-dropdown-toggle="actionsDropdown"
                            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg focus:z-10 btn bg-base-100"
                            type="button"
                            onClick={() => {
                              code.remove(codeShot.$id);
                            }}
                          >
                            <svg
                              class="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                            </svg>
                            Delete
                          </button>
                        </Link>
                        <button
                          id="filterDropdownButton"
                          className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium focus:outline-none rounded-lg focus:z-10 btn bg-base-100"
                          type="button"
                          onClick={() => {
                            editText();
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
                    )}
                  </div>
                </div>
                {clerk.loaded && (
                  <Editor
                    height="50vh"
                    defaultLanguage={codeShot?.language.toLowerCase()}
                    defaultValue={codeShot?.code}
                    loading="Loading!"
                    onMount={handleEditorDidMount}
                    theme={editorTheme}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-bold mx-auto mb-4">
            Document Not Found
          </h1>
          <p className="text-xl font-bold mx-auto mb-4">
            The document you are looking for does not exist.
          </p>
        </>
      )}
    </>
  );
}

export default CodeShotPage;
