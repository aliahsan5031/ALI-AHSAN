# Payments

## What is implemented

**Manual bank transfer only.** Choosing a package on the pricing section opens a dialog with two tabs:

- **Bank transfer** (default): shows the selected package and its existing price, the account number and IBAN (each with a copy button), step-by-step instructions, and buttons to email or WhatsApp the owner with a pre-filled message.
- **Inquiry / contact**: the pre-existing options (email, WhatsApp, LinkedIn, "Send Direct Inquiry Message" which scrolls to the on-site contact form with the plan pre-filled).

What it does **not** do:

- It does not take, move, or verify any money. The customer initiates the transfer in their own bank.
- Nothing on the page marks an order as paid. The owner must verify the deposit in the bank account before starting work.
- It collects no customer data and has no backend, database, or API keys.

There is deliberately **no online payment gateway** in this change (see below).

## Where the bank details live

`src/data/paymentConfig.ts` is the only place. A test (`src/test/bankDetailsSingleSource.test.ts`) fails if the account number or IBAN is duplicated anywhere else in `src/`.

Details not yet supplied are `null` and render as "To be confirmed — ask me before sending", with a warning telling customers to confirm beneficiary details first. To finish the setup, fill in these values **exactly as on your bank's records**:

| Field | Why it matters |
| --- | --- |
| `beneficiaryName` | Account title; customers' banks usually require it |
| `bankName` | Customers' banks usually require it |
| `swiftBic` | Needed for transfers from outside Pakistan |
| `currencyNote` | Currency of the receiving account, conversion/fee guidance. Plan prices are shown as already listed on the site ($99 / $149 / $199) |

Once all four are set, the amber warning disappears automatically.

## Online payment provider research (checked 26 Oct 2026)

Conclusion: **no provider was integrated**, because none could be verified as both (a) supporting a Pakistan-based seller with payout to a Pakistani bank account and (b) permitting this kind of offering (fixed-price custom AI engineering services).

| Provider | Finding | Status |
| --- | --- | --- |
| Lemon Squeezy | [Lists Pakistan for bank payouts](https://docs.lemonsqueezy.com/help/getting-started/supported-countries), but its [prohibited products](https://docs.lemonsqueezy.com/help/getting-started/prohibited-products) list bans "services of any kind", including web development and consulting. It is for digital goods (software, ebooks, etc.) | Not suitable for these packages |
| Paddle | Has a [page for Pakistani businesses](https://www.paddle.com/billing/pakistan) but states [human services not tied to a software product are not a fit](https://paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle). Payout details for Pakistan were not documented on the pages checked | Not suitable for these packages |
| Stripe | Could not confirm Pakistan from an official Stripe page in this session (the official country page was not reachable). Third-party articles suggest it is not directly available to Pakistani businesses. Not assumed | Unverified, not integrated |
| PayPal | Not confirmed from an official PayPal source | Unverified, not integrated |
| Safepay (Pakistan) | A local gateway with [KYC onboarding](https://safepay.helpscoutdocs.com/article/54-what-is-safepays-merchant-on-boarding-criteria). [Freelancers/sole proprietors need](https://safepay.helpscoutdocs.com/article/152-list-of-documents-you-need-to-provide-safepay): CNIC, a bank account maintenance certificate (≤ 3 months old) and an FBR NTN certificate. The pages checked did not state supported currencies, international-card support, or API/webhook details | Plausible candidate; needs Safepay to confirm the open questions below |

### If you want to pursue Safepay (or any gateway) later

Questions to get answered in writing by the provider first:

1. Can I accept USD, and do international customers' cards work?
2. In which currency is my bank account settled, and what are the fees?
3. Are fixed-price software/AI engineering services an allowed business type?
4. Is there a sandbox, a hosted checkout, and signed webhooks?

You would also need to complete merchant onboarding with your own documents. No credentials exist in this repo, and none were invented.

## Requirements for any future gateway integration

The site is a static Vite build on Cloudflare Pages; there is currently no `functions/` directory and no server code is deployed. If a gateway is added, it must follow these rules:

- **Secrets** live only in Cloudflare Pages → Settings → Variables and Secrets (as encrypted secrets, for Production and Preview separately). Never commit them, never use `VITE_`-prefixed variables for them (Vite inlines those into public JavaScript), and never read them in `src/`. A test already fails if a `VITE_*SECRET/API_KEY/WEBHOOK/PRIVATE` variable appears in client code.
- **Hosted checkout only.** Never collect or store raw card details.
- **Plans and prices are defined server-side** (a plan-id → amount/currency map in the Pages Function). The browser sends only a plan id; amounts it submits are ignored.
- **Paid status comes only from a signed webhook**, verified server-side with the provider's signing secret using a constant-time comparison. Not from the browser redirect.
- On every webhook: check the event's amount, currency and order/plan association against the server-side record, and store processed event ids so duplicate deliveries are harmless (idempotency).
- **No public endpoint may mark an order paid or accept an arbitrary amount.**
- Sandbox first: test the full flow with the provider's test mode and test webhooks before using live credentials.

## Tests and checks

```bash
bun install
bun run lint   # tsc --noEmit
bun run test   # vitest (jsdom)
bun run build
```

Dev dependencies added for testing: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`. They are not part of the production bundle. `bun.lock` is updated, so a frozen-lockfile install (as used by CI/Cloudflare) works.
