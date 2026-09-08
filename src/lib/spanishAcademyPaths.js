export const SPANISH_ASSESSMENT_PATH = "/spanish/assessment";
export const SPANISH_PROFILE_PATH = "/spanish/profile";
export const SPANISH_DASHBOARD_PATH = "/spanish/dashboard";

export function spanishAssessmentLoginPath() {
  return `/login?next=${encodeURIComponent(SPANISH_ASSESSMENT_PATH)}`;
}
