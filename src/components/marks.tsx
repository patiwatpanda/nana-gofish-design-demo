/* Authored marks for the ledger world: the farm chop seal, the CHECKED stamp,
   hand-drawn ticks, and the goldfish used on the endpaper. */

export function InkFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <filter id="ink-light" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="11" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 3.1"
            result="speckle"
          />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" result="inked" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" seed="5" result="warp" />
          <feDisplacementMap in="inked" in2="warp" scale="1.6" />
        </filter>
        <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -4.2 3.3"
            result="speckle"
          />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" result="inked" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="3" result="warp" />
          <feDisplacementMap in="inked" in2="warp" scale="2.4" />
        </filter>
      </defs>
    </svg>
  );
}

/** The farm's square chop seal: NANA over นานา inside a double frame. */
export function Seal({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g filter="url(#ink-light)">
        <rect x="4" y="4" width="112" height="112" rx="10" fill="currentColor" />
        <rect x="12" y="12" width="96" height="96" rx="5" fill="none" stroke="var(--seal-ground, #fff)" strokeWidth="2.5" />
        <text
          x="60"
          y="57"
          textAnchor="middle"
          fill="var(--seal-ground, #fff)"
          style={{ font: "400 30px var(--font-display)", letterSpacing: "0.02em" }}
        >
          NANA
        </text>
        <line x1="26" y1="68" x2="94" y2="68" stroke="var(--seal-ground, #fff)" strokeWidth="2" />
        <text
          x="60"
          y="94"
          textAnchor="middle"
          fill="var(--seal-ground, #fff)"
          style={{ font: "400 24px var(--font-display)" }}
        >
          นานา
        </text>
      </g>
    </svg>
  );
}

/**
 * Nana Goldfish Farm logo mark, from the client's original artwork (public/brand/logo-original.jpg).
 * The fish is an alpha mask so the mark can reverse on red: --logo-ground (square), --logo-ink (fish).
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <span
      className={`logo-mark ${className ?? ""}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <span className="logo-fish" />
    </span>
  );
}

/** The logo's wordmark, from the original artwork: "Nana" + "FARM" in ink, "GOLDFISH" in red. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`} role="img" aria-label="Nana Goldfish Farm">
      <span className="wordmark-ink" />
      <span className="wordmark-red" />
    </span>
  );
}

/** Rectangular inspection stamp, outlined like a rubber stamp impression. */
export function CheckStamp({ top, bottom }: { top: string; bottom: string }) {
  return (
    <svg viewBox="0 0 168 84" className="stamp-svg" aria-hidden="true">
      <g filter="url(#ink-light)" fill="none" stroke="currentColor">
        <rect x="3.5" y="3.5" width="161" height="77" rx="9" strokeWidth="5" />
        <rect x="11" y="11" width="146" height="62" rx="5" strokeWidth="2" />
        <text
          x="84"
          y="42"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={{ font: "400 24px var(--font-display)", letterSpacing: "0.1em" }}
        >
          {top}
        </text>
        <text
          x="84"
          y="64"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={{ font: "400 16px var(--font-display)" }}
        >
          {bottom}
        </text>
      </g>
    </svg>
  );
}

export function Tick({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 24" aria-hidden="true">
      <path
        d="M2.5 13.5c2.6 1.2 4.6 3.6 6.4 7.2C12.4 12.8 18 6.2 25.6 2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow({ className, dir = "right" }: { className?: string; dir?: "right" | "down" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      aria-hidden="true"
      style={dir === "down" ? { transform: "rotate(90deg)" } : undefined}
    >
      <path
        d="M3 10h13M11 4.5 16.5 10 11 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One small fancy goldfish, used as the endpaper repeat. */
export const fishPath =
  "M8 15c0-6 6-9 12-8 5 1 8 5 8 8s-3 7-8 8c-6 1-12-2-12-8Zm19 0c4-5 8-8 11-9-2 5-3 7-4 9 1 2 2 4 4 9-3-1-7-4-11-9ZM15 7.5c2-3.5 6-4.5 8 .1Z";

export function endpaperDataUri(color: string, ground: string) {
  const c = encodeURIComponent(color);
  const g = encodeURIComponent(ground);
  const fish = encodeURIComponent(fishPath);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='72' viewBox='0 0 96 72'%3E%3Crect width='96' height='72' fill='${g}'/%3E%3Cpath d='${fish}' fill='${c}'/%3E%3Cpath d='${fish}' fill='${c}' transform='translate(92 36) scale(-1 1)'/%3E%3C/svg%3E")`;
}

/* Platform marks from Simple Icons (CC0), drawn in the page's ink. */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function ShopeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z" />
    </svg>
  );
}

export function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M7 4h9v9M16 4 5 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
