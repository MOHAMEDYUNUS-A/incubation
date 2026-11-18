export interface FocusAreaItem {
  id: string;
  title: string;
  categoryKey: string;
  shortDesc: string;
  description: string;
  iconName: string;
  subtracks: string[];
  gradient: string;
}

export interface IncubationService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface IncubationProgramStage {
  step: string;
  title: string;
  duration: string;
  description: string;
  milestones: string[];
}

export interface StartupShowcaseItem {
  id: string;
  name: string;
  category: string;
  stage: string;
  oneLiner: string;
  founders: string;
  cohort: string;
  tags: string[];
  impactMetric: string;
}

export interface MentorProfileItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  bio: string;
  linkedIn?: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: "Workshop" | "Bootcamp" | "Hackathon" | "Pitch Day";
  date: string;
  time: string;
  location: string;
  mode: "In-Person" | "Virtual" | "Hybrid";
  description: string;
  registrationOpen: boolean;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  description: string;
  capacity: string;
  specs: string[];
  image: string;
}

// 7 Verified Focus Areas from MIF Brochure
export const FOCUS_AREAS: FocusAreaItem[] = [
  {
    id: "ai-ds",
    title: "Artificial Intelligence & Data Science",
    categoryKey: "AI_DATA_SCIENCE",
    shortDesc: "Applied machine learning, NLP, computer vision, and predictive analytics for real-world enterprise & social applications.",
    description: "Empowering founders to build domain-specific AI engines, edge-compute inference models, and LLM-powered vertical SaaS solutions with high computational rigor.",
    iconName: "BrainCircuit",
    subtracks: ["Computer Vision & Inspection", "Healthcare AI", "Predictive Industrial Analytics", "Natural Language Systems"],
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "clean-energy",
    title: "Renewable Energy & Clean Technologies",
    categoryKey: "RENEWABLE_ENERGY_CLEAN_TECH",
    shortDesc: "Clean energy generation, battery management systems, storage technologies, and carbon reduction solutions.",
    description: "Accelerating cleantech ventures focused on solar-thermal optimization, EV charging infrastructure, smart grid telemetry, and micro-hydro innovations.",
    iconName: "Zap",
    subtracks: ["Solar & Hybrid Microgrids", "Battery Thermal Management", "Waste-to-Energy", "Energy Monitoring IoT"],
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent",
  },
  {
    id: "digital-tech",
    title: "Digital Technologies & Software Solutions",
    categoryKey: "DIGITAL_TECH_SOFTWARE",
    shortDesc: "Scalable enterprise SaaS, cloud architecture, cybersecurity, and digital automation platforms.",
    description: "Fostering engineering talent to develop resilient cloud-native platforms, API-first integrations, logistics workflows, and secure fintech engines.",
    iconName: "Code2",
    subtracks: ["Enterprise SaaS", "Logistics & Supply Chain", "Agritech Digital Services", "Cybersecurity & Identity"],
    gradient: "from-indigo-600/20 via-purple-500/10 to-transparent",
  },
  {
    id: "adv-mfg",
    title: "Advanced Manufacturing & Product Engineering",
    categoryKey: "ADVANCED_MANUFACTURING",
    shortDesc: "Precision rapid prototyping, additive manufacturing, robotics, and industrial automation.",
    description: "Leveraging MAMCET's mechanical laboratories and prototyping machinery to help hardware startups build production-ready physical components.",
    iconName: "Cpu",
    subtracks: ["Additive Prototyping (3D)", "CNC Tooling & Fabrication", "Robotic Pick-and-Place", "Materials Testing"],
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
  },
  {
    id: "iot-smart",
    title: "Electronics, IoT & Smart Systems",
    categoryKey: "ELECTRONICS_IOT_SMART",
    shortDesc: "Connected embedded sensors, industrial telemetry, smart agriculture devices, and wearable electronics.",
    description: "Bridging hardware and cloud via custom PCB design, LoRaWAN/NB-IoT communication, firmware engineering, and low-power smart sensors.",
    iconName: "Radio",
    subtracks: ["Industrial IoT Telemetry", "Smart Agriculture Sensing", "Embedded Firmware (RTOS)", "Wearable Health Devices"],
    gradient: "from-cyan-600/20 via-blue-500/10 to-transparent",
  },
  {
    id: "sustainable-infra",
    title: "Sustainable Infrastructure & Environmental Tech",
    categoryKey: "SUSTAINABLE_INFRASTRUCTURE",
    shortDesc: "Eco-friendly construction materials, wastewater recycling, environmental sensors, and urban resilience.",
    description: "Supporting circular economy startups that transform agricultural and industrial waste into durable building materials and water conservation units.",
    iconName: "Building2",
    subtracks: ["Bio-composite Construction", "Decentralized Water Purification", "Air Quality Monitoring", "Urban Waste Valorization"],
    gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
  },
  {
    id: "other-eng",
    title: "Innovations in Engineering Ecosystem",
    categoryKey: "OTHER_ENGINEERING_INNOVATION",
    shortDesc: "Cross-disciplinary breakthroughs spanning mechatronics, biomedical devices, and aerospace sub-assemblies.",
    description: "An open track welcoming innovative engineering solutions that tackle pressing societal challenges in Tamil Nadu and across India.",
    iconName: "Sparkles",
    subtracks: ["Assistive Technologies", "Aero & Drone Solutions", "Biomedical Instrumentation", "Rural Utility Automation"],
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
  },
];

