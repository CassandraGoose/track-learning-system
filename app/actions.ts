'use server';
import { createProof, deleteProof, getProof, createUser, getUser } from '@/app/lib/queries';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { cookies } from 'next/headers';
import { lucia, validateRequest } from './lib/auth';
import { redirect } from 'next/navigation';

const proofSchema = z.object({
  title: z.string({ invalid_type_error: 'Title must be a string', required_error: 'Title is required' }).min(1, { message: 'Title is required' }),
  description: z.string({ invalid_type_error: 'Description must be a string'}),
  justification: z.string({ invalid_type_error: 'Justification must be a string', required_error: 'Justification is required'}).min(1, { message: 'Justification is required' }),
  userId: z.string({ invalid_type_error: 'User ID must be a string', required_error: 'User ID is required'}).min(1, { message: 'User ID is required' }),
  competencyId: z.string({ invalid_type_error: 'Competency ID must be a string', required_error: 'Competency ID is required'}).min(1, { message: 'Competency ID is required' }),
});

export async function submitProof(
  identifiers: { userId: string; competencyId: string },
  formData: FormData,
) {

  const data = {
    title: formData.get('proofTitle') as string,
    description: formData.get('proofDescription') as string,
    justification: formData.get('proofJustification') as string,
    userId: identifiers.userId,
    competencyId: identifiers.competencyId,
  };

  const validatedFields = proofSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  await createProof(data);
  return { message: `Added proof ${data.title}` };
}

export async function removeProof(proofId: number) {
  await deleteProof(proofId);
}

export async function showProof(proofId: string) {
  return await getProof(proofId);
}

export async function signup(formData: FormData): Promise<ActionResult> {
  const username = formData.get('username');
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: 'Invalid username',
    };
  }
  const password = formData.get('password');

  // password minimum eight characters, at least one letter, one number and one special character
  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255 ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password,
    )
  ) {
    return {
      error: 'Invalid password',
    };
  }

  const hashedPassword = await new Argon2id().hash(password);
  // Currently cannot check if username is currently in use. When this is
  // available to randos, then add that functionality in.
  const user = await createUser({username, hashedPassword, firstName: formData.get('firstName') as string, lastName: formData.get('lastName') as string, bio: formData.get('bio') as string, email: formData.get('email') as string});

  if (!!user) {
    const session = await lucia.createSession(user!.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect('/');
  } else {
    return { error: 'Failed to create user' }
  }
}

interface ActionResult {
  error: string;
}

export async function login(formData: FormData): Promise<ActionResult> {
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255 || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password,
  )) {
		return {
			error: "Invalid password"
		};
	}

  const existingUser = await getUser(username);

	if (!existingUser) {
		// NOTE from LUCIA:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Incorrect username or password"
		};
	}

	const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);
	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

export async function logout(): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}
