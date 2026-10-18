# Redesigned Sufi Garden Website - Monorepo (sufigarden.org)

This repository contains the completely redesigned, modernized, premium, and fully responsive website of the Sufi Garden spiritual organization, engineered with a top-tier modern architecture.

---

## 🌟 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables + CSS Grid Layouts
- **Animations**: Framer Motion + Studio Freight Lenis (Smooth Scroll)
- **Forms**: React Hook Form
- **State & Data Fetching**: TanStack React Query

### Backend
- **Framework**: Node.js + NestJS (Modular structure)
- **ORM & DB**: PostgreSQL + Prisma ORM
- **Security & Speed**: Helmet + Rate Limiter + JWT Authentication + Redis Caching

---

## 📁 Repository Structure

```
c:/SG/
├── docker-compose.yml     # Multi-container local build setup (Postgre, Redis, Nest, Next)
├── package.json           # Monorepo workspaces coordinator
├── prisma/
│   └── schema.prisma      # Shared database relational schema
├── frontend/              # Next.js 15 app router application
│   ├── src/
│   │   ├── app/           # Pages (Home, Programming, Gite, About, Contact, Support, Admin)
│   │   └── components/    # Layouts (Navbar, Footer), Custom UI items
│   ├── tailwind.config.ts
│   └── next.config.ts
└── backend/               # NestJS modular microservice architecture
    ├── src/               # Controllers, modules, and services (Auth, Users, Programs, Events, Blog, Newsletter, Settings)
    └── nest-cli.json
```

---

## 🏛️ Relational Database Schema (Prisma)

The database schema maps all necessary relational models for managing a modern spiritual platform:
- **User / Roles**: Supports `USER`, `ADMIN`, `TEACHER` accounts with encrypted passwords.
- **Articles & Categories**: For posting spiritual reflections and educational blogs.
- **Programs & Events**: Scheduling in-person and online balades / weekly naming explorations.
- **Donations & Newsletter**: Logs donations (direct and via Zeffy) and subscribers.
- **Settings**: Persistent key-value configuration flags.

---

## 🔒 Security & Performance Features

1. **Sanitization & Input Validation**: Integrated NestJS `ValidationPipe` with `class-validator` class decorators to prevent XSS and SQL Injection payloads.
2. **CSRF & Security Headers**: Helmet configuration included in production builds.
3. **Optimized Next.js Assets**: Automated local Google Fonts using Next Font, lazy loading, and optimized Image rendering for fast PageSpeed metrics.
4. **Sitemaps & Search Engine Optimizations**: Meta descriptions, OpenGraph layouts, robots.txt directives and dynamic site mapping definitions.
