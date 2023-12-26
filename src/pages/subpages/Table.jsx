import React, { useState } from "react";
import Sidebar from "../Dashboard";
import { useIdeas } from "../../lib/context/codeSnip";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useCodeShots } from "../../lib/context/codeshot";
import { Link } from "react-router-dom";

export default function Table() {
  const ideas = useIdeas();
  const code = useCodeShots();
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Sidebar />
      <SignedIn>
        <div className="block sm:hidden">
          <div className="flex items-center justify-between bg-base-100 border-b border-base-200 px-4 py-3 sm:px-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold">
                Dashboard
              </h1>
              </div>
              </div>
        </div>


        <div className="sm:p-5 p-4 sm:ml-64 hidden sm:block">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <h1 className="text-4xl font-bold mx-auto mb-5">Dashboard</h1>
            <div className="bg-base-200 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label for="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className=" text-sm rounded-lg block w-full pl-10 p-2 bg-base-100 border-none focus:border-none focus:ring-0"
                        placeholder="Search"
                        required=""
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <Link to="/codeshot-creation">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-base-100 font-medium rounded-lg text-sm px-4 py-2 btn"
                    >
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>
                      Add New Code
                    </button>
                  </Link>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left table">
                  <thead className="text-xs uppercase bg-base-300">
                    <tr>
                      <th scope="col" className="">
                        #
                      </th>
                      <th scope="col" className="">
                        Title
                      </th>
                      <th scope="col" className="">
                        Description
                      </th>
                      <th scope="col" className="">
                        Language
                      </th>
                      <th scope="col" className=""></th>
                      <th scope="col" className=""></th>
                    </tr>
                  </thead>
                  <tbody>
                    {code.current
                      .filter((codeShot) =>
                        codeShot.title
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((codeShot, index) => (
                        <tr key={index} className="hover:bg-base-100">
                          <td className="">{index}</td>
                          <td className="">{codeShot.title}</td>
                          <td className="">{codeShot.description}</td>
                          <td className="">{codeShot.language}</td>
                          <td className="">
                            <button
                              onClick={() => {
                                code.remove(codeShot.$id);
                              }}
                              className="btn btn-sm"
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                              </svg>
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm"
                              onClick={() => {
                                navigator.clipboard.writeText(codeShot.code);
                              }}
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                              </svg>
                              Copy
                            </button>
                          </td>
                        </tr>
                      ))
                      .concat(
                        code.current.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Make a new CodeSnap!
                            </td>
                          </tr>
                        ) : null
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="sm:p-5 p-4 sm:ml-64">
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
              <h1 class="mb-4 text-5xl tracking-tight font-extrabold lg:text-9xl">
                Sign In
              </h1>
              <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
                Please Sign In to Continue
              </p>
              <p class="mb-4 text-lg font-light"></p>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
