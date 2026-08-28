# Mouv Africa

- A minimalist React + Tailwind property discovery experience built around the supplied Mouv API collection.

## Vercel deployment

Add these variables in Vercel for the Production environment before building:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `CORE_UPSTREAM_URL` (normally `https://app.mconnect.africa/core`)
- `CORE_SKEY` when the Mouv API requires an `SKEY`

After changing `VITE_*` variables, redeploy because Vite embeds them at build time. Also add the deployed Vercel domain to Firebase Authentication's authorized domains.

## Authentication
- Firebase