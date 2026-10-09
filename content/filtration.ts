import { docs } from "./assets";

/**
 * Copy for the Industrial Filtration landing page (components/templates/
 * FiltrationPage.tsx). Images are in public/bvk-assets/filtration.
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
    lead: "Precision woven and knitted metal mesh solutions engineered for reliable filtration, separation and process protection across demanding industrial environments.",
    text: "From filter media and screens to custom-formed components and finished filter elements, BVK Hydrotech combines material expertise, mesh engineering and manufacturing capability to support application-specific filtration requirements.",
    points: [
      { icon: "layers", title: "Wide Material Range" },
      { icon: "gauge", title: "Reliable Filtration Performance" },
      { icon: "wrench", title: "Custom Engineering" },
      { icon: "truck", title: "Reliable Supply" },
    ],
    primary: { label: "Explore Filtration Solutions", href: "#applications" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy },
    image: `${IMG}/hero.webp`,
    alt: "Illustration: stainless steel filter cartridges, a filter housing and a roll of woven mesh",
  },

  benefits: [
    {
      icon: "filter",
      title: "High Filtration Performance",
      text: "Engineered mesh solutions designed to support dependable filtration and consistent process performance.",
    },
    {
      icon: "layers",
      title: "Multiple Material Options",
      text: "Stainless steel, nickel-based materials, titanium and other application-specific alloys.",
    },
    {
      icon: "ruler",
      title: "Custom Dimensions",
      text: "Available as rolls, sheets, discs, tubes, screens and custom-formed components.",
    },
    {
      icon: "headset",
      title: "Technical Support",
      text: "Application-focused assistance from material and mesh selection through final production.",
    },
  ],

  overview: {
    eyebrow: "Overview",
    title: "Filtration is rarely plug-and-play.",
    lead: "Every filtration duty is different.",
    paragraphs: [
      "Fluid type, particle size, flow conditions, temperature, pressure, chemical compatibility and installation geometry can all influence the correct filtration solution.",
      "BVK Hydrotech develops woven and knitted metal mesh solutions for filtration, separation, dewatering and demanding process environments. Instead of treating filtration as a standard catalogue item, we work around the actual application requirement to develop a practical and manufacturable solution.",
      "Whether you require filter media, a protective screen, a formed mesh component or a complete filter element, our focus remains consistent quality, reliable production and application-driven engineering.",
    ],
    cta: { label: "View Product Range", href: "/precision-mesh-solutions" },
    image: `${IMG}/overview.webp`,
    alt: "Illustration: a stainless steel filter housing in an industrial plant",
    badge: {
      title: "Industrial Filter Components",
      text: "Woven and knitted mesh for filter media, screens, cartridges and custom filtration components.",
    },
  },

  functions: {
    eyebrow: "Key Functions",
    title: "The six inputs behind a filtration element",
    intro:
      "The right filter is not defined by micron rating alone. A reliable filtration solution comes from balancing several operating and application factors.",
    items: [
      {
        icon: "droplet",
        title: "Fluid Type",
        sub: "Liquid, gas or slurry",
        text: "The characteristics of the process medium influence material selection, mesh construction and component design.",
      },
      {
        icon: "filter",
        title: "Particle Size",
        sub: "Target separation requirement",
        text: "The size and nature of particles to be retained help determine the appropriate mesh structure.",
      },
      {
        icon: "gauge",
        title: "Operating Conditions",
        sub: "Pressure, temperature and flow",
        text: "Operating conditions influence mesh strength, component construction and overall filter design.",
      },
      {
        icon: "flask",
        title: "Material Compatibility",
        sub: "Chemical and corrosion resistance",
        text: "Material should be selected according to the process medium and service environment.",
      },
      {
        icon: "box",
        title: "Required Form",
        sub: "Sheet, roll, disc, tube or filter element",
        text: "The mesh can be supplied or processed according to the final installation format.",
      },
      {
        icon: "factory",
        title: "Service Environment",
        sub: "Industrial and demanding process conditions",
        text: "The final solution should account for operating environment, maintenance requirements and expected service duty.",
      },
    ],
  },

  applications: {
    eyebrow: "Applications",
    title: "Value-engineered filtration solutions",
    intro:
      "Our metal mesh solutions support a broad range of filtration and separation requirements where process reliability, material compatibility and repeatable performance are important.",
    heading: "Application areas",
    points: [
      "Liquid filtration in industrial processes",
      "Gas filtration and process protection",
      "Filtration and separation",
      "Screening and straining",
      "Pump and equipment protection",
      "Process-fluid filtration",
      "Particle retention",
      "Dewatering applications",
      "Protective screens",
      "Custom filter elements and cartridges",
      "Discs, sleeves and cylindrical elements",
      "Replacement filter components",
      "New equipment development",
      "Demanding temperature or corrosion environments",
    ],
    image: `${IMG}/applications.webp`,
    alt: "Illustration: stainless steel filter housings and process pipework",
  },

  media: {
    eyebrow: "Filtration Media Selection",
    title: "Select the mesh around the duty",
    intro:
      "The following parameters should guide initial filter-media selection. Final specifications should always be confirmed against the actual application.",
    columns: ["Parameter", "Available Options", "Selection Consideration"],
    rows: [
      ["Material", "Stainless steel, nickel alloys, titanium and other approved materials", "Process medium, corrosion and temperature"],
      ["Mesh Construction", "Woven or knitted", "Filtration duty, flexibility and component design"],
      ["Wire / Mesh Geometry", "Application specific", "Particle retention, strength and flow"],
      ["Opening / Density", "Customizable", "Required separation and process flow"],
      ["Thickness", "Application specific", "Strength, flexibility and installation"],
      ["Width / Dimensions", "Standard or custom", "Equipment and component geometry"],
      ["Supply Form", "Roll, sheet, disc, tube or formed component", "Final installation requirement"],
      ["Finishing / Treatment", "Selected according to application", "Cleanliness, formability and process requirement"],
    ] as [string, string, string][],
    note: "Material choice, mesh geometry, wire selection, porosity and permeability, and engineering optimization can all be tailored around filtration requirements.",
  },

  sustainability: {
    eyebrow: "Sustainability",
    title: "Powering a cleaner planet",
    paragraphs: [
      "Efficient filtration can help industrial processes operate more effectively by protecting equipment, improving separation and supporting longer component life.",
      "BVK Hydrotech combines precision mesh engineering with application-focused manufacturing to develop solutions that support cleaner and more resource-conscious industrial processes.",
    ],
    items: [
      { icon: "leaf", title: "Cleaner Processes", text: "Supporting efficient filtration and separation." },
      { icon: "recycle", title: "Resource-Efficient Filtration", text: "Solutions designed around the actual process requirement." },
      { icon: "globe", title: "Supporting a Sustainable Future", text: "Durable engineered components for modern industrial systems." },
    ],
    image: `${IMG}/sustainability.webp`,
  },

  industries: {
    eyebrow: "Industries We Serve",
    title: "Separation duty across process industries",
    intro:
      "Our filtration and mesh solutions can support a variety of industrial sectors where filtration, separation and process protection are critical.",
    items: [
      {
        title: "Oil & Gas",
        text: "Mesh and filter solutions for process protection, separation and selected upstream, midstream and downstream requirements.",
        image: `${IMG}/industry-oil-gas.webp`,
      },
      {
        title: "Chemical & Petrochemical",
        text: "Engineered mesh for filtration, separation and selected chemical-processing duties.",
        image: `${IMG}/industry-chemical.webp`,
      },
      {
        title: "Power & Energy",
        text: "Filtration and process-protection solutions for energy and supporting industrial systems.",
        image: `${IMG}/industry-power.webp`,
      },
      {
        title: "Food & Beverage",
        text: "Metal mesh solutions for selected liquid and gas processing applications where cleanable and durable filtration media are required.",
        image: `${IMG}/industry-food.webp`,
      },
    ],
    cta: "Explore Application",
    also: "Other sectors served include mining, pulp & paper, automotive, plastics and polymers.",
  },

  capabilities: {
    eyebrow: "Our Capabilities",
    title: "The capability the rest was built on",
    intro:
      "From standard woven and knitted mesh to application-specific filter components, BVK supports the journey from early development through manufacturing and repeat supply.",
    items: [
      {
        icon: "shapes",
        title: "Custom Mesh Design",
        sub: "Woven and knitted structures",
        text: "Mesh construction can be selected and engineered according to the required filtration and component function.",
      },
      {
        icon: "scissors",
        title: "Forming & Fabrication",
        sub: "Component-ready solutions",
        text: "Mesh can be processed into application-specific geometries and finished component formats.",
      },
      {
        icon: "flask",
        title: "Material Expertise",
        sub: "Materials selected for the environment",
        text: "Material recommendations can be made according to process media, temperature, corrosion and mechanical requirements.",
      },
      {
        icon: "flame",
        title: "Coating & Surface Treatment",
        sub: "Application-specific processing",
        text: "Selected post-processing and finishing options can be applied according to component requirements.",
      },
    ],
    cards: [
      {
        title: "Woven & Knitted Mesh Filter Media",
        text: "Precision metal mesh supplied in structures selected around separation, flow, strength and installation requirements.",
        cta: "Explore Mesh Solutions",
        href: "/precision-mesh-solutions",
        image: `${IMG}/cap-media.webp`,
      },
      {
        title: "Process & Treatment",
        text: "Application-specific processing and finishing capabilities help transform mesh into a component ready for the intended operating environment.",
        cta: "Explore Capabilities",
        href: "/process-treatments",
        image: `${IMG}/cap-process.webp`,
      },
      {
        title: "Filter Elements & Cartridges",
        text: "Mesh can be incorporated into filter elements, screens, sleeves, cartridges and other application-specific component formats.",
        cta: "Explore Filter Components",
        href: "/engineering-manufacturing",
        image: `${IMG}/cap-elements.webp`,
      },
    ],
  },

  engineering: {
    eyebrow: "Engineering & Development",
    title: "From requirement to repeatable production",
    intro:
      "Custom filtration projects often require more than choosing a mesh from a standard list. Our application-focused development approach can support:",
    steps: [
      { icon: "listChecks", title: "Application Review", text: "Understanding the fluid, contaminants, operating environment and component function." },
      { icon: "flask", title: "Material Recommendation", text: "Selecting appropriate materials based on process requirements." },
      { icon: "microscope", title: "Mesh Design Optimization", text: "Balancing filtration, flow, strength and manufacturability." },
      { icon: "box", title: "Prototyping", text: "Developing samples or initial components for project evaluation." },
      { icon: "cog", title: "Process Development", text: "Defining practical manufacturing and downstream processing requirements." },
      { icon: "trending", title: "Production Scale-Up", text: "Moving from development requirements toward consistent repeat production." },
    ],
  },

  enquiry: {
    eyebrow: "Technical Enquiry",
    title: "Describe the duty, not just the micron.",
    text: [
      "A micron number alone does not tell the complete filtration story.",
      "Tell us what you are filtering, what needs to be removed, the operating conditions and how the component will be installed.",
      "Our team can then help evaluate material, mesh construction, component form and manufacturing options for the application.",
    ],
    primary: { label: "Request a Quote", href: "/contact#enquiry" },
    secondary: { label: "Speak to an Expert", href: "/contact#enquiry-general" },
    image: `${IMG}/enquiry.webp`,
  },

  quality: {
    eyebrow: "Quality & Inspection",
    title: "Consistency from mesh to finished component",
    intro:
      "Quality control is integrated throughout the manufacturing process to support dependable and repeatable supply.",
    items: [
      { icon: "scan", title: "Material & Batch Traceability", text: "Supporting controlled manufacturing and documented production." },
      { icon: "ruler", title: "Dimensional Inspection", text: "Verification of relevant component and mesh dimensions." },
      { icon: "clipboard", title: "Process Control", text: "Defined production and quality-control plans." },
      { icon: "spark", title: "Visual Inspection", text: "Inspection techniques selected according to product and process requirements, including light-box and video inspection." },
      { icon: "microscope", title: "Custom Testing", text: "Application-specific inspection and testing where required." },
    ],
  },

  certifications: {
    eyebrow: "Quality & Compliance",
    title: "Certified quality, safety and compliance",
    intro:
      "Our manufacturing and quality systems are structured to support controlled production, traceability and consistent processes.",
    items: [
      { name: "ISO 9001:2015", note: "Quality Management" },
      { name: "ISO 14001:2015", note: "Environmental Management" },
      { name: "ISO 45001:2018", note: "Occupational Health & Safety" },
      { name: "IATF 16949:2016", note: "Automotive Quality Management" },
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
    text: "Share your filtration duty, operating conditions and component requirements with our team. We will help you evaluate a practical mesh and component solution based on your application.",
    primary: { label: "Discuss Your Requirement", href: "/contact#enquiry" },
    image: `${IMG}/cta-bg.webp`,
  },
};
