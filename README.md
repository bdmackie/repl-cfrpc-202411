# PNPM monorepo

Tests this issue: <https://github.com/cloudflare/workers-sdk/issues/6955>

This is a simple SvelteKit app running on Cloudflare Pages that is calling a simple Worker via RPC.

This is currently working due to --x-registry=false being specified in the wrangler dev command for the worker, however if you take this out it reproduces the issue when running these commands:

```ssh
# /sumworker
pnpm run start

# /webapp
pnpm run start
```

Note that it works when the 'dev' commands are used as the web app uses Vite for this not wrangler.
