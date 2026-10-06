import type { SolutionPageContent } from "@/lib/content/types";
import { docs, img } from "../assets";
import { sustainabilityBand, standardCta } from "../shared";

export const about: SolutionPageContent = {
  slug: "about",
  breadcrumb: "About",
  faqs: [
    {
      question: "What does BVK Hydrotech manufacture?",
      answer:
        "Precision woven and knitted metal mesh, and finished components made from it, for green hydrogen electrolysers, fuel cells and industrial filtration. The range covers rolls, die-cut and laser-cut parts, corrugated and flattened profiles, and fabricated filter elements.",
    },
    {
      question: "Where is BVK Hydrotech located?",
      answer:
        "The manufacturing plant is in the Industrial Area, Jhotwara, Jaipur 302012, Rajasthan, India. BVK exports to more than 25 countries.",
    },
    {
      question: "How old is the company?",
      answer:
        "BVK Group began its industrial journey in 1963, giving it more than sixty years in technical woven mesh. It is a family business now in its fourth generation. BVK Hydrotech is the group's hydrogen and energy mesh arm.",
    },
    {
      question: "How large is the operation?",
      answer:
        "The group employs 300+ people and converts 650+ MT of metal into mesh each year on an integrated weaving platform running German-origin equipment.",
    },
    {
      question: "Which certifications does BVK Hydrotech hold?",
      answer:
        "IATF 16949:2016, ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 and ISO 50001:2018, plus AS9100 for aerospace and DSIR recognition for in-house R&D from the Government of India. Material compliance covers CE marking, RoHS and REACH.",
    },
    {
      question: "What other companies are in the BVK Group?",
      answer:
        "WMW India (WMW Industries Ltd.) for woven mesh manufacturing, Deco Mesh Solutions for architectural mesh, BVK Infrasoft for IT, and two non-commercial bodies: the Disha Foundation and The Jeypore School.",
    },
  ],
  hero: {
    eyebrow: "Indian agility. German precision. Performance engineered.",
    title: "About BVK",
    titleAccent: "Hydrotech",
    subtitle:
      "A BVK Group company from Jaipur, weaving technical mesh since 1963 — now applying six decades of filtration discipline to green hydrogen and fuel cells.",
    features: [
      { icon: "factory", title: "Since 1963" },
      { icon: "users", title: "300+ Employees" },
      { icon: "globe", title: "25+ Countries" },
      { icon: "trending", title: "650+ MT p.a." },
    ],
    primary: { label: "Talk to Our Team", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.weavingFloor,
      alt: "BVK weaving production floor in Jaipur",
    },
  },
  benefits: [
    { icon: "building", title: "Founded 1963", text: "Four generations of family ownership." },
    { icon: "factory", title: "Integrated Plant", text: "Weaving to finishing in one facility." },
    { icon: "globe", title: "German Equipment", text: "Equipment origin: Germany." },
    { icon: "recycle", title: "50%+ Renewable", text: "Of current energy consumption." },
  ],
  overview: {
    eyebrow: "The group",
    title: "A portfolio to meet",
    titleAccent: "all your needs",
    body: "BVK Group is a diversified enterprise with a presence in precision industrial filtration, IT & Infocom, education and real estate since 1963. BVK strives to embrace customer satisfaction through continuous improvement in its products and services. The group's long-standing experience across multiple industrial filtration segments allows it to offer customised and value-engineered solutions for challenging process environments.",
    action: { label: "See Our Capability", href: "/engineering-manufacturing" },
    image: {
      src: img.team,
      alt: "BVK group community and team activity",
    },
    badge: { title: "Four generations", text: "of family ownership" },
  },
  components: {
    eyebrow: "Three pillars",
    title: "What customers are",
    titleAccent: "actually buying",
    intro:
      "BVK's competent technical team, multiple certifications and nearly two decades of experience in the energy space generate trust for long-term relationships.",
    image: {
      src: img.gembaBoard,
      alt: "Quality management board on the BVK shop floor",
    },
    callouts: [
      {
        title: "R&D & Prototyping",
        text: "BVK uses Computational Fluid Dynamics and rapid prototyping to analyse flow dynamics within the mesh structure.",
      },
      {
        title: "Strong Supply Chain Network",
        text: "A reliable and certified supply chain network enables risk mitigation and robust supply.",
      },
      {
        title: "Certified Processes",
        text: "An integrated IMS covering quality, environment, safety and energy management.",
      },
      {
        title: "Integrated Process Harmonization",
        text: "Process reliability ensures product accuracy — a result of collaboration between us and our customers.",
      },
      {
        title: "Sustainable Volume Production",
        text: "650+ MT of metal a year, converted on an integrated weaving platform.",
      },
      {
        title: "Technical Team",
        text: "Nearly two decades of experience specifically in the energy space.",
      },
    ],
  },
  features: {
    eyebrow: "Group companies",
    title: "The BVK",
    titleAccent: "group",
    body: "BVK Hydrotech is the group's hydrogen and energy mesh arm. It sits alongside five other businesses, two of which are not commercial at all.",
    points: [
      "BVK Hydrotech — precision mesh for hydrogen, fuel cells and filtration",
      "WMW India (WMW Industries Ltd.) — the group's woven mesh manufacturing business",
      "Deco Mesh Solutions — architectural and decorative metal mesh",
      "BVK Infrasoft — information technology and infocom",
      "Disha Foundation — the group's social initiative",
      "The Jeypore School — education, including for specially abled children",
    ],
    image: {
      src: img.materialRacks,
      alt: "Stainless steel material storage at the BVK plant",
    },
    badge: { title: "Jaipur, Rajasthan", text: "Industrial Area, Jhotwara" },
  },
  specs: {
    caption: "BVK Hydrotech at a glance",
    columns: ["Field", "Detail"],
    rows: [
      { parameter: "Legal entity", value: "BVK Hydrotech India Pvt. Ltd., a BVK Group company" },
      { parameter: "Group founded", value: "1963 — over 60 years in technical woven mesh" },
      { parameter: "Location", value: "Industrial Area, Jhotwara, Jaipur 302012, Rajasthan, India" },
      { parameter: "Employees", value: "300+ across the group" },
      { parameter: "Annual metal volume", value: "650+ MT per annum" },
      { parameter: "Equipment origin", value: "Germany" },
      { parameter: "Export reach", value: "25+ countries" },
      {
        parameter: "Management systems",
        value: "IATF 16949:2016, ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, ISO 50001:2018",
      },
      { parameter: "Sector approvals", value: "AS9100 aerospace, DSIR-recognised in-house R&D" },
      { parameter: "Material compliance", value: "CE marking, RoHS compliant, REACH compliant" },
      { parameter: "Renewable energy", value: "50%+ of consumption, targeting 100% self-reliance" },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Our facility",
    title: "Where the work",
    titleAccent: "happens",
    intro:
      "Photographs of the Jaipur plant. Customers running a supplier qualification are welcome to see all four stages in person.",
    cards: [
      {
        image: { src: img.warping, alt: "Wire warping at BVK" },
        icon: "spool",
        title: "Warping",
        text: "Wire preparation and alignment ahead of weaving.",
      },
      {
        image: { src: img.weavingFloor, alt: "Weaving floor at BVK" },
        icon: "factory",
        title: "Weaving",
        text: "German-origin looms producing technical mesh.",
      },
      {
        image: { src: img.annealing, alt: "Annealing at BVK" },
        icon: "flame",
        title: "Annealing",
        text: "Heat treatment altering material properties.",
      },
      {
        image: { src: img.slitting, alt: "Slitting at BVK" },
        icon: "scissors",
        title: "Slitting",
        text: "Precision conversion to finished width.",
      },
    ],
  },
  why: {
    eyebrow: "How buyers work with us",
    title: "Guidance before",
    titleAccent: "quotation",
    intro:
      "BVK does not quote a catalogue line against an enquiry. The first exchange is technical, because a mesh specified without understanding the duty will fail in service regardless of how well it is made.",
    cards: [
      {
        icon: "headset",
        title: "Share the Duty",
        text: "Drawings, chemistry, operating conditions and expected volume.",
      },
      {
        icon: "microscope",
        title: "Receive Guidance",
        text: "Material and mesh-structure recommendation with the reasoning.",
      },
      {
        icon: "box",
        title: "Prototype & Validate",
        text: "Samples tested against agreed norms before the route is frozen.",
      },
      {
        icon: "trending",
        title: "Scale With Control",
        text: "Series supply under documented process controls and traceability.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.weavingFloor, alt: "Manufacturing floor" },
      title: "Engineering & Manufacturing",
      href: "/engineering-manufacturing",
    },
    {
      image: { src: img.flowLab, alt: "R&D laboratory" },
      title: "R&D, CFD & Prototyping",
      href: "/rd-cfd-prototyping",
    },
    {
      image: { src: img.solarMountains, alt: "Solar farm" },
      title: "Sustainability",
      href: "/sustainability",
    },
  ],
  cta: standardCta({
    title: "Delivering excellence\n…together",
    body: "Whether you are qualifying a new supplier, developing a hydrogen component or replacing an import, start with a conversation about the application.",
    brochure: docs.greenEnergy,
    eyebrow: "Work with BVK",
  }),
};

export const sustainability: SolutionPageContent = {
  slug: "sustainability",
  breadcrumb: "Sustainability",
  hero: {
    eyebrow: "Sustainably grow",
    title: "Sustainability",
    titleAccent: "at BVK",
    subtitle:
      "More than half of BVK's energy already comes from renewables, packaging is fully reusable, and the ESG target is set at 2030 — because a clean-energy supply chain is only as clean as its suppliers.",
    features: [
      { icon: "leaf", title: "50%+ Renewable" },
      { icon: "recycle", title: "Circular Packaging" },
      { icon: "target", title: "ESG by 2030" },
      { icon: "users", title: "20% Women" },
    ],
    primary: { label: "Talk to Our Team", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.solarMountains,
      alt: "Solar farm beneath mountain skies",
    },
  },
  benefits: [
    {
      icon: "leaf",
      title: "50%+ Renewable Energy",
      text: "Of current energy consumption.",
    },
    {
      icon: "recycle",
      title: "100% Reusable Packaging",
      text: "Fully recyclable, supporting circularity.",
    },
    {
      icon: "target",
      title: "ESG Goals by 2030",
      text: "A dated target, not an open commitment.",
    },
    {
      icon: "users",
      title: "20% Women",
      text: "Of employees across the group.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Responsibility",
    titleAccent: "in action",
    body: "BVK prioritises Environmental, Social and Governance objectives as a move towards reducing carbon emissions and achieving ESG goals. A notable aspect of these initiatives is that 50% of our energy consumption currently comes from renewable sources, and our goal is to become 100% self-reliant with renewable sources. For customers building low-carbon equipment, that matters: an electrolyser component made with coal-fired electricity carries that footprint into your product.",
    action: { label: "See Our Commitments", href: "#components" },
    image: {
      src: img.algae,
      alt: "Sunlit aquatic algae garden representing natural carbon capture",
    },
    badge: { title: "Helping customers", text: "achieve their own ESG goals" },
  },
  components: {
    eyebrow: "Commitments",
    title: "Where sustainability",
    titleAccent: "actually shows up",
    intro:
      "Six areas, each with something measurable behind it rather than a statement of intent.",
    image: {
      src: img.solarSunrise,
      alt: "Solar farm at sunrise",
    },
    callouts: [
      {
        title: "Renewable Energy",
        text: "50%+ of energy needs already powered through renewables, with a goal of complete self-reliance.",
      },
      {
        title: "Digital Energy Management",
        text: "A digital energy management system driving conservation across the plant.",
      },
      {
        title: "Diversity",
        text: "20% of employees in the group are women.",
      },
      {
        title: "Sustainable Packaging",
        text: "Packaging solutions that are completely reusable and recyclable, supporting a circular economy.",
      },
      {
        title: "Certified Systems",
        text: "ISO 14001 environmental and ISO 50001 energy management systems, independently audited.",
      },
      {
        title: "Social Initiative",
        text: "The Disha Foundation and The Jeypore School, including education for specially abled children.",
      },
    ],
  },
  features: {
    eyebrow: "Supply chain impact",
    title: "Why a supplier's footprint",
    titleAccent: "becomes yours",
    body: "If you are building electrolysers or fuel cells, your product's environmental case depends partly on where its components came from. These are the things a customer's sustainability team usually asks us for.",
    points: [
      "Renewable share of manufacturing energy — currently 50%+",
      "Energy management system certification — ISO 50001:2018",
      "Environmental management system certification — ISO 14001:2015",
      "Occupational health and safety certification — ISO 45001:2018",
      "Packaging recyclability — 100% reusable and recyclable",
      "Material compliance declarations — RoHS and REACH",
      "Dated improvement target — ESG goals set for 2030",
    ],
    image: {
      src: img.hydrogenValley,
      alt: "Hydrogen plant set in a forested valley",
    },
    badge: { title: "Scope 3 ready", text: "documentation your auditors will ask for" },
  },
  specs: {
    caption: "Sustainability commitments and evidence",
    columns: ["Commitment", "Position today", "Evidence"],
    rows: [
      {
        parameter: "Renewable energy share",
        value: "50%+ of energy consumption",
        note: "ISO 50001:2018 energy management system",
      },
      {
        parameter: "Renewable self-reliance",
        value: "100% — target",
        note: "Digital energy management system",
      },
      {
        parameter: "ESG programme",
        value: "Goals set for 2030",
        note: "Group ESG objectives",
      },
      {
        parameter: "Environmental management",
        value: "Certified",
        note: "ISO 14001:2015",
      },
      {
        parameter: "Occupational health & safety",
        value: "Certified",
        note: "ISO 45001:2018",
      },
      {
        parameter: "Packaging",
        value: "100% reusable and recyclable",
        note: "Circular economy approach",
      },
      {
        parameter: "Material compliance",
        value: "Declared",
        note: "RoHS and REACH declarations",
      },
      {
        parameter: "Diversity",
        value: "20% of group employees are women",
        note: "Group workforce data",
      },
    ],
  },
  sustainability: {
    eyebrow: "The goal",
    title: "100% self-reliant on renewables",
    body: "Half of BVK's energy consumption already comes from renewable sources. The remaining half is the work in progress, and the target date for the wider ESG programme is 2030.",
    stats: [
      { icon: "leaf", value: "50%+", text: "Energy needs powered by renewables today" },
      { icon: "target", value: "2030", text: "Horizon for the full ESG programme" },
    ],
    image: { src: img.forestValley, alt: "" },
  },
  why: {
    eyebrow: "Beyond compliance",
    title: "A circular",
    titleAccent: "approach",
    intro:
      "We embrace packaging solutions that are completely reusable and can be recycled, supporting a circular economy. Adopting 100% reusable and recyclable packaging aligns with our sustainability efforts and fulfils corporate social responsibility objectives.",
    cards: [
      {
        icon: "recycle",
        title: "Circular Packaging",
        text: "Reusable and recyclable across repeat supply programmes.",
      },
      {
        icon: "cpu",
        title: "Digital Conservation",
        text: "Industry 4.0 visibility driving measurable energy reduction.",
      },
      {
        icon: "handshake",
        title: "Social Responsibility",
        text: "Strong commitment through the group's education and foundation work.",
      },
      {
        icon: "award",
        title: "Audited, Not Asserted",
        text: "ISO 14001, ISO 45001 and ISO 50001 certified management systems.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.electrolyzerPlant, alt: "Electrolyser plant" },
      title: "Energy & Clean Tech",
      href: "/energy-clean-tech",
    },
    {
      image: { src: img.weavingFloor, alt: "Manufacturing floor" },
      title: "Engineering & Manufacturing",
      href: "/engineering-manufacturing",
    },
    {
      image: { src: img.team, alt: "BVK team" },
      title: "About BVK Hydrotech",
      href: "/about",
    },
  ],
  cta: standardCta({
    title: "Need our sustainability\ndocumentation?",
    body: "Certificates, material compliance declarations and energy data for your supplier assessment are available on request. Tell us which framework you report under.",
    brochure: docs.greenEnergy,
    eyebrow: "Sustainably grow",
  }),
};
