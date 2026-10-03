"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { copy, neoAssets, photoCredits, shopLinks, type Lang } from "./content";
import {
  Arrow,
  CheckStamp,
  ExternalArrow,
  InkFilters,
  LogoMark,
  ShopeeIcon,
  TikTokIcon,
  Tick,
  Wordmark,
  endpaperDataUri,
} from "./marks";

const LANG_KEY = "nana-lang";

/* The visitor's language lives in a tiny external store so it survives reloads without a hydration mismatch. */
const langListeners = new Set<() => void>();
let langMemory: Lang | null = null;

function readLang(): Lang {
  if (langMemory) return langMemory;
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "th" || saved === "en") return saved;
  } catch {
    /* storage unavailable */
  }
  return "en";
}

function writeLang(next: Lang) {
  langMemory = next;
  try {
    window.localStorage.setItem(LANG_KEY, next);
  } catch {
    /* storage unavailable: keep it for this visit only */
  }
  langListeners.forEach((fn) => fn());
}

function subscribeLang(fn: () => void) {
  langListeners.add(fn);
  return () => langListeners.delete(fn);
}

type Photo = { src: string; w: number; h: number; alt: string };

const photos = {
  pond: { src: "/samples/pond-red-oranda.webp", w: 1200, h: 900, alt: "Red and white oranda goldfish swimming among pond leaves" },
  ranchu: { src: "/samples/ranchu-selection.webp", w: 1100, h: 733, alt: "Orange ranchu goldfish photographed against a blue background" },
  handling: { src: "/samples/handling-oranda.webp", w: 1100, h: 733, alt: "A large oranda goldfish held in two hands over a bag" },
  bagged: { src: "/samples/bagged-ranchu.webp", w: 1100, h: 733, alt: "Three ranchu goldfish in a clear water bag held up for inspection" },
  lionhead: { src: "/samples/lionhead.webp", w: 912, h: 684, alt: "Red, white and gold lionhead goldfish over gravel" },
  whiteface: { src: "/samples/oranda-whiteface.webp", w: 912, h: 684, alt: "Yellow oranda goldfish with a white head" },
  plateRanchu: { src: "/samples/plate-ranchu.webp", w: 1280, h: 742, alt: "Painted plate of a ranchu goldfish" },
  plateOranda: { src: "/samples/plate-oranda.webp", w: 1280, h: 712, alt: "Painted plate of a red and white oranda goldfish" },
} satisfies Record<string, Photo>;

/** Which entries carry pasted evidence, and which carry a margin note instead. */
const entryExtras: ({ kind: "photo"; photo: Photo } | { kind: "note"; href?: string; en: string; th: string })[] = [
  { kind: "photo", photo: photos.pond },
  { kind: "photo", photo: photos.ranchu },
  { kind: "note", href: "#grades", en: "see the grades", th: "ดูเกรดปลา" },
  { kind: "note", href: "#route", en: "see the route", th: "ดูเส้นทาง" },
  { kind: "photo", photo: photos.handling },
  { kind: "note", href: "#enquire", en: "enquire here", th: "สอบถามที่นี่" },
  { kind: "note", en: "ongoing", th: "ทำต่อเนื่อง" },
];

const stampTilt = [-7, 4, -3, 6, -5, 3, -8];
const stampInk = [1, 0.86, 0.95, 0.8, 1, 0.9, 0.84];

/** NEO-HELIOS name plate: the brand's own logo once supplied, its name in plain type until then. */
function NeoMark({ className = "" }: { className?: string }) {
  if (neoAssets.logo) {
    return (
      <span className={`neo-mark has-logo ${className}`}>
        <Image src={neoAssets.logo} alt="NEO-HELIOS" width={240} height={80} />
      </span>
    );
  }
  return <span className={`neo-mark ${className}`}>NEO-HELIOS</span>;
}

