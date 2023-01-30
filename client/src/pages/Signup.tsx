import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const imageUrlRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signup.isLoading) return;

    if (!usernameRef.current?.value || !nameRef.current?.value) return;

    signup.mutate({
      id: usernameRef.current?.value,
      name: nameRef.current?.value,
      image: imageUrlRef.current?.value,
    });
  };

  return (
    <>
      <h1 className="text-3xl text-center text-gray-800 font-bold mb-5">
        Sign up
      </h1>
      <form
        className="grid grid-cols-1 gap-y-4 items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="font-light text-gray-600" htmlFor="userName">
            Username
          </label>
          <Input
            id="userName"
            type="text"
            pattern="\S*"
            required
            ref={usernameRef}
          />
        </div>
        <div>
          <label className="font-light text-gray-600" htmlFor="name">
            Name
          </label>
          <Input id="name" type="text" required ref={nameRef} />
        </div>
        <div>
          <label className="font-light text-gray-600" htmlFor="imageUrl">
            Image Url
          </label>
          <Input id="imageUrl" type="url" ref={imageUrlRef} />
        </div>
        <Button type="submit" className="mt-4" disabled={signup.isLoading}>
          {signup.isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </>
  );
}

export default Signup;