// 6 Verified Core Services from MIF Brochure
export const INCUBATION_SERVICES: IncubationService[] = [
  {
    id: "office-space",
    title: "Incubation & Co-Working Office Space",
    description: "Modern furnished workstation pods, high-speed fiber internet, ideation zones, and conference rooms at MAMCET campus.",
    iconName: "Building",
    benefits: ["Dedicated desks & team cubicles", "24/7 power backup & high-speed Wi-Fi", "Access to meeting suites with AV display", "Campus dining and logistics facilities"],
  },
  {
    id: "mentoring",
    title: "Startup Mentoring & Capacity Building",
    description: "Structured one-on-one sessions with seasoned industry leaders, academic researchers, and serial startup founders.",
    iconName: "Users",
    benefits: ["Design thinking workshops", "Business model canvas refinement", "Go-To-Market (GTM) advisory", "Investor pitch readiness clinics"],
  },
  {
    id: "networking",
    title: "Networking, Marketing & Industry Linkages",
    description: "Direct bridge to the Tamil Nadu startup network through StartupTN, regional trade bodies, and corporate partners.",
    iconName: "Share2",
    benefits: ["StartupTN ecosystem integration", "Participation in regional startup expos", "Corporate pilot introductions", "Peer founder masterminds"],
  },
  {
    id: "funding",
    title: "Funding & Investment Facilitation",
    description: "Assistance in securing state/central government innovation grants, TANSEED, seed funds, and angel syndicates.",
    iconName: "Coins",
    benefits: ["TANSEED grant readiness guidance", "AICTE & DST scheme applications", "Angel investor pitch days", "Financial modeling & term-sheet review"],
  },
  {
    id: "tech-support",
    title: "Product Development & Technology Support",
    description: "Full access to advanced fabrication machinery, electronics test benches, 3D printers, and cloud compute credits.",
    iconName: "Wrench",
    benefits: ["Electronics testing & soldering stations", "Rapid 3D prototyping lab access", "High-performance GPU workstation", "Faculty subject matter consultation"],
  },
  {
    id: "ipr-validation",
    title: "Idea Validation & IPR Facilitation",
    description: "Comprehensive support for patent landscape search, provisional patent drafting, trademark filing, and copyright compliance.",
    iconName: "ShieldCheck",
    benefits: ["Prior-art search assistance", "Subsidized patent filing guidance", "Trademark & copyright registration", "Technology commercialization contracts"],
  },
];

