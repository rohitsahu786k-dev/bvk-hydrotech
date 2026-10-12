import { docs } from "./assets";

/**
 * Copy for the Industrial Filtration landing page (components/templates/
 * FiltrationPage.tsx). Images are in public/bvk-assets/filtration, converted to
 * WebP and named for what they show; the same files are in the WordPress media
 * library.
 *
 * No numeric micron, thickness, pressure or temperature ranges are published:
 * those are confirmed against the application and approved engineering data.
 */

const IMG = "/bvk-assets/filtration";

export const filtration = {
  hero: {
    eyebrow: "Industrial Filtration",
    title: "Engineered Mesh Solutions for",
    titleAccent: "Industrial Filtration",
    lead: "Precision woven and knitted metal mesh for reliable filtration performance in demanding environments. Built for efficiency, durability and consistent quality.",
    points: [
      { icon: "layers", title: "Wide Material Range" },
      { icon: "gauge", title: "High Filtration Efficiency" },
      { icon: "wrench", title: "Custom Engineering" },
      { icon: "truck", title: "Reliable Supply" },
    ],
    primary: { label: "Explore Our Filtration Solutions", href: "#applications" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy },
    image: `${IMG}/hero.webp`,
    alt: "Stainless steel filter cartridges, a filter housing and a roll of woven mesh",
  },

  benefits: [
    {
      icon: "filter",
      title: "High Filtration Performance",
      text: "Consistent and reliable separation.",
    },
    {
      icon: "layers",
      title: "Multiple Material Options",
      text: "SS, nickel, titanium and custom alloys.",
    },
    {
      icon: "ruler",
      title: "Custom Dimensions",
      text: "Sheets, rolls, discs, tubes and components.",
    },
    {
      icon: "headset",
      title: "Technical Support",
      text: "From selection to final production.",
    },
  ],

  overview: {
    eyebrow: "Overview",
    title: "Filtration is rarely plug-and-play.",
    paragraphs: [
      "Every application is different: fluid type, particle size, pressure, temperature and operating environment. BVK Hydrotech develops woven and knitted metal mesh solutions designed to meet specific industrial filtration requirements with consistent quality and performance.",
    ],
    cta: { label: "View Product Range", href: "/precision-mesh-solutions" },
    image: `${IMG}/metal-mesh-filter-element-flanged-housing.webp`,
    alt: "Pleated metal mesh filter element inside a flanged stainless steel housing",
    badge: {
      title: "Industrial Filter Components",
      text: "Woven and knitted mesh for cartridges, screens and custom filters.",
    },
  },

  functions: {
    eyebrow: "Key Functions",
    title: "The six inputs behind a",
    titleAccent: "filtration element",
    intro:
      "The right filtration solution is a balance of multiple factors. We engineer mesh solutions considering:",
    items: [
      { icon: "droplet", title: "Fluid Type", sub: "Liquid, gas or slurry" },
      { icon: "filter", title: "Particle Size", sub: "Target filtration rating" },
      { icon: "gauge", title: "Operating Conditions", sub: "Pressure, temperature, flow rate" },
      { icon: "flask", title: "Material Compatibility", sub: "Chemical and corrosion resistance" },
      { icon: "box", title: "Required Form", sub: "Sheet, roll, tube, disc, cartridge, formed" },
      { icon: "factory", title: "Service Environment", sub: "Industrial, high-pressure or high-temperature" },
    ],
  },

  band: {
    image: `${IMG}/stainless-steel-spray-nozzles-process-line.webp`,
    alt: "Stainless steel spray nozzles producing a fine mist over a process line",
  },

  applications: {
    eyebrow: "Applications",
    title: "Value-engineered",
    titleAccent: "filtration solutions",
    intro:
      "Our mesh solutions are used across a wide range of industries where reliable filtration, separation and process efficiency are critical.",
    points: [
      "Liquid and gas filtration in process industries",
      "Screening, strainers and protective filtration for pumps and equipment",
      "High-temperature and corrosive environment applications",
      "Custom filter elements, discs, sleeves and mesh components (as applicable)",
      "Solutions for new projects as well as replacement filters",
    ],
    image: `${IMG}/stainless-steel-filter-cartridges-collection.webp`,
    alt: "Collection of stainless steel pleated, perforated and woven mesh filter cartridges",
  },

  media: {
    eyebrow: "Filtration Media Selection",
    columns: ["Parameter", "Typical Range / Options", "Notes"],
    rows: [
      ["Material", "Stainless steel, nickel, titanium, custom alloys", "Selected based on fluid, temperature and corrosion"],
      ["Mesh Type", "Woven or knitted", "As per application requirement"],
      ["Filtration Rating", "Custom (micron level)", "Depends on mesh construction and wire diameter"],
      ["Thickness", "Application specific", "Custom options available"],
      ["Width", "Standard or custom", "Wider widths available for certain constructions"],
      ["Form", "Sheet, roll, tube, disc, spool", "Cut-to-size and fabricated components"],
      ["Surface Treatment", "Cleaning, annealing, coating (as applicable)", "Based on application needs"],
    ] as [string, string, string][],
  },

  sustainability: {
    eyebrow: "Sustainability",
    title: "Powering a cleaner planet",
    paragraphs: [
      "Our filtration solutions help industries operate more efficiently, with cleaner processes, reduced waste and longer equipment life.",
    ],
    items: [
      { icon: "leaf", title: "Cleaner Processes" },
      { icon: "recycle", title: "Resource Efficient Filtration" },
      { icon: "globe", title: "Supporting a Sustainable Future" },
    ],
    image: `${IMG}/sustainability.webp`,
  },

  industries: {
    eyebrow: "Industries We Serve",
    title: "Separation duty across process industries",
    intro:
      "Our mesh solutions are used in a wide range of industries for industrial filtration, separation and process protection.",
    items: [
      {
        title: "Oil & Gas",
        text: "Filtration and protection in upstream, midstream and downstream processes.",
        image: `${IMG}/oil-gas-refinery-stainless-pipework.webp`,
        alt: "Stainless steel pipework, valves and distillation columns at an oil and gas refinery",
      },
      {
        title: "Chemical & Petrochemical",
        text: "Process filtration in chemical and petrochemical applications.",
        image: `${IMG}/industry-chemical.webp`,
        alt: "Chemical plant pipework and columns at golden hour",
      },
      {
        title: "Power & Energy",
        text: "Filtration for turbines, boilers and process fluids.",
        image: `${IMG}/industry-power.webp`,
        alt: "Power plant with cooling towers and stainless pipework",
      },
      {
        title: "Food & Beverage",
        text: "Filtration for liquid and gas processing.",
        image: `${IMG}/industry-food.webp`,
        alt: "Stainless steel filling line in a beverage plant",
      },
    ],
  },

  capabilities: {
    eyebrow: "Our Capabilities",
    title: "The capability the",
    titleAccent: "rest was built on",
    intro:
      "From standard mesh to custom filter components, we support the full lifecycle, from development samples to volume production.",
    items: [
      { icon: "shapes", title: "Custom Mesh Design", sub: "Woven and knitted structures" },
      { icon: "scissors", title: "Forming & Fabrication", sub: "Cutting, rolling, welding and custom shapes" },
      { icon: "flask", title: "Material Expertise", sub: "SS, nickel, titanium and special alloys" },
      { icon: "flame", title: "Coating & Surface Treatment", sub: "As per application requirement" },
    ],
    cards: [
      {
        title: "Woven Mesh Filter Media",
        href: "/precision-mesh-solutions",
        image: `${IMG}/cap-media.webp`,
        alt: "Woven stainless steel mesh filter media",
      },
      {
        title: "Process & Treatment",
        href: "/process-treatments",
        image: `${IMG}/cap-process.webp`,
        alt: "Mesh rolls passing through a treatment line",
      },
      {
        title: "Filter Elements & Cartridges",
        href: "/engineering-manufacturing",
        image: `${IMG}/cap-elements.webp`,
        alt: "Stainless steel filter elements and cartridges",
      },
    ],
  },

  enquiry: {
    eyebrow: "Technical Enquiry",
    title: "Describe the duty,",
    titleAccent: "not just the micron.",
    text: [
      "Share your application details with our team and we will help you identify the right mesh solution for your filtration requirement.",
    ],
    primary: { label: "Request a Quote", href: "/contact#enquiry" },
    secondary: { label: "Speak to an Expert", href: "/contact#enquiry-general" },
    image: `${IMG}/industrial-filtration-plant-stainless-housings.webp`,
    alt: "Stainless steel filter housings and process pipework in an industrial filtration plant",
  },

  certifications: {
    eyebrow: "Quality & Compliance",
    title: "Certified quality, safety and compliance",
    intro:
      "Our manufacturing and quality systems support controlled production, traceability and consistent processes.",
    items: [
      { name: "ISO 9001:2015", note: "Quality Management", file: "iso-9001-2015-quality-management-system.webp" },
      { name: "ISO 14001:2015", note: "Environmental Management", file: "iso-14001-2015-environmental-management-system.webp" },
      { name: "ISO 45001:2018", note: "Occupational Health & Safety", file: "iso-45001-2018-occupational-health-safety-management-system.webp" },
      { name: "IATF 16949:2016", note: "Automotive Quality", file: "iatf-16949-2016-automotive-quality-management-system.webp" },
      { name: "DSIR Recognised", note: "In-house R&D Centre", file: "dsir-recognized-rd-centre.webp" },
    ],
  },

  faqs: [
    {
      question: "What industrial filtration applications can BVK support?",
      answer:
        "Filtration, separation, dewatering and process-support requirements across demanding industrial environments.",
    },
    {
      question: "Which industries can your filtration solutions serve?",
      answer:
        "Referenced sectors include chemical processing, mining, pulp & paper, food & beverage, automotive, plastics and polymers, energy and other process industries.",
    },
    {
      question: "Which materials are available for filtration mesh?",
      answer:
        "Depending on the application: stainless steel, nickel and nickel-based alloys, titanium, copper, aluminium, carbon steel and specialty materials.",
    },
    {
      question: "Can filtration mesh be customized?",
      answer:
        "Yes. Mesh construction, wire selection, geometry, density, porosity, permeability and final component form can be developed around the application.",
    },
    {
      question: "Can you provide custom filter elements and components?",
      answer:
        "Yes. Application-specific mesh can be processed into custom geometries and component formats depending on the project requirement.",
    },
    {
      question: "Can filtration performance be optimized for flow or pressure drop?",
      answer:
        "Application-specific mesh design, porosity control, permeability and engineering optimization can help tune flow behaviour and pressure drop.",
    },
    {
      question: "Are additional treatments available?",
      answer:
        "Yes. Depending on the application: annealing, coating, plating, degreasing, laser cutting, corrugation and other finishing or forming processes.",
    },
    {
      question: "Can BVK support prototypes or custom development?",
      answer:
        "Yes. Engineering support, material recommendations, prototyping, process development and quality-control planning are available for custom requirements.",
    },
    {
      question: "How do I request a quotation?",
      answer:
        "Share your process medium, filtration duty, operating conditions, required dimensions, quantity and any available technical drawing through the RFQ form.",
    },
  ],

  finalCta: {
    eyebrow: "Let's work together",
    title: "Need precision mesh for your filtration application?",
    text: "Share your requirements with our team for application-focused support and a tailored solution.",
    primary: { label: "Discuss Your Requirement", href: "/contact#enquiry" },
    image: `${IMG}/cta-bg.webp`,
  },
};
