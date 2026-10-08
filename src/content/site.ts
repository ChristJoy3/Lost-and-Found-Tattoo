// Single source of truth for every fact on the site. Copy comes from the
// client brief only — do not add prices, reviews, awards or bios here.

export type Img = { src: string; w: number; h: number; alt: string };

export const site = {
  name: "Lost & Found Tattoo Co.",
  tagline: "Custom Tattoos & Piercings",
  established: "August 2007",
  url: "https://www.lostandfoundtattoo.net",
  phone: "(734) 483-0533",
  phoneHref: "tel:+17344830533",
  email: "lostandfoundtattoo@yahoo.com",
  address: {
    street: "1828 E. Michigan Ave.",
    city: "Ypsilanti",
    region: "MI",
    zip: "48198",
  },
  hours: "Open 7 days a week, 1–7pm",
  mapQuery: "1828 E Michigan Ave, Ypsilanti, MI 48198",
  social: {
    facebook: { label: "facebook.com/lostfoundtattoo", href: "https://www.facebook.com/lostfoundtattoo" },
    instagram: { label: "@mrpinhead", href: "https://www.instagram.com/mrpinhead" },
    twitter: { label: "@pinheadink", href: "https://twitter.com/pinheadink" },
  },
} as const;

export const logos = {
  main: { src: "/images/brand/arm-logo-cutout.png", w: 690, h: 689, alt: "Lost & Found Tattoo Co." },
  alt: { src: "/images/brand/rubberized-logo.jpg", w: 630, h: 630, alt: "Lost & Found Tattoo Co. L&F logo" },
  pinhead: { src: "/images/brand/pinhead-logo-cutout.png", w: 685, h: 887, alt: "Tattoos by Pinhead artist mark" },
} satisfies Record<string, Img>;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Artists", href: "#artists" },
  { label: "Piercing", href: "#jay" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#visit" },
] as const;

export const topBar = [
  "Open 7 days a week",
  "1–7pm",
  "Walk-ins welcome",
  "Cash only",
] as const;

export const hero = {
  label: "Ypsilanti, MI • Est. August 2007",
  headline: "Custom Tattoos & Piercings.",
  sub: "Custom work in a clean, safe, positive environment.",
  image: {
    src: "/images/shop/about-1.jpg",
    w: 800,
    h: 450,
    alt: "Lost & Found Tattoo Co. storefront on E. Michigan Ave. in Ypsilanti",
  },
} as const;

export const marquee = "Custom Tattoos & Piercings ✦ Walk-ins Welcome ✦ Since 2007 ✦";

export const trust = [
  { icon: "clock", title: "Open 7 days", text: "1–7pm" },
  { icon: "door", title: "Walk-ins welcome", text: "No appointment needed" },
  { icon: "needle", title: "Custom tattoos & piercings", text: "Made for you" },
  { icon: "shield", title: "Clean, safe, positive", text: "Environment" },
] as const;

export const about = {
  heading: "Lost & Found since 2007.",
  body: "Lost and Found Tattoo Co. opened its doors in August 2007. We pride ourselves on providing custom tattoos and piercings in a clean, safe, positive environment.",
  images: [
    { src: "/images/shop/about-2.jpg", w: 690, h: 690, alt: "Lost & Found storefront: walk-in piercings 7 days a week, 734.483.0533" },
    { src: "/images/shop/hero.jpg", w: 353, h: 203, alt: "Lost & Found Tattoo Co. sign: The Standard of Artistry, (734) 483-0533" },
  ] satisfies Img[],
} as const;

export type ArtistKey = "pinhead" | "hotsauce" | "james" | "jay";

export type Artist = {
  key: ArtistKey;
  id: string;
  name: string;
  nickname?: string;
  tags: string[];
  hours?: string;
  socials?: { label: string; href: string; kind: "instagram" | "twitter" }[];
  mark?: Img;
  photos: Img[];
  portfolioCta?: string;
  policy?: string;
};

export const artists: Artist[] = [
  {
    key: "pinhead",
    id: "pinhead",
    name: "Justin “Pinhead” Garcia",
    nickname: "P!NH3@D",
    tags: ["Award-Winning Tattooer", "Body Piercer", "Custom", "Color", "Cover-Ups"],
    socials: [
      { kind: "instagram", label: "@mrpinhead", href: site.social.instagram.href },
      { kind: "twitter", label: "@pinheadink", href: site.social.twitter.href },
    ],
    mark: logos.pinhead,
    photos: [
      { src: "/images/artists/pinhead-2.jpg", w: 600, h: 800, alt: "Justin “Pinhead” Garcia: color, black and grey and cover-up work" },
    ],
    portfolioCta: "View Pinhead’s Portfolio",
  },
  {
    key: "hotsauce",
    id: "hotsauce",
    name: "Joshua “Hot Sauce” Moland",
    nickname: "HOT SAUCE",
    tags: ["Tattoo Artist", "Painter"],
    photos: [
      { src: "/images/artists/hotsauce-2.jpg", w: 540, h: 960, alt: "Joshua “Hot Sauce” Moland tattooing" },
      { src: "/images/artists/hotsauce-1.jpg", w: 628, h: 960, alt: "Painting by Hot Sauce: ram skull, roses and crow" },
    ],
    portfolioCta: "View Hot Sauce’s Portfolio",
  },
  {
    key: "james",
    id: "james-smith",
    name: "James Smith",
    tags: ["Custom Tattoos"],
    hours: "Thursday–Monday, 1–6pm",
    photos: [
      { src: "/images/artists/james-smith-1.jpg", w: 327, h: 397, alt: "James Smith tattooing at Lost & Found" },
    ],
  },
  {
    key: "jay",
    id: "jay",
    name: "Piercings By Jay",
    tags: ["Body Piercing"],
    hours: "Thursday–Monday, 1–7pm",
    photos: [
      { src: "/images/artists/jay-1.jpg", w: 517, h: 690, alt: "Piercings by Jay: ear, nose, lip and navel piercings. Thursday–Monday 1–7pm" },
    ],
    policy: "All services require proper ID. Anyone under 18 must have a parent or legal guardian present, with paperwork.",
  },
];

