"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { copy, neoAssets, photoCredits, shopLinks, type Lang } from "../content";
import { setLang, useLang } from "../lang";
import { LogoMark, ShopeeIcon, TikTokIcon, Wordmark } from "../marks";
import s from "./porcelain.module.css";

/* V2-only interface words. All farm facts come from the shared content file. */
const ui: Record<
  Lang,
  {
    nav: { standards: string; grades: string; route: string; neo: string; shop: string };
    discover: string;
    plateCaption: string;
    standardsTitle: string;
    standardsLead: string;
    sample: string;
    marketsLabel: string;
    judged: string;
    skip: string;
    sections: string;
    readIn: string;
    shopVisit: string;
  }
> = {
  en: {
    nav: { standards: "Standards", grades: "Grades", route: "Route", neo: "NEO-HELIOS", shop: "Shop" },
    discover: "Discover the farm",
    plateCaption: "Oranda, from a painted plate, for reference",
    standardsTitle: "Seven standards",
    standardsLead: "What stands behind every batch that leaves the farm.",
    sample: "Sample photo",
    marketsLabel: "Market",
    judged: "judged",
    skip: "Skip to content",
    sections: "Sections",
    readIn: "อ่านเป็นภาษาไทย",
    shopVisit: "Visit",
  },
  th: {
    nav: { standards: "จุดเด่น", grades: "เกรดปลา", route: "เส้นทาง", neo: "NEO-HELIOS", shop: "ช่องทางซื้อ" },
    discover: "รู้จักฟาร์ม",
    plateCaption: "ออรันดา จากภาพวาดโบราณ ภาพอ้างอิง",
    standardsTitle: "จุดเด่นของเรา",
    standardsLead: "สิ่งที่อยู่เบื้องหลังปลาทุกชุดที่ออกจากฟาร์ม",
    sample: "ภาพตัวอย่าง",
    marketsLabel: "ตลาด",
    judged: "พิจารณา",
    skip: "ข้ามไปยังเนื้อหา",
    sections: "หมวด",
    readIn: "Read in English",
    shopVisit: "ไปที่",
  },
};

type Photo = { src: string; w: number; h: number; alt: string };

const photos = {
  pond: { src: "/samples/pond-red-oranda.webp", w: 1200, h: 900, alt: "Red and white oranda goldfish swimming among pond leaves" },
  ranchu: { src: "/samples/ranchu-selection.webp", w: 1100, h: 733, alt: "Orange ranchu goldfish photographed against a blue background" },
  lionhead: { src: "/samples/lionhead.webp", w: 912, h: 684, alt: "Red, white and gold lionhead goldfish over gravel" },
  whiteface: { src: "/samples/oranda-whiteface.webp", w: 912, h: 684, alt: "Yellow oranda goldfish with a white head" },
  bagged: { src: "/samples/bagged-ranchu.webp", w: 1100, h: 733, alt: "Three ranchu goldfish in a clear water bag held up for inspection" },
  plateOranda: { src: "/samples/plate-oranda-clean.webp", w: 1280, h: 712, alt: "Painted red and white oranda goldfish" },
} satisfies Record<string, Photo>;

