import React from "react";
import { useState , useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import axiosAPI from "../../api/axios";
import { UserContext } from "../context/UserContext";

const SignIn = () => {

  let { user , dispatch } = useContext(UserContext)

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState("");

  let navigate = useNavigate()

  let login = async (e) => {
    try {
      e.preventDefault();
      let data = { email, password };
      let res = await axiosAPI.post(
        "/api/users/login",
        data , { withCredentials : true }
      ); //post
      if (res.status == 200) {
        dispatch({ type : 'LOGIN' , payload : res.data.user })
        navigate('/')
      }
    } catch (e) {
      console.log(e.response.data.errors);
      
      setErrors(e.response.data.errors);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={login}
            className="space-y-6 bg-white shadow-md rounded p-8 "
          >
            <h1 className="text-2xl text-center font-bold">Login Form</h1>
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
                  required
                  className="shadow border appearance-none border-green-600 rounded w-full px-3 py-2 text-gray-800 focus:outline-none"
                  placeholder="sample@gmail.com"
                />
               
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
                  required
                  className="shadow border border-green-600 rounded w-full px-3 py-2 text-gray-800 focus:outline-none"
                  placeholder="xxxxxxxxxx"
                />
                         
                {!!(errors) && <p className="text-red-600">{errors}</p> }
      
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to="/signUp"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Register Here !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
