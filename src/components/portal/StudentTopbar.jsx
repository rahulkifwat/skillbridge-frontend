"use client";

import { useRouter } from "next/navigation";
import {
  HiMagnifyingGlass,
  HiBell,
  HiGlobeAlt,
  HiChevronDown,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import Avatar from "@/components/common/Avatar";
import { useAuth } from "@/context/AuthContext";

// Topbar for the student portal: wide search, language switcher, notifications
// and the signed-in user. Falls back to "Guest" when nobody is logged in.
export default function StudentTopbar({
  searchPlaceholder = "Search for skills, careers, or academies...",
  notifications = 3,
}) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName = user ? user.fullName.split(" ")[0] : "Guest";

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
      <div className="relative w-full max-w-xl flex-1">
        <HiMagnifyingGlass
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          placeholder={searchPlaceholder}
          aria-label="Search"
          className="w-full rounded-full border border-border bg-white py-2.5 pl-12 pr-4 text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          className="hidden items-center gap-1.5 text-sm font-medium text-body hover:text-heading sm:flex"
        >
          <HiGlobeAlt aria-hidden="true" className="h-5 w-5" />
          EN
          <HiChevronDown aria-hidden="true" className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="relative text-muted hover:text-heading"
          aria-label={`Notifications (${notifications} unread)`}
        >
          <HiBell aria-hidden="true" className="h-6 w-6" />
          {notifications > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
              {notifications}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <Avatar name={user ? user.fullName : "Guest User"} size="sm" />
          <span className="hidden text-sm font-medium text-heading sm:inline">
            Welcome, {displayName}
          </span>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              title="Log out"
              aria-label="Log out"
              className="text-muted transition-colors hover:text-red-600"
            >
              <HiArrowRightOnRectangle aria-hidden="true" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
