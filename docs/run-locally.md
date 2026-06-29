# Run Locally

```
npm run content:validate
npm run build
npm run db:migrate:local
npm run db:seed:local
npm run dev:worker
```

`npm run content:validate` checks curriculum files, duplicate IDs, and grade/subject counts without touching D1. `npm run db:seed:local` seeds canonical curriculum from `src/lib/curriculum.ts` first, then the fixed v1 family/profile fixtures from `src/lib/seed-family.ts`, and prints a grade/subject summary.

Practice sets are stored in D1 tables added by `migrations/0006_practice_sets.sql`. Run `npm run db:migrate:local` after pulling this migration before testing weekly vocabulary APIs locally.