// Incubation Journey Stages
export const INCUBATION_STAGES: IncubationProgramStage[] = [
  {
    step: "01",
    title: "Idea Discovery & Pre-Incubation",
    duration: "Month 1 - 2",
    description: "Transform raw technical concepts into structured problem statements with initial customer interviews and feasibility checks.",
    milestones: ["Problem-solution fit report", "Customer discovery interviews (20+)", "Competitive landscape map", "Lean canvas v1.0"],
  },
  {
    step: "02",
    title: "Rapid Prototyping & Lab Access",
    duration: "Month 3 - 4",
    description: "Utilize MAMCET labs and hardware benches to build the Proof of Concept (PoC) or functional alpha release.",
    milestones: ["Functional benchtop prototype", "BOM & engineering review", "Safety & compliance check", "Technical benchmark doc"],
  },
  {
    step: "03",
    title: "Formal Incubation & IPR Protection",
    duration: "Month 5 - 8",
    description: "Company incorporation under Startup India, provisional patent/trademark filing, and dedicated incubator pod onboarding.",
    milestones: ["Legal incorporation (Pvt Ltd/LLP)", "Provisional patent application", "Mentorship schedule lock-in", "Pilot client MoU"],
  },
  {
    step: "04",
    title: "Market Pilot & Commercialization",
    duration: "Month 9 - 12",
    description: "Deploy field pilots with industrial and regional partners, gather revenue validation, and optimize production.",
    milestones: ["First commercial deployment", "Revenue or paid LOI validation", "TANSEED / Angel pitch deck", "Graduation to scale"],
  },
];

// Verified Foundation Leadership & Institutional Profile
export const FOUNDATION_INFO = {
  name: "MASTeR Incubation Foundation",
  acronym: "MIF",
  legalType: "A Section 8 Company registered under the Companies Act, 2013",
  recognition: "StartupTN Recognised Pre-Incubation Centre & MSME Host Institution",
  institution: "M.A.M. College of Engineering and Technology (MAMCET)",
  parentGroup: "MASTeR Group of Institutions (Maluk Educational, Health & Charitable Trust)",
  address: "Trichy - Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu - 621 105",
  tagline: "Launchpad for your Entrepreneurial Success",
  inaugurationDate: "March 3, 2026",
  inauguratedBy: "Thiru S. Regupathy (Hon'ble Minister, Government of Tamil Nadu)",
  website: "https://mamcet.edu.in/",
  email: "incubationmanager@mamcet.com",
  phone: "+91 9361697702",
  socialLinks: {
    linkedin: "https://in.linkedin.com/in/master-incubation-foundation-02301b446",
    instagram: "https://www.instagram.com/master_incubation_foundation/",
    googleShare: "https://share.google/V18XLHgF6Rh85vNA0",
  },
  governance: {
    chairman: {
      name: "Dr. M.A. Maluk Mohamed",
      role: "Chairman",
      organization: "MASTeR Group of Institutions",
    },
    ceo: {
      name: "Mrs. Fathima Bathool Maluk",
      role: "Secretary & CEO",
      organization: "MASTeR Group of Institutions",
    },
  },
  manager: {
    name: "Mr. M. Santhosh Kumar",
    role: "Incubation Manager",
    email: "incubationmanager@mamcet.com",
    phone: "+91 9361697702",
  },
  coordinator: {
    name: "Ms. Hemalatha Balakrishnan",
    role: "Incubation Coordinator",
    email: "hemalathabalakrishnan.ece@mamcet.com",
    phone: "+91 6381945574",
  },
  milestonesAchieved: {
    startupsOnboarded: "25+ Startups",
    industryMous: "8 Strategic MoUs",
    msmeGrantCap: "Up to ₹15 Lakhs",
    partnerEcosystem: "IITMIC & StartupTN",
  },
  affiliations: [
    { name: "MAMCET", label: "M.A.M. College of Engineering & Technology" },
    { name: "IITMIC", label: "IIT Madras Incubation Cell Ecosystem Partner" },
    { name: "StartupTN", label: "Government of Tamil Nadu Pre-Incubation Centre" },
    { name: "Ministry of MSME", label: "Approved Host Institution (HI)" },
    { name: "AICTE", label: "All India Council for Technical Education" },
    { name: "IIC", label: "Institution's Innovation Council (MoE)" },
    { name: "NBA", label: "National Board of Accreditation" },
  ],
  vision: "To be a leading institutional hub for innovation and entrepreneurship, transforming engineering knowledge and creativity into pioneering solutions, products and successful startups that shape a brighter future.",
  mission: [
    { code: "M1", title: "Cultivate Mindset", text: "To cultivate an entrepreneurial mindset among students and faculty through design thinking, creative problem-solving and interdisciplinary engagement." },
    { code: "M2", title: "Research Translation", text: "To facilitate the transformation of engineering knowledge, innovative ideas and research outcomes into practical solutions, products and viable startups." },
    { code: "M3", title: "Industry Collaboration", text: "To collaborate with industries, startups, and research institutions to provide practical exposure and support technology development, market access and commercialisation." },
    { code: "M4", title: "Mentoring & Funding", text: "To equip aspiring entrepreneurs with business skills, mentoring, incubation support and access to relevant funding opportunities." },
    { code: "M5", title: "Sustainable Impact", text: "To promote ethical, sustainable and socially responsible entrepreneurship that contributes to industrial growth and societal well-being, in alignment with the Sustainable Development Goals (SDGs)." },
  ],
};

