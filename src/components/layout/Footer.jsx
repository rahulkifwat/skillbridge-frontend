import Link from "next/link";
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Container from "@/components/common/Container";
import LogoMark from "@/components/common/LogoMark";
import { footerLinks, socialLinks } from "@/data/navigation";

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="flex flex-col gap-12 py-14 lg:flex-row lg:justify-between">
        <div className="flex max-w-xs flex-col gap-4">
          <LogoMark inverted showTagline />
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-soft text-white hover:bg-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
          {footerLinks.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">{column.heading}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex max-w-xs flex-col gap-3">
          <h3 className="text-sm font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-white/70">
            Get the latest updates and career tips straight to your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-md border border-white/20 bg-navy-soft px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <span>© 2026 SkillBridge EdTech. All rights reserved.</span>
          <span>Made with ❤ for learners worldwide.</span>
        </Container>
      </div>
    </footer>
  );
}
