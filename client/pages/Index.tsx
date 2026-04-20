import { useState } from "react";
import {
  ArrowRight,
  Check,
  Users,
  Target,
  TrendingUp,
  MessageSquare,
  Zap,
  Award,
  MapPin,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  BarChart2,
  Layers,
  Gift,
  Star,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Design tokens ────────────────────────────────────────────────────────── */
const ELECTRIC = "#6C63FF";   // electric violet – primary accent
const TEAL     = "#00C9A7";   // vivid teal – secondary accent
const DARK     = "#0F0F1A";   // near-black for footer
const GRAY     = "#64748B";

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const services = [
  { icon: Target,       title: "Social Media Strategy",         description: "Bespoke growth roadmaps built around your brand's unique objectives." },
  { icon: Users,        title: "Influencer Discovery",          description: "AI-assisted matching with 700+ vetted creators across every niche." },
  { icon: Zap,          title: "Campaign Execution",            description: "End-to-end management — brief to brief, post to post, metric to metric." },
  { icon: Heart,        title: "Brand–Creator Collaboration",   description: "Authentic partnerships that turn followers into loyal customers." },
  { icon: BarChart2,    title: "Analytics & Reporting",         description: "Real-time dashboards with actionable insights, not vanity numbers." },
  { icon: MessageSquare,title: "Content & Community Management",description: "Consistent brand voice, responsive engagement, growing communities." },
];

const niches = [
  { name: "Fashion & Lifestyle",       icon: "👗" },
  { name: "Beauty & Skincare",         icon: "💄" },
  { name: "Food & Beverages",          icon: "🍽️" },
  { name: "Fitness & Wellness",        icon: "💪" },
  { name: "Tech & Gadgets",            icon: "⚡" },
  { name: "Education & Productivity",  icon: "📚" },
  { name: "Local Businesses & Cafés",  icon: "🏪" },
  { name: "Travel & Experiences",      icon: "✈️" },
];

const platforms = [
  { name: "Instagram", description: "Reels, Stories, Posts & Collabs", icon: Instagram },
  { name: "YouTube",   description: "Reviews, Vlogs & Shorts",          icon: Youtube  },
  { name: "Facebook",  description: "Communities, Lives & Ads",         icon: Facebook },
];

const steps = [
  { number: "01", title: "Define Your Goals",        description: "Brand brief, KPIs, target audience, and budget — all in one onboarding call." },
  { number: "02", title: "Strategy & Creator Plan",  description: "Curated shortlist, campaign calendar, content pillars, and projected outcomes." },
  { number: "03", title: "Live Execution",            description: "We co-ordinate briefings, approvals, scheduling, and go-live across all channels." },
  { number: "04", title: "Report & Scale",            description: "In-depth performance report with optimisation recommendations for the next cycle." },
];

const testimonials = [
  { name: "Ananya S.",   role: "D2C Fashion Brand",   text: "Pixelpulse tripled our Instagram reach in 60 days. The creator curation was exceptional — every single post felt on-brand." },
  { name: "Vikram R.",   role: "Tech Startup Founder", text: "Finally a digital agency that speaks our language. Data-first, zero fluff, real results from week one." },
  { name: "Meera P.",    role: "Skincare Entrepreneur",text: "Our engagement rate jumped 280% and product sell-through improved dramatically. Pixelpulse is the real deal." },
];

const campaignTypes = [
  { title: "PR Packages & Gifting",         icon: "📦" },
  { title: "Review & Unboxing Videos",       icon: "🎬" },
  { title: "Discount Code Campaigns",        icon: "💳" },
  { title: "Giveaways & Contests",           icon: "🎁" },
  { title: "Multi-Creator Brand Takeovers",  icon: "🤝" },
];

const plans = [
  {
    name: "Starter",
    price: "₹699",
    period: "/month",
    features: ["1 campaign per month", "Up to 5 influencers", "Basic analytics report", "Email support"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹1,499",
    period: "/month",
    features: ["5 campaigns per month", "Up to 25 influencers", "Multi-niche targeting", "Live dashboard", "Priority support"],
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    features: ["Unlimited campaigns", "Dedicated account manager", "Full-funnel strategy", "Custom integrations", "24/7 support"],
    highlight: false,
  },
];

const faqs = [
  { q: "What types of brands does Pixelpulse work with?", a: "We partner with D2C brands, local businesses, product launches, and startups across India. Our minimum campaign budget starts at ₹15,000." },
  { q: "How do you vet your creator network?", a: "Every influencer undergoes a multi-point check: audience authenticity, engagement quality, content brand-safety review, and past campaign performance." },
  { q: "Do I need a long-term contract?", a: "No. We offer monthly rolling plans and project-based engagements. You can scale up or pause at any time." },
  { q: "How quickly can a campaign go live?", a: "Typically 7–10 business days from onboarding to first live post, depending on the scope and number of creators." },
  { q: "Can I approve content before it's published?", a: "Absolutely. Every piece of content passes through a structured approval workflow before it goes live." },
];

/* ─── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" } }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ─── Reusable section label ─────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: ELECTRIC }} className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
      {children}
    </span>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About",     id: "about"       },
    { label: "Network",   id: "network"     },
    { label: "Services",  id: "services"    },
    { label: "Process",   id: "how-it-works"},
    { label: "Contact",   id: "contact"     },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 select-none">
          <span style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm">PP</span>
          <span className="font-black text-lg tracking-tight text-gray-900">
            Pixel<span style={{ color: ELECTRIC }}>pulse</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => scrollTo("contact")}
          style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
          className="hidden md:flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md">
          Get Started <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(o => !o)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }}
                  className="text-left text-sm font-medium text-gray-700">
                  {l.label}
                </button>
              ))}
              <button onClick={() => { scrollTo("contact"); setOpen(false); }}
                style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                className="text-white text-sm font-semibold px-5 py-2 rounded-full w-fit">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function Index() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }
        .gradient-text {
          background: linear-gradient(135deg, ${ELECTRIC}, ${TEAL});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(108,99,255,0.12);
        }
      `}</style>

      <Navbar />
      <div className="h-16" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-28">
        {/* Decorative blobs */}
        <div style={{ background: `radial-gradient(ellipse at 20% 50%, ${ELECTRIC}18 0%, transparent 60%)` }}
             className="absolute inset-0 z-0 pointer-events-none" />
        <div style={{ background: `radial-gradient(ellipse at 80% 30%, ${TEAL}14 0%, transparent 55%)` }}
             className="absolute inset-0 z-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <Label>Social Media Marketing Agency</Label>
              </motion.div>
              <motion.h1 variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.08] mb-6 tracking-tight">
                Amplify Your Brand With&nbsp;
                <span className="gradient-text">Creator-Led&nbsp;Growth</span>
              </motion.h1>
              <motion.p variants={fadeUp}
                className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
                Pixelpulse Social Media LLP connects ambitious brands with a curated network of 700+ authentic creators to run targeted, data-backed campaigns that actually convert.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3 mb-10">
                {[
                  "700+ vetted influencers across every niche",
                  "Campaigns on Instagram, YouTube, Facebook & more",
                  "Transparent reporting — real metrics, zero fluff",
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} custom={i} className="flex items-start gap-3">
                    <span style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-5">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo("how-it-works")}
                  style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                  className="flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg text-sm">
                  Start a Campaign <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo("contact")}
                  style={{ border: `2px solid ${ELECTRIC}`, color: ELECTRIC }}
                  className="flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-violet-50 transition-colors">
                  Free Consultation
                </motion.button>
              </motion.div>
              <motion.p variants={fadeUp} className="text-xs text-gray-400">No lock-in contracts. Results-first approach.</motion.p>
            </motion.div>

            {/* Right — hero image */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }} className="hidden md:block relative">
              <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.pexels.com/photos/6347571/pexels-photo-6347571.jpeg"
                     alt="Content Creator" className="w-full h-auto object-cover" />
                <div style={{ background: `linear-gradient(to top, ${ELECTRIC}44, transparent)` }}
                     className="absolute inset-0 rounded-3xl" />
              </motion.div>

              {/* Floating badge */}
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl p-4 max-w-xs border border-gray-100">
                <div className="flex items-center gap-3">
                  <span style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    700+
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Verified Creators</p>
                    <p className="text-xs text-gray-400">Ready to amplify your brand</p>
                  </div>
                </div>
              </motion.div>

              {/* Stat chip */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-100">
                <p className="text-xs text-gray-400">Avg. engagement lift</p>
                <p className="font-extrabold text-xl" style={{ color: ELECTRIC }}>+280%</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "700+",  label: "Verified Creators"    },
              { value: "350+",  label: "Campaigns Delivered"  },
              { value: "98%",   label: "Client Satisfaction"  },
              { value: "4.2Cr+",label: "Total Impressions"    },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <p className="gradient-text text-4xl font-extrabold mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}><Label>About Us</Label></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 max-w-3xl mx-auto">
              India's Most&nbsp;<span className="gradient-text">Creator-Centric</span>&nbsp;Marketing Agency
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Pixelpulse Social Media LLP was built for brands that refuse to blend in. We connect you with the right voices — authentic, engaged, and perfectly matched to your audience — to turn followers into buyers and buyers into advocates.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BarChart2, title: "Data-Driven Decisions",       desc: "Every creator selection and campaign tweak is backed by hard performance data, not gut feel." },
              { icon: Layers,    title: "Creator-First Authenticity",   desc: "We trust creators to speak in their voice. That authenticity is precisely why it works." },
              { icon: Award,     title: "Brand-Safe Execution",         desc: "Thorough vetting, clear guidelines, and continuous monitoring keep your brand protected." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={fadeUp} custom={i}
                  className="card-hover p-8 rounded-2xl border border-gray-100 bg-white">
                  <div style={{ background: `linear-gradient(135deg, ${ELECTRIC}18, ${TEAL}12)` }}
                       className="w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" style={{ color: ELECTRIC }} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Network ──────────────────────────────────────────────────────── */}
      <section id="network" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16">
            <motion.div variants={fadeUp}><Label>Our Creator Network</Label></motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              700+ Creators.&nbsp;<span className="gradient-text">One Powerful Network.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto">
              You define your ideal audience — we surface creators who already own that conversation.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Niches */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Content Niches</h3>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="grid grid-cols-2 gap-3">
                {niches.map((n, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ scale: 1.04 }}
                    className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 cursor-pointer shadow-sm hover:shadow-md hover:border-violet-200 transition-all">
                    <span className="text-2xl">{n.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{n.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Platforms We Activate</h3>
              <div className="space-y-4">
                {platforms.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:border-violet-200 transition-all">
                      <div style={{ background: `linear-gradient(135deg, ${ELECTRIC}22, ${TEAL}15)` }}
                           className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" style={{ color: ELECTRIC }} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-400">{p.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Campaign categories */}
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Campaign Formats</h3>
              <div className="grid grid-cols-2 gap-3">
                {campaignTypes.map((c, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:border-violet-200 hover:shadow-md transition-all cursor-pointer">
                    <div className="text-3xl mb-2">{typeof c.icon === "string" ? c.icon : <c.icon />}</div>
                    <p className="text-xs font-semibold text-gray-700">{c.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Campaign image */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.pexels.com/photos/15595050/pexels-photo-15595050.jpeg"
                 alt="Campaign Analytics" className="w-full max-h-96 object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16">
            <motion.div variants={fadeUp}><Label>Our Services</Label></motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Everything Your Brand Needs to&nbsp;<span className="gradient-text">Go Viral</span>
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const hovered = hoveredService === i;
              return (
                <motion.div key={i} variants={fadeUp} custom={i}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="card-hover relative p-8 rounded-2xl border border-gray-100 bg-white overflow-hidden cursor-pointer group">
                  {/* Hover tint */}
                  <div style={{ background: `linear-gradient(135deg, ${ELECTRIC}0a, ${TEAL}07)` }}
                       className={`absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
                  <div className="relative z-10">
                    <motion.div animate={hovered ? { rotate: 15, scale: 1.2 } : { rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ background: `linear-gradient(135deg, ${ELECTRIC}20, ${TEAL}15)` }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" style={{ color: ELECTRIC }} />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pricing */}
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 md:p-12">
            <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Subscription Plans</h3>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -8 }}
                  className={`rounded-2xl p-8 border-2 transition-all ${plan.highlight
                    ? "border-violet-400 shadow-2xl bg-white relative overflow-hidden"
                    : "border-gray-100 bg-white"}`}>
                  {plan.highlight && (
                    <div style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                         className="absolute top-0 right-0 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                      Most Popular
                    </div>
                  )}
                  <p className="font-bold text-gray-500 text-sm mb-2">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`text-4xl font-extrabold ${plan.highlight ? "gradient-text" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm pb-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => scrollTo("contact")}
                    style={plan.highlight
                      ? { background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }
                      : { border: `2px solid ${ELECTRIC}`, color: ELECTRIC, background: "white" }}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight ? "text-white shadow-md" : "hover:bg-violet-50"}`}>
                    {plan.price === "Custom" ? "Talk to Us" : "Get Started"}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16">
            <motion.div variants={fadeUp}><Label>Our Process</Label></motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              From Brief to&nbsp;<span className="gradient-text">Breakthrough</span>&nbsp;in 4 Steps
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
                className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%-1rem)] w-full h-px border-t-2 border-dashed border-gray-200 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                       className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we serve ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Label>Who We Serve</Label>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Built for Brands That&nbsp;<span className="gradient-text">Mean Business</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Whether you're a D2C startup, a neighbourhood café, or a scaling brand entering new markets — Pixelpulse builds the creator ecosystem around your specific growth goals.
              </p>
              <ul className="space-y-4">
                {[
                  "D2C brands seeking authentic reach",
                  "Local businesses (cafés, gyms, salons, boutiques)",
                  "New product & collection launches",
                  "Startups entering Tier-1 and Tier-2 markets",
                ].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="flex items-center gap-3 text-gray-700">
                    <span style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.pexels.com/photos/8368744/pexels-photo-8368744.jpeg"
                   alt="Brand Strategy" className="w-full h-auto object-cover max-h-96" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16">
            <motion.div variants={fadeUp}><Label>Client Stories</Label></motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Brands That&nbsp;<span className="gradient-text">Trust Pixelpulse</span>
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: ELECTRIC }} />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                       className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14">
            <motion.div variants={fadeUp}><Label>FAQ</Label></motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Questions&nbsp;<span className="gradient-text">Answered</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                className="border border-gray-100 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: ELECTRIC }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><Label>Let's Connect</Label></motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Ready to&nbsp;<span className="gradient-text">Launch Your Campaign?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
              Tell us about your brand and goals. We'll respond within 24 hours with a tailored growth plan.
            </motion.p>

            <motion.button variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("how-it-works")}
              style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full shadow-xl text-base mb-14">
              Let's Build Together <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: "📧", label: "Email",     value: "hello@pixelpulsellp.in",  href: "mailto:hello@pixelpulsellp.in"        },
                { icon: "💬", label: "WhatsApp",  value: "+91 98333 90905",          href: "https://wa.me/919833390905"           },
                { icon: "📸", label: "Instagram", value: "@pixelpulsellp",           href: "https://instagram.com/pixelpulsellp" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -5 }}>
                  <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                     rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                     className="block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-violet-200 hover:shadow-md transition-all group">
                    <p className="text-3xl mb-2">{item.icon}</p>
                    <p className="text-xs text-gray-400 mb-1 group-hover:text-violet-500 transition-colors uppercase tracking-wider">{item.label}</p>
                    <p className="font-bold text-gray-900 text-sm">{item.value}</p>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-gray-400 text-sm italic">
              Creators, brands, marketers — if you want to grow together, Pixelpulse is your partner.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 text-sm mt-3">
              A/106, Gautam Nagar, Andheri East, Mumbai - 400093
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: DARK }} className="text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span style={{ background: `linear-gradient(135deg, ${ELECTRIC}, ${TEAL})` }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm">PP</span>
                <span className="font-black text-lg tracking-tight">
                  Pixel<span style={{ color: ELECTRIC }}>pulse</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Pixelpulse Social Media LLP — creator-led marketing for brands that want real, measurable growth.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-white/60">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                {["About", "Network", "Services", "Process", "Contact"].map(l => (
                  <li key={l}>
                    <button onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
                      className="hover:text-white transition-colors">{l}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-white/60">Get In Touch</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><a href="mailto:hello@pixelpulsellp.in" className="hover:text-white transition-colors">📧 hello@pixelpulsellp.in</a></li>
                <li><a href="https://instagram.com/pixelpulsellp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">📸 @pixelpulsellp</a></li>
                <li><a href="https://wa.me/919833390905" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">💬 +91 98333 90905</a></li>
                <li><span className="text-white/50">📍 A/106, Gautam Nagar, Andheri East, Mumbai - 400093</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-white/60">For Creators</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Join Our Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Creator Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Growth Resources</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">© 2025 Pixelpulse Social Media LLP. All rights reserved.</p>
            <p className="text-white/30 text-xs">Registered in India · CIN: U73100MH2024LLP000000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}