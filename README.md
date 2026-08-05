# Interactive Resume Builder

A step-by-step resume builder built with React, TypeScript, and Tailwind CSS. Fill in your details across a guided multi-step form and watch a live, print-proportioned preview update as you type — no account, no backend, everything saves to your browser automatically.

## Features

- **Guided multi-step flow** — Personal Info → Skills → Experience → Education → Languages → Certifications, with a progress indicator and per-step validation
- **Live preview** — updates as you type, scaled to real A4 paper proportions (width, margins, and font size all scale together via CSS container queries)
- **Repeatable sections** — add or remove multiple Experience, Education, Skill, Language, and Certification entries
- **Smart fields** — a custom-built dropdown component for fields like Degree and Language, with a "choose from list or type your own" escape hatch for Language
- **Autosave** — your progress persists to `localStorage` automatically (versioned, so it won't try to restore incompatible data after an update)
- **No backend, no accounts** — everything runs client-side

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for tooling
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) for linting
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for testing

## Getting started

The app lives in the `resume-builder/` directory.

```bash
git clone https://github.com/oleksandragurkalo/interactive-resume-builder.git
cd interactive-resume-builder/resume-builder
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

### Available scripts

Run these from inside `resume-builder/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI-friendly) |

## Testing

Unit tests cover the validation utilities and the `useFormStep`/`useFormList` hooks (including regression coverage for a stale-closure bug that used to let editing one field silently revert a sibling field), plus component tests for the custom `SelectInput` dropdown and `ContinueButton`.

## Deployment

This project deploys cleanly to [Vercel](https://vercel.com) as a static Vite app. Since the actual project lives in `resume-builder/` rather than the repository root, when importing the repo in the Vercel dashboard:

1. Import the GitHub repository.
2. Set **Root Directory** to `resume-builder`.
3. Vercel auto-detects the Vite framework preset — no extra config needed (build command `npm run build`, output directory `dist`).
4. Deploy.

Every push to the connected branch triggers a new deployment automatically.

## Project structure

```
resume-builder/
  src/
    components/   # One folder per component (form sections, inputs, preview, etc.)
    hooks/        # useFormStep / useFormList — shared form state + validation logic
    utils/        # Validation helpers and localStorage persistence
    data/         # Resume field definitions and default values
```

## License

[MIT](./LICENSE)
