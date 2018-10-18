import React from "react";

const LogInView = ({onSubmit, handleSignupClick, handleForgotPasswordClick}) => {
  return (
    <div className="flex justify-center" style={{ marginTop: '100px' }}>
      <form className="w-full max-w-md" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-email">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              style={{
              width: "100%"
            }}
              name="email"
              type="email"
              placeholder="jane@doe.com"/>
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              name="password"
              type="password"
              placeholder="******************"/>
          </div>
        </div>
        <div className="flex justify-center">
        <button
          className="mt-8 mx-4 focus:shadow-outline focus:outline-none text-blue font-thin px-4"
          onClick={handleSignupClick}
          type="button">
          New user?
        </button>

        <button
          className="mt-8 mx-4 shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit">
          Sign in
        </button>
        
        <button
          className="mt-8 mx-4 text-indigo focus:shadow-outline focus:outline-none font-hairline px-4"
          onClick={handleForgotPasswordClick}
          type="button">
          Forgot password?
        </button>
        </div>
      </form>
    </div>
  );
};

export default LogInView;