export const steps = [
  { n: "01", title: "Walk in or call.", body: "Walk-ins are welcome 7 days a week, 1–7pm. Call (734) 483-0533." },
  { n: "02", title: "Bring proper ID.", body: "All services require proper ID. Under 18? A parent or legal guardian must come with you, with paperwork." },
  { n: "03", title: "Make it yours.", body: "Work with your artist on a custom tattoo, colour piece, or cover-up, or a piercing with Jay." },
  { n: "04", title: "Bring cash.", body: "We’re cash only." },
] as const;

export type Piece = Img & { artist: Exclude<ArtistKey, "jay">; title?: string };

const pinheadPieces: [file: string, w: number, h: number, title?: string][] = [
  ["purp-roses.jpg", 720, 960, "Purple Roses"],
  ["v-sleeve.jpg", 720, 960, "Sleeve"],
  ["joker.jpg", 720, 960],
  ["suger-skull.jpg", 704, 960, "Sugar Skull"],
  ["usa-rose.jpg", 704, 960, "USA Rose"],
  ["b-rad.jpg", 716, 960],
  ["pokemon-sleeve.jpg", 800, 800],
  ["skull-sleeve.jpg", 800, 800, "Skull Sleeve"],
  ["cc-elephant.jpg", 600, 800, "Elephant"],
  ["black-and-gray-rose.jpg", 716, 960, "Black & Grey Rose"],
  ["heart.jpg", 800, 800, "Heart"],
  ["l-b-cover-up.jpg", 800, 800, "Cover-Up"],
  ["simba-tattoo.jpg", 600, 800],
  ["water-color-dog.jpg", 540, 960, "Watercolour Dog"],
  ["heather-rose.jpg", 716, 960, "Rose"],
  ["yin-yang.jpg", 720, 960, "Yin Yang"],
];

const hotsaucePieces: [w: number, h: number][] = [
  [540, 720], [518, 690], [690, 607], [518, 690], [518, 690], [370, 493],
];

export const portfolio: Piece[] = [
  ...pinheadPieces.map(([file, w, h, title], i): Piece => ({
    src: `/images/portfolio/pinhead/${file}`,
    w,
    h,
    artist: "pinhead",
    title,
    alt: title
      ? `${title} tattoo by Pinhead`
      : `Tattoo by Pinhead, ${i + 1} of ${pinheadPieces.length}`,
  })),
  ...hotsaucePieces.map(([w, h], i): Piece => ({
    src: `/images/portfolio/hotsauce/hotsauce-${i + 1}.jpg`,
    w,
    h,
    artist: "hotsauce",
    alt: `Tattoo by Hot Sauce, ${i + 1} of ${hotsaucePieces.length}`,
  })),
];

export const portfolioFilters = [
  { key: "all", label: "All" },
  { key: "pinhead", label: "Pinhead" },
  { key: "hotsauce", label: "Hot Sauce" },
  { key: "james", label: "James Smith" },
] as const;

export type FilterKey = (typeof portfolioFilters)[number]["key"];

export const whyUs = [
  "Custom work, not just flash",
  "Award-winning tattooer",
  "Colour & cover-up specialist",
  "In-house body piercer",
  "Walk-ins welcome 7 days",
  "Clean, safe, positive environment",
  "Open since 2007",
] as const;

export const events = {
  heading: "Friday the 13th.",
  flyer: {
    src: "/images/events/friday-the-13th.jpg",
    w: 749,
    h: 960,
    alt: "Friday the 13th event flyer from Lost & Found Tattoo Co.",
  },
  callout: "Please read the rules!",
  placeholders: ["[Next event date]", "[Event rules, see flyer]", "[Flash designs and pricing]"],
  cta: "Follow on Facebook for event dates",
} as const;

export const faqs = [
  { q: "What are your hours?", a: "Open 7 days a week, 1–7pm. James Smith works Thursday–Monday, 1–6pm. Jay pierces Thursday–Monday." },
  { q: "Do I need an appointment?", a: "No, walk-ins are welcome." },
  { q: "How do I pay?", a: "We’re cash only." },
  { q: "What do I need to bring?", a: "Proper ID is required for all services." },
  { q: "Can minors get pierced?", a: "Anyone under 18 must have a parent or legal guardian present, with paperwork." },
  { q: "Do you do cover-ups?", a: "Yes, Pinhead specializes in cover-ups as well as custom and colour work." },
  { q: "Do you do custom designs?", a: "Yes. Custom tattoos and piercings are what we do." },
] as const;

export const ctaBand = {
  heading: "Walk in. Leave with something that’s yours.",
  sub: "Open 7 days • 1–7pm • Cash only",
} as const;

export const interests = ["Custom Tattoo", "Colour", "Cover-Up", "Piercing", "Event"] as const;
export const artistOptions = ["Any", "Pinhead", "Hot Sauce", "James Smith", "Jay"] as const;
