import { site, topBar } from "@/content/site";

export function TopBar() {
  return (
    <div className="border-b border-gold/25 bg-ink text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-bone-dim">
      <div className="mx-auto flex max-w-[90rem] items-center gap-3 overflow-x-auto whitespace-nowrap px-4 py-2.5 [scrollbar-width:none] sm:justify-center md:px-8">
        {topBar.map((item) => (
          <span key={item} className="flex items-center gap-3">
            {item}
            <span aria-hidden="true" className="text-blood-text">•</span>
          </span>
        ))}
        <a href={site.phoneHref} className="text-bone transition-colors hover:text-blood-text">
          {site.phone}
        </a>
      </div>
    </div>
  );
}
