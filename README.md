# Taroko Frontend Assignment

## Prerequisites

- Ensure that you have Node.js 18.17 or later installed.

## Develop locally

1. Clone the repo
2. Start the `taroko_server` (It should be on port `3000`)
   - Clone the [project](https://github.com/henry97113/taroko_server) if you haven't already.
3. Run `npm i` to install dependencies.
4. Copy the env `NEXT_PUBLIC_API_BASE_URL` from the `.env.example` and paste it in `.env`. (`.env` is gitignored, so we'll need to do this manually)
5. Run `npm run dev` to start the dev server.
6. Open the page on `localhost:3001`.

## Live Demo

You can play it online at [https://taroko-contacts.vercel.app](https://taroko-contacts.vercel.app).

## How to run E2E tests

1. Start the `taroko_server` (It should be on port `3000`)
2. run `npm run test:e2e:dev` or `npx playwright test --ui` to run E2E tests in UI mode.
