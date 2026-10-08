import type { Metadata, Viewport } from "next";
import { Anton, Inter, Rye } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const rye = Rye({ variable: "--font-rye", weight: "400", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const description =
  "Custom tattoos and body piercing in Ypsilanti, MI since 2007. Color, cover-ups and custom work in a clean, safe, positive environment. Walk-ins welcome 7 days a week, 1–7pm. Cash only.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Lost & Found Tattoo Co. | Custom Tattoos & Piercings in Ypsilanti, MI",
  description,
  keywords: [
    "tattoo shop Ypsilanti MI",
    "custom tattoos Ypsilanti",
    "body piercing Ypsilanti",
    "cover-up tattoo Michigan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "Lost & Found Tattoo Co. | Custom Tattoos & Piercings",
    description,
    locale: "en_US",
    images: [{ url: "/images/shop/about-1.jpg", width: 800, height: 450, alt: "Lost & Found Tattoo Co. storefront in Ypsilanti, MI" }],
  },
  twitter: { card: "summary_large_image", site: "@pinheadink" },
  icons: { icon: "/images/brand/arm-logo-cutout.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  telephone: "+1-734-483-0533",
  email: site.email,
  foundingDate: "2007-08",
  image: `${site.url}/images/shop/about-1.jpg`,
  logo: `${site.url}/images/brand/arm-logo-cutout.png`,
  paymentAccepted: "Cash",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "13:00",
      closes: "19:00",
    },
  ],
  sameAs: [site.social.facebook.href, site.social.instagram.href, site.social.twitter.href],
};

// Runs before paint so CSS can hide reveal targets without a flash.
const bootScript = `(function(d){var c=d.documentElement.classList;c.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)c.add('motion');})(document)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${rye.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="grain min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
