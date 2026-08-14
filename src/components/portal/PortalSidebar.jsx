import Image from "next/image";
import Link from "next/link";

const THEMES = {
  dark: {
    aside: "bg-navy text-white/80 border-navy-soft",
    brandSub: "text-white/50",
    itemActive: "bg-primary text-white",
    itemIdle: "text-white/70 hover:bg-white/5 hover:text-white",
    sectionLabel: "text-white/40",
    logoBox: "bg-white",
    divider: "border-white/10",
  },
  light: {
    aside: "bg-white text-body border-border",
    brandSub: "text-muted",
    itemActive: "bg-primary text-white",
    itemIdle: "text-body hover:bg-surface hover:text-heading",
    sectionLabel: "text-muted",
    logoBox: "",
    divider: "border-border",
  },
};

function NavList({ items, theme }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        // Items with an `href` navigate; the rest stay decorative, as the
        // original dashboard mockups had them.
        const Tag = item.href ? Link : "span";
        const tagProps = item.href ? { href: item.href } : {};

        return (
          <li key={item.label}>
            <Tag
              {...tagProps}
              aria-current={item.active ? "page" : undefined}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active ? theme.itemActive : theme.itemIdle
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    item.active ? "bg-white/20 text-white" : "bg-accent-light text-accent"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

export default function PortalSidebar({
  variant = "light",
  brandLabel,
  brandSub,
  tagline,
  nav,
  sections = [],
  widgets,
  footer,
}) {
  const theme = THEMES[variant];

  return (
    <aside className={`hidden lg:flex w-64 shrink-0 flex-col border-r ${theme.aside}`}>
      <div className="flex items-center gap-2 px-5 py-5">
        <span className={`inline-flex rounded-lg p-1 ${theme.logoBox}`}>
          <Image src="/skillbridge-logo-mark.png" alt="SkillBridge" width={1231} height={698} className="h-8 w-auto" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className={`text-lg font-bold ${variant === "dark" ? "text-white" : "text-heading"}`}>
            Skill<span className="text-amber">Bridge</span>
          </span>
          {brandSub && <span className={`text-[10px] ${theme.brandSub}`}>{brandSub}</span>}
        </span>
      </div>

      {tagline && (
        <p className={`px-5 pb-5 text-xs leading-relaxed ${theme.brandSub}`}>{tagline}</p>
      )}

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {brandLabel && (
          <p className={`px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider ${theme.sectionLabel}`}>
            {brandLabel}
          </p>
        )}
        <NavList items={nav} theme={theme} />

        {sections.map((section) => (
          <div key={section.label} className="mt-4">
            <p className={`px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider ${theme.sectionLabel}`}>
              {section.label}
            </p>
            <NavList items={section.items} theme={theme} />
          </div>
        ))}

        {widgets && <div className="mt-5 space-y-3">{widgets}</div>}
      </div>

      {footer && <div className={`border-t px-4 py-4 ${theme.divider}`}>{footer}</div>}
    </aside>
  );
}
