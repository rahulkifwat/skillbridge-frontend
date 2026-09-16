"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa6";
import { authApi } from "@/lib/api";

const PROVIDERS = [
  { id: "google", icon: FaGoogle, label: "Continue with Google" },
  { id: "microsoft", icon: FaMicrosoft, label: "Continue with Microsoft" },
  { id: "apple", icon: FaApple, label: "Continue with Apple" },
];

export default function SocialOAuthButtons() {
  const searchParams = useSearchParams();
  const [flags, setFlags] = useState({ google: false, microsoft: false, apple: false });

  useEffect(() => {
    authApi
      .oauthProviders()
      .then((result) => setFlags(result.data.providers || {}))
      .catch(() => setFlags({ google: false, microsoft: false, apple: false }));
  }, []);

  const startUrl = useMemo(() => {
    const academy = searchParams.get("academy") === "spanish" ? "spanish" : "";
    const next = searchParams.get("next") || "";
    return (provider) => {
      const params = new URLSearchParams();
      if (academy) params.set("academy", academy);
      if (next) params.set("next", next);
      const query = params.toString();
      return authApi.oauthStartUrl(provider, query);
    };
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-3">
      {PROVIDERS.map(({ id, icon: Icon, label }) => {
        const enabled = Boolean(flags[id]);
        if (enabled) {
          return (
            <a
              key={id}
              href={startUrl(id)}
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </a>
          );
        }
        return (
          <button
            key={id}
            type="button"
            disabled
            title="Social sign-in is not configured on this server."
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-heading disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
