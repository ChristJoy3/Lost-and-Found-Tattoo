import { ctaBand, site } from "@/content/site";
import { PhoneIcon } from "../icons";

export function CtaBand() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="grain-local overflow-hidden bg-blood-bright text-ink">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-10 px-4 py-20 md:px-8 md:py-28 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="cta-title" data-reveal className="max-w-4xl text-[clamp(2.75rem,7.5vw,7rem)]">
            {ctaBand.heading}
          </h2>
          <p data-reveal className="mt-6 text-xl font-bold uppercase tracking-[0.2em] md:text-2xl">
            {ctaBand.sub}
          </p>
        </div>
        <a href={site.phoneHref} className="btn btn-black shrink-0 !min-h-14 !px-8 !text-base">
          <PhoneIcon width={20} height={20} /> Call {site.phone}
        </a>
      </div>
    </section>
  );
}
