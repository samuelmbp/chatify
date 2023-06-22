import { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign up</h1>
      <form
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 
            items-center justify-items-end"
      >
        <label htmlFor="username">Username</label>
        <Input id="username" pattern="\S*" required ref={usernameRef} />

        <label htmlFor="name">Name</label>
        <Input id="name" required ref={nameRef} />

        <label htmlFor="imageURL">Image URL</label>
        <Input id="imageURL" type="url" pattern="\S*" ref={imageUrlRef} />

        <Button type="submit" className="col-span-full">
          Signg Up
        </Button>
      </form>
    </>
  );
}
