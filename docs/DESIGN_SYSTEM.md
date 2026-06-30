# Design System — Barbarpotato Portfolio

> Dark cosmos editorial — a space-themed personal portfolio with a purple/lavender accent palette, serif editorial headings, and layered motion.

---

## Stack

| Layer | Library |
|---|---|
| Framework | React 18.2 + Vite |
| UI Primitives | Chakra UI v2 |
| Animation | Framer Motion |
| Icons | React Icons — Feather (`Fi*`), GiHamburger, IoMdClose |
| Flow/Graph | @xyflow/react |
| Misc | TagCloud, typewriter-effect |

---

## Color Palette

### Background

| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#292b37` | Page background, sections |
| `bg-card` | `#383a4a` | Cards, elevated surfaces |
| `bg-flow-control` | `#2a2540` | React Flow control buttons |
| `bg-nav` | `rgba(41, 43, 55, 0.80)` | Navigation glassmorphism |
| `bg-nav-solid` | `rgba(41, 43, 55, 0.95)` | Mobile menu dropdown |

### Text

| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#faf9ff` | All headings, primary body |
| `text-secondary` | `#d0d0d0` | Article descriptions |
| `text-muted` | `#c0c0c0` | Meta, dates, subtitles |

### Accent

| Token | Hex | Usage |
|---|---|---|
| `accent-muted` | `#866bab` | Default links, borders, icons, scrollbar |
| `accent-bright` | `#cc7bc9` | Hover states, SVG underlines, card glow |
| `accent-violet` | `#bd93f9` | Nav active indicator, TagCloud items |
| `accent-hero` | `#ff79c6` | Hero "Software Engineer" subtitle only |

### Utility

| Token | Hex | Usage |
|---|---|---|
| `border-flow` | `#3d3658` | React Flow control separator |
| `selection-bg` | `#866bab` | `::selection` background |
| `selection-text` | `#cc7bc9` | `::selection` text color |

### Color Behavior Rules

- Default interactive state → `accent-muted` (`#866bab`)
- Hover state → `accent-bright` (`#cc7bc9`)
- Active/selected state (nav, indicators) → `accent-violet` (`#bd93f9`)
- Glow/shadow on card hover → `0px 0px 25px #cc7bc9`

---

## Typography

### Font Families

```css
--font-playfair:      'Playfair Display', Georgia, serif;
--font-outfit:        'Outfit', system-ui, -apple-system, sans-serif;
--font-space-grotesk: 'Space Grotesk', system-ui, -apple-system, sans-serif;
```

All three fonts are self-hosted as `.woff2` under `/public/fonts/`.

### Usage by Role

| Role | Font | Weight | Style | Size |
|---|---|---|---|---|
| Display / Hero name | Space Grotesk | 700 | normal | 34–96px |
| Section heading | Playfair Display | 800 | italic | 4xl–6xl |
| Card title | Playfair Display | 700 | normal | 2xl–3xl |
| Section subtitle | Playfair Display | 800 | italic | 4xl–5xl |
| Body copy | Outfit | 400 | normal | md–lg |
| Nav links | Outfit | 500–600 | normal | md |
| Buttons / CTAs | Outfit | 500 | normal | md |
| Meta / dates | Outfit | 400 | normal | sm |
| TagCloud sphere | Outfit | 600 | normal | 1.3em / 12px mobile |

### Typographic Treatment Pattern

Section headings use a two-line split with SVG accent decoration:

```
[plain word]              ← normal weight italic Playfair
[accented word]           ← same weight, with SVG ellipse stroke or underline path
                             in accent-bright (#cc7bc9)
```

**Ellipse encircle** (Labs section):
```jsx
<ellipse cx="50" cy="20" rx="47" ry="18" fill="none"
  stroke="#cc7bc9" strokeWidth="2.5" strokeLinecap="round" />
```

**Curved underline** (Projects section):
```jsx
<path d="M 4,7 C 50,1 150,1 196,7" fill="none"
  stroke="#cc7bc9" strokeWidth="3.5" strokeLinecap="round" />
```

---

## Spacing

Based on Chakra UI spacing scale (1 unit = 4px).

| Token | Value | Usage |
|---|---|---|
| Section padding Y | `pt={20} pb={20}` (80px) | All major sections |
| Card padding | `p={6}` (24px) | All card interiors |
| Stack gap (article cards) | `spacing={5}` (20px) | Vertical card list |
| Grid gap | `gap={10–14}` (40–56px) | Two-column layouts |
| Container max width | `maxW="7xl"` (1280px) | All content containers |

---

## Layout

### Grid System

- **Desktop** (≥ md): `templateColumns="1fr 1fr"` — two equal columns
- **Mobile** (< md): single column, stacked vertically

### Carousel Layout

Horizontal scroll strip that bleeds past the container boundary:

```jsx
pl={{ base: '1rem', md: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))' }}
```

Scrollbar hidden via `'&::-webkit-scrollbar': { display: 'none' }`.

### Navigation

