import {
  HiMagnifyingGlass,
  HiBell,
  HiQuestionMarkCircle,
  HiChatBubbleOvalLeftEllipsis,
  HiChevronDown,
} from "react-icons/hi2";
import Avatar from "@/components/common/Avatar";

export default function PortalTopbar({ user, searchPlaceholder = "Search anything...", showHelp = true, showMessages = false, notifications = 3 }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="relative flex-1 max-w-xl">
        <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="text"
          readOnly
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-14 text-sm text-body placeholder:text-muted focus:outline-none"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-white px-1.5 py-0.5 text-[10px] font-medium text-muted">
          ⌘ K
        </kbd>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button type="button" className="relative text-muted hover:text-heading" aria-label="Notifications">
          <HiBell className="h-6 w-6" />
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {notifications}
            </span>
          )}
        </button>
        {showMessages && (
          <button type="button" className="text-muted hover:text-heading" aria-label="Messages">
            <HiChatBubbleOvalLeftEllipsis className="h-6 w-6" />
          </button>
        )}
        {showHelp && (
          <button type="button" className="text-muted hover:text-heading" aria-label="Help">
            <HiQuestionMarkCircle className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <Avatar name={user.name} size="sm" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-heading">{user.name}</span>
            <span className="text-xs text-muted">{user.sub}</span>
          </span>
          <HiChevronDown className="hidden h-4 w-4 text-muted sm:block" />
        </div>
      </div>
    </header>
  );
}
