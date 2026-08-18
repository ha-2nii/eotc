# EOTC_Roadmap_Concise

☦  ☦  ☦

ETHIOPIAN ORTHODOX TEWAHEDO CHURCH

Next-Generation Digital Platform

Phased Roadmap & Architecture 

Scope

Full build plan: from Day 1 to Launch and beyond

Timeline

Audience

Steering Committee, Technical Leads, Design Team, MK Partnership

PART 1 — VISION & STRATEGIC PRINCIPLES

1. The Problem We Are Solving

The EOTC has 60M+ faithful worldwide. Its current website (ethiopianorthodox.org) was built in 2003 and is:

Unresponsive — does not work on mobile or tablets

Disconnected — no donations, no church finder, no events, no user accounts

Static — hand-coded HTML with no CMS, search, or notifications

Outdated — GIF navigation, no Ge'ez rendering, no accessibility

This platform must surpass the Coptic Orthodox Church, Greek Orthodox Archdiocese, and Mahibere Kidusan in digital reach and quality.

2. The Four Pillars

Pillar

Goal

1 — SUSTAIN

Digital Giving Portal: fund churches, monasteries, and missions globally

2 — CONNECT

Church Finder & Events: connect faithful to their nearest parish

3 — INFORM

News Hub: authoritative EOTC and pan-Orthodox news in Amharic + English

4 — EDUCATE

Tewahedo Academy: structured theological education for all ages

3. Guiding Principles

Principle

What It Means

Ethiopia First, Diaspora Ready

Must work at 3G speeds on older Android devices. Performance is a core requirement.

Content Before Complexity

Migrate all existing content first. Great content beats feature-rich empty pages.

Modular by Design

Each pillar is independent. A delay in one does not block the others.

Church-Owned

Diocese and parish admins manage their own content without developer help.

Ge'ez First

Amharic and Ge'ez must render correctly on all platforms before anything ships.

PART 2 — SYSTEM ARCHITECTURE

4. Architecture at a Glance

Layer

Technology / Description

Frontend

