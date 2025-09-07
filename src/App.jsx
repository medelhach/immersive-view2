// test commit 
import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Camera,
  ScanLine,
  MapPin,
  Share2,
  Gauge,
  PlayCircle,
  Building2,
  Hotel,
  Store,
  Landmark,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Quote,
  Mail,
  Phone,
  Globe2,
  ChevronRight,
  Filter,
  Layers,
  Airplay,
  Youtube,
  MapPinned,
  MessageCircle,
  Clock
} from "lucide-react";

import MatterportEmbed from "./components/MatterportEmbed"; // <-- added

// ===== Utility =====
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-20 ${className}`}>{children}</section>
);

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
    {children}
  </span>
);

// ===== Data =====
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" }
];

const HIGHLIGHTS = [
  { icon: <Airplay className="h-5 w-5" />, title: "Immersive Experience", text: "360° tours that let customers explore freely." },
  { icon: <Camera className="h-5 w-5" />, title: "High-Resolution Imaging", text: "HDR stills & crisp visuals on every device." },
  { icon: <Share2 className="h-5 w-5" />, title: "Easy Sharing", text: "One link to embed, share, and track engagement." },
  { icon: <Gauge className="h-5 w-5" />, title: "Boost Engagement", text: "Increase time-on-page and conversion." }
];

const INDUSTRIES = [
  { key: "real-estate", label: "Real Estate", icon: <Building2 className="h-5 w-5" />, img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop" },
  { key: "hospitality", label: "Hospitality", icon: <Hotel className="h-5 w-5" />, img: "https://images.unsplash.com/photo-1501117716987-c8e3f9a8be3a?q=80&w=1600&auto=format&fit=crop" },
  { key: "retail", label: "Retail", icon: <Store className="h-5 w-5" />, img: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop" },
  { key: "cultural", label: "Cultural Spaces", icon: <Landmark className="h-5 w-5" />, img: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1600&auto=format&fit=crop" },
  { key: "corporate", label: "Corporate Offices", icon: <Briefcase className="h-5 w-5" />, img: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?q=80&w=1600&auto=format&fit=crop" }
];

const SERVICES = [
  {
    key: "tours",
    title: "360° Virtual Tours",
    icon: <PlayCircle className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Interactive hotspots & navigation",
      "Mobile-ready viewer",
      "Branding & lead capture"
    ]
  },
  {
    key: "hdr",
    title: "HDR Photography",
    icon: <Camera className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    bullets: ["Magazine-grade stills", "Color-true processing", "Web & print ready"]
  },
  {
    key: "twins",
    title: "Digital Twins",
    icon: <ScanLine className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop",
    bullets: ["Accurate 3D scans", "Measurements & tags", "Facility documentation"]
  },
  {
    key: "drone",
    title: "Drone Photo & Video",
    icon: <Airplay className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600&auto=format&fit=crop",
    bullets: ["Cinematic aerials", "Licensed operators", "Wide-area coverage"]
  },
  {
    key: "gsv",
    title: "Google Street View Integration",
    icon: <MapPinned className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    bullets: ["Appear on Maps", "Boost discovery", "Easy to maintain"]
  },
  {
    key: "floor",
    title: "Floor Plan Overlays",
    icon: <Layers className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1600&auto=format&fit=crop",
    bullets: ["Interactive maps", "Multi-level support", "Wayfinding"]
  }
];

const TESTIMONIALS = [
  {
    quote: "The virtual tour doubled our inquiries in the first month.",
    author: "Nadia B.",
    role: "Broker, Atlas Realty"
  },
  {
    quote: "Guests book with confidence after exploring our rooms online.",
    author: "Youssef K.",
    role: "GM, Marina Hotel"
  },
  {
    quote: "The digital twin saved hours of site visits for our designers.",
    author: "Sara E.",
    role: "Project Lead, DecoStudio"
  }
];

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Modern Apartment", industry: "real-estate", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop" },
  { id: 2, title: "Boutique Hotel Lobby", industry: "hospitality", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop" },
  { id: 3, title: "Concept Retail Store", industry: "retail", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop" },
  { id: 4, title: "Heritage Museum Hall", industry: "cultural", img: "https://images.unsplash.com/photo-1484557052118-9b50a4ac4d7d?q=80&w=1600&auto=format&fit=crop" },
  { id: 5, title: "Open Plan Office", industry: "corporate", img: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?q=80&w=1600&auto=format&fit=crop" },
  { id: 6, title: "Seaside Restaurant", industry: "hospitality", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop" },
];

const BLOG_POSTS = [
  {
    title: "How Virtual Tours Help Sell Properties Faster",
    excerpt: "Engagement metrics prove that listings with immersive tours convert better—here’s why.",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "The Technology Behind Digital Twins",
    excerpt: "From LiDAR to photogrammetry: a quick primer on the tech that powers accuracy.",
    img: "https://images.unsplash.com/photo-1555252586-c3d5d864fd4a?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Marketing Tips for Businesses Using Virtual Tours",
    excerpt: "Turn your tour into ROI with these simple distribution tactics.",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop"
  }
];

// ===== Components =====
const Nav = () => {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["transparent", "rgba(10,20,40,0.8)"]); // bluish overlay
  const shadow = useTransform(scrollY, [0, 80], ["0 0 0 rgba(0,0,0,0)", "0 10px 30px rgba(0,0,0,0.25)"]);

  return (
    <motion.nav
      style={{ background: bg, boxShadow: shadow }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 text-white">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400" />
          <span className="text-sm font-semibold tracking-wide">ImmersiveView</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-white/80 hover:text-white">
              {n.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">
            Book a Tour
          </a>
        </div>
        <a href="#contact" className="md:hidden text-white" aria-label="Contact">
          <ChevronRight />
        </a>
      </Container>
    </motion.nav>
  );
};

const Hero = () => {
  <Section id="home" className="relative min-h-screen bg-black">
    <MatterportEmbed mode="fill" />
  </Section>


  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // return (
  //   <Section id="home" className="relative min-h-[92vh] overflow-hidden">
  //     <div className="absolute inset-0">
  //       {/* Background video/image */}
  //       <video
  //         className="h-full w-full object-cover"
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //         poster="https://images.unsplash.com/photo-1521783988139-893ce4a69bef?q=80&w=1600&auto=format&fit=crop"
  //       >
  //         <source src="https://cdn.coverr.co/videos/coverr-architect-360-tour-1169/1080p.mp4" type="video/mp4" />
  //       </video>
  //       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
  //     </div>
  //     <Container className="relative z-10 flex min-h-[92vh] flex-col items-start justify-end pb-24">
  //       <motion.div ref={ref} style={{ y }} className="max-w-3xl text-white">
  //         <Pill>
  //           <Globe2 className="h-4 w-4" />
  //           Immersive 3D Virtual Tours for Every Industry
  //         </Pill>
  //         <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
  //           Bring Your Space to Life
  //         </h1>
  //         <p className="mt-4 max-w-2xl text-white/80">
  //           Capture, showcase, and share your space with premium 360° tours, HDR photography, and digital twins—built for real estate, hospitality, retail, cultural venues, and corporate offices.
  //         </p>
  //         <div className="mt-6 flex flex-wrap gap-3">
  //           <a href="#contact" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
  //             Book a Tour
  //           </a>
  //           <a href="#tour-demo" className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20">
  //             Live 360° Demo
  //           </a>
  //         </div>
  //       </motion.div>
  //     </Container>
  //   </Section>
  // );
};

// New: Home page Matterport demo section
const TourDemo = () => (
  <Section id="tour-demo" className="bg-slate-950 py-16">
    <Container>
      <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Live 360° Demo (Powered by Matterport)</h2>
      <MatterportEmbed />
      <p className="text-slate-300 mt-3 text-sm">
        Use your mouse or touch to look around. Click the icons to navigate.
      </p>
    </Container>
  </Section>
);

const Overview = () => (
  <Section id="overview" className="bg-gradient-to-b from-slate-950 to-slate-900 py-16">
    <Container>
      <div className="grid gap-8 text-white md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold">What we do</h2>
          <p className="mt-3 text-white/80">
            We create immersive experiences that help customers explore, understand, and connect with your space—anytime, anywhere.
          </p>
        </div>
        <div className="grid gap-4 md:col-span-3 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <motion.div
              key={h.title}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                  {h.icon}
                </div>
                <div>
                  <p className="font-semibold">{h.title}</p>
                  <p className="text-sm text-white/70">{h.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  </Section>
);

const Industries = () => (
  <Section id="industries" className="bg-white py-20">
    <Container>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Industries Served</h2>
          <p className="mt-2 max-w-2xl text-slate-600">From real estate to cultural venues, we tailor each capture to your goals.</p>
        </div>
        <a href="#contact" className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:inline">Get a Quote</a>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {INDUSTRIES.map((ind) => (
          <motion.div key={ind.key} whileHover={{ y: -6 }} className="group overflow-hidden rounded-2xl border border-slate-200">
            <div className="relative h-40 w-full overflow-hidden">
              <img src={ind.img} alt={ind.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 backdrop-blur">{ind.icon}</span>
                <span className="font-medium">{ind.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  </Section>
);

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const items = PORTFOLIO_ITEMS.filter((i) => (filter === "all" ? true : i.industry === filter));
  return (
    <Section id="portfolio" className="bg-slate-50 py-20">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Portfolio</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Explore featured captures. Click a project to open a full-screen tour.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 inline-flex items-center text-sm text-slate-500"><Filter className="mr-1 h-4 w-4" /> Filter by industry:</span>
            {[
              { k: "all", l: "All" },
              ...INDUSTRIES.map((i) => ({ k: i.key, l: i.label }))
            ].map((b) => (
              <button
                key={b.k}
                onClick={() => setFilter(b.k)}
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  filter === b.k ? "bg-slate-900 text-white" : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                {b.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <motion.a
              key={p.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const url = prompt("Paste your tour URL (e.g., Matterport/Kuula/3DVista):");
                if (url) window.open(url, "_blank");
              }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-white/80">{INDUSTRIES.find(i=>i.key===p.industry)?.label}</p>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Full-screen tour demo */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200">
          <div className="aspect-video w-full bg-slate-200">
            <iframe
              title="Embedded Tour"
              className="h-full w-full"
              src="https://my.matterport.com/show/?m=2F1M7j7RrZt"
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);
  const item = TESTIMONIALS[index];
  return (
    <Section id="testimonials" className="bg-gradient-to-br from-blue-600 to-cyan-500 py-20 text-white">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Quote className="h-10 w-10" />
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-3xl text-xl">
            “{item.quote}”
          </motion.p>
          <p className="mt-4 text-white/90">{item.author} — {item.role}</p>
        </div>
      </Container>
    </Section>
  );
};

const About = () => (
  <Section id="about" className="bg-white py-20">
    <Container>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Our Story</h2>
          <p className="mt-4 text-slate-600">
            We’re on a mission to revolutionize how spaces are presented online. By combining 3D scanning, HDR imaging, and thoughtful post-production, we deliver experiences that feel real, informative, and on-brand.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-medium text-slate-900">Our Technology</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Camera className="h-4 w-4" /> HDR Cameras</li>
                <li className="flex items-center gap-2"><ScanLine className="h-4 w-4" /> 3D Scanners / Photogrammetry</li>
                <li className="flex items-center gap-2"><Airplay className="h-4 w-4" /> Drone Photo & Video</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-medium text-slate-900">Our Approach</p>
              <ol className="mt-3 space-y-2 text-sm text-slate-600">
                <li><span className="font-semibold">1) Consultation</span> — goals, brand, and logistics.</li>
                <li><span className="font-semibold">2) Capture</span> — on-site shoot & QA.</li>
                <li><span className="font-semibold">3) Delivery</span> — links, embeds, and assets.</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <img src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop" alt="Team at work" className="h-full w-full object-cover" />
        </div>
      </div>
    </Container>
  </Section>
);

const Services = () => (
  <Section id="services" className="bg-slate-50 py-20">
    <Container>
      <h2 className="text-3xl font-semibold text-slate-900">Services</h2>
      <p className="mt-2 max-w-2xl text-slate-600">Choose a complete package or mix-and-match the tools you need.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <motion.div key={s.key} whileHover={{ y: -6 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative h-44 w-full overflow-hidden">
              <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 backdrop-blur">{s.icon}</span>
                <span className="font-medium">{s.title}</span>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-2 text-sm text-slate-600">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> {b}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  </Section>
);

const Pricing = () => (
  <Section id="pricing" className="bg-white py-20">
    <Container>
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Pricing</h2>
        <p className="mt-2 text-slate-600">Transparent packages. Custom quotes on request.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[{
          name: "Basic",
          desc: "Up to X panoramas, simple navigation.",
          features: ["Up to X panoramas", "Basic hotspots", "Delivery in 48h"],
          action: "Get a Quote"
        },{
          name: "Standard",
          desc: "Includes floor plan, branding, and music.",
          features: ["Everything in Basic", "Floor plan overlay", "Branding + music"],
          action: "Get a Quote"
        },{
          name: "Premium",
          desc: "Unlimited panoramas, aerial shots, GSV, advanced branding.",
          features: ["Unlimited panoramas", "Drone add-ons", "Google Street View"],
          action: "Get a Quote"
        }].map((p, idx) => (
          <div key={p.name} className={`rounded-2xl border ${idx===1?"border-blue-600 shadow-lg shadow-blue-100":"border-slate-200"} p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">{p.name}</h3>
              {idx===1 && <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Popular</span>}
            </div>
            <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {p.features.map((f)=> (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> {f}</li>
              ))}
            </ul>
            <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">{p.action}</a>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

