import Link from "next/link";
import { HiOutlineHome, HiOutlineLifebuoy } from "react-icons/hi2";
import Container from "@/components/common/Container";
import LogoMark from "@/components/common/LogoMark";
import Button from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-4 py-12">
      <Link href="/">
        <LogoMark />
      </Link>

      <Container className="flex max-w-lg flex-col items-center gap-6 text-center">
        <svg viewBox="0 0 220 90" className="h-20 w-52" aria-hidden="true">
          <path
            d="M4 70c10-30 30-42 56-42"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M216 70c-10-30-30-42-56-42"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M4 71h56M160 71h56" stroke="var(--color-navy)" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M20 71V50M40 71V38M150 71V38M180 71V50"
            stroke="var(--color-navy)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="110" cy="26" r="4" fill="var(--color-accent)" />
          <path
            d="M97 44l26 26M123 44l-26 26"
            stroke="var(--color-amber)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-primary">Error 404</span>
          <h1 className="text-3xl font-bold text-heading sm:text-4xl">
            This path doesn&apos;t cross the bridge
          </h1>
          <p className="text-sm text-body">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get
            you back to real practice and real results.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" showArrow>
            <HiOutlineHome className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
          <Button href="/contact" variant="outline">
            <HiOutlineLifebuoy className="h-4 w-4" aria-hidden="true" />
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
}
