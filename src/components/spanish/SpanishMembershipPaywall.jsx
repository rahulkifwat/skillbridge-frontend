"use client";

import { useEffect, useState } from "react";
import { HiCheckCircle, HiExclamationTriangle, HiLockClosed } from "react-icons/hi2";
import { spanishApi } from "@/lib/api";
import SpanishStripeEmbed from "@/components/spanish/SpanishStripeEmbed";

/**
 * Membership paywall. Shown in place of a bare "membership required" error so
 * a learner who hits the gate can pay without hunting for a billing page.
 *
 * Two providers come back from POST /spanish/billing/checkout:
 *  - "stripe"  — Stripe keys are configured; mount embedded checkout here.
 *  - "sandbox" — development only; the API grants the entitlement directly.
 */
export default function SpanishMembershipPaywall({
  product = "membership",
  title = "Spanish Academy membership",
  blurb = "Simulation Master is part of the Spanish Academy membership.",
  unlocks = [],
  returnTo,
  onUnlocked,
}) {
  const [checkout, setCheckout] = useState(null);
  const [price, setPrice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Price comes from the API catalogue so it can never drift from what Stripe
  // actually charges.
  useEffect(() => {
    let cancelled = false;
    spanishApi
      .billing()
      .then((result) => {
        if (cancelled) return;
        const row = (result.data.catalog || []).find((item) => item.product === product);
        if (row) setPrice(row);
      })
      .catch(() => {
        // The paywall still works without the catalogue; only the price is lost.
      });
    return () => {
      cancelled = true;
    };
  }, [product]);

  async function startCheckout() {
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.checkout(product, returnTo);
      if (result.data.provider === "stripe") {
        setCheckout(result.data);
        return;
      }
      // Sandbox: the entitlement is already recorded.
      onUnlocked?.(result.data.entitlements);
    } catch (caught) {
      setError(caught?.message || "Could not start checkout. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const amount = price?.amountUsd;
  const recurring = price?.mode === "subscription";

  return (
    <section className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-academy-spanish-soft)]">
          <HiLockClosed className="h-5 w-5 text-[var(--color-academy-spanish)]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-heading">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-body">{blurb}</p>
        </div>
      </div>

      {amount != null && (
        <p className="mt-5 flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tracking-tight text-heading">${amount}</span>
          <span className="text-sm text-muted">{recurring ? "per month" : "one time"}</span>
        </p>
      )}
      {price?.note && <p className="mt-1 text-xs text-muted">{price.note}</p>}

      {unlocks.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2">
          {unlocks.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-body">
              <HiCheckCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-academy-spanish)]"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <HiExclamationTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {checkout ? (
        <SpanishStripeEmbed
          clientSecret={checkout.clientSecret}
          publishableKey={checkout.publishableKey}
          onError={(message) => setError(message)}
        />
      ) : (
        <button
          type="button"
          onClick={startCheckout}
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-academy-spanish)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {busy ? "Opening checkout…" : amount != null ? `Unlock for $${amount}` : "Unlock membership"}
        </button>
      )}

      <p className="mt-4 text-xs text-muted">
        Payments are processed by Stripe. You can cancel a monthly membership at any time.
      </p>
    </section>
  );
}
