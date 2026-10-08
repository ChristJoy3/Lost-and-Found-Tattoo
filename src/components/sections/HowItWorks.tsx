import { steps } from "@/content/site";
import { SectionHeading } from "../Frame";
import { NeedleLine } from "../motion/NeedleLine";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="border-t border-gold/25 bg-panel">
      <div className="mx-auto max-w-[90rem] px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Four steps" id="how-title">
          How it works.
        </SectionHeading>

        <div className="relative mt-16 md:mt-24">
          <NeedleLine />
          <ol className="relative grid gap-12 pl-12 lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-14">
            {steps.map((s, i) => (
              <li key={s.n} data-reveal style={{ ["--reveal-delay" as string]: `${i * 0.1}s` }} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-12 top-1 grid size-6 place-items-center border border-blood-bright bg-ink lg:-top-14 lg:left-0"
                >
                  <span className="size-2 bg-blood-bright" />
                </span>
                <span className="block font-display text-6xl leading-none text-gold/90 md:text-7xl">{s.n}</span>
                <h3 className="mt-4 text-3xl md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-bone/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
