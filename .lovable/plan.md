## Overview

You've shared 7 different component snippets to integrate across the landing page. Several depend on libraries/files that don't exist in the project yet (FluidBlobs, GlowEffect, GSAP + ScrollTrigger, motion-subtitle, Spotlight, Magnetic, unlumen Dock). Rather than pull in ~6 new dependencies and hundreds of lines of primitives, here's a focused plan that adapts each idea to the existing NexaCloud design system (navy + violet, Syne/DM Sans, Framer Motion already in use).

## Changes per section

### 1. Pricing — BlobCard-style "Pro" card
Wrap the popular Pro plan in an animated gradient/blob backdrop using the site's navy→violet palette (no FluidBlobs lib — use a CSS conic/radial gradient with a subtle animated glow behind the card).

### 2. TrustStrip — "Defined by the company we keep" restyle
Skip GSAP OrbitalImageWheel (heavy, needs images). Instead restyle the current logo marquee with an orbital-feel: center focus scaling, blur/dim toward edges, matching the look but keeping the existing marquee mechanic.

### 3. HowItWorks — Dock nav
Add a small macOS-style Dock above the 3 steps with icons (UserPlus, Plug, Rocket) that highlights the active step and lets users click to switch. Built with existing Framer Motion (no unlumen install).

### 4. Testimonials — Animated gradient-border cards
Add the rotating conic-gradient border (adapted to primary/violet, not cyan/magenta) to testimonial cards.

### 5. Floating search — bottom-right corner
Add a floating pill search button (gradient icon button, expanding input) fixed to the bottom-right corner of the page, styled to match the site.

### 6. FAQ — Reveal Text on heading
Reuse the existing `TextReveal` component (already installed from unlumen-ui) on the "Everything you might want to know" heading, character-by-character with `prefers-reduced-motion` respected (already built-in via motion).

### 7. Integrations — Spotlight + Magnetic CTA
Below the tools grid, add a spotlight card (mouse-following radial gradient using existing patterns) containing a magnetic "Request an integration" button (small transform-on-mouse-move effect). Both implemented inline with Framer Motion, no new deps.

## Technical notes

- No new npm packages. All effects built with Framer Motion (already installed) + CSS.
- All colors via existing semantic tokens (`--primary`, `--violet`, `--card`, etc.) — no hardcoded hex.
- New small components live under `src/components/effects/` (GradientBorderCard, SpotlightCard, MagneticButton, FloatingSearch, Dock).
- Skipping the GSAP OrbitalImageWheel and FluidBlobs/GlowEffect libraries — they require images, heavy setup, and clash with the existing lightweight aesthetic. The plan preserves the *visual intent* of each.

## Questions before I build

1. The floating search button — should it actually search anything, or is it purely decorative for now?
2. OK to skip installing GSAP and FluidBlobs and adapt those effects with existing tooling? (Confirming since you pasted the full snippets.)
