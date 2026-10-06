import type { SolutionPageContent } from "@/lib/content/types";
import { docs, img } from "../assets";
import { sustainabilityBand, standardCta } from "../shared";

/**
 * Product pages. Every specification here is traceable to BVK's own
 * collateral — see docs/KNOWLEDGE-BASE.md. Nothing is estimated.
 */

export const electrolyserSolutions: SolutionPageContent = {
  slug: "electrolyser-solutions",
  breadcrumb: "Electrolyser Solutions",
  hero: {
    eyebrow: "Clean energy. Real impact.",
    title: "Electrolyser",
    titleAccent: "Solutions",
    subtitle:
      "High-performance mesh materials and precision components for efficient, reliable and scalable green hydrogen production.",
    features: [
      { icon: "bolt", title: "High Efficiency" },
      { icon: "shield", title: "Robust & Durable" },
      { icon: "leaf", title: "Sustainable Hydrogen" },
      { icon: "wrench", title: "Custom Engineered" },
    ],
    primary: { label: "Talk to Our Experts", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.hydrogenLeaflet, external: true },
    image: {
      src: img.electrolyserSplash,
      alt: "Electrolyser stack surrounded by hydrogen bubbles in blue water",
    },
  },
  benefits: [
    {
      icon: "gauge",
      title: "High Efficiency",
      text: "Porosity tuned for reactant flow and stack contact.",
    },
    {
      icon: "shield",
      title: "Robust & Durable",
      text: "Nickel, titanium, stainless steel and specialty alloys.",
    },
    {
      icon: "bars",
      title: "Scalable Supply",
      text: "Prototype to sustainable volume production.",
    },
    {
      icon: "wrench",
      title: "Custom Engineered",
      text: "Mesh architecture set around cell chemistry and fit.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Engineered for a",
    titleAccent: "Hydrogen-Powered Future",
    body: "BVK Hydrotech supports alkaline and PEM electrolyser builders with precision woven and knitted mesh. Our mesh helps control porosity, improve conductivity, support catalyst layers and keep stack-fit components consistent from prototype to series supply.",
    action: { label: "Explore Our Solutions", href: "#components" },
    image: {
      src: img.hydrogenInspection,
      alt: "Engineer inspecting an electrolyser assembly on a hydrogen plant platform",
    },
    badge: { title: "Building Blocks", text: "for a cleaner hydrogen value chain" },
  },
  components: {
    eyebrow: "What we offer",
    title: "Material & Component Solutions",
    titleAccent: "for Electrolysers",
    intro:
      "From porous transport layers to custom metal mesh components, engineered for reliable hydrogen generation.",
    image: {
      src: img.explodedStainless,
      alt: "Exploded electrolyser assembly showing end plates, mesh layers and stack structure",
    },
    callouts: [
      {
        title: "GDL / PTL Mesh",
        text: "Gas diffusion and porous transport layers for alkaline and PEM stacks.",
      },
      {
        title: "Catalyst Support",
        text: "Coating-ready surface area that carries the catalyst layer.",
      },
      {
        title: "Flow Control",
        text: "Porosity and wire profile tuned to manage gas and liquid movement.",
      },
      {
        title: "Nickel Elastic Elements",
        text: "Stack-conformable separators and elastic mesh parts.",
      },
      {
        title: "Current Collection",
        text: "Conductive metal pathways for current collection and distribution.",
      },
      {
        title: "Custom Components",
        text: "Cut, corrugated, flattened, coated or plated to drawing.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "From water to",
    titleAccent: "clean hydrogen",
    intro:
      "Electrolysis splits water into hydrogen and oxygen using renewable electricity, enabling a carbon-free energy carrier.",
    steps: [
      { icon: "droplet", title: "Water Feed", text: "Feed stream enters the electrolyser system." },
      {
        icon: "bolt",
        title: "Electrolysis",
        text: "Renewable electricity splits water into H2 and O2.",
      },
      {
        icon: "spark",
        title: "Hydrogen Output",
        text: "High-purity hydrogen is produced for use or storage.",
        symbol: "H2",
      },
      {
        icon: "waves",
        title: "Oxygen By-product",
        text: "Oxygen is vented, captured or routed as needed.",
        symbol: "O2",
      },
      {
        icon: "leaf",
        title: "Clean Energy",
        text: "Green hydrogen supports low-carbon industrial systems.",
      },
    ],
  },
  features: {
    eyebrow: "Key features",
    title: "Engineered for",
    titleAccent: "Performance",
    body: "Precision woven and knitted metal mesh delivers the permeability, conductivity and mechanical conformity your electrolyser stack needs.",
    points: [
      "Wire diameter range from 0.05 mm to 0.30 mm",
      "Single, double and multi-end knitted mesh options",
      "Single-piece diameter capability up to 2.2 m",
      "Nickel 201/202, titanium, stainless steel and specialty alloys",
      "ASTM B164, ISO 9044 and ISO 22734-ready QMS references",
    ],
    image: {
      src: img.heatExchangerLine,
      alt: "Precision electrolyser assemblies on a hydrogen plant production line",
    },
    badge: { title: "Stack-tunable porosity", text: "Conductivity and pore size set per cell" },
  },
  specs: {
    caption: "Electrolyser mesh specification range",
    columns: ["Parameter", "Range", "Why it matters"],
    rows: [
      {
        parameter: "Wire diameter",
        value: "0.05 mm – 0.30 mm",
        note: "Sets pore size, surface area and stiffness of the layer",
      },
      {
        parameter: "Knit type",
        value: "Single, double and multi-end",
        note: "Controls GDL density and conductive path count",
      },
      {
        parameter: "Single-piece diameter",
        value: "Up to 2.2 m",
        note: "Avoids seams in large circular stack components",
      },
      {
        parameter: "Materials",
        value: "Nickel 201 / 202, titanium, stainless steel, Hastelloy, specialty alloys",
        note: "Selected per alkaline or PEM cell chemistry",
      },
      {
        parameter: "Corrugation",
        value: "4 – 10 mm",
        note: "Tunes elasticity and contact pressure in the stack",
      },
      {
        parameter: "Needle gauge",
        value: "1 / 2 / 3+",
        note: "With stitch length, sets pore size and cell fit",
      },
      {
        parameter: "Surface treatment",
        value: "Degreased, annealed, coated or plated",
        note: "Cleanliness, conductivity and corrosion resistance",
      },
      {
        parameter: "Forming",
        value: "Crimped, corrugated (herringbone, W, V), flattened, laser-cut",
        note: "Matches the component envelope without secondary work",
      },
      {
        parameter: "Standards referenced",
        value: "ASTM B164, ISO 9044, DSIR-RDI, ISO 22734-ready QMS",
        note: "Supports stack qualification and audit packs",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Applications",
    title: "Powering Multiple",
    titleAccent: "Industries",
    intro:
      "BVK components support clean hydrogen production, storage, balance-of-plant systems and industrial decarbonisation.",
    cards: [
      {
        image: { src: img.solarSunrise, alt: "Solar farm at sunrise powering green hydrogen production" },
        icon: "leaf",
        title: "Green Hydrogen Production",
        text: "Electrolysis components for renewable fuel and storage.",
      },
      {
        image: { src: img.refineryCleanEnergy, alt: "Clean energy refinery at golden hour" },
        icon: "factory",
        title: "Industrial Decarbonisation",
        text: "Cleaner process-energy pathways for heavy industry.",
      },
      {
        image: { src: img.gasCylinderHall, alt: "Industrial gas cylinder storage hall" },
        icon: "box",
        title: "Hydrogen Storage & BoP",
        text: "Mesh elements for support, purification and drying skids.",
      },
      {
        image: { src: img.mistNozzles, alt: "Precision stainless steel mist nozzles in operation" },
        icon: "circuit",
        title: "Specialty Gas Systems",
        text: "High-purity hydrogen support for critical applications.",
      },
    ],
  },
  why: {
    eyebrow: "Why choose BVK Hydrotech",
    title: "Trusted Partner for",
    titleAccent: "Electrolyser Components",
    intro:
      "BVK combines advanced material science, precision manufacturing and deep industry expertise to deliver components that meet demanding performance and reliability expectations.",
    cards: [
      {
        icon: "microscope",
        title: "R&D Led",
        text: "CFD, rapid prototyping, material recommendation and mesh design optimisation.",
      },
      {
        icon: "badge",
        title: "Certified Systems",
        text: "IATF 16949, ISO 9001, ISO 14001 and ISO 45001 backed manufacturing.",
      },
      {
        icon: "factory",
        title: "Integrated Production",
        text: "Weaving, knitting, treatments, inspection and documentation under one route.",
      },
      {
        icon: "recycle",
        title: "Sustainability Focus",
        text: "50%+ energy needs powered through renewables, with a 100% self-reliance goal.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.membraneRoll, alt: "Close-up of a precision metal mesh roll" },
      title: "Advanced Mesh Materials",
      href: "/precision-mesh-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Macro detail of interwoven steel mesh" },
      title: "Precision Component Manufacturing",
      href: "/engineering-manufacturing",
    },
    {
      image: { src: img.mistNozzles, alt: "Quality inspection of precision stainless components" },
      title: "Quality & Performance Assurance",
      href: "/rd-cfd-prototyping",
    },
  ],
  cta: standardCta({
    title: "Ready to Accelerate\nYour Hydrogen Journey?",
    body: "Connect with BVK experts to discuss electrolyser mesh, stack-fit components, material selection and prototype-to-production supply.",
    brochure: docs.hydrogenLeaflet,
  }),
};

export const fuelCellSolutions: SolutionPageContent = {
  slug: "fuel-cell-solutions",
  breadcrumb: "Fuel Cell Solutions",
  hero: {
    eyebrow: "Electrochemical power",
    title: "Fuel Cell",
    titleAccent: "Solutions",
    subtitle:
      "Woven and knitted metal mesh for gas diffusion, current collection and electrode support in AFC, SOFC and PEM stacks.",
    features: [
      { icon: "zap", title: "High Conductivity" },
      { icon: "wind", title: "Gas Diffusion" },
      { icon: "layers", title: "Electrode Support" },
      { icon: "target", title: "Low Pressure Drop" },
    ],
    primary: { label: "Discuss Your Stack", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.fuelCellStackAlt,
      alt: "Exploded fuel cell stack showing bipolar plates, frames and woven mesh layers",
    },
  },
  benefits: [
    {
      icon: "zap",
      title: "Current Collection",
      text: "Conductive pathways for collection and distribution.",
    },
    {
      icon: "wind",
      title: "Improved Gas Diffusion",
      text: "Open structure supports reactant transport.",
    },
    {
      icon: "shield",
      title: "Deformation Resistant",
      text: "Holds geometry under stack compression.",
    },
    {
      icon: "combine",
      title: "Flexible Integration",
      text: "Porosity and form matched to the cell design.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Mesh built into the",
    titleAccent: "fuel cell stack",
    body: "A fuel cell converts hydrogen and oxygen into electricity, with water and heat as the only outputs. Inside the stack, metal mesh sits between the base plate, frame, interconnector and top plate, where it has to move gas, carry current and hold its shape under compression at the same time. BVK selects the weave or knit, the alloy and the finishing route around those four demands together.",
    action: { label: "See Mesh Functions", href: "#components" },
    image: {
      src: img.heatExchangerLine,
      alt: "Fuel cell stack components on an assembly line",
    },
    badge: { title: "AFC · SOFC · PEM", text: "compatible component families" },
  },
  components: {
    eyebrow: "The mesh advantage",
    title: "Where mesh earns its place in a",
    titleAccent: "fuel cell",
    intro:
      "Parameters are set to suit your cell: mass transport, electrical conductivity, pressure drop and mechanical strength are traded against each other deliberately, not by accident.",
    image: {
      src: img.explodedPlate,
      alt: "Exploded plate assembly showing stacked fuel cell layers and mesh interlayers",
    },
    callouts: [
      {
        title: "High Conductivity",
        text: "A continuous metallic network keeps electrical resistance low across the active area.",
      },
      {
        title: "Improved Gas Diffusion",
        text: "Open porosity distributes reactant gas evenly over the electrode face.",
      },
      {
        title: "Porosity",
        text: "Weave or knit parameters set open area without losing structural integrity.",
      },
      {
        title: "Current Collection & Distribution",
        text: "Mesh collects current from the electrode and spreads it to the interconnector.",
      },
      {
        title: "Resistance to Deformation",
        text: "The structure holds its thickness and contact pressure under stack clamping load.",
      },
      {
        title: "Flexibility",
        text: "Knitted forms conform to irregular and layered component designs.",
      },
    ],
  },
  features: {
    eyebrow: "Design inputs",
    title: "Parameters set to",
    titleAccent: "suit your cell",
    body: "Give us the operating envelope and the mesh follows from it. These are the four inputs that decide the specification, and they are the first things our application team will ask for.",
    points: [
      "Mass transport — required reactant flow across the electrode area",
      "Electrical conductivity — target resistance and current density",
      "Pressure drop — allowable loss across the diffusion layer",
      "Mechanical strength — clamping load and deformation limits",
      "Cell chemistry — alkaline, solid oxide or polymer electrolyte membrane",
      "Envelope — active area, thickness budget and sealing geometry",
    ],
    image: {
      src: img.fuelCellMesh,
      alt: "Fuel cell mesh components laid out for assembly",
    },
    badge: { title: "Four competing demands", text: "balanced in one specification" },
  },
  specs: {
    caption: "Fuel cell mesh selection reference",
    columns: ["Parameter", "Option", "Typical driver"],
    rows: [
      {
        parameter: "Cell chemistry",
        value: "AFC, SOFC, PEM",
        note: "Determines alloy, operating temperature and corrosion exposure",
      },
      {
        parameter: "Mesh form",
        value: "Woven or knitted",
        note: "Woven for stable aperture; knitted for conformability and porosity",
      },
      {
        parameter: "Stainless grades",
        value: "304, 304L, 316, 316L, 314, 904L",
        note: "General corrosion resistance and formability",
      },
      {
        parameter: "Nickel grades",
        value: "Ni 99.6, Ni 99.2, LC-Ni 99.2",
        note: "Conductivity and alkaline compatibility",
      },
      {
        parameter: "High-temperature alloys",
        value: "Crofer 22 (1.4760), Hastelloy C-22, Alloy 625",
        note: "Solid oxide operating temperatures and aggressive media",
      },
      {
        parameter: "Stack positions served",
        value: "Base plate, cell, frame, interconnector, top plate interfaces",
        note: "Mesh is specified per interface, not once per stack",
      },
      {
        parameter: "Finishing",
        value: "Degreased, annealed, coated, plated, laser-cut",
        note: "Contact resistance, cleanliness and assembly fit",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Applications",
    title: "Fuel cells across",
    titleAccent: "mobility and power",
    intro:
      "Fuel cell components built on BVK mesh appear wherever electrochemical power has to be compact, clean and reliable.",
    cards: [
      {
        image: { src: img.industryAutomotive, alt: "Automotive fuel cell components" },
        icon: "truck",
        title: "Mobility & Transport",
        text: "Stack components for fuel cell drive systems.",
      },
      {
        image: { src: img.industryEnergy, alt: "Stationary hydrogen power installation" },
        icon: "zap",
        title: "Stationary Power",
        text: "Backup and distributed generation installations.",
      },
      {
        image: { src: img.industryAerospace, alt: "Aerospace application of fuel cell technology" },
        icon: "plane",
        title: "Aerospace & Defence",
        text: "Lightweight power and EMI shielding components.",
      },
      {
        image: { src: img.industryElectronics, alt: "Electronics and precision manufacturing" },
        icon: "circuit",
        title: "Specialty Systems",
        text: "Precision components for low-volume, high-spec builds.",
      },
    ],
  },
  why: {
    eyebrow: "Why BVK for fuel cells",
    title: "Component supply that",
    titleAccent: "survives qualification",
    intro:
      "Fuel cell programmes fail on repeatability more often than on first-sample performance. BVK is built around the second problem.",
    cards: [
      {
        icon: "clipboard",
        title: "PPA Discipline",
        text: "Production Part Approval procedure and standardised control plans before series release.",
      },
      {
        icon: "scan",
        title: "100% Traceability",
        text: "Batch-level records, light-box and video inspection, custom-made testing equipment.",
      },
      {
        icon: "badge",
        title: "IATF 16949",
        text: "Automotive-grade quality system, alongside ISO 9001, 14001 and 45001.",
      },
      {
        icon: "flask",
        title: "Material Breadth",
        text: "Fourteen catalogued alloys from 304 stainless to Hastelloy C-22 and LC-Ni 99.2.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.wovenMeshSurface, alt: "Precision woven mesh surface" },
      title: "Woven Mesh Solutions",
      href: "/woven-mesh-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Knitted mesh macro detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
    {
      image: { src: img.electrolyserSplash, alt: "Electrolyser stack in water" },
      title: "Electrolyser Solutions",
      href: "/electrolyser-solutions",
    },
  ],
  cta: standardCta({
    title: "Specifying a fuel cell\nmesh component?",
    body: "Send the cell chemistry, active area, target pressure drop and clamping load. Our application team will come back with a mesh route and a validation plan.",
    brochure: docs.greenEnergy,
  }),
};

export const precisionMeshSolutions: SolutionPageContent = {
  slug: "precision-mesh-solutions",
  breadcrumb: "Precision Mesh Solutions",
  hero: {
    eyebrow: "Mesh expertise from weaving to coating",
    title: "Precision Mesh",
    titleAccent: "Solutions",
    subtitle:
      "Woven and knitted metal mesh engineered around your application — not pulled from a catalogue. Fourteen catalogued alloys, controlled apertures and finishing in one plant.",
    features: [
      { icon: "layers", title: "Woven Mesh" },
      { icon: "spool", title: "Knitted Mesh" },
      { icon: "scissors", title: "Formed Parts" },
      { icon: "flask", title: "Alloy Range" },
    ],
    primary: { label: "Request a Recommendation", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.meshRoll,
      alt: "Roll of precision metal mesh",
    },
  },
  benefits: [
    {
      icon: "ruler",
      title: "Controlled Apertures",
      text: "Repeatable opening size across the roll.",
    },
    {
      icon: "flask",
      title: "14 Catalogued Alloys",
      text: "Stainless, nickel, copper and aluminium families.",
    },
    {
      icon: "cog",
      title: "Integrated Finishing",
      text: "Treatment, forming and cutting in-house.",
    },
    {
      icon: "scan",
      title: "100% Traceability",
      text: "Batch records from material to dispatch.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Two mesh families,",
    titleAccent: "one engineering decision",
    body: "Woven mesh and knitted mesh solve different problems. Woven mesh gives you a stable, repeatable opening — the right answer when retention and flow have to be predictable. Knitted mesh gives you porosity and the ability to deform into a shape — the right answer when the part has to fit a stack or absorb load. The first thing BVK does on any enquiry is work out which of the two your component actually needs.",
    action: { label: "Compare the Families", href: "#components" },
    image: {
      src: img.weavingFloor,
      alt: "BVK weaving production floor with looms in operation",
    },
    badge: { title: "Since 1963", text: "integrated weaving plant in Jaipur" },
  },
  components: {
    eyebrow: "Capability",
    title: "What a precision mesh",
    titleAccent: "component involves",
    intro:
      "Six decisions stand between an enquiry and a part that works. BVK makes all six in-house, which is why they stay consistent from the first sample to the hundredth batch.",
    image: {
      src: img.wovenMeshSurface,
      alt: "Precision woven mesh surface at close range",
    },
    callouts: [
      {
        title: "Material Selection",
        text: "Alloy chosen against corrosion, temperature, conductivity and cost.",
      },
      {
        title: "Treatment",
        text: "Annealing, degreasing, coating or plating to change how the mesh behaves.",
      },
      {
        title: "Inspection",
        text: "Light-box and video inspection against a documented control plan.",
      },
      {
        title: "Mesh Geometry",
        text: "Aperture, wire diameter, knit density and weave pattern set the performance.",
      },
      {
        title: "Forming",
        text: "Crimping, corrugation, flattening, slitting and laser cutting to final shape.",
      },
      {
        title: "Documentation",
        text: "Traceability records, control plans and PPA packs for qualification.",
      },
    ],
  },
  features: {
    eyebrow: "Selection guide",
    title: "Choosing between",
    titleAccent: "woven and knitted",
    body: "There is no universally better mesh. There is only the one that suits your duty. This is the shortlist our engineers work through before recommending either.",
    points: [
      "Need a defined, repeatable opening size — choose woven",
      "Need high porosity and low weight — choose knitted",
      "Part must hold a flat, stable geometry — choose woven",
      "Part must conform to an irregular or layered shape — choose knitted",
      "Filtration with a stated retention rating — choose woven",
      "Elastic element, demister or compressible layer — choose knitted",
    ],
    image: {
      src: img.stainlessMeshRoll,
      alt: "Industrial stainless steel mesh roll",
    },
    badge: { title: "Not sure?", text: "Send the duty — we will specify it" },
  },
  specs: {
    caption: "Catalogued material range",
    columns: ["Material no.", "Description", "AISI / UNS"],
    rows: [
      { parameter: "1.4301", value: "X5 Cr Ni 18 10 (V2A)", note: "304" },
      { parameter: "1.4306", value: "X5 Cr Ni 18 11", note: "304L" },
      { parameter: "1.4401", value: "X5 Cr Ni Mo 17 12 2 (V4A)", note: "316" },
      { parameter: "1.4404", value: "X5 Cr Ni Mo 17 12 2", note: "316L" },
      { parameter: "1.4841", value: "X10 Cr Ni Si 25 20", note: "314" },
      { parameter: "1.4539", value: "X1 Cr Ni Mo Cu 25 20 5", note: "904L" },
      { parameter: "1.4760", value: "X1 Cr Ti La 22 (Crofer)", note: "S 44535" },
      { parameter: "2.4602", value: "Ni Cr 21 Mo 14 W (Hastelloy C-22)", note: "N 06022" },
      { parameter: "2.4956", value: "Ni Cr 22 Mo 9 Nb", note: "N 06625" },
      { parameter: "2.4060", value: "Ni 99.6", note: "N 02200" },
      { parameter: "2.4066", value: "Ni 99.2", note: "N 02200" },
      { parameter: "2.4068", value: "LC-Ni 99.2", note: "N 02201" },
      { parameter: "2.0060", value: "Copper", note: "E-Cu 57" },
      { parameter: "3.3555", value: "Aluminium", note: "Al Mg 5" },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Where it is used",
    title: "One mesh capability,",
    titleAccent: "many industries",
    intro:
      "The same weaving and knitting capability serves clean energy and long-established process industries, because the underlying engineering is the same.",
    cards: [
      {
        image: { src: img.industryEnergy, alt: "Hydrogen and energy applications" },
        icon: "zap",
        title: "Energy",
        text: "Electrolysis and fuel cell stack components.",
      },
      {
        image: { src: img.industryAutomotive, alt: "Automotive filtration components" },
        icon: "truck",
        title: "Automotive",
        text: "Drive technology, hydraulic filters, filters and EGR.",
      },
      {
        image: { src: img.industryChemical, alt: "Chemical process plant" },
        icon: "flask",
        title: "Chemical",
        text: "Filtration, separation and distillation internals.",
      },
      {
        image: { src: img.industryPulpPaper, alt: "Pulp and paper production line" },
        icon: "layers",
        title: "Pulp & Paper",
        text: "Fibre moulding, paper forming and de-watering.",
      },
    ],
  },
  why: {
    eyebrow: "Why BVK Hydrotech",
    title: "Six decades of",
    titleAccent: "weaving discipline",
    intro:
      "BVK Group entered technical mesh in 1963, when woven metallic mesh was still mostly a pulp and paper product. Everything since has been built on that weaving base.",
    cards: [
      {
        icon: "building",
        title: "Integrated Plant",
        text: "German-origin equipment and one of India's largest weaving platforms.",
      },
      {
        icon: "globe",
        title: "25+ Export Countries",
        text: "Supplying customers wherever their equipment is built.",
      },
      {
        icon: "microscope",
        title: "DSIR-Recognised R&D",
        text: "In-house R&D centre recognised by the Government of India.",
      },
      {
        icon: "users",
        title: "300+ People",
        text: "650+ MT of metal converted into mesh each year.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.wovenMeshSurface, alt: "Woven mesh surface detail" },
      title: "Woven Mesh Solutions",
      href: "/woven-mesh-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Knitted mesh macro detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
    {
      image: { src: img.annealing, alt: "Annealing furnace line" },
      title: "Process & Treatments",
      href: "/process-treatments",
    },
  ],
  cta: standardCta({
    title: "Not sure which mesh\nyour part needs?",
    body: "That is the normal starting point. Send the duty, the medium and the envelope, and our application team will tell you whether woven or knitted is the right route — and why.",
    brochure: docs.greenEnergy,
  }),
};

export const wovenMeshSolutions: SolutionPageContent = {
  slug: "woven-mesh-solutions",
  breadcrumb: "Woven Mesh Solutions",
  hero: {
    eyebrow: "Controlled apertures",
    title: "Woven Mesh",
    titleAccent: "Solutions",
    subtitle:
      "Woven wire mesh with a stable, repeatable opening — for filtration with a stated rating, electrode support and components that must hold their geometry.",
    features: [
      { icon: "ruler", title: "Stable Aperture" },
      { icon: "filter", title: "Rated Filtration" },
      { icon: "zap", title: "Conductive Support" },
      { icon: "shapes", title: "Weave Range" },
    ],
    primary: { label: "Specify Woven Mesh", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.wovenMeshSurface,
      alt: "Precision woven wire mesh surface",
    },
  },
  benefits: [
    {
      icon: "ruler",
      title: "Repeatable Opening",
      text: "Aperture holds across the roll and between batches.",
    },
    {
      icon: "gauge",
      title: "Predictable Flow",
      text: "Retention and pressure drop balanced by design.",
    },
    {
      icon: "layers3",
      title: "3D Surface Network",
      text: "Weave increases surface area for coating and contact.",
    },
    {
      icon: "cog",
      title: "Post-Weave Finishing",
      text: "Annealing, coating, cutting and forming in-house.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "When the opening size",
    titleAccent: "has to be right",
    body: "Woven mesh is the answer whenever performance depends on a defined aperture: a filter with a retention rating, a screen with a flow specification, an electrode substrate whose porosity is part of the cell design. BVK controls that aperture through weaving parameters — wire diameter, weave pattern and mesh count — and then holds it through documented control plans so the hundredth roll behaves like the first.",
    action: { label: "See Mesh Functions", href: "#components" },
    image: {
      src: img.weavingMachine,
      alt: "Precision mesh weaving machine in operation",
    },
    badge: { title: "Weave to coating", text: "one controlled process route" },
  },
  components: {
    eyebrow: "Function",
    title: "What woven mesh",
    titleAccent: "actually does",
    intro:
      "Three functions carry most woven mesh applications. Each one is set by a different weaving parameter, which is why they can be tuned independently.",
    image: {
      src: img.stainlessMesh,
      alt: "Stainless steel woven mesh sample",
    },
    callouts: [
      {
        title: "Porosity Control",
        text: "By adjusting weaving parameters we control porosity precisely, which sets gas flow through the electrode and therefore efficiency.",
      },
      {
        title: "Surface-Area Coating",
        text: "Proven coating technologies applied to the woven mesh enhance surface area, improving hydrogen production and stack efficiency.",
      },
      {
        title: "Retention & Flow",
        text: "Aperture and wire size are balanced against retention rate, flow value and allowable pressure drop.",
      },
      {
        title: "Conductivity",
        text: "The woven structure creates a three-dimensional network that significantly increases surface area, improving conductivity.",
      },
      {
        title: "Mechanical Stability",
        text: "A woven geometry resists deformation, keeping the opening consistent under load.",
      },
      {
        title: "Bubble Point",
        text: "Characterised where the application requires a verified largest-pore measurement.",
      },
    ],
  },
  features: {
    eyebrow: "Engineering support",
    title: "Specified with",
    titleAccent: "evidence, not guesswork",
    body: "Before a woven specification is released, BVK's engineering team can model and test it. This is where a mesh choice stops being a catalogue lookup.",
    points: [
      "CFD analysis of flow dynamics within the mesh structure",
      "Prototyping and simulation assessments before tooling",
      "Cost evaluation across alternative weave and alloy routes",
      "Material recommendations against chemistry and temperature",
      "Mesh design optimisation for the specific component",
      "Ability to work to close tolerances",
    ],
    image: {
      src: img.wireMeshLine,
      alt: "Industrial wire mesh production line",
    },
    badge: { title: "DSIR-recognised", text: "in-house R&D centre" },
  },
  specs: {
    caption: "Woven mesh alloy selection",
    columns: ["Family", "Grades", "Selected for"],
    rows: [
      {
        parameter: "Austenitic stainless",
        value: "304, 304L, 316, 316L",
        note: "General corrosion resistance, formability, cost",
      },
      {
        parameter: "Heat-resistant stainless",
        value: "314 (1.4841)",
        note: "Elevated operating temperature",
      },
      {
        parameter: "Super austenitic",
        value: "904L (1.4539)",
        note: "Aggressive chloride and acid service",
      },
      {
        parameter: "Ferritic specialty",
        value: "Crofer 22 (1.4760)",
        note: "Solid oxide cell interconnect environments",
      },
      {
        parameter: "Nickel",
        value: "Ni 99.6, Ni 99.2, LC-Ni 99.2",
        note: "Conductivity and alkaline compatibility",
      },
      {
        parameter: "Nickel alloys",
        value: "Hastelloy C-22 (2.4602), Alloy 625 (2.4956)",
        note: "Severe corrosion and high temperature",
      },
      {
        parameter: "Copper",
        value: "E-Cu 57 (2.0060)",
        note: "Electrical conductivity, shielding, heat transfer",
      },
      {
        parameter: "Aluminium",
        value: "Al Mg 5 (3.3555)",
        note: "Low weight where strength allows",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Applications",
    title: "Woven mesh across",
    titleAccent: "process and energy",
    intro:
      "Woven mesh has served industrial process plants for six decades. The same capability now goes into hydrogen equipment.",
    cards: [
      {
        image: { src: img.industryPulpPaper, alt: "Paper forming line" },
        icon: "layers",
        title: "Pulp & Paper",
        text: "Fibre moulding, paper forming, de-watering, security watermark.",
      },
      {
        image: { src: img.industryChemical, alt: "Chemical distillation column" },
        icon: "flask",
        title: "Chemical",
        text: "Filtration, separation and distillation internals.",
      },
      {
        image: { src: img.industryEnergy, alt: "Electrolysis equipment" },
        icon: "zap",
        title: "Energy",
        text: "Electrode substrates, catalyst support and current collection.",
      },
      {
        image: { src: img.industryMining, alt: "Mineral separation plant" },
        icon: "container",
        title: "Mining",
        text: "Coal washing, mineral separation, FGD, fertilizers, gypsum.",
      },
    ],
  },
  why: {
    eyebrow: "Why BVK woven mesh",
    title: "Built to be",
    titleAccent: "re-ordered",
    intro:
      "A first sample is easy. The commercial problem is the fiftieth delivery matching it. BVK's process route is designed around that.",
    cards: [
      {
        icon: "clipboard",
        title: "Control Plans",
        text: "Standardised control plans and Production Part Approval before series supply.",
      },
      {
        icon: "scan",
        title: "Inspection Regime",
        text: "Light-box and video inspection with custom-made testing equipment.",
      },
      {
        icon: "route",
        title: "Integrated Route",
        text: "Weaving, treatment, forming and inspection without an external handoff.",
      },
      {
        icon: "fileCheck",
        title: "Documentation",
        text: "100% traceability and product standard harmonisation across orders.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.knittedMacro, alt: "Knitted mesh macro detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
    {
      image: { src: img.filterElementCutaway, alt: "Filter element cutaway" },
      title: "Industrial Filtration",
      href: "/industrial-filtration",
    },
    {
      image: { src: img.annealing, alt: "Annealing furnace" },
      title: "Process & Treatments",
      href: "/process-treatments",
    },
  ],
  cta: standardCta({
    title: "Need a woven mesh\nto a drawing?",
    body: "Send the aperture, wire diameter, alloy and finished form. If you only have the duty, send that instead — we will work the specification back from it.",
    brochure: docs.greenEnergy,
  }),
};

export const knittedMeshSolutions: SolutionPageContent = {
  slug: "knitted-mesh-solutions",
  breadcrumb: "Knitted Mesh Solutions",
  hero: {
    eyebrow: "Flexible. High-performance. Application-driven.",
    title: "Knitted Mesh",
    titleAccent: "Solutions",
    subtitle:
      "Single, double and multi-end knitted wire mesh in nickel, titanium, stainless steel and specialty alloys — engineered for electrolyser stacks, GDLs and elastic elements.",
    features: [
      { icon: "wind", title: "High Porosity" },
      { icon: "zap", title: "Excellent Conductivity" },
      { icon: "combine", title: "Conformable" },
      { icon: "shield", title: "Corrosion Resistant" },
    ],
    primary: { label: "Discuss Knitted Mesh", href: "/contact" },
    secondary: { label: "Download Leaflet", href: docs.hydrogenLeaflet, external: true },
    image: {
      src: img.knittedMacro,
      alt: "Macro view of interwoven knitted steel mesh",
    },
  },
  benefits: [
    {
      icon: "wind",
      title: "High Porosity",
      text: "Maximises reactant flow and water management.",
    },
    {
      icon: "zap",
      title: "Excellent Conductivity",
      text: "Enhances electrical pathways for improved efficiency.",
    },
    {
      icon: "combine",
      title: "Mechanical Conformability",
      text: "Fits irregular and layered component designs.",
    },
    {
      icon: "spool",
      title: "2.2 m Single Piece",
      text: "Seamless components for large-scale assemblies.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Knitted for the",
    titleAccent: "hydrogen value chain",
    body: "BVK Hydrotech knits single, double and multi-end mesh on single-needle and double-needle machines built for green hydrogen work. The knitted loop structure gives you something a woven sheet cannot: porosity that stays open under compression, and a material that will deform into the shape of the component instead of fighting it. That is why it ends up in gas diffusion layers, separators and nickel elastic elements.",
    action: { label: "See the Knit Types", href: "#components" },
    image: {
      src: img.meshRollFactory,
      alt: "Knitted mesh roll on the factory floor",
    },
    badge: { title: "Up to 2.2 m", text: "single-piece diameter capability" },
  },
  components: {
    eyebrow: "Three knit types",
    title: "Engineered for the",
    titleAccent: "hydrogen stack",
    intro:
      "Density is the primary lever. Each of the three knit types sits at a different point on it, and each maps to a different position in the stack.",
    image: {
      src: img.engineeredMeshRender,
      alt: "Engineered knitted mesh component render",
    },
    callouts: [
      {
        title: "Voltra Lite — Low Density",
        text: "Single wire. Open gas diffusion layers and elastic elements where flow matters most.",
      },
      {
        title: "Voltra Max — High Density",
        text: "Dense GDL and electrode support where contact area and conductivity dominate.",
      },
      {
        title: "Gas & Liquid Permeability",
        text: "Supports optimal mass transport in electrochemical stacks.",
      },
      {
        title: "Voltra + — Medium Density",
        text: "Double wire. Separator duty, balancing porosity, strength and conductivity.",
      },
      {
        title: "Enhanced Surface Area",
        text: "Ridges increase surface roughness, influencing adhesion, friction and interaction with coatings and fluids.",
      },
      {
        title: "Design Flexibility",
        text: "Easily tailored to stack-specific or device-specific requirements.",
      },
    ],
  },
  features: {
    eyebrow: "Capability",
    title: "What we can",
    titleAccent: "knit and form",
    body: "The knit is only half of it. Finishing and forming decide whether the part drops into your assembly or needs secondary work.",
    points: [
      "Knit type — single, double and multi-end",
      "Wire diameter — 0.05 mm to 0.30 mm, adapted to strength and porosity needs",
      "Materials — Nickel 201/202, copper, stainless steel, titanium, Hastelloy, specialty alloys",
      "Mesh density — adjustable for porosity, permeability and mechanical resilience",
      "Forms — continuous rolls, custom die-cut geometries, laser-cut precision parts",
      "Finishing — crimped, corrugated (herringbone, W, V with variable angles) or flattened",
      "Treatments — degreased, annealed, coated or plated",
    ],
    image: {
      src: img.stainlessMeshRoll,
      alt: "Knitted stainless steel mesh roll",
    },
    badge: { title: "Corrugation 4–10 mm", text: "set against required elasticity" },
  },
  specs: {
    caption: "Knitted mesh parameters",
    columns: ["Parameter", "Range", "Sets"],
    rows: [
      {
        parameter: "Knit type",
        value: "Single, double, multi-end",
        note: "GDL density and conductive path count",
      },
      {
        parameter: "Wire diameter",
        value: "0.05 mm – 0.30 mm",
        note: "Pore size, surface area, stiffness",
      },
      {
        parameter: "Wires per needle",
        value: "Single / double / multi",
        note: "Density and conductivity",
      },
      {
        parameter: "Needle gauge",
        value: "1 / 2 / 3+",
        note: "With stitch length, pore size and cell fit",
      },
      {
        parameter: "Single-piece diameter",
        value: "Up to 2.2 m",
        note: "Seamless large-diameter assemblies",
      },
      {
        parameter: "Corrugation",
        value: "4 – 10 mm",
        note: "Elasticity and contact pressure",
      },
      {
        parameter: "Materials",
        value: "Ni 201/202, titanium, stainless steel, copper, Hastelloy",
        note: "Corrosion behaviour and conductivity",
      },
      {
        parameter: "Standards",
        value: "ASTM B164, ISO 9044, DSIR-RDI, ISO 22734-ready QMS",
        note: "Qualification and audit evidence",
      },
    ],
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "Applications",
    title: "Where knitted mesh",
    titleAccent: "goes to work",
    intro:
      "Alkaline electrolysers, fuel cells and hydrogen balance-of-plant equipment are the core. Beyond them, anywhere a compressible, permeable metal layer is needed.",
    cards: [
      {
        image: { src: img.electrolyserMotion, alt: "Alkaline electrolyser stack" },
        icon: "bolt",
        title: "Alkaline Electrolysers",
        text: "Nickel elastic elements, separators and stack core layers.",
      },
      {
        image: { src: img.fuelCellStack, alt: "Fuel cell stack assembly" },
        icon: "layers",
        title: "Fuel Cells & H₂ Storage",
        text: "GDL, electrode supports and vent guards.",
      },
      {
        image: { src: img.hydrogenFilterModule, alt: "Hydrogen plant filter module" },
        icon: "filter",
        title: "BoP Filter Elements",
        text: "Balance-of-plant filtration and support structures.",
      },
      {
        image: { src: img.gasCylinderHall, alt: "Hydrogen purification and storage" },
        icon: "container",
        title: "Purification & Drying",
        text: "Mesh internals for H₂ purification and drying skids.",
      },
    ],
  },
  why: {
    eyebrow: "The BVK competitive edge",
    title: "More than mesh —",
    titleAccent: "confidence",
    intro:
      "With the ability to produce custom sizes in a single piece, BVK enables seamless integration into advanced systems. Integrated R&D and prototyping, supported by CFD modelling, ensures optimal structure and performance from concept to scale-up.",
    cards: [
      {
        icon: "spool",
        title: "Seamless Integration",
        text: "Single-piece capability removes joints from large circular components.",
      },
      {
        icon: "microscope",
        title: "CFD-Backed Development",
        text: "Flow modelling before scale-up, from a DSIR-recognised R&D centre.",
      },
      {
        icon: "globe",
        title: "Certified Sourcing",
        text: "Global certified material sourcing with a documented supply chain.",
      },
      {
        icon: "recycle",
        title: "ESG-Compliant Manufacturing",
        text: "Powered by renewables, with Industry 4.0 process control.",
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
      image: { src: img.wovenMeshSurface, alt: "Woven mesh surface" },
      title: "Woven Mesh Solutions",
      href: "/woven-mesh-solutions",
    },
  ],
  cta: standardCta({
    title: "Engineering mesh\nfor the future",
    body: "Tell us the cell chemistry, the envelope and the density you are targeting. BVK combines design, material science and process know-how to turn that into a knitted component.",
    brochure: docs.knittedMesh,
  }),
};
