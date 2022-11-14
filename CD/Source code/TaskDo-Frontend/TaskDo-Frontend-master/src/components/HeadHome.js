import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Axios from "axios";
import ProfHome from "./ProfHome";

function HeadHome() {
  const [professor, setProfessor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState("");
  const [unratedTasks, setUnratedTasks] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/tasks/departmentTask", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    })
      .then((res) => {
        const data = res.data;
        console.log("first", data);
        setUnratedTasks(
          data.filter((d) => {
            return d.isCompleted === true;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setShowModal(false);
    Axios.post("http://localhost:5000/tasks/allProf", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h1 className="text-center text-4xl m-4">Your Professors</h1>

      <div>
        {professor ? (
          <>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 pt-2 border-b border-solid border-slate-200 rounded-t">
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
                          <div className="mb-6 w-96 mt-0">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Rating value
                            </label>
                            <input
                              type="text"
                              maxLength={3}
                              id="name"
                              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Out of 5"
                              required=""
                              value={rating}
                              onChange={(e) => {
                                if (e.target.value > 5) {
                                  setRating("");
                                } else {
                                  setRating(e.target.value);
                                }
                              }}
                            />
                          </div>

                          <button
                            type="submit"
                            className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                              Axios.put(
                                `http://localhost:5000/tasks/rateMyTask/${id}`,
                                { rate: rating },
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "AccessToken"
                                    )}`,
                                  },
                                }
                              )
                                .then((res) => {
                                  console.log(res, "hhh");
                                  window.location.reload();
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            Rate Now
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black m-0"></div>
              </>
            ) : null}
            <div className="max-w-3xl flex  justify-between flex-wrap gap-4 m-auto">
              <Cards />
            </div>
            <div className="rating-section max-w-3xl m-auto mt-12">
              <h3 className="text-3xl ">Rating section</h3>
              {!unratedTasks == [] ? (
                unratedTasks.map((task) => {
                  return (
                    <>
                      <div className=" mt-6 justify-between bg-white flex align-center rounded-lg space-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f">
                        <div className=" p-4 flex flex-col justify-between leading-normal">
                          <div className="mb-4">
                            <div className="text-gray-900 font-bold text-xl mb-2">
                              {task.title}
                            </div>
                            <p className="text-gray-700 text-base">
                              {task.description}
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              strokeLinejoin="icon icon-tabler icon-tabler-user-circle"
                              width="36"
                              height="36"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="12" cy="12" r="9" />
                              <circle cx="12" cy="10" r="3" />
                              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                            </svg>
                            <div className="text-sm ml-2">
                              <p className="text-gray-900 leading-none mb-1">
                                {task.assignedUser}
                              </p>
                              <p className="text-gray-600">
                                {task.assignedDate.slice(0, 10)}
                              </p>
                            </div>
                          </div>
                          {task.rating > 0 && (
                            <div
                              className=" py-2 px-1 text-center  text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
                              role="alert"
                            >
                              Already rated!
                            </div>
                          )}
                        </div>

                        <div className="btn-container flex justify-center items-center p-4">
                          <button
                            className="text h-9 w-28 bg-blue-500 text-white active:bg-blue-600 font-bold  text-md   rounded shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150 "
                            type="button"
                            onClick={() => {
                              setShowModal(true);
                              setId(task._id);
                            }}
                          >
                            Rate Now
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <p>Seems like no one completed any tasks</p>
                </>
              )}

              {/* <div className="  mt-6 justify-between bg-white flex align-center rounded-lg space-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f">
                <div className=" p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-4">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                      Portion completion
                    </div>
                    <p className="text-gray-700 text-base">
                      Complete Unit 5 for third year cse
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      strokeLinejoin="icon icon-tabler icon-tabler-user-circle"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                    <div className="text-sm ml-2">
                      <p className="text-gray-900 leading-none">Nagarajan</p>
                      <p className="text-gray-600"> June 1</p>
                    </div>
                  </div>
                </div>

                <div className="btn-container flex justify-center items-center p-4">
                  <button
                    className="text h-9 w-28 bg-blue-500 text-white active:bg-blue-600 font-bold  text-md   rounded shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150 "
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Rate Now
                  </button>
                </div>
              </div> */}
            </div>
          </>
        ) : (
          <div className="flex justify-center flex-col">
            <img
              className="max-w-xs m-auto mt-6 mb-2 text-center"
              src="no-data.svg"
              alt=""
              height={300}
              width={300}
            />
            <h1 className="mt-8 text-xl text-center  bg-gray-200 hover:bg-gray-200 text-gray-800  font-semibold mr-2 px-4 py-1 rounded-lg dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300">
              OOPS!😥 It seems like there are no professors joined your
              department
            </h1>

            <p className="mt-8 text-me text-center   text-blue-500    mr-2  ">
              *Kindly ask your department professors to signup under your
              department*
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeadHome;
