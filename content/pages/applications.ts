import type { SolutionPageContent } from "@/lib/content/types";
import { docs, img } from "../assets";
import { sustainabilityBand, standardCta } from "../shared";

export const industrialFiltration: SolutionPageContent = {
  slug: "industrial-filtration",
  breadcrumb: "Industrial Filtration",
  hero: {
    eyebrow: "Six decades of separation",
    title: "Industrial",
    titleAccent: "Filtration",
    subtitle:
      "Filtration mesh and filter elements for separation, de-watering and process protection — the capability BVK Group has been building since 1963.",
    features: [
      { icon: "filter", title: "Rated Retention" },
      { icon: "gauge", title: "Controlled ΔP" },
      { icon: "shield", title: "Corrosion Matched" },
      { icon: "route", title: "Repeat Supply" },
    ],
    primary: { label: "Specify a Filter Element", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.filterElementCutaway,
      alt: "Cutaway view of a pleated metal mesh filter element",
    },
  },
  benefits: [
    {
      icon: "filter",
      title: "Retention by Design",
      text: "Aperture set against the particle you must stop.",
    },
    {
      icon: "gauge",
      title: "Pressure Drop Budget",
      text: "Open area balanced against allowable loss.",
    },
    {
      icon: "flask",
      title: "Media Compatibility",
      text: "Alloy chosen for the chemistry and temperature.",
    },
    {
      icon: "route",
      title: "Cleanability",
      text: "Geometry that survives backwash and cleaning cycles.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Filtration is rarely",
    titleAccent: "plug-and-play",
    body: "A filtration specification is four requirements pulling against each other: what you need to retain, how much pressure you can afford to lose, what the medium will do to the metal, and how the element has to be cleaned. Change one and the others move. BVK's filtration work starts by establishing all four before any mesh is proposed — which is why the enquiry conversation is longer than a catalogue order, and the result lasts longer too.",
    action: { label: "See the Decision Set", href: "#components" },
    image: {
      src: img.hydrogenFilterModule,
      alt: "Filter module assembly in a process plant",
    },
    badge: { title: "Since 1963", text: "filtration mesh for process industry" },
  },
  components: {
    eyebrow: "Specification",
    title: "The six inputs behind a",
    titleAccent: "filtration element",
    intro:
      "Send these and a recommendation can follow quickly. Send only a micron rating and the specification will still be incomplete.",
    image: {
      src: img.mistNozzlesFactory,
      alt: "Precision stainless steel filtration components in a factory",
    },
    callouts: [
      {
        title: "Retention Requirement",
        text: "Particle size to be stopped, and whether it is absolute or nominal.",
      },
      {
        title: "Medium & Chemistry",
        text: "What is flowing through, at what concentration, and what it does to metal.",
      },
      {
        title: "Cleaning Regime",
        text: "Backwash, chemical clean or single-use — this drives the construction.",
      },
      {
        title: "Flow & Pressure Drop",
        text: "Design flow rate and the pressure loss the system can tolerate.",
      },
      {
        title: "Temperature",
        text: "Operating and excursion temperatures narrow the alloy choice sharply.",
      },
      {
        title: "Element Geometry",
        text: "Cylinder, disc, pleated cartridge, screen or custom fabricated shape.",
      },
    ],
  },
  features: {
    eyebrow: "Element range",
    title: "From mesh to",
    titleAccent: "finished element",
    body: "BVK does not stop at the roll. Elements are fabricated, inspected and documented so the part arrives ready to install.",
    points: [
      "Filter candles and cartridges",
      "Pleated mesh filters",
      "Multi-layer disc filters",
      "Ring discs and filter discs",
      "Screen cylinders",
      "Laser-cut segments and punched parts",
      "Framed filter discs",
      "Hydraulic and automotive filter media",
    ],
    image: {
      src: img.materialRacks,
      alt: "Stainless steel mesh material storage racks",
    },
    badge: { title: "Fabricated in-house", text: "weaving through to finished element" },
  },
  specs: {
    caption: "Filtration media selection",
    columns: ["Service condition", "Typical material", "Note"],
    rows: [
      {
        parameter: "General aqueous and process",
        value: "304 / 304L (1.4301 / 1.4306)",
        note: "The default where chemistry is not aggressive",
      },
      {
        parameter: "Chloride exposure",
        value: "316 / 316L (1.4401 / 1.4404)",
        note: "Molybdenum improves pitting resistance",
      },
      {
        parameter: "Strong acid and high chloride",
        value: "904L (1.4539)",
        note: "Super austenitic, for severe corrosion duty",
      },
      {
        parameter: "Elevated temperature",
        value: "314 (1.4841)",
        note: "Heat-resistant grade for hot gas service",
      },
      {
        parameter: "Severe corrosion",
        value: "Hastelloy C-22 (2.4602), Alloy 625 (2.4956)",
        note: "Where stainless will not survive the medium",
      },
      {
        parameter: "Alkaline media",
        value: "Nickel — Ni 99.6, Ni 99.2, LC-Ni 99.2",
        note: "Also used where conductivity is required",
      },
      {
        parameter: "Conductivity or shielding",
        value: "Copper (E-Cu 57), bronze",
        note: "EMI shielding and heat-transfer duty",
      },
      {
        parameter: "Weight-critical",
        value: "Aluminium (Al Mg 5)",
        note: "Where mechanical demands permit",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Industries",
    title: "Separation duty across",
    titleAccent: "process industry",
    intro:
      "Each of these industries has its own failure mode. The mesh that suits one will usually not suit another.",
    cards: [
      {
        image: { src: img.industryPulpPaper, alt: "Paper forming and de-watering line" },
        icon: "layers",
        title: "Pulp & Paper",
        text: "Fibre moulding, paper forming, de-watering and filtering, security watermark.",
      },
      {
        image: { src: img.industryMining, alt: "Mineral separation plant" },
        icon: "container",
        title: "Mining",
        text: "Coal washing, mineral separation, FGD, fertilizers and gypsum.",
      },
      {
        image: { src: img.industryFood, alt: "Food and beverage processing" },
        icon: "droplet",
        title: "Food & Beverage",
        text: "Juicing and process separation duty.",
      },
      {
        image: { src: img.industryChemical, alt: "Chemical processing plant" },
        icon: "flask",
        title: "Chemical",
        text: "Filtration, separation and distillation internals.",
      },
    ],
  },
  why: {
    eyebrow: "Why BVK for filtration",
    title: "The capability the",
    titleAccent: "rest was built on",
    intro:
      "BVK Group entered the technical mesh business through filtration, at a time when woven metallic mesh was primarily a pulp and paper product. Everything since — including the hydrogen work — rests on that base.",
    cards: [
      {
        icon: "building",
        title: "Integrated Plant",
        text: "Weaving, treatment, forming and element fabrication under one roof.",
      },
      {
        icon: "badge",
        title: "Audited Systems",
        text: "ISO 9001, ISO 14001, ISO 45001 and IATF 16949.",
      },
      {
        icon: "scan",
        title: "Traceable Batches",
        text: "100% traceability with documented process and quality control plans.",
      },
      {
        icon: "globe",
        title: "Export Experience",
        text: "Supplying filtration customers in 25+ countries.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.wovenMeshSurface, alt: "Woven mesh surface" },
      title: "Woven Mesh Solutions",
      href: "/woven-mesh-solutions",
    },
    {
      image: { src: img.annealing, alt: "Annealing furnace line" },
      title: "Process & Treatments",
      href: "/process-treatments",
    },
    {
      image: { src: img.flowLab, alt: "Mesh flow testing laboratory" },
      title: "R&D, CFD & Prototyping",
      href: "/rd-cfd-prototyping",
    },
  ],
  cta: standardCta({
    title: "Describe the duty,\nnot just the micron",
    body: "Retention target, medium, temperature, flow rate, allowable pressure drop and cleaning regime. With those six, our team can specify an element properly.",
    brochure: docs.greenEnergy,
  }),
};

export const energyCleanTech: SolutionPageContent = {
  slug: "energy-clean-tech",
  breadcrumb: "Energy & Clean Tech",
  hero: {
    eyebrow: "The hydrogen value chain",
    title: "Energy &",
    titleAccent: "Clean Tech",
    subtitle:
      "Metal mesh components for electrolysis, fuel cells, hydrogen purification and balance-of-plant systems — from a manufacturer running on renewables itself.",
    features: [
      { icon: "bolt", title: "Electrolysis" },
      { icon: "zap", title: "Fuel Cells" },
      { icon: "filter", title: "Purification" },
      { icon: "leaf", title: "Decarbonisation" },
    ],
    primary: { label: "Talk to Our Experts", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.electrolyzerPlant,
      alt: "Stainless steel electrolyser plant installation",
    },
  },
  benefits: [
    {
      icon: "bolt",
      title: "Electrolysis",
      text: "Stack cores, GDL/PTL layers and separators.",
    },
    {
      icon: "zap",
      title: "Fuel Cells",
      text: "Electrode support and mass transport layers.",
    },
    {
      icon: "container",
      title: "Balance of Plant",
      text: "Filter elements for purification and drying.",
    },
    {
      icon: "recycle",
      title: "Low-Carbon Supply",
      text: "50%+ of our own energy from renewables.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Addressing the",
    titleAccent: "challenge",
    body: "Renewable energy is increasingly important as more governments and companies look for clean energy sources, and fuel cells and electrolysers present a significant opportunity. For a number of functions across both products, woven mesh is a preferred option in the industry: its shape, porosity and bonding capability make it a versatile choice. BVK supplies that mesh — and, where the component needs to compress or conform, the knitted equivalent.",
    action: { label: "See the Applications", href: "#components" },
    image: {
      src: img.hydrogenFacility,
      alt: "Hydrogen production facility in a mountain landscape",
    },
    badge: { title: "Nearly two decades", text: "of experience in the energy space" },
  },
  components: {
    eyebrow: "Across the chain",
    title: "Where BVK mesh enters the",
    titleAccent: "hydrogen chain",
    intro:
      "Mesh is not one component in a hydrogen plant. It appears at six separate points, each with its own specification.",
    image: {
      src: img.explodedElectrolyser,
      alt: "Exploded electrolyser stack infographic showing mesh layers",
    },
    callouts: [
      {
        title: "Electrolyser Stack Core",
        text: "Electrode substrates, catalyst support and current collection layers.",
      },
      {
        title: "Nickel Elastic Elements",
        text: "Compressible knitted components maintaining stack contact pressure.",
      },
      {
        title: "BoP Filter Elements",
        text: "Balance-of-plant filtration protecting downstream equipment.",
      },
      {
        title: "Gas Diffusion / PTL",
        text: "Porous transport layers distributing reactant across the active area.",
      },
      {
        title: "Fuel Cell Electrodes",
        text: "Gas diffusion, current collection and electrode support in AFC, SOFC and PEM.",
      },
      {
        title: "Purification & Drying",
        text: "Mesh internals in H₂ purification and drying skids.",
      },
    ],
  },
  process: {
    eyebrow: "How we engage",
    title: "From enquiry to",
    titleAccent: "series supply",
    intro:
      "Clean energy programmes move fast and then stop dead at qualification. This route is built to get through that stage once.",
    steps: [
      {
        icon: "headset",
        title: "Define Conditions",
        text: "Cell chemistry, duty, envelope and volume expectations.",
      },
      {
        icon: "microscope",
        title: "Model & Recommend",
        text: "CFD assessment and material recommendation before tooling.",
      },
      {
        icon: "box",
        title: "Prototype",
        text: "Rapid prototype samples for dimensional and functional checks.",
      },
      {
        icon: "clipboard",
        title: "Validate & Freeze",
        text: "Testing, control plan and Production Part Approval.",
      },
      {
        icon: "truck",
        title: "Series Supply",
        text: "Documented, traceable, repeatable volume production.",
      },
    ],
  },
  features: {
    eyebrow: "Our own footprint",
    title: "Responsibility",
    titleAccent: "in action",
    body: "A clean-energy supply chain is only as clean as the suppliers in it. These are BVK's own numbers, not aspirations for a customer's scope 3 report.",
    points: [
      "50%+ of energy consumption already from renewable sources",
      "Goal of becoming 100% self-reliant on renewables",
      "ESG objectives targeted at 2030",
      "100% reusable and recyclable packaging supporting a circular economy",
      "Digital energy management system driving conservation",
      "ISO 14001 environmental and ISO 50001 energy management systems",
    ],
    image: {
      src: img.solarMountains,
      alt: "Solar farm beneath mountain skies",
    },
    badge: { title: "Helping customers", text: "achieve their own ESG goals" },
  },
  specs: {
    caption: "Mesh by position in the hydrogen chain",
    columns: ["Position", "Mesh form", "Typical material"],
    rows: [
      {
        parameter: "Electrolyser GDL / PTL",
        value: "Knitted, low to medium density",
        note: "Nickel 201/202 for alkaline, titanium for PEM",
      },
      {
        parameter: "Electrode substrate / catalyst support",
        value: "Woven, controlled aperture",
        note: "Nickel, stainless steel, coated",
      },
      {
        parameter: "Current collection",
        value: "Woven or knitted",
        note: "Nickel, copper for conductivity",
      },
      {
        parameter: "Nickel elastic element",
        value: "Knitted, corrugated 4–10 mm",
        note: "Nickel 201/202",
      },
      {
        parameter: "Separator",
        value: "Knitted, medium density (double wire)",
        note: "Nickel, stainless steel",
      },
      {
        parameter: "Fuel cell electrode support",
        value: "Woven or dense knitted",
        note: "Crofer 22 for SOFC, 316L for PEM",
      },
      {
        parameter: "BoP filter element",
        value: "Woven, rated aperture",
        note: "316L, 904L depending on medium",
      },
      {
        parameter: "H₂ purification and drying",
        value: "Woven or fabricated element",
        note: "Stainless steel, nickel alloys",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Applications",
    title: "Clean technology,",
    titleAccent: "real equipment",
    intro:
      "The components below are in service or in development with equipment builders across the hydrogen economy.",
    cards: [
      {
        image: { src: img.solarSunrise, alt: "Solar powered green hydrogen production" },
        icon: "leaf",
        title: "Green Hydrogen Production",
        text: "Electrolysis components for renewable fuel and storage.",
      },
      {
        image: { src: img.refineryPetrochemical, alt: "Petrochemical refinery" },
        icon: "factory",
        title: "Industrial Decarbonisation",
        text: "Cleaner process-energy pathways for heavy industry.",
      },
      {
        image: { src: img.algae, alt: "Aquatic algae biomass" },
        icon: "flask",
        title: "Emerging Clean Tech",
        text: "Bioprocess, water treatment and separation applications.",
      },
      {
        image: { src: img.gasCylinderHall, alt: "Hydrogen storage cylinder hall" },
        icon: "container",
        title: "Storage & Distribution",
        text: "Support and filtration components for hydrogen handling.",
      },
    ],
  },
  why: {
    eyebrow: "Why BVK in clean tech",
    title: "An old plant for a",
    titleAccent: "new industry",
    intro:
      "Hydrogen is a young sector supplied, for the most part, by young companies. BVK brings six decades of weaving discipline to it.",
    cards: [
      {
        icon: "handshake",
        title: "Government R&D Collaboration",
        text: "Joint R&D programmes with the Government of India through DSIR recognition.",
      },
      {
        icon: "network",
        title: "Certified Supply Chain",
        text: "A reliable, certified network enabling risk mitigation and robust supply.",
      },
      {
        icon: "cpu",
        title: "Industry 4.0 Plant",
        text: "MES, predictive maintenance, intelligent machine control and digital twin.",
      },
      {
        icon: "trending",
        title: "Scale Ready",
        text: "650+ MT of metal a year, exporting to 25+ countries.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.electrolyserSplash, alt: "Electrolyser stack" },
      title: "Electrolyser Solutions",
      href: "/electrolyser-solutions",
    },
    {
      image: { src: img.fuelCellMesh, alt: "Fuel cell mesh components" },
      title: "Fuel Cell Solutions",
      href: "/fuel-cell-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Knitted mesh detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
  ],
  cta: standardCta({
    title: "Building clean energy\nequipment?",
    body: "Whether it is an electrolyser stack, a fuel cell, a purification skid or something still on the drawing board, start with the operating conditions and we will work back to the mesh.",
    brochure: docs.greenEnergy,
  }),
};

export const industriesApplications: SolutionPageContent = {
  slug: "industries-applications",
  breadcrumb: "Industries & Applications",
  faqs: [
    {
      question: "Which industries does BVK Hydrotech supply?",
      answer:
        "Ten: automotive, aerospace, pulp and paper, plastic and polymer, food and beverage, chemical, mining, energy, electronics and architecture. BVK currently exports to more than 25 countries.",
    },
    {
      question: "What is wire mesh used for in the automotive industry?",
      answer:
        "Drive technology, hydraulic filters, general filtration and EGR applications. Automotive work is run under the IATF 16949:2016 quality system.",
    },
    {
      question: "How is metal mesh used in aerospace?",
      answer:
        "Principally EMI shielding, where the mesh has to provide electromagnetic screening at low weight. BVK holds AS9100 for aerospace quality management.",
    },
    {
      question: "What does mesh do in pulp and paper production?",
      answer:
        "Fibre moulding, paper forming, de-watering and filtering, and security watermark applications. This was the first industry BVK Group served, from 1963.",
    },
    {
      question: "Can BVK supply mesh for an application not on this list?",
      answer:
        "Usually, yes. The listed industries are where BVK mesh is already specified, not the limit of what it can do. Describe the separation, conduction or support problem and our application team will say honestly whether mesh is the right answer.",
    },
  ],
  hero: {
    eyebrow: "We are present wherever our customers need us",
    title: "Industries &",
    titleAccent: "Applications",
    subtitle:
      "Ten industries, one mesh capability. From paper forming and mineral separation to electrolyser stacks and EMI shielding — exporting to 25+ countries.",
    features: [
      { icon: "globe", title: "25+ Countries" },
      { icon: "shapes", title: "10 Industries" },
      { icon: "flask", title: "14 Alloys" },
      { icon: "factory", title: "Since 1963" },
    ],
    primary: { label: "Find Your Application", href: "#components" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.engineeredMeshRender,
      alt: "Engineered mesh components for multiple industrial applications",
    },
  },
  benefits: [
    { icon: "globe", title: "25+ Export Countries", text: "Presence wherever customers build." },
    { icon: "users", title: "300+ Employees", text: "An integrated weaving organisation." },
    { icon: "trending", title: "650+ MT p.a.", text: "Annual metal volume converted." },
    { icon: "badge", title: "Multi-Sector Certified", text: "IATF, ISO, AS9100 and DSIR." },
  ],
  overview: {
    eyebrow: "Overview",
    title: "The same engineering,",
    titleAccent: "ten different duties",
    body: "A mesh that de-waters pulp and a mesh that sits in an electrolyser stack look like different products. They are not. Both come down to controlling aperture, alloy, surface and form against a known duty. BVK's breadth across industries is not diversification for its own sake — it is the same core capability applied to ten sets of operating conditions, which is also why experience in one sector keeps improving the others.",
    action: { label: "See All Industries", href: "#components" },
    image: {
      src: img.weavingFloor,
      alt: "BVK weaving production floor",
    },
    badge: { title: "One capability", text: "ten sets of conditions" },
  },
  components: {
    eyebrow: "Industries served",
    title: "Where BVK mesh",
    titleAccent: "is specified",
    intro:
      "The sub-applications below are the specific duties BVK supplies into, taken directly from our industry collateral.",
    image: {
      src: img.meshRoll,
      alt: "Precision metal mesh roll ready for conversion",
    },
    callouts: [
      {
        title: "Automotive",
        text: "Drive technology, hydraulic filter, filter, EGR.",
      },
      {
        title: "Pulp & Paper",
        text: "Fibre moulding, paper forming, de-watering and filtering, security watermark.",
      },
      {
        title: "Chemical",
        text: "Filtration and separation, distillation.",
      },
      {
        title: "Aerospace",
        text: "EMI shielding.",
      },
      {
        title: "Mining",
        text: "Coal washing, mineral separation, FGD, fertilizers, gypsum.",
      },
      {
        title: "Energy",
        text: "Electrolysis and fuel cell components.",
      },
    ],
  },
  features: {
    eyebrow: "Also served",
    title: "Electronics and",
    titleAccent: "architecture",
    body: "Four further sectors take BVK mesh for reasons that have little to do with filtration — electrical behaviour, mechanical protection, or simply how it looks.",
    points: [
      "Electronics — EMI shielding and precision screening components",
      "Architecture — interior screens, facades and decorative metal fabric",
      "Food & beverage — juicing and process separation",
      "Plastic & polymer — fibre and filament production",
      "Battery systems — cell separation and cooling applications",
      "Sensor protection — mesh guards for instrumentation",
      "E-mobility components — stainless and nickel alloy meshes to IATF standards",
      "Bioreactors and healthcare — process separation in controlled environments",
    ],
    image: {
      src: img.industryElectronics,
      alt: "Electronics manufacturing application for precision mesh",
    },
    badge: { title: "Deco Mesh Solutions", text: "the group's architectural mesh arm" },
  },
  specs: {
    caption: "Industry, application and typical mesh",
    columns: ["Industry", "Applications served", "Typical mesh"],
    rows: [
      {
        parameter: "Automotive",
        value: "Drive technology, hydraulic filter, filter, EGR",
        note: "Woven stainless, IATF 16949 control",
      },
      {
        parameter: "Aerospace",
        value: "EMI shielding",
        note: "Woven copper and stainless, AS9100",
      },
      {
        parameter: "Pulp & Paper",
        value: "Fibre moulding, paper forming, de-watering, security watermark",
        note: "Woven stainless and bronze",
      },
      {
        parameter: "Plastic & Polymer",
        value: "Fibre and filaments",
        note: "Woven stainless, multi-layer packs",
      },
      {
        parameter: "Food & Beverage",
        value: "Juicing, process separation",
        note: "Woven 316L",
      },
      {
        parameter: "Chemical",
        value: "Filtration and separation, distillation",
        note: "Woven 316L, 904L, Hastelloy C-22",
      },
      {
        parameter: "Mining",
        value: "Coal washing, mineral separation, FGD, fertilizers, gypsum",
        note: "Heavy woven stainless",
      },
      {
        parameter: "Energy",
        value: "Electrolysis, fuel cells",
        note: "Woven and knitted nickel, titanium, Crofer",
      },
      {
        parameter: "Electronics",
        value: "Shielding and precision screening",
        note: "Fine woven copper and stainless",
      },
      {
        parameter: "Architecture",
        value: "Interiors, exteriors",
        note: "Decorative woven and knitted mesh",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Sector snapshot",
    title: "Four industries,",
    titleAccent: "four problems",
    intro:
      "A closer look at what the mesh is actually solving in each — because the duty, not the sector name, drives the specification.",
    cards: [
      {
        image: { src: img.industryAerospace, alt: "Aerospace application" },
        icon: "plane",
        title: "Aerospace",
        text: "EMI shielding where weight and reliability both matter.",
      },
      {
        image: { src: img.industryAutomotive, alt: "Automotive application" },
        icon: "truck",
        title: "Automotive",
        text: "Hydraulic and EGR filtration under IATF 16949 discipline.",
      },
      {
        image: { src: img.industryEnergy, alt: "Energy application" },
        icon: "zap",
        title: "Energy",
        text: "Electrolysis and fuel cell stack internals.",
      },
      {
        image: { src: img.industryElectronics, alt: "Electronics application" },
        icon: "circuit",
        title: "Electronics",
        text: "Precision screening and shielding components.",
      },
    ],
  },
  why: {
    eyebrow: "Why breadth matters",
    title: "Experience that",
    titleAccent: "transfers",
    intro:
      "Solving a de-watering problem in paper teaches something about flow through a porous layer. That knowledge shows up later in a gas diffusion layer. The sectors are different; the physics is not.",
    cards: [
      {
        icon: "microscope",
        title: "Cross-Sector R&D",
        text: "CFD and flow work developed in one industry applied in another.",
      },
      {
        icon: "clipboard",
        title: "Automotive Discipline",
        text: "IATF 16949 process control applied across all sectors, not just automotive.",
      },
      {
        icon: "flask",
        title: "Alloy Library",
        text: "Fourteen catalogued materials, each already proven somewhere in the portfolio.",
      },
      {
        icon: "handshake",
        title: "Long Relationships",
        text: "Export customers across 25+ countries, many of them repeat programmes.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.filterElementCutaway, alt: "Filter element cutaway" },
      title: "Industrial Filtration",
      href: "/industrial-filtration",
    },
    {
      image: { src: img.electrolyzerPlant, alt: "Electrolyser plant" },
      title: "Energy & Clean Tech",
      href: "/energy-clean-tech",
    },
    {
      image: { src: img.meshRoll, alt: "Precision mesh roll" },
      title: "Precision Mesh Solutions",
      href: "/precision-mesh-solutions",
    },
  ],
  cta: standardCta({
    title: "Your industry not\nlisted here?",
    body: "The list reflects where BVK mesh is already specified, not the limit of what it can do. If you have a separation, conduction or support problem, describe it and we will tell you honestly whether mesh is the answer.",
    brochure: docs.greenEnergy,
  }),
};
