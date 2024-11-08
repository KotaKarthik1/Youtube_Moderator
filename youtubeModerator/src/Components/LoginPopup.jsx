import React from "react";

const LoginPopup = ({ isOpen, onClose, userType }) => {
  if (!isOpen) return null;

  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="bg-black/50 fixed top-0 right-0 left-0 z-50 h-full flex items-center justify-center"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login as {userType}
              </p>
            </div>

            {userType=='Organizer' && (
            <div className="mt-7 flex flex-col gap-2">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Continue with Google
              </button>
            </div>
            )
            }

            {/* <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div> */}

            {/* Email/Password Form */}
            {userType=='Editor' && (
            <form className="w-full">
              <input
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Email Address"
              />
              <input
                name="password"
                type="password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Password"
              />
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a
                  href="/forgot-password"
                  className="text-blue-800 hover:text-blue-600"
                >
                  Reset your password?
                </a>
              </p>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-black"
              >
                Continue
              </button>
            </form>
  )
            }

            { userType=='Editor' && (
 
            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?
              <a href="/signup" className="font-medium text-[#4285f4]">
                Sign up
              </a>
            </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
