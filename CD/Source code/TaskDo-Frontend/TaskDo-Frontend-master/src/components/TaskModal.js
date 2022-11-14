import React, { useState } from "react";
import Axios from "axios";
export default function Task({ prop }) {
  console.log(prop);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData", formData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("formData", formData);
    Axios.post(
      "http://localhost:5000/tasks/saveTask",
      {
        ...formData,
        assignedUser: prop.email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data, "hfsajdhf");
      })
      .catch((err) => {
        console.log(err);
      });
    setShowModal(false);
  }
  return (
    <>
      <button
        className=" bg-blue-500 text-white active:bg-blue-600 font-bold  text-md px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150 "
        type="button"
        onClick={() => setShowModal(true)}
      >
        Assign task
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/*<h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>*/}
                  <form
                    className="mt-2 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div className="close flex justify-end">
                      <div className="icon ">
                        <svg
                          className="w-6 h-6 cursor-pointer"
                          fill="none"
                          stroke="red"
                          onClick={() => setShowModal(false)}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="mb-6 w-96">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Task Title
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="title"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Eg.Paper correction"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6 w-60">
                      <div className="relative">
                        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                              ></path>
                            </svg> 
                          </div> */}
                        <label
                          htmlFor="datepicker"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Choose the date
                        </label>
                        <input
                          id="datepicker"
                          datepicker
                          type="date"
                          name="expectedDate"
                          onChange={handleChange}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="task-description"
                        className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Task-description
                      </label>
                      <textarea
                        onChange={handleChange}
                        type="text"
                        id="task-description"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your description goes here..."
                        required=""
                      />
                    </div>
                    <button
                      // onClick={() => setShowModal(false)}
                      type="submit"
                      className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Assign task
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black m-0"></div>
        </>
      ) : null}
    </>
  );
}
