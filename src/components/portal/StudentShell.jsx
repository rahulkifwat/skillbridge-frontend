import PortalSidebar from "./PortalSidebar";
import StudentTopbar from "./StudentTopbar";
import SidebarPromo from "./SidebarPromo";
import { studentNav } from "@/data/studentPortal";

// Dark-navy sidebar + student topbar. `active` is the nav label to highlight.
export default function StudentShell({
  active,
  promo = "learning",
  searchPlaceholder,
  surface = "bg-white",
  children,
}) {
  const nav = studentNav.map((item) => ({ ...item, active: item.label === active }));

  return (
    <div className="flex min-h-screen w-full">
      <PortalSidebar
        variant="dark"
        brandSub="EdTech"
        tagline={
          <>
            Future Skills. Real Practice.
            <br />
            <span className="font-semibold text-amber">Global Opportunities.</span>
          </>
        }
        nav={nav}
        widgets={<SidebarPromo variant={promo} />}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudentTopbar searchPlaceholder={searchPlaceholder} />
        <main className={`flex-1 ${surface}`}>{children}</main>
      </div>
    </div>
  );
}
