# Blibliki Grid

Blibliki Grid is acting as the visual counterpart to the [Blibliki Engine](https://github.com/blibliki-js/engine), it bridges the gap between the technical complexity of synthesizer creation and the intuitive ease of visual interaction. Blibliki Grid enhances this by offering a way to visually orchestrate and manipulate your sonic experiments.

## Development

Requires Node.js, PNPM and a [Clerk](https://clerk.com/) account.

### Install dependencies

```
pnpm install
```

### Setup Clerk account

- Go to cleck.com and create an account
- Create a new Application
- Select Next.js framework
- Follow the instructions and create a `.env.local` file with the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` variables

### Start server

```
pnpm dev
```
