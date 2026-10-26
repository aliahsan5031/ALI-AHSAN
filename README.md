<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/07a0cb34-cb99-4498-bd9f-4bfa1e1ff51b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Payments

Packages are paid by **manual bank transfer**. Bank details are configured in one file, `src/data/paymentConfig.ts`; unfilled fields show as "to be confirmed". No online gateway is integrated. See [docs/PAYMENTS.md](docs/PAYMENTS.md) for what is and isn't implemented, provider research, and the rules for adding a gateway later.

Run the checks with `bun run lint`, `bun run test` and `bun run build`.
