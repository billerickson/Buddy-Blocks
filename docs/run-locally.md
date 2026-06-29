# Run Locally

```
npm run build
npm run db:migrate:local
npm run db:seed:local
npm run dev:worker
```

`npm run db:seed:local` seeds canonical curriculum from `src/lib/curriculum.ts` first, then the fixed v1 family/profile fixtures from `src/lib/seed-family.ts`.
