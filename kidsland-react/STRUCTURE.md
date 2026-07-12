# Kidsland Project Structure

## Overview

This is a React + TypeScript + Vite project for the Kidsland Membumi website. The structure is organized by feature and component type for maintainability and scalability.

## Directory Structure

```
src/
├── assets/                    # Static images and media files
│   ├── jungle-hero-bg.jpeg
│   ├── team-member-*.jpg
│   └── kidsland-logo.png
│
├── components/                # Reusable React components
│   ├── index.ts              # Central export point for all components
│   ├── cards/                # Card components for displaying data
│   │   ├── index.ts
│   │   ├── HighlightCard.tsx/.css
│   │   ├── ProgramCard.tsx/.css
│   │   ├── FeaturedProgramCard.tsx/.css
│   │   ├── TrustMetricCard.tsx/.css
│   │   ├── TestimonialCard.tsx/.css
│   │   └── StepFlowCard.tsx/.css
│   │
│   ├── forms/                # Form components
│   │   ├── index.ts
│   │   └── RegistrationForm.tsx/.css
│   │
│   ├── layout/               # Layout components
│   │   ├── index.ts
│   │   └── SiteLayout.tsx/.css
│   │
│   └── common/               # Shared utility components
│       ├── index.ts
│       ├── SectionHeader.tsx/.css
│       ├── WhatsAppButton.tsx
│       ├── ImageGallery.tsx/.css
│       └── FaqItem.tsx/.css
│
├── data/                      # Content and data management
│   ├── index.ts              # Central export point for data
│   ├── homeContent.ts        # Homepage content data
│   └── programContent.ts     # Program page content data
│
├── lib/                       # Utility functions and helpers
│   └── contact.ts            # WhatsApp integration utilities
│
├── pages/                     # Page components
│   ├── HomePage.tsx/.css
│   └── ProgramPage.tsx/.css
│
├── App.tsx                    # Main app component with routing
├── index.css                  # Global styles and CSS variables
├── main.tsx                   # App entry point
└── index.html                 # HTML template
```

## Import Conventions

### Using Component Exports

Instead of importing from specific component files, use the centralized `index.ts` exports:

```typescript
// ✅ Good: Clean imports
import {
  HighlightCard,
  SectionHeader,
  RegistrationForm,
  ImageGallery,
} from "../components";

// ❌ Avoid: Long relative paths
import HighlightCard from "../components/cards/HighlightCard";
import SectionHeader from "../components/common/SectionHeader";
```

### Using Data Exports

Similarly, use centralized data exports:

```typescript
// ✅ Good
import { homeHighlights, programOfferings } from "../data";

// ❌ Avoid
import { homeHighlights } from "../data/homeContent";
import { programOfferings } from "../data/programContent";
```

## Component Categories

### Cards (`components/cards/`)

Reusable components for displaying structured information:

- `HighlightCard` - Feature highlight with title and description
- `ProgramCard` - Program offering with benefits and CTA
- `FeaturedProgramCard` - Featured program showcase
- `TrustMetricCard` - Trust/social proof metric
- `TestimonialCard` - Customer testimonial display
- `StepFlowCard` - Step indicator in a process flow

### Forms (`components/forms/`)

User input components:

- `RegistrationForm` - Main registration/enrollment form

### Common (`components/common/`)

Utility and reusable components:

- `SectionHeader` - Section title with eyebrow text
- `WhatsAppButton` - CTA button that opens WhatsApp
- `ImageGallery` - Photo gallery with lightbox
- `FaqItem` - Accordion FAQ item

### Layout (`components/layout/`)

Page layout components:

- `SiteLayout` - Header, footer, and navigation wrapper

## Pages (`pages/`)

Full page components:

- `HomePage.tsx` - Landing/homepage
- `ProgramPage.tsx` - Program listings and details

## CSS Organization

Each component has its own CSS file:

- Component styles are scoped to the component's BEM class namespace
- Global styles and CSS variables are defined in `index.css`
- Responsive breakpoints: 640px (tablet), 1024px (desktop)
- All colors use semantic CSS variables: `--color-primary`, `--color-secondary`, etc.

## Data Structure

### homeContent.ts

Contains:

- `HomeStat` - Statistics type
- `HomeHighlight` - Feature highlight type
- `HomeTestimonial` - Testimonial type
- `FeaturedProgram` - Featured program type
- `EnrollmentStep` - Enrollment process step type
- `TrustMetric` - Trust metric type
- `HomeFaq` - FAQ item type
- `GalleryImage` - Gallery image type
- Corresponding data arrays with sample content

### programContent.ts

Contains:

- `ProgramOffering` - Program offering type
- Program listings and steps

## Development Workflow

1. **Creating New Components**: Place in appropriate subfolder under `components/`
2. **Exporting Components**: Add to `index.ts` in the component's folder
3. **Using Components**: Import from `../components` (uses root index.ts)
4. **Styling**: Create a `.css` file alongside the component with BEM naming
5. **Data**: Add types and data to appropriate files in `data/` folder

## Build & Deploy

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code quality
- `npm run preview` - Preview production build

## Color System

Global CSS variables defined in `index.css`:

- `--palette-dark: #346739` - Primary brand color
- `--palette-mid: #79AE6F` - Secondary brand color
- `--palette-light: #9FCB98` - Light accent
- `--palette-cream: #F2EDC2` - Background accent

Semantic tokens:

- `--color-primary` - Primary action color
- `--color-secondary` - Secondary action color
- `--color-surface` - Surface/background
- `--color-surface-soft` - Soft surface
- `--color-text-strong` - Strong text
- `--color-text-soft` - Soft/secondary text
- `--color-border` - Border color
