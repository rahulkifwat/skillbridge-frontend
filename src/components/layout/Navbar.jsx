"use client";

import { useState } from "react";
import Link from "next/link";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import LogoMark from "@/components/common/LogoMark";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-body hover:text-primary"
                >
                  {link.label}
                  <HiChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute left-0 top-full w-56 rounded-lg border border-border bg-white p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-body hover:bg-surface hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/login" variant="ghost" className="border border-border">
            Log In
          </Button>
          <Button href="/signup" variant="primary">
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-heading lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-body hover:bg-surface hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button href="/login" variant="outline">
                Log In
              </Button>
              <Button href="/signup" variant="primary">
                Sign Up
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
