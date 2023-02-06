import React from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, user } = useAuth();
  const usernameRef = React.useRef<HTMLInputElement>(null);

  if (user != null) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login.isLoading) return;

    if (!usernameRef.current?.value) return;

    login.mutate(usernameRef.current?.value);
  };

  return (
    <>
      <h1 className="text-3xl text-center text-gray-800 font-bold mb-5">
        Login
      </h1>
      <form
        className="grid grid-cols-1 gap-y-4 items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="font-light text-gray-600" htmlFor="userName">
            Username
          </label>
          <Input id="userName" type="text" required ref={usernameRef} />
        </div>
        <Button type="submit" className="mt-4" disabled={login.isLoading}>
          {login.isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </>
  );
}

export default Login;
