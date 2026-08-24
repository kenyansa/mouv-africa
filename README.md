# Mouv Africa

A minimalist React + Tailwind property discovery experience built around the supplied Mouv API collection.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The app uses curated demo listings when the API is unavailable, so the browse and detail flows can be reviewed immediately.

## Environment

Set these values in `.env` when you have them:

- `VITE_CORE_URL`: API base URL, defaulting to `https://app.mconnect.africa/core`
- `VITE_SKEY`: authenticated API token used by listing requests
- `VITE_FIREBASE_API_KEY`: Firebase Web API key used by `verifyPassword`

The sign-in dialog sends `{ email, password, returnSecureToken: true }` to Firebase and stores the returned session locally for this demo. The listing client calls `listClientListings` with `{ status: "ACTIVE" }` and normalizes the response into the card model.

## Structure

```text
src/
	App.jsx       # browse experience and UI state
	index.css     # Tailwind entry and global design tokens
	lib/api.js    # API contract, Firebase auth, and demo fallback
```
