# For Her — A Cinematic Proposal Experience

An interactive, movie-like proposal website: a living night sky, your love
story told scene by scene, and at the end — the question.

## Run it

Requires Node.js 18.17+ (Node 20 recommended).

```bash
npm install
npm run dev        # develop at http://localhost:3000
npm run build      # static export → ./out (upload to any hosting)
```

To preview the built site locally: `python3 -m http.server 8080` inside `out/`.

Tip: open `http://localhost:3000/?skip` to jump past the intro while testing.

## Make it yours (5 minutes)

1. **`lib/content.ts`** — everything personal lives in this ONE file:
   her name (`HER_NAME` — change it once, it updates everywhere, including
   Telegram notifications), the date you met (powers the live countdown),
   the 6 photo captions, the timeline of your story, the cinematic messages,
   the love letter, the secrets hidden around the page, the words of the
   question itself, the site URL / link-preview texts, and the optional
   Telegram bot settings.
2. **Photos** — drop images into `public/photos/` (see the README there).
   Missing photos show elegant placeholders, so the site always works.
3. **Audio (optional)** — create `public/audio/` and add:
   - `music.mp3` — replaces the built-in generated piano soundtrack
   - `voice-message.mp3` — reveals a voice-message player section

## The experience

- Black screen → *"Someone has something very special to tell you..."* → the night sky wakes up
- Live countdown since the day you met
- Word-by-word cinematic messages
- Floating polaroid memories with parallax and 3D tilt
- Your love story as a glowing timeline
- **Wake the Stars** — she traces sleeping stars and they connect into a heart
- A sealed envelope that opens into a handwritten letter
- The finale: a rotating crystal heart and diamond ring (Three.js),
  soft fireworks, and *"Will You Marry Me?"*
- **YES** → grand celebration: fireworks, confetti, balloons
- *"I need a little more time"* → the button playfully runs away four times
  before it lets itself be pressed
- Hidden heart easter eggs on the page edges — tap them for secret notes
- Generated ambient piano (Web Audio), mute button top-right

Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js and
Lenis smooth scroll. Fully responsive; respects `prefers-reduced-motion`.
