This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What is this?

This is a personal project that I'm building for fun. More info to come later. Please ignore this for now.

## Getting Started

set up the env:

- you'll need the following values in your .env: DATABASE_URL, TEST_USER_ID

create tables in your db

- it seems like there are multiple ways to do this, but for a fresh db, it seems like: `npx prisma db push` creates the table just fine.
- you'll need to create a user in the db in whatever way you desire, but set your TEST_USER_ID in the env to the id of whatever user you created. 

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


### Log and Roadmap (for personal use)

done:
- connect prisma

todo: 
- setup endpoint to get a user's competencies utilizing prisma crud functionality
- test endpoint
- dislpay user's competencies

