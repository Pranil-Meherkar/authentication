import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit() {
    if (auth.checkRegistered(user.email)) {
      navigate("/register");
      return;
    }
    auth.register(user);
    navigate("/");
  }
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up and create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already registered? &nbsp;
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>

        <input type="hidden" name="remember" value="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </div>
        <p
          className="mt-2 text-center text-sm text-gray-600"
          style={{
            display: auth.checkRegistered(user.email) ? "block" : "none",
          }}
        >
          User already registered,&nbsp;
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log In instead
          </Link>
          &nbsp; or use another email id
        </p>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
