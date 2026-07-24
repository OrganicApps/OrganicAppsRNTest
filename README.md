# Product AI Software Engineer — take-home

Starter project for a product engineering assignment based on a simplified workout flow from the Organic Apps
React Native application. It is intentionally isolated from the production monorepo and contains no secrets,
network endpoints or private content dependencies.

The app has one cardio workout with 10 exercises:

`workout details → 3-second countdown → exercise / short rest loop → completion`

It includes exercise timers, pause/resume, previous/next controls, segmented progress and a development-only
shortcut to the completion screen.

## Candidate task

Build an end-to-end product feature that:

1. captures meaningful workout-progression data;
2. reliably delivers and stores it;
3. uses an AI model to produce a useful post-workout analysis;
4. presents that analysis in the app;
5. collects feedback on the workout and on the AI result.

The full brief, constraints and evaluation rubric are in
[`docs/product-ai-engineer-take-home.pdf`](docs/product-ai-engineer-take-home.pdf).

## Run

Requirements: Node.js 22.13+ and Yarn 1.x (or npm).

```bash
yarn install
yarn start
```

Then open the project in Expo Go, an iOS/Android simulator, or press `w` for web.

Useful commands:

```bash
yarn typecheck
yarn ios
yarn android
yarn web
```

## Project map

```text
src/
  app/                         Expo Router entry point
  components/PrimaryButton    Small shared UI primitive
  constants/theme             Reduced Organic Fit visual tokens
  features/workout/
    workout.data.ts            Fixed workout and 10 exercises
    workout.types.ts           Domain types
    useWorkoutPlayer.ts        Starter state machine and timers
    *Screen.tsx                Details, countdown, player, completion
  services/telemetry.ts        Explicit candidate extension point (no-op)
assets/workout/                Small local image set copied for this exercise
```

## Deliberate omissions

- No analytics SDK or prescribed event taxonomy.
- No persistence, offline queue or backend.
- No AI provider integration.
- No post-workout analysis UI.
- No feedback UI or feedback storage.
- No production credentials.

These are assignment scope, not missing setup. You may change the starter architecture when you can explain the
trade-off. Keep the existing workout flow usable.

## Content and privacy

Use synthetic/local identifiers and do not collect health data, camera/audio, precise location, contacts or other
sensitive device data. AI API keys must stay on a server, never in the Expo bundle.
