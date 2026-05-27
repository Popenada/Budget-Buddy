# Budget Buddy

An AI-powered personal spending advisor built with Next.js and Claude.

## Features

- Enter your budget and spending details
- Get personalized financial advice from an AI chat assistant powered by Claude
- Authentication via Clerk

## Tech Stack

- **Next.js 16** — App Router
- **Claude (Anthropic SDK)** — AI spending advisor via streaming chat
- **Clerk** — User authentication
- **Zustand** — Client state management
- **shadcn/ui + Tailwind CSS** — UI components and styling

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables — copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ANTHROPIC_API_KEY=
```

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  (auth)/        # Clerk auth routes (sign-in, sign-up)
  api/chat/      # Streaming chat API route (Claude)
  components/    # BudgetForm, SpendingAdvisor
  store/         # Zustand state
components/      # Shared UI components
```
