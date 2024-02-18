import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import client from "./prisma";

const adapter = new PrismaAdapter(client.session, client.person);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
  getUserAttributes: (attributes: DatabaseUserAttributes) => {
    return {
      username: attributes.username,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      bio: attributes.bio,
      proofs: attributes.proofs,
      pathways: attributes.pathways,
      email: attributes.email,
    }
  }
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  proofs: string;
  pathways: string;
  email: string;
}
