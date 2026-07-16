import PortalSidebar from "./PortalSidebar";
import PortalTopbar from "./PortalTopbar";

// Full dashboard chrome: sidebar + sticky topbar + scrollable content.
export default function PortalShell({ sidebar, topbar, surface = "bg-surface", children }) {
  return (
    <div className="flex min-h-screen w-full">
      <PortalSidebar {...sidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar {...topbar} />
        <main className={`flex-1 ${surface} px-4 py-6 sm:px-6 lg:px-8`}>{children}</main>
      </div>
    </div>
  );
}
