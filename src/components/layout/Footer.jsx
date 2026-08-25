"use client";

import Link from "next/link";
import { FaLinkedinIn, FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import BrandLogo from "@/components/common/BrandLogo";
import { useT } from "@/context/LanguageContext";
import { footerLinks, socialLinks } from "@/data/navigation";

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export default function Footer() {
  const t = useT();

  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:grid-cols-7 lg:px-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <BrandLogo inverted showTagline />
        </div>

        {footerLinks.map((group) => (
          <div key={group.tKey}>
            <h3 className="mb-3 text-sm font-semibold text-white">{t(group.tKey)}</h3>
            <ul className="flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.tKey}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-brand-bright">
                    {t(link.tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">{t("common.followUs")}</h3>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 text-center text-xs text-white/50 sm:px-6 lg:px-8">
          {t("common.rights")}
        </div>
      </div>
    </footer>
  );
}
