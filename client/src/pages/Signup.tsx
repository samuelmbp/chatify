import { FormEvent, useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function Signup() {
  const { signup } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (signup.isLoading) return;

    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const imageURL = imageUrlRef.current?.value;

    if (username == null || username === "" || name == null || name === "")
      return;

    signup.mutate({ id: username, name, image: imageURL });
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 
            items-center justify-items-end"
      >
        <label htmlFor="username">Username</label>
        <Input id="username" pattern="\S*" required ref={usernameRef} />

        <label htmlFor="name">Name</label>
        <Input id="name" required ref={nameRef} />

        <label htmlFor="imageURL">Image URL</label>
        <Input id="imageURL" type="url" pattern="\S*" ref={imageUrlRef} />

        <Button
          disabled={signup.isLoading}
          type="submit"
          className="col-span-full"
        >
          {signup.isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </>
  );
}