function Pasted({
  photo,
  caption,
  tilt = 0,
  className = "",
  sizes,
  priority,
}: {
  photo: Photo;
  caption: string;
  tilt?: number;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`pasted ${className}`} style={{ ["--tilt" as string]: `${tilt}deg` }}>
      <div className="pasted-frame">
        <Image src={photo.src} width={photo.w} height={photo.h} alt={photo.alt} sizes={sizes} priority={priority} />
        <span className="corner tl" aria-hidden="true" />
        <span className="corner tr" aria-hidden="true" />
        <span className="corner bl" aria-hidden="true" />
        <span className="corner br" aria-hidden="true" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Ledger() {
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "en" as Lang);
  const setLang = writeLang;
  const t = copy[lang];
  const openingRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const [paperHeader, setPaperHeader] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /* The cover swings open as the visitor scrolls through the opening. */
  useEffect(() => {
    const opening = openingRef.current;
    const cover = coverRef.current;
    if (!opening || !cover) return;
    const swing = window.matchMedia(
      "(min-width: 761px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = opening.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      opening.style.setProperty("--p", p.toFixed(4));
      opening.dataset.open = p > 0.985 ? "done" : p > 0.02 ? "moving" : "closed";
      if (swing.matches) {
        setPaperHeader(p > 0.45 || rect.bottom < 72);
      } else {
        setPaperHeader(cover.getBoundingClientRect().bottom < 72);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* Stamps land when their entry is read, and stay. Anything already on screen stays as rendered. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-ink]"));
    const below = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    below.forEach((el) => (el.dataset.ink = "pending"));
    const io = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (!item.isIntersecting) return;
          const el = item.target as HTMLElement;
          el.dataset.ink = "landed";
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -22% 0px" },
    );
    below.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="book" data-lang={lang}>
      <InkFilters />
      <a className="skip" href="#record">
        {lang === "en" ? "Skip to the farm record" : "ข้ามไปยังจุดเด่นของฟาร์ม"}
      </a>

      <header className="topbar" data-mode={paperHeader ? "paper" : "cloth"}>
        <a className="brand" href="#top" aria-label="Nana Goldfish Farm">
          <LogoMark className="brand-seal" />
          <Wordmark className="brand-name" />
        </a>
        <nav className="tabs" aria-label={lang === "en" ? "Sections" : "หมวด"}>
          <a href="#record">{t.nav.record}</a>
          <a href="#grades">{t.nav.grades}</a>
          <a href="#neo-helios">{t.nav.neo}</a>
          <a href="#shop">{t.nav.shop}</a>
          <a href="#mission">{t.nav.mission}</a>
        </nav>
        <div className="topbar-actions">
          <button
            type="button"
            className="lang"
            onClick={() => setLang(lang === "en" ? "th" : "en")}
            lang={lang === "en" ? "th" : "en"}
            aria-label={lang === "en" ? "อ่านเป็นภาษาไทย" : "Read in English"}
          >
            <span className={lang === "en" ? "on" : ""}>EN</span>
            <span className="lang-sep" aria-hidden="true" />
            <span className={lang === "th" ? "on" : ""}>TH</span>
          </button>
          <a className="btn btn-small" href="#enquire">
            {t.enquire}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ── The opening: a red cloth cover that swings back onto the first page ── */}
        <section className="opening" ref={openingRef} aria-label="Nana Goldfish Farm">
          <div className="stage">
            <div className="titlepage paper ruled">
              <div className="titlepage-inner">
                <div className="about">
                  <h2 className="h2">{t.aboutTitle}</h2>
                  <dl className="fields">
                    {t.aboutFields.map((f) => (
                      <div className="field" key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <a className="btn btn-ghost" href="#record">
                    {t.recordTitle}
                    <Arrow className="btn-icon" dir="down" />
                  </a>
                </div>
                <Pasted
                  photo={photos.pond}
                  caption={`${t.sampleNote} · Oranda`}
                  tilt={2.5}
                  className="about-photo"
                  sizes="(max-width: 760px) 80vw, 40vw"
                  priority
                />
              </div>
            </div>

            <div className="cover" ref={coverRef}>
              <div className="cover-face cloth">
                <span className="spine" aria-hidden="true" />
                <span className="page-edges" aria-hidden="true" />
                <div className="cover-grid">
                  <div className="cover-main">
                    <h1 className="cover-title">Nana Goldfish Farm</h1>
                    <div className="label-plate">
                      <p className="label-tagline" lang="en">
                        {t.tagline}
                      </p>
                      <p className="label-intro">{t.intro}</p>
                      <div className="label-actions">
                        <a className="btn" href="#enquire">
                          {t.enquire}
                          <Arrow className="btn-icon" />
                        </a>
                        <a className="btn btn-ghost" href="#record">
                          {t.openBook}
                          <Arrow className="btn-icon" dir="down" />
                        </a>
                      </div>
                      <a className="credential" href="#neo-helios">
                        <NeoMark />
                        <span className="credential-text">{t.credential}</span>
                        <Arrow className="credential-arrow" dir="down" />
                      </a>
                    </div>
                  </div>
                  <div className="cover-specimen">
                    <figure className="specimen-card">
                      <Image
                        src={photos.plateOranda.src}
                        width={photos.plateOranda.w}
                        height={photos.plateOranda.h}
                        alt={photos.plateOranda.alt}
                        sizes="(max-width: 900px) 90vw, 34vw"
                        priority
                      />
                      <figcaption>{t.plateNote}</figcaption>
                      <span className="corner tl" aria-hidden="true" />
                      <span className="corner tr" aria-hidden="true" />
                      <span className="corner bl" aria-hidden="true" />
                      <span className="corner br" aria-hidden="true" />
                    </figure>
                    <LogoMark className="cover-seal" title="Nana Goldfish Farm logo" />
                  </div>
                </div>
              </div>
              <div
                className="cover-back"
                aria-hidden="true"
                style={{ backgroundImage: endpaperDataUri("#c8141f", "#ffffff") }}
              />
            </div>
          </div>
        </section>

        {/* ── The record: seven standards as ledger entries ── */}
        <section id="record" className="paper ruled-soft ledger-section">
          <div className="section-head">
            <h2 className="h1">{t.recordTitle}</h2>
            <p className="lead">{t.recordLead}</p>
          </div>

          <div className="ledger" role="list">
            <div className="ledger-head" aria-hidden="true">
              <span>{lang === "en" ? "No." : "ลำดับ"}</span>
              <span>{lang === "en" ? "Entry" : "รายการ"}</span>
              <span>{lang === "en" ? "Notes" : "หมายเหตุ"}</span>
              <span>{lang === "en" ? "Checked" : "ตรวจ"}</span>
            </div>
            {t.entries.map((entry, i) => {
              const extra = entryExtras[i];
              return (
                <article className="entry" role="listitem" key={i}>
                  <span className="entry-no">{String(i + 1)}</span>
                  <div className="entry-text">
                    <h3 className="h3">{entry.title}</h3>
                    <p>{entry.body}</p>
                  </div>
                  <div className="entry-extra">
                    {extra.kind === "photo" ? (
                      <Pasted
                        photo={extra.photo}
                        caption={t.sampleNote}
                        tilt={i % 2 ? -2 : 1.6}
                        sizes="(max-width: 760px) 70vw, 240px"
                      />
                    ) : extra.href ? (
                      <a className="margin-note" href={extra.href}>
                        {lang === "en" ? extra.en : extra.th}
                        <Arrow className="note-arrow" />
                      </a>
                    ) : (
                      <span className="margin-note">{lang === "en" ? extra.en : extra.th}</span>
                    )}
                  </div>
                  <div className="entry-stamp" data-ink="" style={{ ["--stamp-tilt" as string]: `${stampTilt[i]}deg`, ["--stamp-ink" as string]: stampInk[i] }}>
                    <CheckStamp top={t.stampTop} bottom={t.stampBottom} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Grades: the same five judgements, every market ── */}
        <section id="grades" className="paper ruled-soft grades-section">
          <div className="grades">
            <div className="grades-head">
              <div>
                <h2 className="h1">{t.gradesTitle}</h2>
                <p className="lead">{t.gradesBody}</p>
              </div>
              <div className="specimen-row">
                <Pasted photo={photos.lionhead} caption={`${t.sampleNote} · Lionhead`} tilt={-2.4} sizes="(max-width: 760px) 45vw, 14vw" />
                <Pasted photo={photos.whiteface} caption={`${t.sampleNote} · Oranda`} tilt={1.8} sizes="(max-width: 760px) 45vw, 14vw" />
                <figure className="pasted plate-pasted" style={{ ["--tilt" as string]: "-1deg" }}>
                  <div className="pasted-frame plate-frame">
                    <Image
                      src={photos.plateRanchu.src}
                      width={photos.plateRanchu.w}
                      height={photos.plateRanchu.h}
                      alt={photos.plateRanchu.alt}
                      sizes="(max-width: 760px) 45vw, 14vw"
                    />
                  </div>
                  <figcaption>{lang === "en" ? "Ranchu plate, for reference" : "แรนชู ภาพอ้างอิง"}</figcaption>
                </figure>
              </div>
            </div>
            <div className="grade-table-wrap" tabIndex={0} role="region" aria-label={t.gradesTitle}>
              <table className="grade-table" aria-describedby="grade-caption">
                <thead>
                  <tr>
                    <th scope="col">{t.marketCol}</th>
                    {t.criteria.map((c) => (
                      <th scope="col" key={c}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.markets.map((m) => (
                    <tr key={m}>
                      <th scope="row">{m}</th>
                      {t.criteria.map((c) => (
                        <td key={c}>
                          <Tick className="tick" />
                          <span className="sr-only">{lang === "en" ? "judged" : "พิจารณา"}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="grade-caption" id="grade-caption">
              {t.gradesCaption}
            </p>
          </div>
        </section>

        {/* ── Route: one continuous red line from pond to departure ── */}
        <section id="route" className="paper ruled-soft route-section">
          <div className="route-head">
            <div>
              <h2 className="h1">{t.routeTitle}</h2>
              <p className="lead">{t.routeLead}</p>
            </div>
            <Pasted
              photo={photos.bagged}
              caption={`${t.sampleNote} · ${lang === "en" ? "packed ranchu" : "แรนชูในถุง"}`}
              tilt={-2}
              className="route-photo"
              sizes="(max-width: 760px) 80vw, 340px"
            />
          </div>
          <div className="route" data-ink="">
            <span className="route-line" aria-hidden="true" />
            <ol className="stations">
              {t.stations.map((s, i) => (
                <li className="station" key={i} style={{ ["--i" as string]: i }}>
                  <span className="station-no" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── NEO-HELIOS: official distributor, kept as a record of appointment ── */}
        <section id="neo-helios" className="paper ruled-soft neo-section">
          <div className="neo">
            <div className="neo-copy">
              <h2 className="h1 neo-title">{t.neoTitle}</h2>
              <p className="lead">{t.neoLead}</p>
              <ol className="neo-lines">
                {t.neoLines.map((line) => (
                  <li key={line.title}>
                    <Tick className="tick" />
                    <div>
                      <h3 className="h3">{line.title}</h3>
                      <p>{line.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="hand-note">{t.neoLinesNote}</p>
            </div>

            <div className="appointment">
              <div className="appointment-sheet">
                <div className="appointment-head">
                  <NeoMark className="neo-mark-large" />
                  <p className="appointment-title">{t.neoRecordTitle}</p>
                </div>
                <dl className="appointment-fields">
                  {t.neoRecord.map((f) => (
                    <div className="field" key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="appointment-sign">
                  <LogoMark className="appointment-logo" />
                  <div className="appointment-stamp" data-ink="" style={{ ["--stamp-tilt" as string]: "-8deg" }}>
                    <CheckStamp top={t.neoStampTop} bottom={t.neoStampBottom} />
                  </div>
                </div>
              </div>
              {neoAssets.certificate ? (
                <figure className="pasted cert-pasted" style={{ ["--tilt" as string]: "2deg" }}>
                  <div className="pasted-frame">
                    <Image src={neoAssets.certificate} alt={t.neoRecordTitle} width={900} height={1270} sizes="320px" />
                  </div>
                </figure>
              ) : (
                <p className="cert-slot">{t.neoCertSlot}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Mission on red cloth ── */}
        <section id="mission" className="cloth mission">
          <div className="mission-inner">
            <h2 className="mission-text" lang="en">
              <span className="mission-label">{t.missionTitle}:</span> {t.mission}
            </h2>
            <p className="mission-goal">{t.goal}</p>
          </div>
          <LogoMark className="mission-seal" />
        </section>

        {/* ── Buy online: the farm's shops, entered like accounts in the ledger ── */}
        <section id="shop" className="paper shop-section">
          <div className="shop">
            <div className="section-head">
              <h2 className="h1">{t.shopTitle}</h2>
              <p className="lead">{t.shopLead}</p>
            </div>
            <ul className="shop-rows">
              {shopLinks.map((shop) => (
                <li className={`shop-row shop-${shop.id}`} key={shop.id}>
                  <span className="shop-icon" aria-hidden="true">
                    {shop.id === "tiktok" ? <TikTokIcon /> : <ShopeeIcon />}
                  </span>
                  <span className="shop-name">
                    <span className="shop-platform">{shop.name}</span>
                    <span className="shop-store">Nana Goldfish Farm</span>
                  </span>
                  <a className="btn shop-btn" href={shop.href} target="_blank" rel="noopener noreferrer">
                    {t.shopOpen} {shop.name}
                    <ExternalArrow className="btn-icon" />
                  </a>
                </li>
              ))}
            </ul>
            {shopLinks.some((l) => !l.final) && <p className="hand-note">{t.shopNote}</p>}
          </div>
        </section>

        {/* ── Enquire: open an account ── */}
        <section id="enquire" className="paper enquire-section">
          <div className="enquire">
            <div className="enquire-copy">
              <h2 className="h1">{t.enquireTitle}</h2>
              <p className="lead">{t.enquireLead}</p>
              <div className="channels">
                <p className="channels-title">{t.channelsTitle}</p>
                <p className="channels-tbc">{t.channelsTbc}</p>
              </div>
            </div>
            <EnquiryForm lang={lang} />
          </div>
        </section>
      </main>

      <footer className="cloth footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <LogoMark className="footer-seal" title="Nana Goldfish Farm logo" />
            <div>
              <Wordmark className="footer-wordmark" />
              <p className="footer-tag">Professional Goldfish Farm from Thailand</p>
              <p className="footer-tag footer-credential">
                {lang === "en" ? "Official Distributor of NEO-HELIOS in Thailand" : t.neoTitle}
              </p>
              <ul className="footer-shops">
                {shopLinks.map((shop) => (
                  <li key={shop.id}>
                    <a href={shop.href} target="_blank" rel="noopener noreferrer">
                      {shop.id === "tiktok" ? <TikTokIcon className="footer-shop-icon" /> : <ShopeeIcon className="footer-shop-icon" />}
                      {shop.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="credits">
            <p className="credits-title">{t.credits}</p>
            <ul>
              {photoCredits.map((c) => (
                <li key={c.file}>
                  {c.file}: {c.author}, {c.license}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

type Fields = { name: string; company: string; country: string; type: string; message: string };
type Errors = Partial<Record<"name" | "company" | "country" | "message", string>>;

function EnquiryForm({ lang }: { lang: Lang }) {
  const f = copy[lang].form;
  const [values, setValues] = useState<Fields>({ name: "", company: "", country: "", type: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const firstInvalid = useRef<HTMLFormElement>(null);

  const validate = useCallback(
    (v: Fields): Errors => {
      const e: Errors = {};
      if (!v.name.trim()) e.name = f.errors.name;
      if (!v.company.trim()) e.company = f.errors.company;
      if (!v.country.trim()) e.country = f.errors.country;
      if (v.message.trim().length < 10) e.message = f.errors.message;
      return e;
    },
    [f],
  );

  const set = (key: keyof Fields) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const bad = Object.keys(e).find((k) => e[k as keyof Errors]);
    if (bad) {
      firstInvalid.current?.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 700);
  };

  if (status === "done") {
    return (
      <div className="form-sheet form-done" role="status">
        <div className="done-stamp">
          <CheckStamp top="RECORDED" bottom="บันทึกแล้ว" />
        </div>
        <h3 className="h2">{f.received}</h3>
        <p>{f.receivedBody}</p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setValues({ name: "", company: "", country: "", type: "", message: "" });
            setStatus("idle");
          }}
        >
          {f.again}
        </button>
      </div>
    );
  }

  const text = (key: "name" | "company" | "country", label: string, autoComplete: string) => (
    <div className="ff">
      <label htmlFor={`f-${key}`}>{label}</label>
      <input
        id={`f-${key}`}
        name={key}
        autoComplete={autoComplete}
        value={values[key]}
        onChange={(e) => set(key)(e.target.value)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `f-${key}-err` : undefined}
      />
      {errors[key] && (
        <p className="ff-error" id={`f-${key}-err`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form className="form-sheet" onSubmit={onSubmit} noValidate ref={firstInvalid}>
      {text("name", f.name, "name")}
      {text("company", f.company, "organization")}
      {text("country", f.country, "country-name")}
      <fieldset className="ff ff-types">
        <legend>{f.type}</legend>
        <div className="types">
          {f.types.map((type) => (
            <label key={type} className="type">
              <input
                type="radio"
                name="type"
                value={type}
                checked={values.type === type}
                onChange={() => set("type")(type)}
              />
              <span className="box" aria-hidden="true">
                <Tick className="box-tick" />
              </span>
              {type}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="ff">
        <label htmlFor="f-message">{f.message}</label>
        <textarea
          id="f-message"
          name="message"
          rows={4}
          placeholder={f.messageHint}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "f-message-err" : undefined}
        />
        {errors.message && (
          <p className="ff-error" id="f-message-err">
            {errors.message}
          </p>
        )}
      </div>
      <div className="form-foot">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
          {status !== "sending" && <Arrow className="btn-icon" />}
        </button>
        <p className="demo-note">{f.demoNote}</p>
      </div>
    </form>
  );
}
