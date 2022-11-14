import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskModal from "./TaskModal";

function Cards() {
  const [professor, setProfessor] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks/allProf", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setProfessor(
          data.filter((d) => {
            return d.role === "Professor";
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return professor.map((prof) => {
    return (
      <div>
        <div className=" mt-4 max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className=" mt-4 flex flex-col items-center pb-8 w-48">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user border-2 rounded-full p-4 "
              width="64"
              height="64"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {prof.fullname}
            </h5>

            <div className="flex mt-2  space-x-3 lg:mt-6">
              <TaskModal prop={prof} />
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default Cards;