function Matted({ photo, caption, sizes, className = "" }: { photo: Photo; caption: string; sizes: string; className?: string }) {
  return (
    <figure className={`${s.matted} ${className}`}>
      <div className={s.mat}>
        <Image src={photo.src} width={photo.w} height={photo.h} alt={photo.alt} sizes={sizes} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function NeoName({ large = false }: { large?: boolean }) {
  if (neoAssets.logo) {
    return (
      <span className={`${s.neoName} ${large ? s.neoNameLarge : ""}`}>
        <Image src={neoAssets.logo} alt="NEO-HELIOS" width={240} height={80} />
      </span>
    );
  }
  return <span className={`${s.neoName} ${large ? s.neoNameLarge : ""}`}>NEO-HELIOS</span>;
}

function Arrow({ dir = "right" }: { dir?: "right" | "down" | "out" }) {
  const d = dir === "out" ? "M7 4h9v9M16 4 5 15" : "M3 10h13M11 4.5 16.5 10 11 15.5";
  return (
    <svg className={s.arrow} viewBox="0 0 20 20" aria-hidden="true" style={dir === "down" ? { rotate: "90deg" } : undefined}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Porcelain() {
  const lang = useLang();
  const t = copy[lang];
  const u = ui[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={s.root} data-lang={lang}>
      <a className={s.skip} href="#standards">
        {u.skip}
      </a>

      <header className={s.bar} data-scrolled={scrolled ? "" : undefined}>
        <a className={s.brand} href="#top" aria-label="Nana Goldfish Farm">
          <LogoMark className={s.brandMark} />
          <Wordmark className={s.brandWord} />
        </a>
        <nav className={s.nav} aria-label={u.sections}>
          <a href="#standards">{u.nav.standards}</a>
          <a href="#grades">{u.nav.grades}</a>
          <a href="#neo-helios">{u.nav.neo}</a>
          <a href="#shop">{u.nav.shop}</a>
        </nav>
        <div className={s.barEnd}>
          <button
            type="button"
            className={s.lang}
            onClick={() => setLang(lang === "en" ? "th" : "en")}
            aria-label={u.readIn}
          >
            <span data-on={lang === "en" ? "" : undefined}>EN</span>
            <span data-on={lang === "th" ? "" : undefined}>TH</span>
          </button>
          <a className={s.barCta} href="#enquire">
            {t.enquire}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ── First viewport: one painted fish in a porcelain plate ── */}
        <section className={s.hero}>
          <div className={s.heroText}>
            <h1 className={s.title}>Nana Goldfish Farm</h1>
            <p className={s.tagline} lang="en">
              {t.tagline}
            </p>
            <p className={s.intro}>{t.intro}</p>
            <div className={s.actions}>
              <a className={s.primary} href="#enquire">
                {t.enquire}
                <Arrow />
              </a>
              <a className={s.quiet} href="#standards">
                {u.discover}
                <Arrow dir="down" />
              </a>
            </div>
            <a className={s.credential} href="#neo-helios">
              <NeoName />
              <span>{t.credential}</span>
            </a>
          </div>

          <figure className={s.plateWrap}>
            <div className={s.plate}>
              <div className={s.fish}>
                <Image
                  src={photos.plateOranda.src}
                  width={photos.plateOranda.w}
                  height={photos.plateOranda.h}
                  alt={photos.plateOranda.alt}
                  sizes="(max-width: 900px) 80vw, 40vw"
                  priority
                />
              </div>
              <svg className={s.rim} viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="98.2" pathLength={1} className={s.rimThin} />
                <circle cx="100" cy="100" r="95" pathLength={1} className={s.rimThick} />
                <circle cx="100" cy="100" r="80" pathLength={1} className={s.rimWell} />
              </svg>
            </div>
            <figcaption>{u.plateCaption}</figcaption>
          </figure>
        </section>

        {/* ── Seven standards ── */}
        <section id="standards" className={s.section}>
          <div className={s.split}>
            <div className={s.splitAside}>
              <h2 className={s.h2}>{u.standardsTitle}</h2>
              <p className={s.lead}>{u.standardsLead}</p>
              <Matted photo={photos.pond} caption={u.sample} sizes="(max-width: 900px) 90vw, 30vw" className={s.asidePhoto} />
            </div>
            <ol className={s.standards}>
              {t.entries.map((e, i) => (
                <li key={i}>
                  <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={s.h3}>{e.title}</h3>
                    <p>{e.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Grades: an edition of equal frames, then the judging table ── */}
        <section id="grades" className={`${s.section} ${s.glaze}`}>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 className={s.h2}>{t.gradesTitle}</h2>
              <p className={s.lead}>{t.gradesBody}</p>
            </div>
            <div className={s.edition}>
              <Matted photo={photos.lionhead} caption={`${u.sample} · Lionhead`} sizes="(max-width: 700px) 90vw, 28vw" />
              <Matted photo={photos.whiteface} caption={`${u.sample} · Oranda`} sizes="(max-width: 700px) 90vw, 28vw" />
              <Matted photo={photos.ranchu} caption={`${u.sample} · Ranchu`} sizes="(max-width: 700px) 90vw, 28vw" />
            </div>
            <div className={s.tableWrap} tabIndex={0} role="region" aria-label={t.gradesTitle}>
              <table className={s.table} aria-describedby="v2-grade-note">
                <thead>
                  <tr>
                    <th scope="col">{u.marketsLabel}</th>
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
                          <span className={s.dot} aria-hidden="true" />
                          <span className="sr-only">{u.judged}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={s.note} id="v2-grade-note">
              {t.gradesCaption}
            </p>
          </div>
        </section>

        {/* ── Route ── */}
        <section id="route" className={s.section}>
          <div className={s.inner}>
            <div className={s.routeHead}>
              <div className={s.head}>
                <h2 className={s.h2}>{t.routeTitle}</h2>
                <p className={s.lead}>{t.routeLead}</p>
              </div>
              <Matted photo={photos.bagged} caption={u.sample} sizes="(max-width: 900px) 90vw, 30vw" className={s.routePhoto} />
            </div>
            <ol className={s.route}>
              {t.stations.map((st, i) => (
                <li key={i}>
                  <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={s.h4}>{st.title}</h3>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── NEO-HELIOS ── */}
        <section id="neo-helios" className={`${s.section} ${s.neoSection}`}>
          <div className={s.inner}>
            <div className={s.neoTop}>
              <NeoName large />
              <h2 className={`${s.h2} ${s.neoTitle}`}>{t.neoTitle}</h2>
              <p className={s.lead}>{t.neoLead}</p>
            </div>
            <ul className={s.neoLines}>
              {t.neoLines.map((l) => (
                <li key={l.title}>
                  <h3 className={s.h4}>{l.title}</h3>
                  <p>{l.body}</p>
                </li>
              ))}
            </ul>
            <p className={s.note}>{t.neoLinesNote}</p>
            <div className={s.appointment}>
              <dl className={s.record}>
                {t.neoRecord.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              {neoAssets.certificate ? (
                <figure className={s.cert}>
                  <Image src={neoAssets.certificate} alt={t.neoRecordTitle} width={900} height={1270} sizes="280px" />
                </figure>
              ) : (
                <p className={s.certSlot}>{t.neoCertSlot}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className={s.mission}>
          <div className={s.missionRing} aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="98" />
              <circle cx="100" cy="100" r="94.5" />
            </svg>
            <LogoMark className={s.missionMark} />
          </div>
          <h2 className={s.missionText} lang="en">
            <span className={s.missionLabel}>{t.missionTitle}:</span> {t.mission}
          </h2>
          <p className={s.missionGoal}>{t.goal}</p>
        </section>

        {/* ── Shop online ── */}
        <section id="shop" className={`${s.section} ${s.glaze}`}>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 className={s.h2}>{t.shopTitle}</h2>
              <p className={s.lead}>{t.shopLead}</p>
            </div>
            <ul className={s.shops}>
              {shopLinks.map((shop) => (
                <li key={shop.id}>
                  <a className={s.shop} href={shop.href} target="_blank" rel="noopener noreferrer">
                    <span className={s.shopIcon} aria-hidden="true">
                      {shop.id === "tiktok" ? <TikTokIcon /> : <ShopeeIcon />}
                    </span>
                    <span className={s.shopName}>
                      <span className={s.shopPlatform}>{shop.name}</span>
                      <span className={s.shopStore}>Nana Goldfish Farm</span>
                    </span>
                    <span className={s.shopGo}>
                      {u.shopVisit} {shop.name}
                      <Arrow dir="out" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {shopLinks.some((l) => !l.final) && <p className={s.note}>{t.shopNote}</p>}
          </div>
        </section>

        {/* ── Enquire ── */}
        <section id="enquire" className={s.section}>
          <div className={s.split}>
            <div className={s.splitAside}>
              <h2 className={s.h2}>{t.enquireTitle}</h2>
              <p className={s.lead}>{t.enquireLead}</p>
              <div className={s.channels}>
                <p>{t.channelsTitle}</p>
                <p className={s.note}>{t.channelsTbc}</p>
              </div>
            </div>
            <EnquiryForm lang={lang} />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerBrand}>
            <LogoMark className={s.footerMark} title="Nana Goldfish Farm logo" />
            <Wordmark className={s.footerWord} />
          </div>
          <div className={s.footerFacts}>
            <p>Professional Goldfish Farm from Thailand</p>
            <p>{lang === "en" ? "Official Distributor of NEO-HELIOS in Thailand" : t.neoTitle}</p>
            <ul className={s.footerShops}>
              {shopLinks.map((shop) => (
                <li key={shop.id}>
                  <a href={shop.href} target="_blank" rel="noopener noreferrer">
                    {shop.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.credits}>
            <p>{t.credits}</p>
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
const empty: Fields = { name: "", company: "", country: "", type: "", message: "" };

function EnquiryForm({ lang }: { lang: Lang }) {
  const f = copy[lang].form;
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof Fields, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!values.name.trim()) e.name = f.errors.name;
    if (!values.company.trim()) e.company = f.errors.company;
    if (!values.country.trim()) e.country = f.errors.country;
    if (values.message.trim().length < 10) e.message = f.errors.message;
    setErrors(e);
    const bad = (Object.keys(e) as (keyof Errors)[]).find((k) => e[k]);
    if (bad) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 700);
  };

  if (status === "done") {
    return (
      <div className={s.done} role="status">
        <LogoMark className={s.doneMark} />
        <h3 className={s.h3}>{f.received}</h3>
        <p>{f.receivedBody}</p>
        <button
          type="button"
          className={s.quiet}
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
        >
          {f.again}
        </button>
      </div>
    );
  }

  const field = (key: "name" | "company" | "country", label: string, autoComplete: string) => (
    <div className={s.field}>
      <label htmlFor={`v2-${key}`}>{label}</label>
      <input
        id={`v2-${key}`}
        name={key}
        autoComplete={autoComplete}
        value={values[key]}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `v2-${key}-err` : undefined}
      />
      {errors[key] && (
        <p className={s.error} id={`v2-${key}-err`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.formRow}>
        {field("name", f.name, "name")}
        {field("company", f.company, "organization")}
      </div>
      {field("country", f.country, "country-name")}
      <fieldset className={s.field}>
        <legend>{f.type}</legend>
        <div className={s.types}>
          {f.types.map((type) => (
            <label key={type} className={s.type}>
              <input type="radio" name="type" value={type} checked={values.type === type} onChange={() => set("type", type)} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={s.field}>
        <label htmlFor="v2-message">{f.message}</label>
        <textarea
          id="v2-message"
          name="message"
          rows={4}
          placeholder={f.messageHint}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "v2-message-err" : undefined}
        />
        {errors.message && (
          <p className={s.error} id="v2-message-err">
            {errors.message}
          </p>
        )}
      </div>
      <div className={s.formFoot}>
        <button className={s.primary} type="submit" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
          {status !== "sending" && <Arrow />}
        </button>
        <p className={s.note}>{f.demoNote}</p>
      </div>
    </form>
  );
}
