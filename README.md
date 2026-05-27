# Adrine Patient App (Mobile)

Mobile-first **patient super app** for the Adrine hospital platform: login, dashboard, appointments, lab reports, and prescriptions. Built with **Next.js 15** (PWA-ready web app; native React Native can be added later).

This repository is **split from** [Adrine-Infra](https://github.com/pgstudio2006/Adrine-Infra) so your team can get **separate GitHub access** without opening the full hospital monorepo.

---

## Screens

| Route | Purpose |
|-------|---------|
| `/login` | Patient sign-in (name + platform dev-login when configured) |
| `/dashboard` | Home summary |
| `/appointments` | Upcoming visits |
| `/reports` | Lab orders / reports |
| `/prescriptions` | Pharmacy fulfillments |

---

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open **http://localhost:3101**

### Collaborator sees "Failed to fetch"?

The UI on `localhost:3101` does **not** include the APIs. Either run kernel + domain locally ([Collaborator setup](docs/COLLABORATOR_LOCAL_SETUP.md)) or set `NEXT_PUBLIC_PLATFORM_RUNTIME=false` in `.env.local` for demo mode.

### Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_KERNEL_API_URL` | kernel-api base URL |
| `NEXT_PUBLIC_DOMAIN_API_URL` | domain-api base URL |
| `NEXT_PUBLIC_PLATFORM_RUNTIME` | `true` = live APIs; `false` = offline demo |
| `NEXT_PUBLIC_DEV_TENANT_ID` | Staging tenant id |
| `NEXT_PUBLIC_DEV_PATIENT_ID` | Optional fixed patient UUID |

Hospital OS and APIs must allow CORS for your app origin (e.g. `http://localhost:3101`).

---

## Deploy (Vercel)

1. Import this repo in Vercel.
2. Framework: **Next.js** (root directory `.`).
3. Set the same `NEXT_PUBLIC_*` variables for Production.
4. Add your Vercel URL to API `CORS_ORIGINS` on kernel-api and domain-api.

---

## Relation to Adrine Infra

| Repo | Contents |
|------|----------|
| **Adrine-Infra** | Hospital OS, kernel-api, domain-api, control plane, IaC |
| **Adrine-Patient-App** (this repo) | Patient-facing mobile web app only |

When you change patient UI here, optionally copy updates back to `apps/patient-app` in the monorepo (or we can automate with a sync script later).

---

## Team access

In GitHub: **Settings → Collaborators** (private repo) or add your company **GitHub Team** with read/write as needed. Do not commit `.env.local` or API secrets.

---

## License

Proprietary — Adrine / your company. All rights reserved unless you add a LICENSE file.
