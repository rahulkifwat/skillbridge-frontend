import Image from "next/image";

const LOGO_SRC = "/skillbridge-logo-mark.png";
const LOGO_WIDTH = 1231;
const LOGO_HEIGHT = 698;

export default function LogoMark({ inverted = false, showTagline = false, className = "" }) {
  const taglineColor = inverted ? "text-white/60" : "text-muted";

  const mark = (
    <Image
      src={LOGO_SRC}
      alt="SkillBridge EdTech"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      className="h-12 w-auto sm:h-14"
    />
  );

  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
      {inverted ? (
        <div className="inline-flex rounded-lg bg-white px-3 py-2">{mark}</div>
      ) : (
        mark
      )}
      {showTagline && (
        <span className={`text-xs ${taglineColor}`}>
          Future Skills. Real Practice. Real Results.
        </span>
      )}
    </div>
  );
}
