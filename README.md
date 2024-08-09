<div align="center">
  <h1><a href="https://track-learning-system.vercel.app/">Track</a></h1>
  <h2>Track your learning; prove your learning</h2>
  <picture>
    <img alt="nextjs badge" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  </picture>
  <picture>
    <img alt="Prisma badge" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  </picture>
  <picture>
    <img alt="PostgreSQL badge" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  </picture>
  <picture>
    <img alt="HTML5 Badge" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  </picture>
  <picture>
    <img alt="Tailwind CSS badge" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  </picture>
  <picture>
    <img alt="JS badge" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  </picture>
</div>

---

(Under construction)

This application is a personal project that is basically a glorified learning journal. I like to learn things and while I value formal education, I recognize that many people do not have access to traditional learning. There are many barriers to learning, including money, time, and energy. 

However, with modern technology, education is no longer locked behind an unfathomable paywall. YouTube, course sites, and educational sites now bring learning to more people than ever before. This technology has also helped so many more people learn _how to learn_, which results in even more learning. People are capable, critical thinkers and may be competent workers in fields in which they do not have degrees.

At the same time, many college degrees are simply records of attendance and not a truthful marker of legitimate learning. Not all universities or programs actually know how competent their students are - they just know that their students can take tests and show up to class. 

So, why is traditional education, in the form of college education and corporate trainings, still the only widely accepted way to prove you know something? People need to be able to prove that they have the necessary knowledge without the price tag. 

This app allows users to track their learning and upload artifacts to prove their learning. Employers can veiw a user's portfolio and determine a user's qualifications without unnecessary education and without the hefty pricetag. 

- Check out my progress at: https://track-learning-system.vercel.app/
- Check out my project board to see my trajectory: https://github.com/users/CassandraGoose/projects/2

---

## Check It Out
![Animated gif of website being used in mobile view](https://i.imgur.com/EsAxJRW.gif)

---

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Set up the env:

- you'll need the following values in your .env: DATABASE_URL, TEST_USER_ID
- the database URL should match a PostgreSQL db. Note that I've created this application with connection pooling through PgBouncer according to Prisma's statement "For Prisma Client to work relialy, PgBouncer must run in transaction mod. Add `pgbouncer=true` to the connection URL"

Create tables in your db:

- it seems like there are multiple ways to do this, but for a fresh db, it seems like: `npx prisma db push` creates the table just fine.
- you'll need to create a user in the db in whatever way you desire, but set your TEST_USER_ID in the env to the id of whatever user you created. 
- for anything to function, you'll need to seed the db as well. you'll have to do this by hand, as I have not included seed data. 

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Context

<img src="https://i.imgur.com/vqfIqFj.png" alt="DB ERD" width="400" />

---

## Notice

This work is **not** open source. While there are instructions to get started, etc - this is provided solely as documentation for the developer. This project has no license. This means that: This work is under exclusive copyright by default. Nobody else can copy, distribute, or modify this work without being at risk of take-downs, shake-downs, or litigation.