- `position: sticky; top: 0; z-index: 30`
- Glassmorphism background with `backdropFilter: blur(10px)` on scroll
- Border appears only after scroll: `1px solid rgba(134, 107, 171, 0.3)`
- Desktop: centered HStack; Mobile: collapsible VStack via `<Collapse>`

---

## Components

### Card

```
bg: #383a4a
borderRadius: xl  (Chakra = 12px)
shadow: md
p: 6 (24px)
```

**Hover state** (via `.project-card` class):
```css
transform: scale(1.02);
box-shadow: 0px 0px 25px #cc7bc9;
transition: transform 0.1s ease-in-out;
```

**Image zoom** (via `.zoom-container`):
```css
img { transition: transform 0.2s ease-in-out; }
img:hover { transform: scale(1.2); }
```

### Button / CTA

**Link variant:**
```jsx
variant="link"
color="#866bab"
fontFamily="'Outfit', sans-serif"
fontWeight="500"
rightIcon={<FiArrowRight />}
_hover={{ color: "#cc7bc9" }}
```

**Icon button (circular nav):**
```jsx
isRound
bg="transparent"
border="2px solid"
borderColor="#866bab"
color="#866bab"
_hover={{ bg: '#866bab', color: '#faf9ff', transform: 'scale(1.08)' }}
transition="all 0.2s ease"
```

**Underlined link:**
```jsx
color="#866bab"
borderBottom="1.5px solid"
borderColor="#866bab"
_hover={{ color: '#cc7bc9', borderColor: '#cc7bc9' }}
transition="all 0.2s ease"
```

### Navigation Item

- Default: `color="#faf9ff"`, weight 500
- Active: `color="#bd93f9"`, weight 600 + 12×3px dot indicator below
- Hover: `bg: rgba(134, 107, 171, 0.15)`, `translateY(-2px)`
- Mobile active: `bg: rgba(134, 107, 171, 0.20)`, `translateX(4px)` on hover

### Avatar

```css
.avatar {
  border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;  /* blob shape */
  border: 5px solid #866bab;
  box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
}

.avatar-labs {
  border-radius: 91% 9% 91% 9% / 4% 95% 5% 96%;      /* different blob */
  border: 25px double #866bab;
}
```

### Social Icon

```css
.social-icon { color: #866bab; transition: transform 0.3s ease-in-out; }
.social-icon:hover { transform: scale(1.3); color: #cc7bc9; }
```

### Scrollbar

```css
::-webkit-scrollbar       { width: 10px; height: 5px; border-radius: 5px; }
::-webkit-scrollbar-track { background: #282a36; border-radius: 5px; }
::-webkit-scrollbar-thumb { background: #866bab; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #cc7bc9; }
```

### React Flow Controls (dark theme override)

```css
.react-flow__controls        { border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.4); }
.react-flow__controls-button { background: #2a2540; border-bottom: 1px solid #3d3658; }
.react-flow__controls-button:hover { background: #866bab; }
.react-flow__controls-button svg { fill: #faf9ff; }
```

---

## Animation

### Motion Defaults (Framer Motion)

**Scroll-reveal (standard):**
```jsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.6 }}
```

**Staggered list:**
```jsx
// Parent
variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}

// Child
variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } }}
```

**Card stagger delay:** `delay: index * 0.1` (right column offset: `index * 0.1 + 0.15`)

**TagCloud sphere entrance:**
```jsx
initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
```

**Default transition string:** `"all 0.2s ease"` — used on interactive elements.

### Background Effects

**Animated star field** — three CSS layers (`div.stars`, `.stars2`, `.stars3`):

| Class | Size | Duration |
|---|---|---|
| `.stars` | 1×1px | 60s |
| `.stars2` | 2×2px | 100s |
| `.stars3` | 3×3px | 200s |

Animation: diagonal drift `translateY` + `translateX` both to `-2560px`, infinite loop.

**TagCloud sphere** — rendered into `.tagcloud` span, blurred:
- Desktop: `filter: blur(2px)`, opacity 0.8
- Mobile: `filter: blur(1px)`, font-size 12px

---

## Design Principles

1. **Dark by default.** Every section is `#292b37` background with `#faf9ff` text. Never use white backgrounds.

2. **Purple gradient of emphasis.** Muted (`#866bab`) → bright (`#cc7bc9`) → violet (`#bd93f9`) signals increasing importance or interaction state.

3. **Editorial headings.** Section titles always use Playfair Display in bold italic with an SVG stroke accent (underline or encircle). Body text always uses Outfit.

4. **Motion on scroll.** Every content block animates in via `whileInView`. Use `viewport={{ once: true }}` to avoid re-triggering.

5. **Subtle scale on hover.** Cards scale `1.02` with a purple glow. Images inside zoom `1.2`. CTAs shift up `translateY(-2px)`.

6. **Cosmos atmosphere.** The star field and blurred TagCloud sphere are always present in hero and scroll sections. They reinforce the space/cosmos identity.

7. **Space Grotesk for display only.** Reserve it for the hero name (`Hi, Saya Darmawan`). All other headings use Playfair.