Next.js (React) — SSR, PWA, i18n (Amharic, English, Tigrinya, Ge'ez)

CMS

Strapi (headless) — role-based: Super Admin → Synod → Diocese → Parish → Contributor

LMS

Moodle (self-hosted, EOTC-themed) — courses, quizzes, certificates

Payments

Stripe + PayPal (international) · Telebirr + CBE Birr (Ethiopia)

Database

PostgreSQL (structured data) + AWS S3 (media: audio, video, documents)

Infrastructure

AWS/GCP, CloudFront CDN + Ethio Telecom edge, 99.9% uptime SLA

Integrations

Google Maps · YouTube/Facebook Live · SendGrid · Firebase Push Notifications

Each of the four pillars (Give, Find, News, Academy) is a self-contained module sharing only: user auth, the design system, the notification pipeline, and the search index.

PART 3 — PHASED ROADMAP (36 MONTHS)

The most important rule: Phase 1 must be live and stable before Phase 2 begins. Never build on an unstable foundation.

PHASE 1 — Foundation

Months 1–8

Rebuild, Migrate, Launch

Goal

Replace the 2003 website with a modern, mobile-first platform. Migrate all content. Launch donation portal and basic church finder.

Month-by-Month Plan

Months

Focus

Key Work

Setup

Assemble team, provision infrastructure, install Strapi CMS, define design tokens, begin Ge'ez rendering tests

Content Migration

Migrate Bible (81 books), Zema audio, liturgical texts, church history, prayer books into CMS

Core Build

Build homepage, Scripture reader, Zema player, liturgical calendar, fasting guide, user accounts

Giving + Finder + Launch

Build Donation Portal (Stripe + Telebirr + CBE Birr), Church Finder with 50+ parishes, soft launch, public launch

Key Deliverables

#

Deliverable

Month

Priority

1.01

Domain, hosting, SSL

Critical

1.02

Strapi CMS with EOTC permissions

Critical

1.03

Design system: colors, Ethiopic Unicode, components

Critical

1.04

Amharic + English + Ge'ez language switching

Critical

1.05–08

Full content migration (Bible, Zema, liturgy, prayers)

Critical

1.09

Homepage (patriarch banner, daily devotion, pillar cards)

Critical

1.10

Scripture reader (parallel Ge'ez / Amharic / English)

Critical

1.11

Zema audio player + Digital Chant Stand

High

1.13

Liturgical calendar (Ethiopian + Gregorian)

Critical

1.16

User accounts (register, login, profile)

Critical

1.18–19

Donation portal (Stripe, PayPal, Telebirr, CBE Birr)

Critical

1.20–21

Church Finder map with 50 pilot churches

Critical

1.22–23

Performance + accessibility audit (3G test, WCAG 2.1 AA)

Critical

1.24

PUBLIC LAUNCH

Critical

Phase 1 Launch Criteria (all must be true)

Site loads in under 3 seconds on a 3G connection in Addis Ababa

Ge'ez and Amharic render correctly on Android Chrome, iOS Safari, and Windows Edge

A donor can pay in ETB via Telebirr from a mobile phone

A parish admin can update service times and post an event without developer help

All old site content is accessible and the old domain redirects to the new one

At least one Diocese has reviewed and approved their church directory

PHASE 2 — Growth

Academy, Full Church Network, News Hub

Goal

Launch the Tewahedo Academy. Expand to all registered EOTC parishes (700+). Establish the news hub as the authoritative pan-Orthodox source. Formalize the Mahibere Kidusan (MK) partnership.

Quarter-by-Quarter Plan

Months

Focus

Key Work

9–11

Academy Setup

Install and theme Moodle LMS. Build Children's (5–12) and Youth (13–18) tracks. Clergy review panel established.

12–14

Academy Launch + GG Yr 1

Academy goes live. Gebi Gubaye Year 1 built with MK. Discussion forums and mentor pairing.

15–17

Full Church Network

All 700+ parishes onboarded. Events system launched. Live stream links per church.

18–20

News Hub

EOTC news section + pan-Orthodox feed. Weekly newsletter (SendGrid). Digital magazine launched.

21–22

GG Yrs 2–3 + Adult Track

Gebi Gubaye Years 2 & 3 published. Adult/Catechumen track built. Live webinar platform.

Key Deliverables

#

Deliverable

Month

Priority

2.01

Moodle LMS installed, themed, integrated with user accounts

Critical

2.02–03

Children's Track (12 modules) + Youth Track (12 modules)

Critical

2.05

Tewahedo Academy public launch

Critical

2.06

Gebi Gubaye Year 1 curriculum (with MK)

Critical

2.09

Offline content download for low-connectivity users

Critical

2.11

Full church database: 700+ parishes onboarded

Critical

2.12

Events calendar: church-level posting, RSVP, reminders

Critical

2.16

EOTC official news section

Critical

2.18

Weekly email newsletter (SendGrid)

High

2.22–23

Gebi Gubaye Years 2 & 3 + Adult/Catechumen track

High

2.25

Push notifications (Firebase): feasts, synod alerts, events

High

Phase 2 Success Criteria

2,000+ registered Academy students within 60 days of launch

700+ churches in database covering all 14 Ethiopian dioceses + major diaspora hubs

Gebi Gubaye Year 1 formally endorsed by MK Sunday School Department

5,000+ newsletter subscribers within 3 months of launch

PHASE 3 — Maturity

Mobile Apps, Full Curriculum, Global Scale

Goal

Native mobile apps, full Gebi Gubaye curriculum, multi-language expansion, advanced giving, 360° virtual tours, and pan-Orthodox partnerships. By Month 36: the most complete Orthodox Church digital platform in Africa.

Key Deliverables

#

Deliverable

Month

Priority

3.01

Native Android app (React Native, full feature parity)

High

3.02

Native iOS app (React Native, full feature parity)

High

3.03

Gebi Gubaye Year 4 curriculum

High

3.04–05

Graduate track (patristics, Ge'ez literature) + Clergy track

Medium

3.06

Tigrinya language expansion (all core content)

High

3.07–08

Oromo + French language expansion

Medium

3.09

360° virtual tours: Lalibela, Aksum, Debre Damo, Holy Trinity

Medium

3.11

Tax receipt automation: US 501(c)(3), UK Gift Aid, Canada CRA

High

3.16

Offline mode (full PWA): Bible, prayer, and courses downloadable

High

3.14–15

Content partnerships: Coptic, Armenian, and Syriac Orthodox churches

Medium

3.18

Platform public launch celebration — 36-month review

Critical

PART 4 — UI DESIGN GUIDE

5. Design Foundations (Before Any Screen)

Complete all six steps below before designing any screen. Estimated time: 2–3 weeks.

Step

Task

Detail

D1

Color System

Navy #1A3A5C (primary), Gold #C8A84B (accent), Gold-light #FFF8E7 (backgrounds), Gray #F5F5F5 (surfaces)

D2

Typography

Noto Serif Ethiopic for Amharic/Ge'ez. Arial/Inter for UI. 5 text sizes. Test Ge'ez on Android + iOS before proceeding.

D3

Spacing & Grid

8-point grid. Max-width 1200px. Breakpoints: mobile 375px, tablet 768px, desktop 1200px. Design mobile-first.

D4

Component Library

Build in Figma: Button, Input, Card, Badge, Nav Bar, Sidebar, Modal, Table Row, Avatar, Audio Player, Progress Bar

D5

Cross Motif

Commission 3 Ethiopian cross SVGs (Meskel, Lalibela, Processional) as decorative elements.

D6

Icon Set

Icons for: Church, Tabot, Zema, Fasting, Feast, Donation, Calendar, Monastery, Cross, Liturgy. Base: Tabler Icons.

Or can be modified if the chooses to.

6. Design Priority Order by Phase

Phase 1 — Design Screens

Screen

Components

Month

D1.1 Homepage

Patriarch hero, daily devotion strip, four-pillar cards, feast countdown, news strip

D1.2 Global Navigation

Top nav, mobile menu, language switcher

D1.3 Scripture Reader

Book navigator, parallel Ge'ez/Amharic/English columns, audio controls

D1.4 Zema Player + Chant Stand

Library, player controls, large-text view for cantors

D1.5 Liturgical Calendar

Month grid, feast/fast color coding, day detail panel, ICS download

D1.6 Church Finder

Map (60%), filter panel, results list (40%), church detail panel

D1.7 Donation Form

Amount selector, church picker, payment methods, review + confirm

D1.8 User Account

Login, register, profile, settings

Phase 2 — Design Screens

Screen

Components

Month

D2.1 Academy Home

Track selector cards, progress overview, upcoming webinar banner

D2.2 Course Detail

Lesson list, progress bar, locked/unlocked states

D2.3 Lesson View

Video player, text content, quiz section, discussion, navigation

D2.4 Certificate

Downloadable PDF with EOTC + MK seal

D2.5 Events Calendar

Church event listing, event detail page

D2.6 News Hub

Article list, category filters, article detail

D2.7 Campaign Page

Progress bar, donor list, share buttons

D2.8 Parish Admin Dashboard

Manage profile, events, giving campaigns

TEAM, BUDGET & RISK

7. Team Structure

Role

FTE

Responsibility

Project Manager

1 FTE

Roadmap, coordination, timeline and budget management

Lead Architect / Backend

1 FTE

System architecture, database, API, CMS, payments

Frontend Developer

1–2 FTE

All web screens, design system, accessibility

UX/UI Designer

1 FTE

Design system, all screens and mockups

Content Team

2–3 FTE

Migration, editorial, multilingual (must include Amharic + Ge'ez literacy)

Mobile Developer

1 FTE (Phase 3)

iOS and Android apps

MK Partnership Lead

Part-time

Academy curriculum coordination

Clergy Review Panel

3–5 clergy

Review and approve all theological content

QA Engineer

Part-time

Testing on Ethiopian devices, payments, accessibility

8. Key Risks & Mitigations

Risk

Mitigation

Ge'ez rendering failures

Typography tested in Month 2 — nothing proceeds until confirmed on all target devices

Telebirr API delays

Submit API application in Month 1. Stripe/PayPal as fallback for Phase 1 launch.

Low-bandwidth performance

3G testing is a Phase 1 launch criterion. CDN edge nodes in Ethiopia.

Content quality

Dedicated content team + clergy review panel. No module ships without review.

Church database quality

Diocese Admins own their listings. 50 pilot churches in Phase 1 build trust.

MK partnership breakdown

Formal MOU signed before Phase 2 begins. MK owns content; platform delivers it.

Scope creep

Strict phase gating. No Phase 2 work until Phase 1 criteria met. New features need Steering Committee approval.

WHAT TO DO NEXT — WEEK 1 ACTIONS

If approved by the Steering Committee, these actions must start in Week 1:

Governance

Form the Steering Committee and appoint the Project Manager

Issue letter of intent to Mahibere Kidusan for Academy partnership

Technology

Register the domain, provision cloud hosting (AWS or GCP), set up GitHub repository

Install Strapi CMS on the staging server

Design

Hire the UI/UX Designer and brief them on this document

Begin the 6 design foundation steps (D1–D6) immediately

Content

Audit all existing ethiopianorthodox.org content — catalog everything to be migrated

Identify Amharic- and Ge'ez-literate editors for the content team

Payments

Submit Telebirr API application to Ethio Telecom now — approval takes time

Create Stripe account and PayPal nonprofit account

Pilot Churches

Identify 5 Diocese Admins to be first to onboard — their feedback shapes Phase 2

☦  ☦  ☦

Ethiopian Orthodox Tewahedo Church  —  Digital Platform Roadmap