// Cohort & Demo Startups (Clearly designated as cohort showcase)
export const STARTUP_SHOWCASE: StartupShowcaseItem[] = [
  {
    id: "s1",
    name: "AgroSens Telemetry",
    category: "ELECTRONICS_IOT_SMART",
    stage: "PROTOTYPE_MVP",
    oneLiner: "Solar-powered LoRa soil hydration and macronutrient telemetry nodes for delta farmers.",
    founders: "Arun K. (ECE Dept)",
    cohort: "Cohort 2026",
    tags: ["IoT", "Agriculture", "Hardware"],
    impactMetric: "8 Field Pilots in Trichy District",
  },
  {
    id: "s2",
    name: "ThermaGrid Analytics",
    category: "RENEWABLE_ENERGY_CLEAN_TECH",
    stage: "PROOF_OF_CONCEPT",
    oneLiner: "Edge AI camera for rooftop photovoltaic thermal fault identification and cleaning schedules.",
    founders: "Sivaram M. & K. Divya",
    cohort: "Cohort 2026",
    tags: ["CleanTech", "Edge AI", "Solar"],
    impactMetric: "14% Energy Yield Improvement",
  },
  {
    id: "s3",
    name: "AeroInspect Drone Tech",
    category: "ADVANCED_MANUFACTURING",
    stage: "EARLY_TRACTION",
    oneLiner: "Autonomous obstacle-avoidance quadcopters for high-tension transmission line inspection.",
    founders: "Mohammed R. & Team",
    cohort: "Cohort 2025",
    tags: ["Drones", "Manufacturing", "Robotics"],
    impactMetric: "2 MoUs Signed with Regional Utilities",
  },
  {
    id: "s4",
    name: "AquaCycle Bio-Filters",
    category: "SUSTAINABLE_INFRASTRUCTURE",
    stage: "PROTOTYPE_MVP",
    oneLiner: "Activated agricultural-waste based bio-filtration media for textile dye effluent treatment.",
    founders: "Kavitha R. (Civil/Env)",
    cohort: "Cohort 2026",
    tags: ["Sustainability", "CleanWater", "BioMaterials"],
    impactMetric: "92% Turbidity Reduction Achieved",
  },
  {
    id: "s5",
    name: "MedPulse Edge Telecare",
    category: "AI_DATA_SCIENCE",
    stage: "IDEATION",
    oneLiner: "Non-invasive optical pulse transit time biomarker sensor for rural healthcare centers.",
    founders: "Naveen V.",
    cohort: "Cohort 2026",
    tags: ["Healthcare", "AI", "Sensors"],
    impactMetric: "Provisional Patent in Progress",
  },
];

