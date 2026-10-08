import { whyUs } from "@/content/site";
import { SectionHeading } from "../Frame";
import { CheckIcon } from "../icons";

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="border-t border-gold/25 bg-panel">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-4 py-24 md:px-8 md:py-36 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <SectionHeading eyebrow="The difference" id="why-title">
          Why Lost &amp; Found.
        </SectionHeading>

        <table data-reveal className="w-full border-collapse text-left">
          <caption className="sr-only">What you get at Lost &amp; Found Tattoo Co.</caption>
          <thead>
            <tr className="border-b-2 border-blood-bright">
              <th scope="col" className="pb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                What you get
              </th>
              <th scope="col" className="w-32 pb-4 text-center font-display text-xl uppercase md:w-44 md:text-2xl">
                Lost &amp; Found
              </th>
            </tr>
          </thead>
          <tbody>
            {whyUs.map((row) => (
              <tr key={row} className="group border-b border-gold/20 transition-colors hover:bg-ink/60">
                <th scope="row" className="py-5 pr-4 text-lg font-medium md:text-xl">
                  {row}
                </th>
                <td className="py-5 text-center">
                  <span className="inline-grid size-9 place-items-center bg-blood text-bone transition-transform group-hover:scale-110">
                    <CheckIcon width={18} height={18} />
                  </span>
                  <span className="sr-only">Yes</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
