# EOTC Website — Architecture & Codebase Guide


> Last Updated: May 2026  
> Stack: Next.js 14 (App Router) · TypeScript 5 · Tailwind CSS · Framer Motion · Zustand · Zod  
> Status: Phase 1 — Build the Foundation

This is the single source of truth for how the EOTC website is structured, what goes where, and how every layer works. **Read this before writing any code.**

---

## Table of Contents

1. [What We Are Building](#1-what-we-are-building)
2. [Tech Stack — Locked](#2-tech-stack--locked)
3. [Folder Structure](#3-folder-structure)
4. [State Management](#4-state-management)
5. [API Layer](#5-api-layer)
6. [CMS Layer](#6-cms-layer)
7. [Type System](#7-type-system)
8. [How Pages Work](#8-how-pages-work)
9. [How Components Work](#9-how-components-work)
10. [Page-by-Page Content Map](#10-page-by-page-content-map)
11. [Design Tokens & Theme](#11-design-tokens--theme)
12. [How to Add New Things](#12-how-to-add-new-things)
13. [Rules — Never Break These](#13-rules--never-break-these)
14. [CI / Quality Gates](#14-ci--quality-gates)
15. [Quick Reference](#15-quick-reference)

---

## 1. What We Are Building

The EOTC website is a **public-facing content and service platform** for the Ethiopian Orthodox Tewahedo Church. It is not a dashboard or SaaS app — it is a content-rich, spiritually-centered website that serves 60M+ faithful worldwide.

### The Four Pillars

| Pillar | Module | Phase |
|---|---|---|
| SUSTAIN | Digital Giving Portal — donate to churches & monasteries | Phase 1 |
| CONNECT | Church Finder & Events — find parishes, service times, feast days | Phase 1 |
| INFORM | News & Announcements — EOTC official + pan-Orthodox news | Phase 2 |
| EDUCATE | Tewahedo Academy — e-learning for all ages (Gebi Gubaye) | Phase 2 |

### What this is NOT

- Not a CMS dashboard (Strapi is the backend CMS — separate repo)
- Not a multi-tenant app
- Not a SPA — it is a server-rendered Next.js site with ISR
- Not a design system library — components are purpose-built for this site

---

## 2. Tech Stack — Locked

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR + ISR for SEO. Fast on slow connections. Built-in i18n. |
| Language | TypeScript 5 (strict) | Catches errors early. Required for a large content site. |
| Styling | Tailwind CSS v3 | Utility-first. Fast to build. Consistent with EOTC design tokens. |
| Fonts | next/font (Google Fonts) | Noto Serif Ethiopic (Ge'ez/Amharic), Noto Serif Display, Lora, DM Sans |
| Animations | Framer Motion | Navbar drawer, page transitions, hover effects |
| State | Zustand | Shared UI state (navbar, language, theme). Minimal boilerplate. |
| Forms | React Hook Form + Zod | Contact forms, newsletter, donation amount inputs |
| Icons | Lucide React | Consistent icon set. Tree-shakable. |
| HTTP | Native `fetch` | Next.js ISR requires native fetch. No axios. |
| Testing | Vitest + Testing Library | Unit tests for lib functions, store tests, component tests |
| Linting | ESLint + Prettier | Enforced in CI. Zero warnings policy. |

### Packages to install

```bash
# Core
npm install framer-motion lucide-react zustand

# Forms & validation
npm install react-hook-form zod @hookform/resolvers

# Fonts (Ethiopic)
npm install @fontsource/noto-serif-ethiopic

# Dev
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
npm install -D eslint-config-next prettier
```

### What we deliberately did NOT add

| Tool | Why Not |
|---|---|
| Redux Toolkit | Overkill. This is a content site. Zustand handles all shared state. |
| Axios | Native fetch works with Next.js ISR caching. Axios breaks `next: { revalidate }`. |
| TanStack Query | Not needed — pages fetch server-side. Donation form is the only client mutation. |
| Prisma / Sequelize | The backend is Strapi. We consume its API. No ORM on the frontend. |
| GraphQL | Strapi exposes REST by default. No reason to add a GraphQL layer. |
| SWR | Same reasoning as TanStack Query — server components own data fetching. |
| Storybook | Add in Phase 3 when component library stabilises. |

---

## 3. Folder Structure

```
eotc-website/
│
├── src/
│   │
│   ├── app/                          # Next.js App Router — routes ONLY, no logic
│   │   ├── layout.tsx                # Root layout: Navbar + Footer shell
│   │   ├── page.tsx                  # Homepage (server component)
│   │   ├── globals.css               # CSS variables + Tailwind base
│   │   ├── not-found.tsx             # 404 page — branded EOTC style
│   │   ├── error.tsx                 # Global error boundary with retry
│   │   │
│   │   ├── scripture/
│   │   │   ├── page.tsx              # Scripture library landing
│   │   │   └── [book]/
│   │   │       └── [chapter]/page.tsx # Bible reader: /scripture/genesis/1
│   │   │
│   │   ├── worship/
│   │   │   ├── page.tsx              # Worship hub
│   │   │   ├── zema/page.tsx         # Zema audio library
│   │   │   ├── calendar/page.tsx     # Liturgical calendar
│   │   │   ├── fasting/page.tsx      # Fasting guide
│   │   │   └── chant-stand/page.tsx  # Digital Chant Stand
│   │   │
│   │   ├── our-church/
│   │   │   ├── page.tsx              # Church overview
│   │   │   ├── patriarch/page.tsx    # Abune Mathias profile
│   │   │   ├── holy-synod/page.tsx   # Synod members directory
│   │   │   ├── history/page.tsx      # Church history
│   │   │   └── saints/page.tsx       # Saints / Synaxarium
│   │   │
│   │   ├── find-a-church/
│   │   │   └── page.tsx              # Church finder map
│   │   │
│   │   ├── give/
│   │   │   ├── page.tsx              # Giving portal
│   │   │   └── campaign/[slug]/page.tsx # Individual campaign
│   │   │
│   │   ├── academy/
│   │   │   ├── page.tsx              # Academy home (Phase 2)
│   │   │   └── [track]/
│   │   │       └── [course]/page.tsx # Course view (Phase 2)
│   │   │
│   │   ├── news/
│   │   │   ├── page.tsx              # News hub (Phase 2)
│   │   │   └── [slug]/page.tsx       # Article page
│   │   │
│   │   └── api/
│   │       ├── donate/route.ts       # Stripe + Telebirr payment intent
│   │       └── newsletter/route.ts   # Email subscribe endpoint
│   │
│   ├── features/                     # Domain-scoped feature components
│   │   ├── home/
│   │   │   └── components/           # HeroSection, DailyDevotion, PillarCards, etc.
│   │   ├── scripture/
│   │   │   └── components/           # BibleReader, BookNavigator, ParallelColumns, AudioPlayer
│   │   ├── worship/
│   │   │   └── components/           # ZemaPlayer, ZemaLibrary, ChantStand, CalendarGrid, FastingGuide
│   │   ├── church/
│   │   │   └── components/           # PatriarchProfile, SynodGrid, HistoryTimeline, SaintCard
│   │   ├── finder/
│   │   │   └── components/           # ChurchMap, ChurchCard, FilterPanel, ChurchDetail
│   │   ├── giving/
│   │   │   └── components/           # DonationForm, CampaignCard, MonasteryAdoption, TransparencyBar
│   │   ├── academy/                  # Phase 2
│   │   │   └── components/           # TrackSelector, CourseCard, LessonView, ProgressBar, Certificate
│   │   └── news/                     # Phase 2
│   │       └── components/           # NewsCard, NewsFeed, ArticleBody, NewsletterForm
│   │
│   ├── components/                   # Shared components — used across features
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Orchestrator — max 120 lines
│   │   │   ├── Navbar/
│   │   │   │   ├── DesktopNav.tsx    # Desktop links + dropdowns
│   │   │   │   ├── NavDropdown.tsx   # Individual dropdown panel
│   │   │   │   ├── NavDrawer.tsx     # Mobile slide-in drawer (Framer Motion)
│   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   └── GiveButton.tsx    # Gold CTA button
│   │   │   ├── Footer.tsx            # Orchestrator — max 120 lines
│   │   │   ├── Footer/
│   │   │   │   ├── FooterColumn.tsx
│   │   │   │   ├── FooterBottomBar.tsx
│   │   │   │   ├── NewsletterForm.tsx
│   │   │   │   └── CrossBorderStrip.tsx  # Decorative gold cross divider
│   │   │   └── NavigationProvider.tsx
│   │   │
│   │   └── ui/                       # Shared primitives
│   │       ├── SectionErrorBoundary.tsx
│   │       ├── PageHero.tsx
│   │       ├── AudioPlayer.tsx
│   │       ├── EthiopicText.tsx       # Wrapper that always applies font-ethiopic
│   │       ├── CrossDivider.tsx       # Decorative section divider
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/                          # Pure logic — no JSX ever
│   │   ├── cms.ts                    # All CMS fetch functions + defaults
│   │   ├── calendar.ts               # Ethiopian ↔ Gregorian date conversion
│   │   ├── liturgy.ts                # Daily saint, readings, fasting lookups
│   │   ├── utils.ts                  # cn(), formatDate(), slugify()
│   │   ├── api/
│   │   │   ├── client.ts             # API_BASE + fetchWithFallback
│   │   │   ├── scripture.ts          # fetchBook(), fetchChapter()
│   │   │   ├── zema.ts               # fetchZemaLibrary(), fetchZemaTrack()
│   │   │   ├── churches.ts           # fetchChurches(), fetchChurchBySlug()
│   │   │   ├── campaigns.ts          # fetchCampaigns(), fetchCampaignBySlug()
│   │   │   ├── news.ts               # fetchNews(), fetchArticleBySlug() — Phase 2
│   │   │   ├── academy.ts            # fetchTracks(), fetchCourse() — Phase 2
│   │   │   └── index.ts              # Barrel re-export
│   │   └── __tests__/
│   │       ├── calendar.test.ts
│   │       ├── liturgy.test.ts
│   │       └── cms.test.ts
│   │
│   ├── store/                        # Zustand stores — shared UI state only
│   │   ├── ui.store.ts               # Navbar open/close, active dropdown, scrolled
│   │   ├── language.store.ts         # Active language: 'am' | 'en' | 'ti'
│   │   └── __tests__/
│   │       ├── ui.store.test.ts
│   │       └── language.store.test.ts
│   │
│   ├── types/                        # TypeScript types — one file per domain
│   │   ├── index.ts                  # Barrel re-export ONLY — no definitions here
│   │   ├── api.ts                    # ApiResponse<T>, PaginatedApiResponse<T>
│   │   ├── scripture.ts              # Book, Chapter, Verse, BibleLanguage
│   │   ├── zema.ts                   # ZemaTrack, ZemaCategory, ZemaMode
│   │   ├── church.ts                 # Church, Diocese, ServiceTime, Tabot
│   │   ├── liturgy.ts                # FeastDay, FastDay, Saint, DailyReading
│   │   ├── giving.ts                 # Campaign, Donation, DonationFrequency
│   │   ├── navigation.ts             # NavItem, NavDropdownItem, FooterColumn
│   │   ├── academy.ts                # Track, Course, Lesson, Certificate — Phase 2
│   │   └── news.ts                   # Article, NewsCategory — Phase 2
│   │
│   ├── data/                         # Static data — no API calls
│   │   ├── navigation.ts             # Navbar menu structure (all items + dropdowns)
│   │   ├── footer.ts                 # Footer column structure + links
│   │   ├── books.ts                  # 81-book Bible canon list with Amharic names
│   │   ├── calendar-defaults.ts      # Ethiopian feast/fast day baseline data
│   │   └── fasting-rules.ts          # Seven EOTC fasting periods + rules
│   │
│   └── styles/
│       └── tokens.css                # All CSS custom properties (colours, fonts, spacing)
│
├── public/
│   ├── icons/
│   │   ├── eotc-cross.svg            # Main logo
│   │   ├── cross-border.svg          # Repeating decorative cross strip
│   │   └── tabot-icon.svg
│   ├── images/
│   │   ├── patriarch/
│   │   ├── churches/
│   │   └── angels/
│   │       ├── angel-left.svg        # Navbar angel (Gabriel)
│   │       └── angel-right.svg       # Navbar angel (Michael)
│   └── fonts/
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
├── .eslintrc.json
├── .prettierrc
├── ARCHITECTURE.md                   # This file
└── package.json
```

---

## 4. State Management

### Rule: Three buckets. No mixing.

**Bucket 1 — Server State (data from Strapi API)**

Tool: **Next.js Server Components + ISR**

- All content pages fetch data in server components using `lib/api/` functions
- Next.js caches the response and revalidates on a schedule (`next: { revalidate: N }`)
- No TanStack Query, no SWR — server components own all data fetching
- Exception: the donation form uses a client-side API call (`/api/donate`) — this is a mutation, not a data fetch

**Bucket 2 — Shared UI State (ephemeral, resets on refresh)**

Tool: **Zustand**

| Store | State it owns | Used by |
|---|---|---|
| `ui.store.ts` | `isNavOpen`, `activeDropdown`, `isScrolled`, `navVisible` | Navbar, NavDrawer, DesktopNav |
| `language.store.ts` | `language: 'am' \| 'en' \| 'ti'`, `setLanguage()` | LanguageSwitcher, EthiopicText, all pages |

**Bucket 3 — Local Component State**

Tool: **`useState`**

Use `useState` for anything scoped to a single component:
- Form input values and validation state
- Audio player playback state (current track, playing, progress)
- Calendar month navigation (prev/next month)
- Accordion open/close within one section
- Bible chapter/verse selection within the reader

### When to create a new store

Only when **multiple unrelated components** need to share state that props cannot carry. Planned stores:

- `store/donation.store.ts` — when multi-step donation form is built (selected church, amount, frequency)
- `store/audio.store.ts` — when the Zema player needs to persist across page navigation

---

## 5. API Layer

### Rule: Zero raw `fetch()` calls in components or pages. All fetches go through `lib/api/`.

```
lib/api/
  client.ts      → API_BASE + fetchWithFallback utility
  scripture.ts   → fetchBook(), fetchChapter(), fetchVerse()
  zema.ts        → fetchZemaLibrary(), fetchZemaByMode()
  churches.ts    → fetchChurches(), fetchChurchBySlug()
  campaigns.ts   → fetchCampaigns(), fetchCampaignBySlug()
  news.ts        → fetchNews(), fetchArticleBySlug()         ← Phase 2
  academy.ts     → fetchTracks(), fetchCourse()              ← Phase 2
  index.ts       → barrel re-export of all above
```

### `lib/api/client.ts`

```typescript
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.eotc.org/v1';

export async function fetchWithFallback<T>(
  url: string,
  fallback: T,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return fallback;
    const json: ApiResponse<T> = await res.json();
    if (!json.success) return fallback;
    return json.data;
  } catch {
    return fallback;
  }
}
```

### ISR revalidation rules

| Data type | `revalidate` | Reason |
|---|---|---|
| Homepage CMS content | `3600` (1h) | Changes rarely |
| Scripture text | `false` (static) | Never changes |
| Zema library | `86400` (24h) | Rarely updated |
| Church directory | `3600` (1h) | Occasionally updated |
| Campaigns | `600` (10 min) | Donation totals change frequently |
| News articles | `1800` (30 min) | New content published regularly |
| Liturgical calendar | `false` (static) | Computed from `data/calendar-defaults.ts` |

### How to add a new API function

1. Create `lib/api/[domain].ts`
2. Import `API_BASE` and `fetchWithFallback` from `./client`
3. Import the type from `@/types`
4. Always return a safe fallback (empty array, `null`, or default object)
5. Export from `lib/api/index.ts`

```typescript
// lib/api/churches.ts
import type { Church } from '@/types';
import { API_BASE, fetchWithFallback } from './client';

export async function fetchChurches(): Promise<Church[]> {
  return fetchWithFallback<Church[]>(
    `${API_BASE}/churches`,
    [],
    { next: { revalidate: 3600 } }
  );
}

export async function fetchChurchBySlug(slug: string): Promise<Church | null> {
  return fetchWithFallback<Church | null>(
    `${API_BASE}/churches/${slug}`,
    null,
    { next: { revalidate: 3600 } }
  );
}
```

---

## 6. CMS Layer

`lib/cms.ts` owns all CMS-driven page content fetched from Strapi.

### Pattern for every CMS page

```typescript
// 1. Interface — matches Strapi content-type shape exactly
export interface HomeSettings {
  hero_title: string;
  hero_subtitle_am: string;   // Amharic
  hero_subtitle_en: string;   // English
  patriarch_image_url: string;
  patriarch_message: string;
  show_daily_devotion: boolean;
}

// 2. Defaults — always renders something even if Strapi is down
export const HOME_DEFAULTS: HomeSettings = {
  hero_title: 'Ethiopian Orthodox Tewahedo Church',
  hero_subtitle_am: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን',
  hero_subtitle_en: 'One Church. One Faith. One People.',
  patriarch_image_url: '/images/patriarch/abune-mathias.jpg',
  patriarch_message: '',
  show_daily_devotion: true,
};

// 3. Fetch function — server-side only, ISR cached
export async function getHomeSettings(): Promise<HomeSettings> {
  try {
    const res = await fetch(`${CMS_BASE}/homepage`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return HOME_DEFAULTS;
    const data = await res.json();
    return mergeWithDefaults(data?.data ?? {}, HOME_DEFAULTS);
  } catch {
    return HOME_DEFAULTS;
  }
}
```

### `mergeWithDefaults` rule

- API value is `null` or `undefined` → use default
- API value is `""` (empty string) → use default
- API value is `[]` (empty array) → **use the empty array** (valid response)
- API value is any other value → use the API value

---

## 7. Type System

### Rule: One file per domain. Never define types in `types/index.ts`.

`types/index.ts` is a barrel re-export only. All type definitions live in domain files.

```
types/
  api.ts         → ApiResponse<T>, PaginatedApiResponse<T>
  scripture.ts   → Book, Chapter, Verse, BibleLanguage, CanonSection
  zema.ts        → ZemaTrack, ZemaCategory, ZemaMode ('Ge\'ez' | 'Araray' | 'Ezil')
  church.ts      → Church, Diocese, ServiceTime, Tabot, ChurchType
  liturgy.ts     → FeastDay, FastDay, Saint, DailyReading, EthiopianDate
  giving.ts      → Campaign, Donation, DonationFrequency, PaymentMethod
  navigation.ts  → NavItem, NavDropdownItem, FooterColumn, FooterLink
  academy.ts     → Track, Course, Lesson, Certificate (Phase 2)
  news.ts        → Article, NewsCategory (Phase 2)
```

### API response envelope

Every Strapi API endpoint returns:
```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: { page: number; pageSize: number; total: number };
  };
}
```

### How to import types

```typescript
// Preferred — from barrel
import type { Church, ZemaTrack, Campaign } from '@/types';

// Also fine — from specific file
import type { Church, Tabot } from '@/types/church';
```

---

## 8. How Pages Work

### Server components (default for all pages)

All `app/` pages are **server components** by default. They:
- Fetch data from `lib/cms.ts` or `lib/api/`
- Pass data as props to feature components
- Never use `useState`, `useEffect`, or browser APIs
- Are always wrapped in `<SectionErrorBoundary>` per section

```typescript
// app/page.tsx — Homepage server component
import { getHomeSettings } from '@/lib/cms';
import { getDailyLiturgy } from '@/lib/liturgy';
import HeroSection from '@/features/home/components/HeroSection';
import DailyDevotion from '@/features/home/components/DailyDevotion';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export default async function HomePage() {
  const [settings, liturgy] = await Promise.all([
    getHomeSettings(),
    getDailyLiturgy(),
  ]);

  return (
    <>
      <SectionErrorBoundary sectionName="home-hero">
        <HeroSection settings={settings} />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="home-devotion">
        <DailyDevotion liturgy={liturgy} />
      </SectionErrorBoundary>
    </>
  );
}
```

### Client components

Add `"use client"` only when the component needs:
- `useState` or `useEffect`
- Browser APIs (`window`, `document`, `navigator.geolocation`)
- Framer Motion animations
- Zustand store access
- Form submission handlers

```typescript
// features/finder/components/ChurchMap.tsx
"use client";
import { useState, useEffect } from 'react';
import type { Church } from '@/types';

export default function ChurchMap({ initialChurches }: { initialChurches: Church[] }) {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  // ...
}
```

---

## 9. How Components Work

### Component location rules

| Component type | Location |
|---|---|
| Homepage sections | `features/home/components/` |
| Scripture reader components | `features/scripture/components/` |
| Zema player, chant stand | `features/worship/components/` |
| Patriarch, Synod, history | `features/church/components/` |
| Church finder & map | `features/finder/components/` |
| Donation form, campaigns | `features/giving/components/` |
| Academy courses & lessons | `features/academy/components/` |
| News feed & articles | `features/news/components/` |
| Navbar and all sub-components | `components/layout/Navbar/` |
| Footer and all sub-components | `components/layout/Footer/` |
| Shared UI primitives | `components/ui/` |

### Component rules

- **Max 200 lines per file.** Extract sub-components if exceeded.
- **Max 8 props per component.** Use a context or store if more are needed.
- **No `any` in props.** ESLint will fail the build.
- **No hardcoded hex values.** Use CSS variables (`var(--color-gold)`) or Tailwind tokens (`text-gold`).
- **All Amharic/Ge'ez text** must be wrapped in `<EthiopicText>` or have `className="font-ethiopic"`.

### `EthiopicText` component

Any text in Amharic or Ge'ez **must** use this wrapper. Never use a Latin font for Ethiopic script.

```typescript
// components/ui/EthiopicText.tsx
interface EthiopicTextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3';
  className?: string;
}

export function EthiopicText({ children, as: Tag = 'span', className }: EthiopicTextProps) {
  return (
    <Tag className={cn('font-ethiopic', className)} lang="am">
      {children}
    </Tag>
  );
}
```

---

## 10. Page-by-Page Content Map

Each page is listed with: its sections (top to bottom), the data source for each section, and the component that renders it.

---

### `/` — Homepage

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Patriarch Hero** — full-width banner with photo of Abune Mathias, headline in English + Amharic, CTA: "Today's Feast" + "Watch Live" | `getHomeSettings()` | `features/home/HeroSection.tsx` |
| 2 | **Daily Devotion Strip** — today's Ethiopian date, feast/fast status, saint of the day, Psalm + Epistle + Gospel, fasting guidance | `getDailyLiturgy()` from `lib/liturgy.ts` | `features/home/DailyDevotion.tsx` |
| 3 | **Four Pillar Cards** — Give / Find a Church / Academy / News: 2×2 grid on mobile, 1×4 on desktop | Static: `data/navigation.ts` | `features/home/PillarCards.tsx` |
| 4 | **Upcoming Feasts** — next 3 feast days with name (Amharic + English), days remaining, link to calendar | `getDailyLiturgy()` | `features/home/UpcomingFeasts.tsx` |
| 5 | **Mesale E-Card** — send an Orthodox feast-day greeting with Ethiopian icon art | Static | `features/home/MesaleCard.tsx` |
| 6 | **Latest News Strip** — 3 news headlines with image + date + category | `fetchNews({ limit: 3 })` (Phase 2, shows placeholder in Phase 1) | `features/home/NewsStrip.tsx` |
| 7 | **Newsletter Subscribe** — email input, "Get feast reminders" copy | Client form → `/api/newsletter` | `components/layout/Footer/NewsletterForm.tsx` |

**Page type:** Server component. All data fetched server-side in parallel with `Promise.all`.

---

### `/scripture` — Scripture Library

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Page Hero** — title in Amharic + English, brief intro to the 81-book canon | Static | `components/ui/PageHero.tsx` |
| 2 | **Canon Tabs** — Old Testament / New Testament / Deuterocanonical / EOTC-Unique books | Static: `data/books.ts` | `features/scripture/CanonTabs.tsx` |
| 3 | **Book Grid** — all 81 books as cards. Clicking a book opens the chapter list. | Static: `data/books.ts` | `features/scripture/BookGrid.tsx` |

**Page type:** Server component. No API call needed — book list is static.

---

### `/scripture/[book]/[chapter]` — Bible Reader

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Book Sidebar** — collapsible list of all chapters in the current book | Static: `data/books.ts` | `features/scripture/BookNavigator.tsx` |
| 2 | **Language Tabs** — Ge'ez / Amharic / English toggle (client-side state) | Client `useState` | `features/scripture/LanguageTabs.tsx` |
| 3 | **Parallel Reader** — three columns: Ge'ez, Amharic, English. Clicking a verse number highlights it in all three columns simultaneously. | `fetchChapter(book, chapter, lang)` | `features/scripture/ParallelColumns.tsx` |
| 4 | **Audio Player** — plays audio reading for the current chapter. Speed control, download. | `fetchChapterAudio(book, chapter)` | `components/ui/AudioPlayer.tsx` |
| 5 | **EOTC Canon Note** — shown only for Deuterocanonical/unique books. Explains the canon status. | Static | `features/scripture/CanonNote.tsx` |
| 6 | **Chapter Navigation** — Previous chapter / Next chapter arrows | Derived from `data/books.ts` | `features/scripture/ChapterNav.tsx` |

**Page type:** Server component for initial render. Language tab switching is client-side only (no refetch — all three language texts loaded in parallel).

---

### `/worship` — Worship Hub

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Page Hero** | Static | `PageHero.tsx` |
| 2 | **Quick Links** — 4 cards: Zema Library / Calendar / Fasting Guide / Chant Stand | Static | `features/worship/WorkshipLinks.tsx` |
| 3 | **Today's Liturgy Preview** — today's saint, readings, feast/fast status | `getDailyLiturgy()` | `features/worship/TodayLiturgy.tsx` |
| 4 | **Featured Zema** — 3 recently added Zema tracks | `fetchZemaLibrary({ limit: 3 })` | `features/worship/FeaturedZema.tsx` |

---

### `/worship/zema` — Zema Library

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Mode Filter** — Ge'ez / Araray / Ezil toggle | Client `useState` | `features/worship/ZemaModeFilter.tsx` |
| 2 | **Category Filter** — Feast / Prayer / Mahelet / Qidase / Wudase | Client `useState` | `features/worship/ZemaCategoryFilter.tsx` |
| 3 | **Track List** — scrollable list of Zema tracks with title, mode, duration, play button | `fetchZemaLibrary()` filtered client-side | `features/worship/ZemaLibrary.tsx` |
| 4 | **Audio Player** — sticky at bottom of screen when a track is playing | Client `useState` + `store/audio.store.ts` (Phase 2) | `components/ui/AudioPlayer.tsx` |

**Page type:** Server component fetches full library. Client component handles filter state.

---

### `/worship/calendar` — Liturgical Calendar

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Month Navigation** — previous/next month. Shows Ethiopian month name + Gregorian month. | `lib/calendar.ts` | `features/worship/CalendarHeader.tsx` |
| 2 | **Calendar Grid** — 7-column month grid. Color coding: Gold = feast, Gold outline = fast, Navy = major feast. | `lib/liturgy.ts` + `data/calendar-defaults.ts` | `features/worship/CalendarGrid.tsx` |
| 3 | **Day Detail** — opens on day click: full date both calendars, saint biography, daily readings, fasting rules | `lib/liturgy.ts` | `features/worship/DayDetail.tsx` |
| 4 | **ICS Download** — download full year as .ics for Google / Apple / Outlook | Static generation | `features/worship/ICSDownload.tsx` |
| 5 | **Upcoming Feasts List** — next 5 feast days with name + date + add-reminder button | `lib/liturgy.ts` | `features/worship/UpcomingFeastsList.tsx` |

**Page type:** Mostly static + `lib/liturgy.ts` computation. No API call. Client for month navigation.

---

### `/worship/chant-stand` — Digital Chant Stand

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Service Selector** — Sunday Qidase / Wudase Mariam / Arganona / Seytat | Static | `features/worship/ServiceSelector.tsx` |
| 2 | **Chant Text Display** — large Ge'ez text, full screen option. For Debteras to use during service. | `fetchChantText(service, section)` | `features/worship/ChantDisplay.tsx` |
| 3 | **Text Controls** — font size up/down, Ge'ez/Amharic/English toggle, download PDF | Client `useState` | `features/worship/ChantControls.tsx` |

---

### `/our-church` — Church Overview

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Page Hero** | Static | `PageHero.tsx` |
| 2 | **Patriarch Card** — photo, name, brief bio, link to full page | `getPatriarchSettings()` | `features/church/PatriarchCard.tsx` |
| 3 | **Faith Overview** — Tewahedo Christology in plain language. "One Nature of Christ" explained. | `getChurchSettings()` | `features/church/FaithOverview.tsx` |
| 4 | **Quick Links** — 4 cards: Patriarch / Holy Synod / History / Saints | Static | `features/church/ChurchLinks.tsx` |

---

### `/our-church/patriarch` — Patriarch Page

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Hero** — full-width photo, name, title in Amharic + English | `getPatriarchSettings()` | `features/church/PatriarchHero.tsx` |
| 2 | **Biography** — life, election, ministry | `getPatriarchSettings()` | `features/church/PatriarchBio.tsx` |
| 3 | **Latest Pastoral Letter** — most recent official letter | `fetchNews({ category: 'pastoral', limit: 1 })` | `features/church/PastoralLetter.tsx` |
| 4 | **Patriarchal Lineage** — all Patriarchs from Frumentius to present | Static: `data/patriarchs.ts` | `features/church/LineageTimeline.tsx` |

---

### `/find-a-church` — Church Finder

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Search Bar** — "Search near..." + "Use My Location" button | Client geolocation API | `features/finder/SearchBar.tsx` |
| 2 | **Filter Bar** — Country / Diocese / Tabot patron / Language of service | Client `useState` | `features/finder/FilterBar.tsx` |
| 3 | **Map** (left 60%) — Google Maps with gold EOTC cross pins | `fetchChurches()` + client geolocation | `features/finder/ChurchMap.tsx` |
| 4 | **Results List** (right 40%) — scrollable church list with name, distance, service time, Quick Donate link | `fetchChurches()` filtered | `features/finder/ChurchList.tsx` |
| 5 | **Church Detail Panel** — opens on church select: photo, Tabot, service times, events, directions, Watch Live, Donate | `fetchChurchBySlug(slug)` | `features/finder/ChurchDetail.tsx` |

**Page type:** Server component fetches all churches. Client component handles map, geolocation, and filtering.

---

### `/give` — Giving Portal

| # | Section | Data Source | Component |
|---|---|---|---|
| 1 | **Page Hero** — "Give — ለቤተ ክርስቲያን ስጡ" with brief mission statement | Static | `PageHero.tsx` |
| 2 | **Giving Type Tabs** — Give to a Church / Give to a Monastery / Support a Campaign / General Fund | Client `useState` | `features/giving/GivingTabs.tsx` |
| 3 | **Donation Form** — recipient selector, amount presets (100/500/1000 ETB or custom), frequency (one-time/monthly/annual), payment method | Client form (React Hook Form + Zod) → `/api/donate` | `features/giving/DonationForm.tsx` |
| 4 | **Payment Methods** — Telebirr / CBE Birr / Credit Card (Stripe) / PayPal, currency selector | Client `useState` | `features/giving/PaymentSelector.tsx` |
| 5 | **Active Campaigns** (right panel) — campaign cards with progress bars, donor count, days remaining | `fetchCampaigns({ status: 'active' })` | `features/giving/CampaignList.tsx` |
| 6 | **Monastery Adoption** — browse monasteries for monthly sponsorship | `fetchChurches({ type: 'monastery' })` | `features/giving/MonasteryAdoption.tsx` |
| 7 | **Transparency Strip** — total raised this year, churches supported, link to stewardship report | `fetchGivingStats()` | `features/giving/TransparencyStrip.tsx` |

**Page type:** Server component fetches campaigns and transparency stats. Donation form is fully client-side.

---

## 11. Design Tokens & Theme

All colours and fonts are defined as CSS variables in `src/styles/tokens.css` and extended in `tailwind.config.ts`. **No hardcoded hex values anywhere in component code.**

### `src/styles/tokens.css`

```css
:root {
  /* ── Colours ── */
  --color-night:       #0D1F30;   /* navbar/footer bg — night vigil */
  --color-navy:        #1A3A5C;   /* primary — monastery stone */
  --color-navy-mid:    #2E5984;   /* secondary — sky of Zion */
  --color-gold:        #C8A84B;   /* accent — manuscript gold */
  --color-gold-light:  #F0D98A;   /* hover — candlelight */
  --color-gold-bg:     #FFF8E7;   /* warm bg — vellum parchment */
  --color-crimson:     #8B3A3A;   /* feast/alert — liturgical red */
  --color-stone:       #F4F4F4;   /* surface — card backgrounds */
  --color-text:        #3D2B00;   /* body text — incense brown */
  --color-text-muted:  #7A6A55;   /* muted body */
  --color-border:      #E0D5C0;   /* dividers */

  /* ── Fonts ── */
  --font-display:   'Noto Serif Display', serif;
  --font-body:      'Lora', serif;
  --font-ethiopic:  'Noto Serif Ethiopic', serif;
  --font-ui:        'DM Sans', sans-serif;

  /* ── Spacing (8pt grid) ── */
  --space-1: 8px;   --space-2: 16px;  --space-3: 24px;
  --space-4: 32px;  --space-6: 48px;  --space-8: 64px;

  /* ── Layout ── */
  --navbar-height:  64px;
  --max-width:      1200px;
}
```

### `tailwind.config.ts` extension

```typescript
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night:        'var(--color-night)',
        navy:         'var(--color-navy)',
        'navy-mid':   'var(--color-navy-mid)',
        gold:         'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'gold-bg':    'var(--color-gold-bg)',
        crimson:      'var(--color-crimson)',
        stone:        'var(--color-stone)',
      },
      fontFamily: {
        display:   ['var(--font-display)'],
        body:      ['var(--font-body)'],
        ethiopic:  ['var(--font-ethiopic)'],
        ui:        ['var(--font-ui)'],
      },
    },
  },
};
```

---

## 12. How to Add New Things

### Adding a new page

1. Create `src/app/[route]/page.tsx` as a server component
2. If it needs CMS data: add `get[Page]Settings()` to `lib/cms.ts`
3. If it needs API data: add a function to `lib/api/[domain].ts`
4. Create section components in `features/[domain]/components/`
5. Wrap every section in `<SectionErrorBoundary sectionName="[page]-[section]">`
6. Add types to `types/[domain].ts`

### Adding a new API function

1. Add the type to `types/[domain].ts`
2. Create or update `lib/api/[domain].ts`
3. Export from `lib/api/index.ts`
4. Add a test: `lib/__tests__/[domain].test.ts`

### Adding a new feature section

1. Create `features/[domain]/components/[ComponentName].tsx`
2. Props fully typed — no `any`
3. Add `"use client"` only if it needs interactivity
4. Import and use in the page component

### Adding a new Zod schema (forms)

1. Create `features/[domain]/schemas/[name].schema.ts`
2. Export the schema and the inferred type
3. Add tests: `features/[domain]/schemas/[name].schema.test.ts`

### Adding a new store

Only when multiple unrelated components need shared state:
1. Create `store/[name].store.ts`
2. Define `interface [Name]State` and `interface [Name]Actions` separately
3. Export `use[Name]Store = create<State & Actions>(...)`
4. Add tests: `store/__tests__/[name].store.test.ts`

---

## 13. Rules — Never Break These

### TypeScript
- ❌ No `any` — ESLint blocks the build
- ✅ `strict: true` in `tsconfig.json`
- ✅ Use `unknown` + narrowing for flexible types

### API calls
- ❌ No raw `fetch()` in components or pages
- ✅ All fetches through `lib/api/` or `lib/cms.ts`
- ✅ Native `fetch` only — never axios
- ✅ Always return a safe fallback

### Components
- ❌ No component over 200 lines
- ❌ No `any` in props
- ❌ No hardcoded hex values — CSS variables only
- ❌ No Amharic/Ge'ez text without `font-ethiopic` class
- ✅ Wrap all CMS sections in `<SectionErrorBoundary>`

### State
- ❌ Never fetch data in a client component if it can be fetched server-side
- ❌ Never add unrelated state to `ui.store.ts`
- ✅ `useState` for local state — Zustand for shared UI state only

### Types
- ❌ No type definitions in `types/index.ts`
- ❌ No `any` in type definitions
- ✅ One file per domain
- ✅ API types must match the Strapi content-type schema exactly

### Commits
- ✅ Max 5 files per commit
- ✅ Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`
- ✅ One branch per feature / fix

---

## 14. CI / Quality Gates

Every push to `main` or `dev` runs:

```
1. npm run lint        → 0 errors required
2. npx tsc --noEmit    → 0 type errors required
3. npm run test:run    → all tests must pass
4. npm run build       → production build must succeed
```

All four must pass. No exceptions.

### Run locally before pushing

```bash
npm run lint
npx tsc --noEmit
npm run test:run
npm run build
```

---

## 15. Quick Reference

### "Where does X go?"

| Thing | Location |
|---|---|
| New page | `src/app/[route]/page.tsx` |
| New homepage section | `features/home/components/` |
| New scripture component | `features/scripture/components/` |
| New worship component | `features/worship/components/` |
| New church page component | `features/church/components/` |
| New finder component | `features/finder/components/` |
| New giving component | `features/giving/components/` |
| New shared UI primitive | `components/ui/` |
| New API function | `lib/api/[domain].ts` |
| New CMS page settings | `lib/cms.ts` |
| New type | `types/[domain].ts` |
| New Zod schema | `features/[domain]/schemas/` |
| New store | `store/[name].store.ts` |
| New test for lib function | `lib/__tests__/` |
| New test for component | `features/[domain]/components/__tests__/` |
| Static default data | `data/[domain].ts` |

### "What import path do I use?"

```typescript
// Types
import type { Church, ZemaTrack, Campaign } from '@/types';

// API functions
import { fetchChurches, fetchZemaLibrary } from '@/lib/api';

// CMS functions
import { getHomeSettings, getPatriarchSettings } from '@/lib/cms';

// Stores
import { useUIStore } from '@/store/ui.store';
import { useLanguageStore } from '@/store/language.store';

// Feature components
import HeroSection from '@/features/home/components/HeroSection';
import ChurchMap from '@/features/finder/components/ChurchMap';

// Shared UI
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';
import { EthiopicText } from '@/components/ui/EthiopicText';
import { PageHero } from '@/components/ui/PageHero';

// Utilities
import { cn } from '@/lib/utils';
import { getDailyLiturgy } from '@/lib/liturgy';
import { toEthiopianDate } from '@/lib/calendar';
```

### "What are the build commands?"

```bash
npm run dev          # start dev server at localhost:3000
npm run build        # production build
npm run lint         # check for lint errors
npm run test         # run tests in watch mode
npm run test:run     # run tests once (for CI)
npx tsc --noEmit     # check types without building
```
