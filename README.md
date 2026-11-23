# M.F. Sultan Suhail Ahamed | Portfolio

A responsive React, Vite, TypeScript, and Tailwind portfolio with dark/light themes, motion, project previews, and a mailto-based contact form.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; run source lint checks with `npm run lint`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever changes are pushed to `main`.

1. In the GitHub repository, open **Settings → Pages** and set the source to **GitHub Actions**.
2. Push changes to `main` and wait for the `Deploy portfolio to GitHub Pages` workflow to finish.
3. The site will be available at `https://mrxisfast-maker.github.io/Portfolio-Website/`.

## Update your information

Edit `src/data/portfolio.ts` to update profile details, roles, skills, projects, experience, education, and services.

- The provided resume is copied to `public/FINAL RESUME 1.docx` and linked from the hero download button.
- Add a profile image under `public/` and set `profileImage` to its root path, such as `/profile.jpg`.
- Add project screenshots under `public/` and set each project's `screenshot` path. Until then, the cards show clearly labeled concept visuals.
- Set each project's `repoUrl` when its repository is ready to share. No repository links are assumed.
- Set `email` to enable the mailto contact form. With no email configured, the form explains what needs to be added instead of pretending to send a message.
- Replace internship organization/date placeholders with verified details before publishing.
