import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (password !== confirmPassword) {
      setError("password must match with confirm password");
    } else {
      axios
        .post("http://localhost:5000/register", {
          fullname,
          email,
          password,
          role,
          department,
        })
        .then((res) => {
          console.log(res,"This is working fine");
          navigate("/login", {
            state: {
              message: "Congrats! Your account has been created successfully",
            },
          });
        })
        .catch((err) => {
          console.log(err.response,"This is not working");
          setError(err.response.data);
        });
    }
  };

  useEffect(() => {}, [role]);

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8 border-2 p-6 rounded-lg">
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />

            <p className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">
              Choose your role
            </p>
            <div
              className="flex"
              onChange={(e) => {
                setRole(e.target.value);
                console.log("role", e.target.value);
              }}
            >
              <div className="flex items-center mr-4">
                <input
                  id="Head of the department"
                  required
                  type="radio"
                  value="Head of the department"
                  name="role"
                  // checked={role === "Head of the department"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="Head of the department"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Head of the department
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="Professor"
                  type="radio"
                  required
                  value="Professor"
                  name="role"
                  // checked={role === "Professor"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="Professor"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Professor
                </label>
              </div>
            </div>
            <p className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">
              Choose your department
            </p>
            <div
              className="flex"
              onChange={(e) => {
                setDepartment(e.target.value);
                console.log("department", e.target.value);
              }}
            >
              <div className="flex items-center mr-4">
                <input
                  id="mechanical"
                  type="radio"
                  value="mechanical"
                  name="department-group"
                  required
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="mechanical"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Mechanical
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="Civil"
                  type="radio"
                  value="Civil"
                  required
                  name="department-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="Civil"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Civil
                </label>
              </div>

              <div className="flex items-center mr-4">
                <input
                  id="EEE"
                  type="radio"
                  value="EEE"
                  required
                  name="department-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="EEE"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  EEE
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="CSE"
                  type="radio"
                  value="CSE"
                  required
                  name="department-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="CSE"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  CSE
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="ECE"
                  type="radio"
                  value="ECE"
                  required
                  name="department-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="ECE"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ECE
                </label>
              </div>
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="first_name"
                  required
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                />
              </div>
              {/* <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Flowbite"
                  required=""
                />
              </div> */}
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm_password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
              />

              {error && (
                <div
                  className=" px-4 py-2 m-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <span className="font-medium"> {error}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  }

export default Register;
