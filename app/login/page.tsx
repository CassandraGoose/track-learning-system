import { login } from "@/app/actions/actions";

export default async function Page() {
	return (
		<>
			<h1>Sign in - this functionality is not currently available to the public. </h1>
			<form action={login}>
				<label htmlFor="username">Username</label>
				<input data-testid="username" name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input data-testid="password" type="password" name="password" id="password" />
				<br />
				<button data-testid="login">Continue</button>
			</form>
		</>
	);
}
