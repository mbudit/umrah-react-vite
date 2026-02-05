# 🕌 Umrah Guide Services

A modern, mobile-first web application connecting pilgrims with licensed Mutawif (spiritual guides) for Umrah pilgrimage services. Built with React 19 and designed for an exceptional user experience.

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

### For Pilgrims 🧕

- **Find Guides** – Discover nearby Mutawif with real-time location sharing and radar animation
- **Smart Matching** – Get matched with guides based on language preferences and requirements
- **Live Tracking** – Track your guide's arrival with estimated time and distance
- **Booking Management** – Schedule and manage your pilgrimage services
- **Booking Care** – Access support and assistance during your journey
- **Cancellation & Refund** – Transparent cancellation policies with clear refund timelines

### For Partners (Guides/Drivers) 💼

- **Dashboard** – View earnings, ratings, completed trips, and online/offline status toggle
- **Job Management** – Manage upcoming bookings with pilgrim details and locations
- **Driver Portal** – Dedicated interface for transportation service providers

## 🛠️ Tech Stack

| Category           | Technology                           |
| ------------------ | ------------------------------------ |
| **Framework**      | React 19.0 with React Router DOM 7.1 |
| **Language**       | TypeScript 5.6                       |
| **Build Tool**     | Vite 6.0                             |
| **Styling**        | TailwindCSS 3.4 with custom theme    |
| **AI Integration** | Google GenAI SDK                     |
| **Icons**          | Material Symbols (Google Fonts)      |
| **Typography**     | Inter (Google Fonts)                 |

## 📁 Project Structure

```
umrah-unified/
├── src/
│   ├── components/
│   │   └── ui/                     # Reusable UI components
│   │       ├── BottomNav.tsx       # Mobile bottom navigation
│   │       ├── Button.tsx          # Custom button component
│   │       ├── Card.tsx            # Card component
│   │       └── Header.tsx          # Page headers
│   ├── features/
│   │   ├── RoleSelector.tsx        # Landing page with role selection
│   │   ├── pilgrim/                # Pilgrim-specific features
│   │   │   ├── booking/            # Booking management
│   │   │   ├── booking-care/       # Support & assistance
│   │   │   ├── cancellation/       # Cancel booking flow
│   │   │   ├── find-guide/         # Guide discovery with map
│   │   │   ├── match-guide/        # Guide matching
│   │   │   ├── preferences/        # User preferences
│   │   │   ├── refund-policy/      # Refund information
│   │   │   └── tracking/           # Live tracking
│   │   └── partner/                # Partner/Guide features
│   │       ├── dashboard/          # Earnings & stats
│   │       ├── driver-portal/      # Driver interface
│   │       └── job-management/     # Job listings
│   ├── constants/
│   │   └── index.ts                # App constants & mock data
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── App.tsx                     # Main app with routing
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── tailwind.config.js              # TailwindCSS configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd umrah-unified
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🎨 Design System

### Color Palette

| Color               | Hex       | Usage                         |
| ------------------- | --------- | ----------------------------- |
| **Primary**         | `#0df280` | Brand color, CTAs, highlights |
| **Background Dark** | `#101922` | Main dark background          |
| **Surface Dark**    | `#1c2127` | Cards and surfaces            |
| **Accent Dark**     | `#283039` | Secondary elements            |

### Custom Animations

- `fade-in` – Smooth opacity transition
- `slide-up` / `slide-down` – Entrance animations
- `bounce-slow` – Subtle bounce effect
- `pulse-glow` – Glowing pulse for emphasis

## 📱 Routes

| Path                 | Description                         |
| -------------------- | ----------------------------------- |
| `/`                  | Role selection (Pilgrim or Partner) |
| `/preferences`       | Pilgrim preferences setup           |
| `/find-guide`        | Find nearby guides with live radar  |
| `/match-guide`       | Guide matching interface            |
| `/tracking`          | Live guide tracking                 |
| `/booking`           | Booking confirmation                |
| `/cancellation`      | Cancel booking flow                 |
| `/booking-care`      | Support and assistance              |
| `/refund-policy`     | Refund policy details               |
| `/partner/dashboard` | Partner earnings dashboard          |
| `/partner/driver`    | Driver portal                       |
| `/partner/jobs`      | Job management                      |

## 📦 Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import { Button } from "@/components/ui";
import { Mutawif } from "@/types";
```

### TailwindCSS Theme

Custom theme extensions are defined in `tailwind.config.js` including:

- Custom color palette
- Inter font family
- Custom animations and keyframes
