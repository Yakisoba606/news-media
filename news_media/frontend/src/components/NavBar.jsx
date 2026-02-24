import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NavBar = ({ logout }) => {

  let { user , dispatch } = useContext(UserContext);

  return (
    <>
      <nav className="bg-green-800 p-4">
        <div className="flex items-center justify-between mx-auto">
          <div className="text-white text-2xl font-semibold px-5">
            <Link to="" className="text-yellow-50">
              Code Lab | Media World
            </Link>
          </div>
          <div className="space-x-6">
          { user && (
            <>
              <Link to="/" className="text-yellow-50 hover:text-yellow-100 ">
              Home
            </Link>
            <Link
              to="/createNews"
              className="text-yellow-50 hover:text-yellow-100 "
            >
              Create News
            </Link></>
          ) }

            {!user && (
              <>
                <Link
                  to="/signIn"
                  className="text-yellow-50 hover:text-yellow-100 "
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="text-yellow-50 hover:text-yellow-100 "
                >
                  Register
                </Link>
              </>
            )}
            {!!user && (
              <button
                className="text-yellow-50 hover:text-yellow-100"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
