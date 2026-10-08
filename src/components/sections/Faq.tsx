import { faqs } from "@/content/site";
import { SectionHeading } from "../Frame";
import { PlusIcon } from "../icons";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-gold/25 bg-panel">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-4 py-24 md:px-8 md:py-36 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <SectionHeading eyebrow="Before you come in" id="faq-title">
          FAQ.
        </SectionHeading>

        <div className="faq border-t border-gold/25">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-gold/25">
              <summary className="flex items-center justify-between gap-6 py-6 text-left text-xl font-semibold transition-colors hover:text-blood-text md:text-2xl">
                {f.q}
                <span className="plus grid size-10 shrink-0 place-items-center border border-bone/30 group-open:border-blood-bright group-open:text-blood-text">
                  <PlusIcon width={18} height={18} />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-14 text-lg leading-relaxed text-bone/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