// Mentors Directory
export const MENTORS_LIST: MentorProfileItem[] = [
  {
    id: "m1",
    name: "Dr. K. Senthil Nathan",
    role: "Senior Technology Advisor & AI Researcher",
    organization: "Emerging Tech Advisory Board",
    expertise: ["Deep Learning", "Edge Computing", "Patent Strategy"],
    bio: "Over 18 years of experience mentoring engineering student spinoffs and securing university patent disclosures.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "m2",
    name: "Mr. M. Santhosh Kumar",
    role: "Incubation Manager",
    organization: "MASTeR Incubation Foundation (MIF)",
    expertise: ["Startup Operations", "Government Grants (TANSEED)", "Incubation Policy"],
    bio: "Guiding student entrepreneurs through design thinking, grant proposals, and StartupTN integration.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "m3",
    name: "Ms. Hemalatha Balakrishnan",
    role: "Incubation Coordinator & Faculty",
    organization: "MAMCET ECE & MIF",
    expertise: ["Embedded Systems", "Hardware Prototyping", "Student Mentorship"],
    bio: "Coordinating interdisciplinary research commercialization, maker lab activities, and institutional hackathons.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "m4",
    name: "Er. Vigneshwaran R.",
    role: "Venture Partner & Angel Investor",
    organization: "Tamil Nadu Angel Syndicate",
    expertise: ["Early-Stage Term Sheets", "GTM Execution", "Enterprise Sales"],
    bio: "Active investor supporting Tier-2/3 college entrepreneurs across IoT, agritech, and industrial SaaS.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
];

// Upcoming Events
export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "StartupTN Pre-Incubation Ideathon 2026",
    type: "Hackathon",
    date: "Dec 12 - 13, 2026",
    time: "09:00 AM - 06:00 PM IST",
    location: "Auditorium & Innovation Labs, MAMCET Campus, Siruganur",
    mode: "In-Person",
    description: "48-hour intensive hardware & software sprint for undergraduate engineering students and local entrepreneurs.",
    registrationOpen: true,
  },
  {
    id: "e2",
    title: "Masterclass: TANSEED Grant & Seed Funding Readiness",
    type: "Workshop",
    date: "Dec 20, 2026",
    time: "02:00 PM - 05:00 PM IST",
    location: "Virtual & Seminar Hall 1",
    mode: "Hybrid",
    description: "Step-by-step guidance on drafting competitive grant proposals for Tamil Nadu Startup and Innovation Mission schemes.",
    registrationOpen: true,
  },
  {
    id: "e3",
    title: "Rapid Prototyping with 3D Printing & Embedded IoT",
    type: "Bootcamp",
    date: "Jan 08, 2027",
    time: "10:00 AM - 04:30 PM IST",
    location: "MASTeR Maker Space, MAMCET",
    mode: "In-Person",
    description: "Hands-on maker training on CAD model slicing, stereolithography printing, and ESP32 MQTT cloud data logging.",
    registrationOpen: true,
  },
];

// Facilities at MAMCET
export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "f1",
    name: "MASTeR Co-Working Hub",
    category: "Workspace",
    description: "Air-conditioned ergonomic work pods, team collaboration bays, high-speed fiber internet, and ideation marker boards.",
    capacity: "60+ Innovator Desks",
    specs: ["Gigabit Wi-Fi", "Dual Monitor Provision", "Private Call Booths", "24/7 Access for Incubatees"],
    image: "/images/coworking-space.jpg",
  },
  {
    id: "f2",
    name: "IoT & Embedded Prototyping Lab",
    category: "Hardware",
    description: "Equipped with digital storage oscilloscopes, logic analyzers, SMD soldering stations, and RF testing gear.",
    capacity: "30 Simultaneous Workbenches",
    specs: ["DSO & Waveform Generators", "Reflow Soldering Oven", "LoRa & BLE Development Kits", "Component Inventory Access"],
    image: "/images/hero-image-1.jpg",
  },
  {
    id: "f3",
    name: "Additive Manufacturing (3D Lab)",
    category: "Fabrication",
    description: "Industrial FDM and SLA 3D printers, filament drying units, and post-processing finishing equipment.",
    capacity: "8 Rapid 3D Printers",
    specs: ["Carbon Fiber Filament Support", "0.05mm Layer Resolution", "CAD Workstations with SolidWorks", "Post-curing UV Chambers"],
    image: "/images/hero-image.jpg",
  },
  {
    id: "f4",
    name: "Executive Conference & Pitch Suite",
    category: "Meeting",
    description: "Acoustically treated conference room with 4K interactive touch display, hybrid VC equipment, and presentation podium.",
    capacity: "25 Seats Boardroom",
    specs: ["Zoom Rooms Integrated", "4K Video Conferencing Bar", "Wireless Screen Sharing", "Recording Facilities"],
    image: "/images/hero-image-2.jpg",
  },
];

