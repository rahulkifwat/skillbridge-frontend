"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiOutlineArrowPath, HiOutlineHome } from "react-icons/hi2";
import Container from "@/components/common/Container";
import LogoMark from "@/components/common/LogoMark";
import Button from "@/components/common/Button";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-4 py-12">
      <Link href="/">
        <LogoMark />
      </Link>

      <Container className="flex max-w-lg flex-col items-center gap-6 text-center">
        <svg viewBox="0 0 220 90" className="h-20 w-52" aria-hidden="true">
          <path
            d="M4 70c10-30 30-42 56-42c26 0 26 0 52 0c26 0 26 0 52 0c26 0 46 12 56 42"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M4 71h95M124 71h92"
            stroke="var(--color-navy)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M20 71V50M40 71V38M180 71V50M160 71V38"
            stroke="var(--color-navy)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M99 71l8-14l8 14l8-14l8 14"
            fill="none"
            stroke="var(--color-amber)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="110" cy="26" r="4" fill="var(--color-accent)" />
        </svg>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-primary">Something Went Wrong</span>
          <h1 className="text-3xl font-bold text-heading sm:text-4xl">
            We hit a crack in the bridge
          </h1>
          <p className="text-sm text-body">
            An unexpected error occurred on our end. Our team has been notified — try again,
            or head back home while we patch things up.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" onClick={reset}>
            <HiOutlineArrowPath className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
          <Button href="/" variant="outline">
            <HiOutlineHome className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
