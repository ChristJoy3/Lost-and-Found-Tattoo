import Image from "next/image";
import { events, site } from "@/content/site";
import { Frame, SectionHeading } from "../Frame";
import { FacebookIcon } from "../icons";

export function Events() {
  return (
    <section id="events" aria-labelledby="events-title" className="relative overflow-hidden border-t border-gold/25 bg-ink">
      <div className="mx-auto grid max-w-[90rem] items-center gap-16 px-4 py-24 md:px-8 md:py-36 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <SectionHeading eyebrow="Events" id="events-title">
            {events.heading}
          </SectionHeading>

          <p data-reveal className="mt-10 inline-block -rotate-2 bg-blood px-5 py-3 font-display text-3xl uppercase tracking-wide text-bone md:text-4xl">
            {events.callout}
          </p>

          <ul data-reveal className="mt-10 grid gap-3" aria-label="Event details (to be announced)">
            {events.placeholders.map((p) => (
              <li key={p} className="border border-dashed border-gold/50 px-5 py-4 text-bone-dim">
                <span className="mr-3 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-gold">TBA</span>
                {p.replace(/[[\]]/g, "")}
              </li>
            ))}
          </ul>

          <a
            href={site.social.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-10"
          >
            <FacebookIcon />
            {events.cta}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div data-reveal className="mx-auto w-full max-w-md lg:max-w-lg">
          <Frame className="rotate-[1.5deg]">
            <Image
              src={events.flyer.src}
              width={events.flyer.w}
              height={events.flyer.h}
              alt={events.flyer.alt}
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="h-auto w-full"
            />
          </Frame>
        </div>
      </div>
    </section>
  );
}
