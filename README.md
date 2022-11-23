# Doxi

See full Next.js Application in [/apps/web](https://github.com/mxkaske/doxi/tree/main/apps/web).

[doxi.vercel.app](https://doxi.vercel.app).

> This repository has moved into a monorepo using turbo. A CLI will provide simple access to the core application in `/apps/web`.

### Development

Install dependencies via:

```bash
$ npm run i
```

Run local server

```bash
$ npx turbo run dev
```

### Deployment

Explicitly `build` the website.

```
npx turbo run build --filter=web...
```

On vercel, include the **Root Directory** `apps/web` in the _General_ Settings. The Build Settings should default automatically to Turborepo.
