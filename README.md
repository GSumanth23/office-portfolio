# Sumanth Gajula — Portfolio

Terminal-style developer portfolio built with React + Vite.

## Run locally
    npm install
    npm run dev

## Edit content
All text lives in `src/data.js` (profile, stats, experience, projects, skills, education).

## Contact form
Copy `.env.example` to `.env` and add your EmailJS keys. Without them the form opens the visitor's email app.

## Deploy (Vercel)
Import the GitHub repo in Vercel → framework "Vite" → deploy. Add the three VITE_EMAILJS_* variables in Project Settings → Environment Variables.
