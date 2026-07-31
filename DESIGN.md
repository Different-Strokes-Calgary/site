# Design

## Direction

Light, high-energy, illustration-led community site for Different Strokes Calgary. The visual world is optimistic, aquatic, and proudly inclusive: a dominant rainbow swimmer illustration leads into a practical schedule band, a text-led membership section, and a generous community-story finish. The interface should feel welcoming and capable rather than overly polished or corporate.

## Modes and hierarchy

- **Persuade:** make the club feel like a place to belong, then make joining easy.
- **Operate:** schedule, locations, fees, and pool etiquette must be scannable before decorative detail.
- **Read:** the story and archive use comfortable measures, native disclosure controls, and clear heading structure.

The primary action is the Join button. The live calendar is the primary practice detail; locations, workout guidance, and the story archive remain secondary disclosures.

## Tokens

The source of truth is `src/styles/global.css`.

```css
:root {
  --canvas: oklch(1 0 0);
  --ink: oklch(0.22 0.06 254);
  --blue: oklch(0.61 0.17 247);
  --blue-deep: oklch(0.43 0.13 252);
  --pink: oklch(0.7 0.19 344);
  --pink-deep: oklch(0.38 0.20 347);
  --surface: oklch(0.94 0.03 245);
  --surface-strong: oklch(0.88 0.07 245);
  --line: oklch(0.84 0.03 245);

  --max: 78rem;
  --gutter: clamp(1.25rem, 4vw, 4.5rem);
  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs: 0.75rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4.5rem;
  --space-3xl: 6rem;

  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --measure-narrow: 44ch;
  --measure-body: 66ch;
  --measure-wide: 78ch;
}

:root[data-theme='dark'] {
  --canvas: oklch(0.18 0.07 252);
  --ink: oklch(0.94 0.02 245);
  --blue: oklch(0.72 0.15 247);
  --blue-deep: oklch(0.78 0.11 247);
  --pink: oklch(0.78 0.16 344);
  --pink-deep: oklch(0.78 0.16 344);
  --surface: oklch(0.22 0.04 250);
  --surface-strong: oklch(0.3 0.06 250);
  --line: oklch(0.42 0.05 250);
}
```

## Type and imagery

- Body copy uses **Atkinson Hyperlegible** for clarity.
- Display headings use **Bricolage Grotesque** at deliberate, fluid clamp stops.
- Body measures stay near 66ch; narrow headlines stay near 44ch.
- Hero and story art are WebP illustrations with explicit dimensions to protect CLS. A single image element swaps the light/dark source when the theme changes; the native `<picture>` path avoids duplicate themed downloads for OS-driven themes, while a saved preference can still incur a one-time source swap.
- No gradients are used as a decorative background treatment; skeleton loading uses a restrained shimmer only while the calendar request is in flight.

## Interaction and accessibility

- Native `<details>` disclosures provide keyboard and no-script behavior without custom accordion state.
- Primary controls and links use a 44px minimum target, visible `:focus-visible` rings, and descriptive labels for new-tab behavior.
- The mobile navigation moves focus into the open drawer, supports Escape, and makes the page inert while the drawer is open.
- Calendar loading has explicit loading, loaded, and unavailable states, a timeout, retry action, direct-link recovery, and a `<noscript>` path.
- Theme selection follows the operating-system preference until a user choice is saved in local storage; the manual toggle updates image art as well as tokens.
- Motion has one authored focal sequence: the calendar loading. The seven skeleton columns shimmer in a wave (80ms stagger across the week), the iframe lands with a deliberate 720ms settle (`scale(0.99) translateY(4px)` → `1 0` over `--ease-out-expo`), and the status dot plays a one-shot settle pulse the moment data arrives (`scale(1 → 1.35 → 1` over 540ms). Supporting feedback — theme-toggle icon crossfade (`opacity 220ms + rotate 60deg scale 0.7 → 1`), disclosure chevron rotation, hover colour transitions, button ripples, and the section reveal cascade — carries continuity without competing for attention. Hero entrance, skeleton shimmer loop, status-dot infinite pulse-on-load, and section reveals are disabled when `prefers-reduced-motion: reduce` is active; the theme-toggle icon crossfade and hover colour transitions are preserved as essential state feedback.

## Responsive behavior

- Desktop uses a three-column header and a two-column practice layout.
- At 960px and below, navigation becomes a focus-managed drawer and content stacks.
- At 699px and below, fees become stacked rows, practice metadata reflows, and calendar height reduces to preserve usable viewport space.
- Safe-area insets are included in the sticky header, and sections use a matching scroll margin so fragment links clear the header.

## Maintenance and deployments

This is a statically generated site (`output: 'static'`), so season and fee freshness is evaluated when the site is built.

- The page labels published schedules and prices with an explicit validity date so visitors can judge whether the information is current, including without JavaScript.
- The club must trigger a new build and deployment when a season expires or prices/schedules change. A scheduled rebuild via GitHub Actions is recommended before the next rollover.
- When a build runs outside a configured practice season, the old practice list is withheld and visitors are directed to the live calendar or club contact. Expired membership prices receive the same update-required treatment.
- The Join and Contact URLs remain owner-managed configuration values in `src/data/club.ts`; replace the current test placeholders before launch.
