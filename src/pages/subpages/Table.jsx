import React, { useState } from "react";
import Sidebar from "../Dashboard";
import { useIdeas } from "../../lib/context/codeSnip";
import { SignedIn } from "@clerk/clerk-react";
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
        <div className="sm:p-5 p-4 sm:ml-64">
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
                    Add New Code
                  </button>
                  </Link>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg focus:z-10 btn bg-base-100"
                      type="button"
                    >
                      <svg
                        className="-ml-1 mr-1.5 w-5 h-5"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                      Actions
                    </button>
                    <button
                      id="filterDropdownButton"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium focus:outline-none rounded-lg focus:z-10 btn bg-base-100"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-4 w-4 mr-2"
                        viewbox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Filter
                      <svg
                        className="-mr-1 ml-1.5 w-5 h-5"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
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
                    .filter((codeShot) => codeShot.title.toLowerCase().includes(searchText.toLowerCase()))
                    .map((codeShot, index) => (
                      <tr key={index}>
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
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
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
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
  </svg>
                            Copy
                          </button>
                        </td>
                      </tr>
                    )).concat(
                        code.current.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Make a new CodeSnap!
                            </td>
                          </tr>
                        ) : null,
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
