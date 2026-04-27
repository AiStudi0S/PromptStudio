# PromptStudio

> **Enterprise AI Prompt Platform** — Build, optimize, share, and monetize AI prompts with a deterministic, operator-grade web application.

## 🎯 Overview

PromptStudio is a full-stack, mobile-first web application built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**. It features a cyberpunk dark UI with neon glow accents and glassmorphism cards.

## ✨ Features

### Prompt Editor
- Rich textarea editor with **Prompt Optimizer** (Parse → Spec → Optimize pipeline)
- Parameter management: temperature, max tokens, model selection
- Visibility settings (public/private)
- Pricing assignment (free/paid) for marketplace listing
- Version history with rollback

### Prompt Optimizer (Atomic Surgery Mode)
1. **Parse & Normalize** → structured intent blocks (UI, UX, Features, Specs)
2. **Spec Completion** → auto-fill missing parameters (pricing, visibility, version)
3. **Optimization Layer** → rewrite into professional, enterprise-grade prompt style

### User Profiles
- Username, avatar, bio
- Follow/unfollow system
- Personalized timeline feed
- Like/unlike prompts
- Tabs: Prompts, Liked, Sold

### Marketplace
- Browse public/private prompts
- Filter: All, Free, Paid, Trending
- Buy/use prompts
- Timeline activity feed

### Admin Controls
- User management (ban, assign roles)
- Marketplace moderation
- App settings: fee percentage, API keys
- Payment integrations: Stripe, CashApp, PayPal, GCash
- AI model CRUD (add/edit/delete models)

### Notifications
- Real-time notifications: follows, likes, purchases, replies
- Mark as read / mark all read
- Notification preference toggles (push/email per type)

### Navigation
- **Mobile**: Fixed bottom tabs (Dashboard, Marketplace, Editor, Profile, Admin)
- **Desktop**: Collapsible sidebar with same navigation

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom neon/cyberpunk theme |
| Language | TypeScript |
| Animations | Framer Motion |
| Icons | Lucide React |
| State | Zustand |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the Dashboard.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Login & Register
│   ├── dashboard/         # Main dashboard
│   ├── editor/            # Prompt editor & list
│   ├── marketplace/       # Prompt marketplace
│   ├── profile/           # User profiles
│   ├── admin/             # Admin panel
│   └── notifications/     # Notification center
├── components/
│   ├── layout/            # AppLayout, Sidebar, BottomNav, TopBar
│   ├── ui/                # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── editor/            # Prompt editor & optimizer
│   ├── marketplace/       # Marketplace components
│   ├── profile/           # Profile components
│   └── admin/             # Admin components
├── hooks/                 # useAuth, usePrompts
└── lib/                   # Zustand store, types, utils
```

## 🎨 Design System

- **Background**: `#0a0a0f` (deep dark)
- **Card surfaces**: `#111118` with glassmorphism backdrop-blur
- **Neon accents**: Cyan `#00f5ff`, Magenta `#ff00ff`, Green `#00ff88`
- **Typography**: System UI stack, `antialiased`
- Dark mode default with GitHub-dark neutrals

## 🔒 Security Notes

- Authentication uses JWT simulation via localStorage (replace with real backend)
- All forms include CSRF-safe patterns
- Password fields use `type="password"` with proper autocomplete attributes
- Safe fetch wrappers used throughout (no native `window`/`fetch` overwrites)

