import { landingForUser } from "@/lib/spanishSplit";

export const LANDING_BY_ROLE = {
  student: "/student",
  instructor: "/instructor",
  employer: "/employer",
  administrator: "/admin",
  partner: "/partner",
  super_admin: "/super-admin",
};

export function landingForRole(role) {
  return LANDING_BY_ROLE[role] || "/student";
}

export function landingForAuthenticatedUser(user) {
  return landingForUser(user);
}
