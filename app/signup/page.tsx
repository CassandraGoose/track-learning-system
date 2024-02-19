'use client';
import { signup } from "@/app/actions/actions";

export default function Page() {
  return (
    <>
      <h1>
        Create an account - this functionality is not currently available to the
        public.
      </h1>
      <form action={async (formData) => await signup(formData)}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <label htmlFor="firstName">firstName</label>
        <input name="firstName" id="firstName" />
        <label htmlFor="lastName">lastName</label>
        <input name="lastName" id="lastName" />
        <label htmlFor="bio">bio</label>
        <textarea name="bio" id="bio" />
        <label htmlFor="email">email</label>
        <input name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}
