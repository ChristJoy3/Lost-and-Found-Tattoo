import Image from "next/image";
import { artists, type Artist } from "@/content/site";
import { Frame, SectionHeading } from "../Frame";
import { InstagramIcon, TwitterIcon } from "../icons";
import { Scramble } from "../motion/Scramble";
import { ArtistsStack } from "../motion/ArtistsStack";
import { FilterButton } from "../FilterButton";

export function Artists() {
  return (
    <section id="artists" aria-labelledby="artists-title" className="bg-ink">
      <div className="mx-auto max-w-[90rem] px-4 pb-12 pt-24 md:px-8 md:pt-36">
        <SectionHeading eyebrow="The Artists" id="artists-title">
          The artists.
        </SectionHeading>
      </div>
      <ArtistsStack>
        {artists.map((artist, i) => (
          <Panel key={artist.id} artist={artist} index={i} total={artists.length} />
        ))}
      </ArtistsStack>
    </section>
  );
}

function Panel({ artist, index, total }: { artist: Artist; index: number; total: number }) {
  const titleId = `${artist.id}-name`;
  return (
    <article
      id={artist.id}
      aria-labelledby={titleId}
      data-panel
      className={`stack-panel relative border-t border-gold/25 ${index % 2 ? "bg-panel" : "bg-ink"}`}
    >
      <div className="panel-inner relative mx-auto grid h-full max-w-[90rem] items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-6 select-none font-display text-[clamp(6rem,18vw,16rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(184,154,94,.28)] md:right-8"
        >
          0{index + 1}
        </span>

        <div className="relative">
          <p className="eyebrow mb-4" data-reveal>
            Artist 0{index + 1} / 0{total}
          </p>
          {artist.nickname && (
            <Scramble
              as="p"
              text={artist.nickname}
              label={artist.key === "pinhead" ? "Pinhead" : "Hot Sauce"}
              className="mb-2 font-flash text-[clamp(2.4rem,6vw,5rem)] leading-none text-blood-bright"
            />
          )}
          <h3 id={titleId} className="text-[clamp(2.5rem,5.5vw,5rem)]">
            {artist.name}
          </h3>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Specialties">
            {artist.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          {artist.hours && (
            <p className="mt-7 text-bone/85">
              <span className="eyebrow mr-3">Hours</span>
              {artist.hours}
            </p>
          )}

          {artist.policy && (
            <p className="mt-6 max-w-lg border-l-2 border-blood-bright bg-blood/15 py-4 pl-5 pr-4 text-[0.95rem] leading-relaxed text-bone">
              <strong className="mb-1 block font-display text-lg uppercase tracking-wide text-blood-text">ID required</strong>
              {artist.policy}
            </p>
          )}

          {artist.socials && (
            <ul className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
              {artist.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-bone/85 transition-colors hover:text-blood-text">
                    {s.kind === "instagram" ? <InstagramIcon /> : <TwitterIcon width={16} height={16} />}
                    <span>
                      {s.label}
                      <span className="sr-only"> on {s.kind === "instagram" ? "Instagram" : "Twitter"} (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {artist.portfolioCta && artist.key !== "jay" && (
            <FilterButton filter={artist.key} className="btn btn-red mt-9">
              {artist.portfolioCta}
            </FilterButton>
          )}
        </div>

        <div className="relative">
          <div className="snap-row -mx-4 px-4 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0" style={{ gridTemplateColumns: `repeat(${artist.photos.length}, minmax(0, 1fr))` }}>
            {artist.photos.map((p) => (
              <Frame key={p.src} className="w-[78%] sm:w-[46%] lg:w-auto">
                <div className="relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-[min(62svh,40rem)]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 28vw, 78vw" className="object-cover object-top" />
                </div>
              </Frame>
            ))}
          </div>
          {artist.mark && (
            <Image
              src={artist.mark.src}
              width={artist.mark.w}
              height={artist.mark.h}
              alt={artist.mark.alt}
              sizes="10rem"
              className="pointer-events-none absolute -bottom-8 -left-4 hidden w-32 drop-shadow-[0_12px_30px_rgba(0,0,0,.7)] sm:block lg:-left-14 lg:w-40"
            />
          )}
        </div>
      </div>
    </article>
  );
}