const Blog = () => (
  <Section id="blog" className="bg-slate-50 py-20">
    <Container>
      <h2 className="text-3xl font-semibold text-slate-900">Insights</h2>
      <p className="mt-2 max-w-2xl text-slate-600">Guides and tips to get the most from immersive media.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p) => (
          <motion.a key={p.title} href="#" whileHover={{ y: -6 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="h-44 w-full overflow-hidden">
              <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-lg font-semibold text-slate-900">{p.title}</p>
              <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-700">Read article <ArrowRight className="h-4 w-4" /></span>
            </div>
          </motion.a>
        ))}
      </div>
    </Container>
  </Section>
);

const Contact = () => {
  return (
    <section id="contact" className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Ready to capture your space?</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get in touch with us today and let's discuss how we can bring your space to life with immersive 360° tours
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {/* Phone Contact */}
          <div className="group text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 mb-4 group-hover:bg-blue-500/30 transition-colors">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-white/80 mb-4">Ready to discuss your project?</p>
            <a 
              href="tel:+212612345678" 
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors block"
            >
              +212 6 12 34 56 78
            </a>
            <p className="text-sm text-white/60 mt-2">Mon-Fri, 9AM-6PM (GMT+1)</p>
          </div>

          {/* Email Contact */}
          <div className="group text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20 text-green-400 mb-4 group-hover:bg-green-500/30 transition-colors">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-white/80 mb-4">Send us your project details</p>
            <a 
              href="mailto:hello@immersiveview.co" 
              className="text-xl font-bold text-white hover:text-green-400 transition-colors block"
            >
              hello@immersiveview.co
            </a>
            <p className="text-sm text-white/60 mt-2">We respond within 24 hours</p>
          </div>

          {/* WhatsApp Contact */}
          <div className="group text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-4 group-hover:bg-emerald-500/30 transition-colors">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-white/80 mb-4">Quick chat about your needs</p>
            <a 
              href="https://wa.me/212612345678?text=Hi!%20I%27m%20interested%20in%20your%20virtual%20tour%20services" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-white hover:text-emerald-400 transition-colors block"
            >
              +212 6 12 34 56 78
            </a>
            <p className="text-sm text-white/60 mt-2">Available during business hours</p>
          </div>
        </div>

        {/* Location & Business Hours */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-5 w-5" />
              Our Location
            </h3>
            <p className="text-white/80 mb-2">Casablanca, Morocco</p>
            <p className="text-sm text-white/60">
              We serve clients across Morocco and internationally via remote consultation
            </p>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center md:justify-end gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </h3>
            <div className="text-white/80 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-sm text-white/60">GMT+1 (Casablanca Time)</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Available for new projects
          </div>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to showcase your space? Contact us using any of the methods above and let's create something amazing together.
          </p>
          
          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="tel:+212612345678"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a 
              href="mailto:hello@immersiveview.co?subject=Virtual%20Tour%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Send Email
            </a>
            <a 
              href="https://wa.me/212612345678?text=Hi!%20I%27m%20interested%20in%20your%20virtual%20tour%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-emerald-100 font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Office Location"
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13380.170969925507!2d-7.628!3d33.573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb90a5c9f1d0a3f%3A0x66c9c1c5a51e9a7!2sCasablanca!5e0!3m2!1sen!2sma!4v1680000000000"
            allowFullScreen
          />
          <div className="bg-white/5 p-4 backdrop-blur">
            <p className="text-center text-white/80">
              <MapPin className="inline h-4 w-4 mr-1" />
              Based in Casablanca, serving clients worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 py-10 text-white/70">
    <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400" />
        <span className="text-sm font-semibold tracking-wide text-white">ImmersiveView</span>
      </div>
      <p className="text-xs">© {new Date().getFullYear()} ImmersiveView. All rights reserved.</p>
      <div className="flex items-center gap-3">
        <a href="#home" className="text-xs hover:text-white">Back to top</a>
      </div>
    </Container>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-slate-950 text-slate-100">
      {/* Tailwind base styles injected by host environment */}
      <Nav />
      <main className="[--pad:4rem]">
        <Hero />
        <TourDemo /> {/* <-- new Matterport section on Home */}
        <Overview />
        <Industries />
        <Portfolio />
        <Testimonials />
        <About />
        <Services />
        <Pricing />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
