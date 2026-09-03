"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/lib/api";
import {
  SPANISH_ASSESSMENT_PATH,
  spanishAssessmentLoginPath,
} from "@/lib/spanishAcademyPaths";

export default function StartSpanishAssessmentButton({
  className = "",
  children,
  style,
}) {
  const { user } = useAuth();
  const [href, setHref] = useState(spanishAssessmentLoginPath());

  useEffect(() => {
    setHref(user || getToken() ? SPANISH_ASSESSMENT_PATH : spanishAssessmentLoginPath());
  }, [user]);

  return (
    <Link href={href} className={className} style={style}>
      {children}
      <HiArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
