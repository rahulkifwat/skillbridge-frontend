"use client";

import { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function SpanishStripeEmbed({ clientSecret, publishableKey, onError }) {
  const mountRef = useRef(null);
  const checkoutRef = useRef(null);

  useEffect(() => {
    if (!clientSecret || !publishableKey) return undefined;
    let cancelled = false;

    async function mount() {
      try {
        const stripe = await loadStripe(publishableKey);
        if (!stripe || cancelled) return;
        const checkout = await stripe.createEmbeddedCheckoutPage({
          fetchClientSecret: async () => clientSecret,
        });
        if (cancelled) {
          checkout.destroy();
          return;
        }
        checkoutRef.current = checkout;
        checkout.mount(mountRef.current);
      } catch (error) {
        onError?.(error.message || "Could not open Stripe Checkout.");
      }
    }

    mount();
    return () => {
      cancelled = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [clientSecret, publishableKey, onError]);

  return <div ref={mountRef} className="mt-6 overflow-hidden rounded-2xl border border-border bg-white" />;
}
