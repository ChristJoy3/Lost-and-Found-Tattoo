import Image from "next/image";
import { logos, nav, site } from "@/content/site";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";
import { Year } from "../Year";

export function Footer() {
  const { street, city, region, zip } = site.address;
  const socials = [
    { ...site.social.facebook, Icon: FacebookIcon, name: "Facebook" },
    { ...site.social.instagram, Icon: InstagramIcon, name: "Instagram" },
    { ...site.social.twitter, Icon: TwitterIcon, name: "Twitter" },
  ];

  return (
    <footer id="footer" className="border-t border-gold/25 bg-ink pb-28 md:pb-0">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-20 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image src={logos.main.src} width={120} height={120} alt={logos.main.alt} className="size-28" />
          <p className="mt-6 font-display text-2xl uppercase">{site.tagline}</p>
          <p className="eyebrow mt-2">Est. 2007</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow !font-sans !text-xs !leading-normal">Quick links</h2>
          <ul className="mt-5 grid gap-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-bone/85 hover:text-blood-text">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow !font-sans !text-xs !leading-normal">Hours</h2>
          <p className="mt-5 leading-relaxed text-bone/85">
            Open 7 days a week
            <br />
            1–7pm
            <br />
            Walk-ins welcome
            <br />
            Cash only
          </p>
        </div>

        <div>
          <h2 className="eyebrow !font-sans !text-xs !leading-normal">Visit</h2>
          <address className="mt-5 grid gap-2 not-italic leading-relaxed text-bone/85">
            <span>
              {street}
              <br />
              {city}, {region} {zip}
            </span>
            <a href={site.phoneHref} className="hover:text-blood-text">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="break-all hover:text-blood-text">{site.email}</a>
          </address>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ href, Icon, name }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (opens in a new tab)`}
                  className="grid size-11 place-items-center border border-bone/25 text-bone/85 transition-colors hover:border-blood-bright hover:text-blood-text"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20">
        <p className="mx-auto max-w-[90rem] px-4 py-6 text-xs uppercase tracking-[0.2em] text-bone-dim md:px-8">
          © {site.name} <Year />
        </p>
      </div>
    </footer>
  );
}
