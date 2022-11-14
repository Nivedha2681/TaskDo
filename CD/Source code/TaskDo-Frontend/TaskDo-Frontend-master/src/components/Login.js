import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Example() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  useEffect(() => {
    // if (location.state.message) {
    //   // setMessage(location.state.message);
    //   // console.log("message", location.state.message);
    // }
  }, []);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);
    let AccessToken = null;
    axios.post("http://localhost:5000/login",{
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("AccessToken", res.data.AccessToken);
        axios.get("http://localhost:5000/tasks/ishod",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data, "res");
            if (res.data === "Hod Login") {
              navigate("/hod");
              localStorage.setItem("userType", "Hod");
            } else if (res.data === "Professor Login") {
              navigate("/prof");
              localStorage.setItem("userType", "Prof");
            }
          })
          .catch((err) => {
            setError(err.response.data);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8 border-2 p-6 rounded-lg">
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          {/* {message && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
              <span className="font-medium">{message}</span>
            </div>
          )} */}
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
