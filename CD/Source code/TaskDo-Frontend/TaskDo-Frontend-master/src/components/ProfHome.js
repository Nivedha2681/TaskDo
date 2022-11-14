import React, { useEffect, useState } from "react";
import axios from "axios";
function ProfHome() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [istop, setIstop] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks/myTask", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setTasks(data);
        setPendingTasks(
          data.filter((d) => {
            return !d.isCompleted;
          })
        );

        setCompletedTasks(
          data.filter((d) => {
            return d.isCompleted === true;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="pending-container max-w-3xl m-auto text-gray-600 ">
        <h3 className="text-2xl  m-4 text-red-700 underline">Pending tasks</h3>
        <div>
          {/* {istop && (
            <div className="mt-4 bg-white flex align-center rounded-lg justify-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f">
              <div className=" p-4 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    Web portal entry
                  </div>
                  <p className="text-gray-700 text-base">
                    Update all the marks and attendance for the second unit test
                    - second year
                  </p>
                </div>

                <div className="bottom flex  items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-clock mr-1"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                  </svg>
                  <p className="text-gray-600"> May 31</p>
                </div>
              </div>
              <div className="btn-container flex justify-center items-center p-4">
                <button
                  className="text h-9 w-28 bg-blue-500 text-white active:bg-blue-600 font-bold  text-md   rounded shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150 "
                  type="button"
                  onClick={() => {
                    setIstop(false);
                  }}
                >
                  Completed
                </button>
              </div>
            </div>
          )} */}
          {pendingTasks == [] && <div>No tasks</div>}
          {pendingTasks ? (
            pendingTasks.map((task) => {
              return (
                <div
                  className="mt-4 bg-white flex align-center rounded-lg justify-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f"
                  key={task._id}
                >
                  <div className=" p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-4">
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {task.title}
                      </div>
                      <p className="text-gray-700 text-base">
                        {task.description}
                      </p>
                    </div>

                    <div className="bottom flex  items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-clock mr-1"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 15 15" />
                      </svg>
                      <p className="text-gray-600">
                        {" "}
                        {task.assignedDate.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="btn-container flex justify-center items-center p-4">
                    <button
                      className="text h-9 w-28 bg-blue-500 text-white active:bg-blue-600 font-bold  text-md   rounded shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150 "
                      type="button"
                      onClick={() => {
                        axios
                          .get(
                            `http://localhost:5000/tasks/submitTask/${task._id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "AccessToken"
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            console.log("it is working");
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <h4>There are no pending tasks left</h4>
            </>
          )}
        </div>
      </div>
      <div className="completed-container max-w-3xl m-auto text-gray-600 ">
        <h3 className="text-2xl  m-4 text-green-700 underline">
          Completed tasks
        </h3>
        <div>
          {/* {!istop && (
            <div className="mt-4 bg-white flex align-center rounded-lg justify-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f">
              <div className=" p-4 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    Web portal entry
                  </div>
                  <p className="text-gray-700 text-base">
                    Update all the marks and attendance for the second unit test
                    - second year
                  </p>
                </div>

                <div className="bottom flex  items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-clock mr-1"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                  </svg>
                  <p className="text-gray-600"> May 31</p>
                </div>
              </div>
              <div className="btn-container flex justify-center items-center p-4">
                <div className="h-full border-l border-gray-300 rating-container flex flex-col justify-center items-center w-36">
                  <p className="text-yellow-600">*Not yet rated*</p>
                </div>
              </div>
            </div>
          )} */}
          {completedTasks ? (
            completedTasks.map((task) => {
              return (
                <div
                  className="mt-4 bg-white flex align-center rounded-lg justify-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f"
                  key={task._id}
                >
                  <div className=" p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-4">
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {task.title}
                      </div>
                      <p className="text-gray-700 text-base">
                        {task.description}
                      </p>
                    </div>

                    <div className="bottom flex  items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-clock mr-1"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 15 15" />
                      </svg>
                      <p className="text-gray-600"> {task.assignedDate}</p>
                    </div>
                  </div>

                  <div className="btn-container flex justify-center items-center p-4">
                    <div className="rating-container flex flex-col justify-center items-center border-l h-full border-gray-300 w-36">
                      <p className="text-green-600">Rating</p>
                      {/* <div className="stars flex mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          strokeLinejoin="icon icon-tabler icon-tabler-star"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          strokeLinejoin="icon icon-tabler icon-tabler-star"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          strokeLinejoin="icon icon-tabler icon-tabler-star"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          strokeLinejoin="icon icon-tabler icon-tabler-star"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          strokeLinejoin="icon icon-tabler icon-tabler-star"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                      </div> */}
                      <div>
                        {" "}
                        <span className="font-bold text-2xl">
                          {task.rating}
                        </span>{" "}
                        /5
                      </div>
                      <br />
                      {task.rating == 0 && (
                        <p className="text-red-600 text-center">
                          *Not yet rated*
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>you have not completed any tasks</>
          )}
        </div>
        <div>
          {/* <div className="mt-4 bg-white flex align-center rounded-lg justify-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f">
            <div className=" p-4 flex flex-col justify-between leading-normal">
              <div className="mb-4">
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Paper correction
                </div>
                <p className="text-gray-700 text-base">
                  correct all the papers of 3rd year by tomorrow
                </p>
              </div>

              <div className="bottom flex  items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-clock mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 15" />
                </svg>
                <p className="text-gray-600"> may18</p>
              </div>
            </div>

            <div className="btn-container flex justify-center items-center p-4">
              <div className="rating-container flex flex-col justify-center items-center border-l h-full border-gray-300 w-36">
                <p className="text-green-600">Rating</p>
                <div className="stars flex mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="icon icon-tabler icon-tabler-star"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="icon icon-tabler icon-tabler-star"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="icon icon-tabler icon-tabler-star"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="icon icon-tabler icon-tabler-star"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="icon icon-tabler icon-tabler-star"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                </div>
              </div>
            </div>
          </div> */}
          {completedTasks &&
            completedTasks.map((task) => {
              <div className="mt-4 bg-white flex align-center rounded-lg justify-between border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 f">
                <div className=" p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-4">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                      {task.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      {task.description}
                    </p>
                  </div>

                  <div className="bottom flex  items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-clock mr-1"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 15" />
                    </svg>
                    <p className="text-gray-600"> {task.assignedDate}</p>
                  </div>
                </div>

                <div className="btn-container flex justify-center items-center p-4">
                  <div className="h-full border-l border-gray-300 rating-container flex flex-col justify-center items-center w-36">
                    <p className="text-yellow-600">*Not yet rated*</p>
                  </div>
                </div>
              </div>;
            })}
        </div>
      </div>
    </div>
  );
}

export default ProfHome;
