'use client';

import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  Layers,
  Layout,
  Maximize2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap
} from "lucide-react";

type ProjectStatus = "Live" | "Coming Soon";

type Project = {
  id: number;
  name: string;
  url: string;
  status: ProjectStatus;
  category: string;
  tags: string[];
  shortDesc: string;
  stats: Record<string, string>;
  subProducts?: { name: string; description: string; url: string | null }[];
  sections: {
    design: string;
    valueProp: string;
    audience: string;
    features: string[];
    traction: string;
    insights: string;
  };
};

const projects: Project[] = [
  {
    id: 1,
    name: "Kampus",
    url: "https://www.kampus.fun/",
    status: "Live",
    category: "Marketplace",
    tags: ["Campus", "Marketplace", "Student"],
    shortDesc:
      "The UF student marketplace for textbooks, furniture, rides, housing, and events.",
    stats: { users: "250+", rating: "4.9/5", subProducts: "4" },
    subProducts: [
      {
        name: "GatorEx",
        description: "Textbook marketplace with AI chatbot listing.",
        url: "https://www.gatorex.shop/"
      },
      {
        name: "Rydify",
        description: "Campus-specific rideshare (50% cheaper).",
        url: "https://rydify.co/"
      },
      {
        name: "Vybr",
        description: "Housing finder & roommate matching.",
        url: "https://www.vybr.club/"
      },
      {
        name: "Tribzy",
        description: "Student-only event discovery.",
        url: "https://tribzy.com/"
      }
    ],
    sections: {
      design:
        "Warm, cohesive aesthetic with tan/beige primary color (#D4A574). Uses custom fonts (Inter, Patrick Hand) for a youthful, approachable vibe. 'Noise' texture adds personality.",
      valueProp:
        "Direct peer-to-peer student marketplace emphasizing safety and simplicity. Explicitly positions against general marketplaces by requiring .edu verification.",
      audience:
        "University of Florida students. Requires institutional email authentication. 250+ Gators verified.",
      features: [
        "Bank-level encryption",
        "100% verified student users",
        "Cross-app single sign-on",
        "Hyper-local focus"
      ],
      traction:
        "250+ active users, 4.9 avg rating, operational with real users.",
      insights:
        "The multi-app ecosystem strategy is distinctive. Instead of a super-app, it acts as a hub directing to specialized verticals. GatorEx's AI chatbot removes listing friction. Rydify's parent notification feature is a brilliant safety differentiator."
    }
  },
  {
    id: 2,
    name: "MenuOS",
    url: "https://www.menuos.app/",
    status: "Live",
    category: "SaaS",
    tags: ["Restaurant", "SaaS", "QR"],
    shortDesc: "The Operating System for Modern Restaurants.",
    stats: { clients: "10+", orders: "1.2k/day", setup: "<24hrs" },
    sections: {
      design:
        "Polished, modern design with orange/white scheme. Uses gradients and shadows typical of high-end SaaS. Realistic interface mockups build trust.",
      valueProp:
        "Simplifies order management and increases table turns. 'OS' metaphor implies foundational software, not just a tool.",
      audience: "Small to mid-sized restaurants. Focus on Gainesville area initially.",
      features: [
        "QR code ordering",
        "Kitchen Display System (KDS)",
        "Real-time analytics",
        "Captain App for waitstaff"
      ],
      traction: "Trusted by 10+ restaurants in Gainesville. Active v2.0 product.",
      insights:
        "Geographic limitation suggests a smart 'land and expand' strategy. The 'under 24 hours' implementation claim is a massive differentiator in a sector known for painful tech adoption."
    }
  },
  {
    id: 3,
    name: "Homevisor",
    url: "https://www.homevisor.co/",
    status: "Live",
    category: "SaaS",
    tags: ["Home", "Maintenance", "Fintech"],
    shortDesc: "Single point of contact for home maintenance and financial planning.",
    stats: { price: "$29/mo", type: "Waitlist", value: "Predictable" },
    sections: {
      design:
        "Clean, minimalist, professional. Neutral colors emphasize trust and financial seriousness.",
      valueProp:
        "Transform homeownership from expensive surprises into predictable experiences. Reactive repairs → Proactive management.",
      audience:
        "Homeowners seeking to avoid maintenance burdens and unexpected costs.",
      features: [
        "Sinking fund calculations",
        "Predictive maintenance forecasting",
        "Managed service marketplace",
        "Asset digitization"
      ],
      traction:
        "Waitlist active. Pricing structure established ($29/mo premium).",
      insights:
        "The '10 years' lifecycle tracking example quantifies value beautifully. Sinking fund features move this from a simple logbook app to a financial planning tool."
    }
  },
  {
    id: 4,
    name: "ShaadiVerse",
    url: "https://shaadiverse.app/",
    status: "Live",
    category: "Marketplace",
    tags: ["Services", "Booking", "Wedding"],
    shortDesc: "Transparent wedding vendor booking for Tier-2/3 India.",
    stats: { vendors: "10k+", region: "Telangana", trust: "Escrow" },
    sections: {
      design:
        "Clean, modern, image-heavy. High-quality photography establishes credibility. Functional but slightly template-like.",
      valueProp:
        "Transparent pricing, verified vendors, and Escrow payment protection.",
      audience:
        "Couples in Tier-2/3 Indian cities (Telangana region). Budget-conscious, middle-income.",
      features: [
        "10,000+ verified vendors",
        "Escrow payment protection",
        "Transparent package rates",
        "Physical vendor verification"
      ],
      traction:
        "10,000+ verified vendors claimed. Active customer testimonials.",
      insights:
        "Regional focus (Tier-2/3) is a strategic moat against national giants like WedMeGood. The Escrow mechanism solves the massive 'trust gap' in the Indian unorganized wedding sector."
    }
  },
  {
    id: 5,
    name: "Grogate",
    url: "https://www.grogate.com/",
    status: "Coming Soon",
    category: "Marketplace",
    tags: ["Agri", "Community", "Sustainability"],
    shortDesc:
      "Produce harvested 12-24 hours before delivery, direct to gated communities.",
    stats: { time: "12-24hr", model: "Direct", waste: "Zero" },
    sections: {
      design:
        "Nature-focused, fresh, authentic. High-quality imagery of farms and harvest.",
      valueProp:
        "Fresh from farm to community. 12-24 hour harvest-to-delivery timeline.",
      audience:
        "Residents of affluent gated communities; locally-conscious consumers.",
      features: [
        "Direct farmer-to-community model",
        "Zero-waste harvesting (order first, harvest second)",
        "Product traceability"
      ],
      traction: "Pilot program launching soon. Waitlist mode.",
      insights:
        "Targeting gated communities creates a dense, high-value distribution network. The zero-waste model (harvest on order) aligns farmer profitability with consumer sustainability values."
    }
  },
  {
    id: 6,
    name: "Threadz",
    url: "https://www.threadz.studio/",
    status: "Coming Soon",
    category: "AI Tools",
    tags: ["AI", "Fashion", "Design"],
    shortDesc: "AI-powered apparel creation and design studio.",
    stats: { tech: "Next.js", type: "Creative", domain: ".studio" },
    sections: {
      design: "Limited visibility. Uses Next.js framework.",
      valueProp: "AI apparel creation and designs.",
      audience: "Fashion designers, streetwear enthusiasts.",
      features: ["AI Design Generation", "Apparel specific tooling"],
      traction: "Development stage. Modern stack used.",
      insights:
        "Positioning at the intersection of Generative AI and Streetwear/Custom fashion. The .studio domain implies a creative suite rather than just a store."
    }
  },
  {
    id: 7,
    name: "Layr",
    url: "https://www.layr.plus/",
    status: "Coming Soon",
    category: "SaaS",
    tags: ["DevTools", "Design", "No-Code"],
    shortDesc:
      "Comprehensive suite for modern builders: Concept, Design, Code, Deploy.",
    stats: { users: "50k+", subapps: "3", export: "React/Vue" },
    subProducts: [
      {
        name: "Logora",
        description: "AI Brand Identity & Logo Design.",
        url: "http://logora.design/"
      },
      {
        name: "Deckr",
        description: "AI Pitch Deck Creator.",
        url: "http://deckr.design/"
      },
      {
        name: "Buidl",
        description: "Design-to-Code export (React/Vue).",
        url: "https://buidl.design/"
      }
    ],
    sections: {
      design:
        "Dark mode, minimalist, sleek. Numbered sections guide the user. Very 'DevTools' aesthetic.",
      valueProp:
        "One seamless flow from Concept to Deployment. Replaces fragmented toolchains.",
      audience: "Designers, Developers, Product Teams. Claims 50,000+ creators.",
      features: [
        "Real-time collaboration",
        "Edge network deployment",
        "AI Component generation",
        "Multi-framework support"
      ],
      traction: "Claims 50k+ active users. Free tier available.",
      insights:
        "Modular architecture is smart—users can use just the Logo tool or just the Deck tool, but the platform binds them. Competes with Figma/Webflow but adds the 'AI Automation' layer to bridge steps."
    }
  },
  {
    id: 8,
    name: "Markit",
    url: "https://www.markit.one/",
    status: "Coming Soon",
    category: "SaaS",
    tags: ["Marketing", "Video", "Tools"],
    shortDesc:
      "The 'Trinity of Growth': Forms, Video, and QR codes in one bundle.",
    stats: { savings: "60%", price: "$49/mo", tools: "3-in-1" },
    subProducts: [
      {
        name: "FormEase",
        description: "Logic-jumping forms with real-time analytics.",
        url: null
      },
      {
        name: "AdVerse AI",
        description: "Text-to-Video generation with auto-captioning.",
        url: null
      },
      {
        name: "QRBee",
        description: "Dynamic QR codes bridging physical/digital.",
        url: null
      },
      {
        name: "Sync",
        description: "Unified CRM & Data Layer.",
        url: null
      }
    ],
    sections: {
      design:
        "Fluid abstract imagery, colorful but focused. Compare/Contrast sections highlight cost savings.",
      valueProp:
        "Stop context switching. Get Forms, Video AI, and QR tools for one low price ($49 vs $349).",
      audience: "SMBs, Creators, Marketers.",
      features: [
        "Unified Dashboard",
        "No Zapier/Make required",
        "Lead scoring & segmentation",
        "Integrated analytics"
      ],
      traction: "Pricing established. Social presence active.",
      insights:
        "The bundling strategy is the key here. Individually, these are commodities. Together, with a unified CRM ('Sync'), they form a sticky operating system for SMB marketing. The 'No Zapier Needed' pitch is strong."
    }
  },
  {
    id: 9,
    name: "Hackr",
    url: "https://www.hackr.plus/",
    status: "Coming Soon",
    category: "SaaS",
    tags: ["Events", "Hiring", "AI"],
    shortDesc: "End-to-end Hackathon OS: Host smarter, judge faster, hire better.",
    stats: { companies: "500+", challenges: "10k+", focus: "B2B" },
    subProducts: [
      {
        name: "HackHost",
        description: "AI event setup, team matching, & management.",
        url: "https://hackhost.club/"
      },
      {
        name: "HackHub",
        description: "Automated judging & real-time scoring.",
        url: "https://hackhub.app/"
      },
      {
        name: "HackHire",
        description: "Live coding tests & technical recruiting.",
        url: "https://www.hackhire.dev/"
      }
    ],
    sections: {
      design: "Clean, corporate yet modern. B2B SaaS aesthetic.",
      valueProp:
        "Covers the full lifecycle: Event setup -> Judging -> Recruitment.",
      audience: "Hackathon Organizers, Tech Recruiters, DevRel teams.",
      features: [
        "Sponsor dashboards",
        "AI-powered project matching",
        "Instant code evaluation",
        "Talent pipeline integration"
      ],
      traction:
        "HackHire claims 500+ companies and 10k+ challenges. Most mature of the suite.",
      insights:
        "The monetization model is brilliant: Event tools might be low-margin, but the 'HackHire' component taps into high-value recruiting budgets. It turns hackathons into a validated talent pipeline."
    }
  },
  {
    id: 10,
    name: "Payd",
    url: "https://www.payd.plus/",
    status: "Coming Soon",
    category: "Fintech",
    tags: ["Crypto", "Payments", "Invoicing"],
    shortDesc:
      "Operating system for modern finance: Invoices, Subscriptions, and Cross-border.",
    stats: { fees: "0%", integration: "USDC", type: "Web3" },
    subProducts: [
      {
        name: "Transakt",
        description: "B2B Invoice automation (Crypto + Fiat).",
        url: "https://www.transakt.online/"
      },
      {
        name: "BuyMeAKofi",
        description: "Creator payments with 0% fees.",
        url: "https://www.buymeakofi.com/"
      },
      {
        name: "SwiftPe",
        description: "USDC to Fiat cross-border remittance.",
        url: "https://www.swiftpe.xyz/"
      }
    ],
    sections: {
      design:
        "Aurora gradients, glassmorphism, dark mode. Very 'Web3' but polished.",
      valueProp:
        "Unifies fiat and crypto payments. 0% fees for creator pages.",
      audience:
        "Web3 companies, Freelancers, Creators, Cross-border contractors.",
      features: [
        "Multichain support (ETH, Polygon)",
        "Instant settlement",
        "Unified dashboard",
        "Compliance ready"
      ],
      traction: "Client logos displayed. v2.0 noted.",
      insights:
        "Aggressively pricing the creator tool at 0% fees is a loss-leader to get users into the ecosystem. The USDC-to-Bank remittance (SwiftPe) solves a massive pain point for international freelancers."
    }
  },
  {
    id: 11,
    name: "StayLinq",
    url: "https://www.staylinq.co/",
    status: "Coming Soon",
    category: "SaaS",
    tags: ["Hospitality", "Travel", "Automation"],
    shortDesc: "End-to-end OS for vacation rental managers.",
    stats: { portals: "2", type: "Vertical SaaS", feature: "IoT" },
    sections: {
      design: "Clean, professional, component-based layout.",
      valueProp: "Combines operational automation with 5-star guest experience.",
      audience: "Property Managers, Airbnb Hosts.",
      features: [
        "Manager Hub: Automation & messaging",
        "Guest Portal: Upsells & digital guidebooks",
        "IoT Smart Home integration"
      ],
      traction: "Early stage marketing site.",
      insights:
        "Dual-portal approach (Guest vs Manager) is smart. The marketplace for upsells in the Guest Portal offers a way to increase revenue per stay, not just manage it."
    }
  },
  {
    id: 12,
    name: "Momint",
    url: "https://www.momint.club/",
    status: "Coming Soon",
    category: "Web3",
    tags: ["NFT", "Creator", "Social"],
    shortDesc: "Turning creator moments into lasting financial assets via NFTs.",
    stats: { chain: "ETH", focus: "Creators", model: "Royalty" },
    sections: {
      design: "Electric purple, dark theme, gradient-heavy. High energy.",
      valueProp:
        "Stability for creators, ROI for fans. Fixes the 'broken' creator economy.",
      audience: "Influencers, Superfans, Web3 collectors.",
      features: [
        "NFT Minting/Trading",
        "Unlockable real-world content",
        "Royalty attachments"
      ],
      traction: "Genesis Drop mentioned. Early stage.",
      insights:
        "Tough market post-NFT winter. Success will depend on the 'utility' of the unlockable content (meet & greets) rather than the speculative value of the token."
    }
  },
  {
    id: 13,
    name: "WhatIfStudio",
    url: "https://www.whatifstudio.art/",
    status: "Coming Soon",
    category: "AI Tools",
    tags: ["AI Film", "Storytelling", "Creative"],
    shortDesc: "Rewriting sad endings beautifully using AI filmmaking.",
    stats: { genre: "Sci-Fi/Drama", tech: "GenAI", type: "Studio" },
    sections: {
      design: "Cinematic, dark, abstract. High emotional resonance.",
      valueProp:
        "Emotion-first technology. 'What If' possibilities for narrative exploration.",
      audience: "Storytellers, Film fans, 'Fix-it' fanfic communities.",
      features: [
        "Interactive branching narratives",
        "AI Film Generation",
        "Community access"
      ],
      traction: "Waitlist active.",
      insights:
        "Unique emotional positioning. Most AI video tools sell 'speed'; this sells 'closure' and 'hope'. Very distinct niche."
    }
  },
  {
    id: 14,
    name: "Aura Art",
    url: "https://www.tryaura.art/",
    status: "Coming Soon",
    category: "AI Tools",
    tags: ["Design", "Social", "AI"],
    shortDesc: "All-in-One Creator Engine: Templates, Editing, and Generative AI.",
    stats: { speed: "0.4s", engine: "Gemini", focus: "Social" },
    sections: {
      design: "Sci-fi aesthetic, neon accents, technical data overlays.",
      valueProp:
        "Replaces Unfold + Picsart + ChatGPT. One app for social content.",
      audience: "Social Media Managers, Influencers.",
      features: [
        "Smart Templates",
        "Layer-based editing",
        "Gemini-powered text/image gen"
      ],
      traction: "Generation metrics shown (0.4s).",
      insights:
        "Speed is the killer feature here. 0.4s generation time is highlighted to appeal to volume-heavy content creators."
    }
  },
  {
    id: 15,
    name: "OmniTrix",
    url: "https://www.tryomnitrix.com/",
    status: "Coming Soon",
    category: "SaaS",
    tags: ["IoT", "Blockchain", "Supply Chain"],
    shortDesc:
      "Supply chain transformation via IoT, Blockchain, and AI agents.",
    stats: { stack: "IoT+Chain+AI", target: "Enterprise", type: "B2B" },
    sections: {
      design: "Cyan accents, tech-forward, data-heavy dashboard visuals.",
      valueProp: "Total traceability and automated compliance.",
      audience: "Supply Chain Managers, Logistics, Manufacturing.",
      features: [
        "Autonomous AI Agents",
        "IoT Sensor integration",
        "Blockchain verification"
      ],
      traction: "Request Demo stage.",
      insights:
        "Combines three buzzwords (IoT, AI, Blockchain) but for a valid use case: trusting supply chain data. The 'Autonomous Agent' angle is the modern twist on traditional logistics."
    }
  },
  {
    id: 16,
    name: "BlueBeetle",
    url: "https://www.bluebeetle.online/",
    status: "Coming Soon",
    category: "Fintech",
    tags: ["Trading", "AI", "Finance"],
    shortDesc: "AI co-pilot for traders. Augmentation, not just automation.",
    stats: { accuracy: "73.2%", pnl: "+$3.2k", mode: "Live" },
    sections: {
      design: "Slate dark mode, high contrast, serious financial aesthetic.",
      valueProp:
        "Enhance human decision making with AI signals and risk management.",
      audience: "Active Traders, Institutional Funds.",
      features: [
        "Real-time signals",
        "Confidence scoring",
        "Explainable AI decision trails"
      ],
      traction: "Live dashboard metrics displayed (likely illustrative).",
      insights:
        "Differentiation lies in 'Explainability'. Most trading bots are black boxes; BlueBeetle promises to explain *why* it recommends a trade."
    }
  },
  {
    id: 17,
    name: "DistroHQ",
    url: "https://www.distrohq.xyz/",
    status: "Live",
    category: "Agency",
    tags: ["Content", "Production", "SaaS"],
    shortDesc:
      "Headquarters for producing, packaging, and distributing high-performance content.",
    stats: { rev: "$3k+/mo", clients: "Series-B+", type: "Service" },
    sections: {
      design:
        "Minimalist, monochromatic aesthetic. Clean typography (Segoe UI) with repeating text patterns creates visual rhythm. Professional B2B look.",
      valueProp:
        "Solves content bottlenecks by offering full-stack production (Strategy + Production + Distribution). Bridges creator tools with B2B SaaS demands.",
      audience: "Founders, SaaS Executives, Series-B+ companies.",
      features: [
        "Short-form video production",
        "LinkedIn carousel creation",
        "Product demo cinematography",
        "Multi-channel distribution"
      ],
      traction:
        "Active case studies (Apex +45k followers, Linear 2.5M views). Established pricing tiers ($3k-$6.5k/mo).",
      insights:
        "Positions as a growth partner, not just an editing service. The tiered subscription model for high-end content production creates predictable recurring revenue in a typically volatile agency model."
    }
  },
  {
    id: 18,
    name: "LetsVibe",
    url: "https://letsvibe.dev/",
    status: "Live",
    category: "Education",
    tags: ["Education", "AI", "DevTools"],
    shortDesc:
      "Learn practical AI-native coding using Gemini 3.0, Google AI Studio, and Supabase.",
    stats: { students: "2.4k+", stack: "Gemini", model: "Lifetime" },
    sections: {
      design:
        "Dark-first with neon accents (Purple/Cyan). JetBrains Mono font usage and interactive canvas simulators create a 'hacker' atmosphere.",
      valueProp:
        "Forget syntax memorization. Learn to conduct the symphony of AI models. Positions developers as 'conductors' rather than writers.",
      audience: "Aspiring developers, SaaS founders, Junior engineers.",
      features: [
        "Reasoning Models training",
        "Multimodal agent building",
        "Supabase backend integration",
        "Cohort-based learning"
      ],
      traction:
        "2,400+ builders enrolled. Active 2025 Cohort. Functional platform.",
      insights:
        "Directly challenges traditional bootcamps by skipping syntax fundamentals to focus on AI orchestration. The 'Lifetime Access' model is a smart cash-flow play for education products."
    }
  },
  {
    id: 19,
    name: "Liftoff",
    url: "https://liftoff.design/",
    status: "Live",
    category: "Agency",
    tags: ["Design", "Creative", "Web"],
    shortDesc:
      "Premium design studio engineering digital ecosystems that propel brands.",
    stats: { style: "Brutalist", tech: "WebGL", type: "Agency" },
    sections: {
      design:
        "High-contrast neon yellow (#CCFF00) on black. Brutalist-meets-futuristic 'OS' interface style with command-line aesthetics.",
      valueProp:
        "Engineers digital ecosystems with a focus on WebGL and creative coding. Merges aesthetic excellence with engineering rigor.",
      audience: "High-ambition brands, Web3, Fintech, and B2B SaaS.",
      features: [
        "Design Systems",
        "WebGL & Creative Coding",
        "Brand Identity",
        "End-to-end Development"
      ],
      traction:
        "Established boutique studio. 3 featured portfolio projects dated 2025. Active client work.",
      insights:
        "Differentiates through tech-forward branding that mirrors developer culture. Occupies the niche between standard web agencies and specialized interactive studios."
    }
  },
  {
    id: 20,
    name: "OpenGig",
    url: "https://opengig.net/",
    status: "Coming Soon",
    category: "Marketplace",
    tags: ["Gig Economy", "B2B", "AI"],
    shortDesc:
      "Unified AI ecosystem for the gig economy. Stop searching, start building.",
    stats: { status: "Beta", focus: "B2B", type: "Platform" },
    sections: {
      design:
        "Modern, clean, tech-forward. Progress indicators and dark mode compatibility. Professional sans-serif typography.",
      valueProp:
        "Consolidate vetting, outreach, and management into one unified system. Replaces fragmented tools (LinkedIn, Trello, PayPal) with one ecosystem.",
      audience: "Hiring managers, Recruiters, Agency owners.",
      features: [
        "Smart Resource Allocation",
        "Automated Project Distribution",
        "5-step Lifecycle Management",
        "Roster Verification"
      ],
      traction:
        "Early-stage beta. 'Active_Project_Beta' labels visible in mockups.",
      insights:
        "Horizontal integration strategy consolidating point solutions. Focuses on 'streamlining' existing workflows rather than just discovery, competing on efficiency rather than network size."
    }
  }
];

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const isLive = status === "Live";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${
        isLive
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
      }`}
    >
      {isLive ? (
        <Activity className="w-3 h-3 mr-1" />
      ) : (
        <Clock className="w-3 h-3 mr-1" />
      )}
      {status}
    </span>
  );
};

const CategoryBadge = ({ tag }: { tag: string }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium bg-zinc-950/50 border border-zinc-800 text-zinc-400 mr-1 mb-1 backdrop-blur-sm">
    {tag}
  </span>
);

const StatCard = ({
  label,
  value,
  icon: Icon,
  colorClass,
  borderColor
}: {
  label: string;
  value: number | string;
  icon: typeof Layout;
  colorClass?: string;
  borderColor?: string;
}) => (
  <div
    className={`bg-zinc-900/50 rounded-xl p-6 border ${
      borderColor || "border-zinc-800"
    } hover:border-zinc-700 transition-all shadow-sm hover:shadow-md hover:bg-zinc-900 group`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
          {label}
        </p>
        <p
          className={`text-3xl font-bold mt-2 tracking-tight ${
            colorClass || "text-white"
          }`}
        >
          {value}
        </p>
      </div>
      <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-500 group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const InsightCard = ({
  title,
  value,
  subtext
}: {
  title: string;
  value: string;
  subtext?: string;
}) => (
  <div className="p-5 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">
      {title}
    </h4>
    <p className="text-xl font-bold text-white tracking-tight">{value}</p>
    {subtext && (
      <p className="text-xs text-zinc-500 mt-1 font-medium">{subtext}</p>
    )}
  </div>
);

const ProjectModal = ({
  project,
  onClose
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-zinc-950 h-full shadow-2xl flex flex-col border-l border-zinc-800 overflow-hidden animate-slide-in-right">
        <div className="px-8 py-6 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur flex justify-between items-start sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge status={project.status} />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {project.category}
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tighter mb-1">
              {project.name}
            </h2>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-medium mt-2 group transition-colors"
            >
              Visit Website{" "}
              <ExternalLink className="w-4 h-4 ml-1 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
            aria-label="Close project details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-zinc-950">
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(project.stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60 text-center hover:border-zinc-700 transition-colors"
              >
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                  {key}
                </p>
                <p className="text-xl font-bold text-white tracking-tight">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center tracking-tight">
              <Zap className="w-5 h-5 mr-2 text-emerald-500" /> Value Proposition
            </h3>
            <p className="text-zinc-300 leading-relaxed text-lg font-light border-l-2 border-emerald-500/30 pl-5">
              {project.sections.valueProp}
            </p>
          </section>

          {project.subProducts && (
            <section>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center">
                <Layers className="w-4 h-4 mr-2" /> Ecosystem Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.subProducts.map((sub, idx) => (
                  <a
                    key={idx}
                    href={sub.url || "#"}
                    target={sub.url ? "_blank" : "_self"}
                    rel="noreferrer"
                    className={`block p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-emerald-500/30 transition-all group/card ${
                      !sub.url ? "cursor-default" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-zinc-200 text-sm group-hover/card:text-emerald-400 transition-colors">
                        {sub.name}
                      </h4>
                      {sub.url && (
                        <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover/card:text-emerald-500 transition-colors" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed group-hover/card:text-zinc-400 transition-colors">
                      {sub.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" /> Target Audience
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {project.sections.audience}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-2" /> Traction
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {project.sections.traction}
              </p>
            </section>
          </div>

          <section className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
              Key Features
            </h3>
            <ul className="space-y-3">
              {project.sections.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-sm text-zinc-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
              Design Analysis
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              {project.sections.design}
            </p>
          </section>

          <section className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 text-white p-6 rounded-xl border border-emerald-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp className="w-24 h-24" />
            </div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 relative z-10">
              Analyst Insight
            </h3>
            <p className="text-zinc-200 leading-relaxed relative z-10 font-medium italic">
              "{project.sections.insights}"
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default function IndiecornPortfolio() {
  const [filter, setFilter] = useState<"All" | ProjectStatus>("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesStatus = filter === "All" || p.status === filter;
      const searchValue = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(searchValue) ||
        p.tags.some((t) => t.toLowerCase().includes(searchValue));
      return matchesStatus && matchesSearch;
    });
  }, [filter, search]);

  const stats = {
    total: projects.length,
    live: projects.filter((p) => p.status === "Live").length,
    comingSoon: projects.filter((p) => p.status === "Coming Soon").length
  };

  const now = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }).format(new Date()),
    []
  );

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-100">
      <header className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-shadow duration-300">
              <span className="text-zinc-950 font-black text-2xl leading-none font-serif select-none">
                I
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                Indie<span className="text-emerald-500">corn</span>
              </h1>
              <span className="text-xs text-zinc-500 font-medium tracking-wide">
                Startup Studio Portfolio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Systems Operational</span>
            </div>
            <div className="text-xs font-mono text-zinc-600">{now}</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Projects" value={stats.total} icon={Layers} />
          <StatCard
            label="Live & Revenue"
            value={stats.live}
            icon={Activity}
            colorClass="text-emerald-400"
            borderColor="border-emerald-500/10"
          />
          <StatCard
            label="Pipeline"
            value={stats.comingSoon}
            icon={Clock}
            colorClass="text-amber-400"
            borderColor="border-amber-500/10"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 shadow-inner">
            {["All", "Live", "Coming Soon"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as "All" | ProjectStatus)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
                  filter === f
                    ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter ventures..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 transition-all placeholder:text-zinc-600 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-zinc-900/40 rounded-2xl border border-zinc-800/60 hover:border-emerald-500/20 hover:bg-zinc-900 shadow-sm transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-6 flex-1 relative">
                <div className="flex justify-between items-start mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border shadow-inner ${
                      project.status === "Live"
                        ? "bg-zinc-800 text-emerald-400 border-zinc-700 shadow-emerald-900/10"
                        : "bg-zinc-950 text-zinc-600 border-zinc-800"
                    }`}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors tracking-tight">
                  {project.name}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
                  {project.category}
                </p>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-4 leading-relaxed font-light">
                  {project.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.slice(0, 3).map((tag) => (
                    <CategoryBadge key={tag} tag={tag} />
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] text-zinc-600 px-1.5 py-1 rounded bg-zinc-900 border border-zinc-800 self-center">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/30 flex justify-between items-center group-hover:bg-zinc-800/50 transition-colors">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center group-hover:text-zinc-300 transition-colors">
                  <Maximize2 className="w-3 h-3 mr-1.5" /> View Analysis
                </span>
                <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 duration-300 text-sm">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center tracking-tight">
                <BarChart3 className="w-5 h-5 mr-3 text-emerald-500" />
                Portfolio Intelligence
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Aggregated performance & strategic insights.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-zinc-800">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />{" "}
                Strategic Moats
              </h3>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-bold text-sm text-emerald-500 shadow-sm">
                    01
                  </span>
                  <div>
                    <h4 className="font-bold text-base text-white mb-1">
                      Ecosystem Bundling
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Projects like{" "}
                      <span className="text-emerald-400 font-medium">
                        Markit
                      </span>{" "}
                      and{" "}
                      <span className="text-emerald-400 font-medium">
                        Payd
                      </span>{" "}
                      use a "Hub & Spoke" model. Bundling 3+ tools creates
                      defensibility and reduces churn.
                    </p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-bold text-sm text-emerald-500 shadow-sm">
                    02
                  </span>
                  <div>
                    <h4 className="font-bold text-base text-white mb-1">
                      Hyper-Verticalization
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Attacking deep niches:{" "}
                      <span className="text-emerald-400 font-medium">
                        Kampus
                      </span>{" "}
                      (one university),{" "}
                      <span className="text-emerald-400 font-medium">
                        ShaadiVerse
                      </span>{" "}
                      (Tier-2 weddings), and{" "}
                      <span className="text-emerald-400 font-medium">
                        MenuOS
                      </span>{" "}
                      (local dining).
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-zinc-900/30">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-indigo-400" /> Market
                Distribution
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <InsightCard title="B2B SaaS" value="25%" subtext="4 Active Ventures" />
                <InsightCard
                  title="Consumer"
                  value="31%"
                  subtext="5 Active Ventures"
                />
                <InsightCard
                  title="Creator Tools"
                  value="25%"
                  subtext="4 Active Ventures"
                />
                <InsightCard
                  title="Fintech/Web3"
                  value="19%"
                  subtext="3 Active Ventures"
                />
              </div>
              <div className="bg-amber-900/10 border border-amber-500/10 p-5 rounded-xl">
                <h4 className="text-amber-500 font-bold text-[10px] uppercase tracking-wider mb-2 flex items-center">
                  <Target className="w-3 h-3 mr-1.5" /> Risk Assessment
                </h4>
                <p className="text-sm text-amber-100/60 leading-relaxed">
                  Heavy reliance on "Coming Soon" projects (75% of portfolio).
                  Market timing for Web3 projects faces headwinds.
                  Recommendation: Accelerate Grogate pilot to diversify live
                  revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

