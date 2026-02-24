import React from "react";
import { useState , useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import axiosAPI from "../../api/axios";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState("");

  let navigate = useNavigate()

  let { user , dispatch } = useContext(UserContext)


  let register = async (e) => {
    try {
      e.preventDefault();
      let data = { name, email, password };

      let res = await axiosAPI.post(
        "/api/users/register",data , { withCredentials : true }
      );//post
      if (res.status == 200) {
        dispatch({ type : 'LOGIN' , payload : res.data.user })
        navigate('/')
      }
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={register}
            className="space-y-6 bg-white shadow-md rounded p-8 "
          >
            <h1 className="text-2xl text-center font-bold">Register Form</h1>
            <div>
              <label
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="shadow border appearance-none border-green-600 rounded w-full px-3 py-2 text-gray-800 focus:outline-none"
                  placeholder="Enter Your Name..."
                />
                
             {!!(errors && errors.name) && <p className="text-red-600" >{errors.name.msg}</p>}
              </div>
            </div>

            <div>
              <label
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="shadow border appearance-none border-green-600 rounded w-full px-3 py-2 text-gray-800 focus:outline-none"
                  placeholder="sample@gmail.com"
                />
                {!!(errors && errors.email) && <p className="text-red-600" >{errors.email.msg}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="shadow border border-green-600 rounded w-full px-3 py-2 text-gray-800 focus:outline-none"
                  placeholder="xxxxxxxxxx"
                />
                {!!(errors && errors.password) && <p className="text-red-600" >{errors.password.msg}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            You can
            <Link
              to="/signIn"
              className="ms-2 font-semibold text-green-600 hover:text-green-500"
            >
              Login Here !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
