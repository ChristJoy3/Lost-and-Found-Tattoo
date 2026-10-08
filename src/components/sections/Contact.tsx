import Image from "next/image";
import { logos, site } from "@/content/site";
import { SectionHeading } from "../Frame";
import { CashIcon, ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, TwitterIcon } from "../icons";
import { ContactForm } from "../ContactForm";

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export function Contact() {
  const { street, city, region, zip } = site.address;
  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-gold/25 bg-ink">
      <div className="mx-auto max-w-[90rem] px-4 py-24 md:px-8 md:py-36">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Ypsilanti, MI" id="visit-title">
            Contact &amp; visit.
          </SectionHeading>
          <Image
            src={logos.alt.src}
            width={logos.alt.w}
            height={logos.alt.h}
            alt={logos.alt.alt}
            sizes="10rem"
            className="hidden size-36 mix-blend-lighten md:block lg:size-44"
          />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <address className="not-italic">
              <p className="font-display text-3xl uppercase md:text-4xl">{site.name}</p>
              <ul className="mt-8 grid gap-5 text-lg">
                <li className="flex gap-4">
                  <PinIcon className="mt-1 shrink-0 text-blood-text" />
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-blood-text">
                    {street}
                    <br />
                    {city}, {region} {zip}
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </li>
                <li className="flex gap-4">
                  <PhoneIcon className="mt-1 shrink-0 text-blood-text" />
                  <a href={site.phoneHref} className="hover:text-blood-text">{site.phone}</a>
                </li>
                <li className="flex gap-4">
                  <MailIcon className="mt-1 shrink-0 text-blood-text" />
                  <a href={`mailto:${site.email}`} className="break-all hover:text-blood-text">{site.email}</a>
                </li>
                <li className="flex gap-4">
                  <ClockIcon className="mt-1 shrink-0 text-blood-text" />
                  <span>{site.hours} • Walk-ins welcome</span>
                </li>
                <li className="flex gap-4">
                  <CashIcon className="mt-1 shrink-0 text-blood-text" />
                  <span>Cash only</span>
                </li>
              </ul>
            </address>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {[
                { ...site.social.facebook, Icon: FacebookIcon, name: "Facebook" },
                { ...site.social.instagram, Icon: InstagramIcon, name: "Instagram" },
                { ...site.social.twitter, Icon: TwitterIcon, name: "Twitter" },
              ].map(({ href, label, Icon, name }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-bone/85 hover:text-blood-text">
                    <Icon />
                    {label}
                    <span className="sr-only"> on {name} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden border border-gold/30 bg-panel">
              <iframe
                title="Map: Lost & Found Tattoo Co., 1828 E. Michigan Ave., Ypsilanti, MI"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-dark absolute inset-0 size-full border-0"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