// Testimonials / Founder Perspectives
export const TESTIMONIALS_DATA = [
  {
    quote: "MASTeR Incubation Foundation gave our agricultural IoT project the hardware lab access and patent guidance we desperately needed. From breadboard to field-tested pilot in Trichy, their team walked with us at every stage.",
    author: "Arun K.",
    role: "Founder, AgroSens Telemetry",
    cohort: "Cohort 2026",
  },
  {
    quote: "Being recognized as a StartupTN Pre-Incubation Centre connects MAMCET founders directly into the state funding pipeline. The mentoring sessions with industry practitioners made all the difference.",
    author: "Kavitha R.",
    role: "Co-Founder, AquaCycle Bio-Filters",
    cohort: "Cohort 2026",
  },
];

// Verified Social Media Feed & Community Updates (From Instagram & LinkedIn)
export interface SocialFeedItem {
  id: string;
  platform: "instagram" | "linkedin";
  author: string;
  handle: string;
  date: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  url: string;
  likes: string;
}

export const SOCIAL_FEED_POSTS: SocialFeedItem[] = [
  {
    id: "sf1",
    platform: "linkedin",
    author: "MASTeR Incubation Foundation",
    handle: "master-incubation-foundation",
    date: "March 2026",
    title: "Official Inauguration of MASTeR Incubation Centre by Hon'ble Minister Thiru S. Regupathy",
    content: "Historic day at MAMCET as our state-of-the-art incubation hub was officially launched by Thiru S. Regupathy, Hon'ble Minister for Minerals and Mines, Government of Tamil Nadu. Joined by our Secretary & CEO Mrs. Fathima Bathool Maluk and Chairman Dr. M.A. Maluk Mohamed. With 25 startups onboarded and 8 industry MoUs signed, we are building Tamil Nadu's premier hub for deep-tech innovators!",
    image: "/images/hero-image-2.jpg",
    tags: ["StartupTN", "MAMCET", "InnovationHub", "Section8", "Entrepreneurs"],
    url: "https://in.linkedin.com/in/master-incubation-foundation-02301b446",
    likes: "248+ Reactions",
  },
  {
    id: "sf2",
    platform: "instagram",
    author: "MASTeR Incubation Foundation",
    handle: "@master_incubation_foundation",
    date: "Recent Update",
    title: "Supporting Student Innovators & Venture Ideation",
    content: "Supporting student innovators, aspiring entrepreneurs, and early-stage startups through mentorship, ideation, and venture development at MAMCET campus. Our prototyping lab and co-working pod are abuzz with prototype testing! 🚀💡",
    image: "/images/mentoring-session.png",
    tags: ["StudentStartups", "Prototyping", "TrichyEntrepreneurs", "MIF"],
    url: "https://www.instagram.com/master_incubation_foundation/",
    likes: "186 Likes",
  },
  {
    id: "sf3",
    platform: "linkedin",
    author: "MASTeR Incubation Foundation",
    handle: "master-incubation-foundation",
    date: "Ecosystem Milestone",
    title: "Strategic Collaboration with IIT Madras Incubation Cell (IITMIC)",
    content: "Our incubation initiative is a strategic evolution of MAMCET's ongoing alliance with the IIT Madras Incubation Cell (IITMIC). This partnership gives student founders in Central Tamil Nadu direct access to IITMIC deep-tech mentorship, investor syndicates, and rapid commercialization pathways.",
    image: "/images/hero-image.jpg",
    tags: ["IITMIC", "DeepTech", "TamilNaduStartups", "IITMadras", "ResearchTranslation"],
    url: "https://in.linkedin.com/in/master-incubation-foundation-02301b446",
    likes: "312+ Reactions",
  },
  {
    id: "sf4",
    platform: "instagram",
    author: "MASTeR Incubation Foundation",
    handle: "@master_incubation_foundation",
    date: "Grant Opportunity",
    title: "Ministry of MSME Host Institution Recognition — Seed Grants up to ₹15 Lakhs",
    content: "Excited to share that MAMCET is recognized as an approved Host Institution (HI) under the Ministry of MSME, Govt of India! Eligible student and faculty innovators can secure up to ₹15 Lakhs in non-dilutive seed grant funding under the MSME Idea Hackathon. Apply through MIF today! 🏆🇮🇳",
    image: "/images/hero-image-1.jpg",
    tags: ["MSMEGrants", "IdeaHackathon", "StartupIndia", "SeedFunding", "MAMCET"],
    url: "https://www.instagram.com/master_incubation_foundation/",
    likes: "215 Likes",
  },
];
