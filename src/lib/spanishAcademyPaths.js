export const SPANISH_ASSESSMENT_PATH = "/student/assessments";

export function spanishAssessmentLoginPath() {
  return `/login?next=${encodeURIComponent(SPANISH_ASSESSMENT_PATH)}`;
}
