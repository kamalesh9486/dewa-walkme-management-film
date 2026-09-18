# DEWA WalkMe — Management Film

A cinematic explainer/promo film built with [Remotion](https://www.remotion.dev/) (React 18 + TypeScript) for the SAP WalkMe DEWA business case.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
```

## Develop

Open Remotion Studio to preview and edit scenes:

```bash
npm run studio
```

Then visit http://localhost:3000.

## Type-check

```bash
npm run typecheck
```

## Regenerate narration audio (ElevenLabs)

The narration MP3s in `public/audio/` are generated from `src/narration.json`.
Set your ElevenLabs API key as an environment variable, then run the script:

```powershell
$env:ELEVENLABS_API_KEY = "your-key-here"
pwsh scripts/generate-audio.ps1
```

> The API key is read from the `ELEVENLABS_API_KEY` environment variable — never commit keys to the repo.

## Project structure

```
src/
  Root.tsx          # Remotion compositions
  Main.tsx          # Main film composition
  scenes/           # S01–S09 scene components
  components/        # Reusable visual components
  tokens.ts         # Colors, fonts, timing tokens
  narration.json    # Per-scene narration text
public/
  audio/            # Narration + background music
  assets/           # Logos and imagery
scripts/            # Audio generation & mixing helpers
```
