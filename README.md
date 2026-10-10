# Shubham Karoti Maitreyi Gurukula — Child Journey Tracking System

A React/Vite frontend and Node.js/Express/MongoDB backend for managing child journeys.

## Included modules
- Dashboard and reports
- Children and child profiles
- Academics, skills, responsibilities, achievements
- Wellbeing and observations
- Family and documents
- Admissions and follow-ups
- Mentor management and child-to-mentor assignment

## Run locally

### 1. Backend
Open a terminal in `backend`:

```bash
npm install
```

Copy `backend/.env.example` to `backend/.env`, then fill in a valid MongoDB connection string and a long random `JWT_SECRET`.

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default. Health check: `http://localhost:5000/api/health`.

### 2. Frontend
Open another terminal in `frontend`:

```bash
npm install
```

Copy `frontend/.env.example` to `frontend/.env`, then run:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Deployment configuration
- Set backend environment variables `MONGODB_URI`, `JWT_SECRET`, `PORT` (the platform usually supplies this), and `CLIENT_URL` (your deployed frontend origin).
- Set frontend environment variable `VITE_API_BASE_URL` to the deployed backend URL ending in `/api`, for example `https://your-backend.onrender.com/api`.
- Redeploy the frontend after changing `VITE_API_BASE_URL`.

## Important security status
The current `Login.jsx` is a **demo-only screen**: it navigates to the dashboard without verifying a username/password. Do not use it to protect real child data or describe it as secure authentication until a proper backend login/session system and authorization checks are implemented.

Never commit `.env` files. If a real database password or secret has been shared in a ZIP/repository, rotate it immediately and replace the local environment values.

## Project status
This cleaned package preserves the existing UI and feature implementation; visual redesign is intentionally deferred until functionality is tested. Before production use, verify every CRUD flow against the database, implement real authentication/authorization, and configure deployment environment variables.
