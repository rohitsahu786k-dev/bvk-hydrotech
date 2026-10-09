import { docs } from "./assets";

/**
 * Copy for the Fuel Cell Solutions landing page (components/templates/
 * FuelCellPage.tsx). Images are in public/bvk-assets/fuel-cell.
 *
 * Only PEM, Alkaline and Solid Oxide are published as supported technologies;
 * other architectures are handled through the enquiry route.
 */

const IMG = "/bvk-assets/fuel-cell";

export const fuelCell = {
  hero: {
    eyebrow: "Fuel Cell Solutions",
    title: "Mesh Solutions for",
    titleAccent: "Fuel Cell Systems",
    lead: "Precision-engineered woven and knitted metal mesh solutions designed to support efficient flow, current collection, component stability and reliable fuel-cell performance.",
    text: "BVK Hydrotech combines material expertise, mesh engineering and application-focused manufacturing to develop solutions tailored to different fuel-cell requirements.",
    points: ["High Conductivity", "Durable Performance", "Custom Engineering", "Reliable Supply"],
    primary: { label: "Explore Fuel Cell Solutions", href: "#types" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy },
    image: `${IMG}/hero.webp`,
    alt: "Illustration: exploded view of a fuel cell stack with mesh layers between the plates",
  },

  benefits: [
    {
      icon: "gauge",
      title: "Optimized Performance",
      text: "Mesh structures engineered around the functional needs of fuel-cell applications.",
    },
    {
      icon: "layers",
      title: "Wide Material Options",
      text: "Solutions available in nickel, stainless steel, titanium and other application-specific materials.",
    },
    {
      icon: "ruler",
      title: "Custom Dimensions",
      text: "Mesh can be supplied in different constructions, sizes, shapes and processed component formats.",
    },
    {
      icon: "headset",
      title: "Engineering Support",
      text: "Application-focused support from material selection through component development.",
    },
  ],

  overview: {
    eyebrow: "Overview",
    title: "Engineered mesh for the next generation of fuel cells",
    paragraphs: [
      "Fuel-cell systems depend on controlled gas movement, electrical connectivity and stable component integration. BVK Hydrotech develops woven and knitted metal mesh solutions that can support these functions across selected fuel-cell architectures.",
      "Our approach starts with the application. Material, mesh construction, geometry and further processing are selected according to the role the component needs to perform inside the system.",
      "From development samples and custom components to production-scale requirements, our focus is on repeatable quality, practical engineering and dependable supply.",
    ],
    cta: { label: "View Fuel Cell Product Range", href: "/precision-mesh-solutions" },
    image: `${IMG}/overview.webp`,
    alt: "Illustration: a fuel cell stack on a workshop bench",
    badge: {
      title: "Fuel Cell Mesh Components",
      text: "Engineered mesh for diffusion, current collection, electrode support and related stack applications.",
    },
  },

  types: {
    eyebrow: "Fuel Cell Types",
    title: "Supporting multiple fuel-cell technologies",
    intro:
      "Different fuel-cell technologies operate under different temperature, material and environmental conditions. Our mesh solutions are selected and engineered according to the needs of the specific fuel-cell architecture.",
    cards: [
      {
        title: "PEM Fuel Cells",
        text: "Precision mesh solutions for selected Proton Exchange Membrane fuel-cell applications where controlled flow, electrical performance and compact integration are important.",
        image: `${IMG}/type-pem.webp`,
      },
      {
        title: "Alkaline Fuel Cells",
        text: "Mesh solutions for alkaline fuel-cell applications, with material and construction selected around conductivity, stability and operating conditions.",
        image: `${IMG}/type-alkaline.webp`,
      },
      {
        title: "Solid Oxide Fuel Cells",
        text: "Application-specific mesh solutions for selected SOFC requirements where material durability and higher-temperature operating environments need to be considered.",
        image: `${IMG}/type-sofc.webp`,
      },
      {
        title: "Additional Fuel-Cell Systems",
        text: "Need a solution for another fuel-cell architecture? Our engineering team can review your operating conditions, component function and integration requirements.",
        image: `${IMG}/type-other.webp`,
        cta: "Discuss Your Application",
      },
    ],
  },

  fit: {
    eyebrow: "Where mesh fits in a fuel cell",
    title: "Key components and mesh applications",
    intro:
      "Precision metal mesh can perform several important functions inside a fuel-cell system. The final mesh construction depends on the required balance between gas flow, conductivity, mechanical support and integration.",
    image: `${IMG}/components-diagram.webp`,
    alt: "Illustration: exploded fuel cell assembly showing plates, mesh layers and tie rods",
    items: [
      {
        title: "Current Collection",
        text: "Metallic mesh can provide conductive pathways that support current collection and distribution.",
      },
      {
        title: "Gas Diffusion Support",
        text: "Open mesh structures can help support gas movement while maintaining structural stability around diffusion-related components.",
      },
      {
        title: "Electrode Support",
        text: "Mesh can provide mechanical support and controlled contact around electrode-related assemblies.",
      },
      {
        title: "Flow Distribution",
        text: "Carefully selected mesh geometry can support more uniform movement of gases or process media through a component.",
      },
      {
        title: "Mechanical Support",
        text: "Mesh structures can provide reinforcement, spacing or support where a flexible but stable metallic structure is required.",
      },
      {
        title: "Custom Stack Components",
        text: "Mesh can be cut, formed or processed into application-specific shapes for integration into wider fuel-cell assemblies.",
      },
    ],
  },

  materials: {
    eyebrow: "Material Options",
    title: "High-performance materials for demanding applications",
    intro:
      "Material selection plays an important role in fuel-cell component performance. Conductivity, corrosion behaviour, operating environment and mechanical requirements all influence the final choice.",
    items: [
      {
        title: "Nickel Mesh",
        text: "Nickel-based mesh options for applications requiring good electrical performance and suitability for selected electrochemical environments.",
        image: `${IMG}/material-nickel.webp`,
        href: "/knitted-mesh-solutions",
      },
      {
        title: "Stainless Steel Mesh",
        text: "A versatile material option offering strength, processability and broad industrial applicability.",
        image: `${IMG}/material-stainless.webp`,
        href: "/woven-mesh-solutions",
      },
      {
        title: "Titanium Mesh",
        text: "Suitable for specialised applications where corrosion resistance and material stability are important.",
        image: `${IMG}/material-titanium.webp`,
        href: "/knitted-mesh-solutions",
      },
      {
        title: "Specialty & Custom Alloys",
        text: "Additional alloy options can be evaluated according to operating conditions and project-specific requirements.",
        image: `${IMG}/material-custom.webp`,
        href: "/precision-mesh-solutions",
      },
    ],
  },

  customization: {
    eyebrow: "Customization Capabilities",
    title: "Tailored to your technical requirements",
    text: "Fuel-cell designs are not one-size-fits-all. BVK Hydrotech can tailor mesh characteristics and downstream processing around the required component function.",
    points: [
      "Mesh construction and geometry",
      "Wire diameter",
      "Opening and density",
      "Thickness and layer structure",
      "Sheet, roll or cut-to-size formats",
      "Formed components",
      "Custom geometries",
      "Application-specific finishing and treatment",
    ],
    cta: "Discuss Your Requirement",
    image: `${IMG}/customization-bg.webp`,
  },

  process: {
    eyebrow: "Manufacturing Process",
    title: "From concept to component",
    intro:
      "Our process is designed to turn an application requirement into a practical, manufacturable mesh solution.",
    steps: [
      {
        icon: "listChecks",
        title: "Requirement Analysis",
        text: "We begin by understanding the application, component function, operating environment and performance priorities.",
      },
      {
        icon: "flask",
        title: "Material Selection",
        text: "Suitable material options are reviewed based on conductivity, durability, mechanical requirements and environmental exposure.",
      },
      {
        icon: "microscope",
        title: "Mesh Engineering",
        text: "Mesh construction, geometry and configuration are selected around the intended function.",
      },
      {
        icon: "cog",
        title: "Manufacturing",
        text: "The selected mesh is manufactured using the appropriate woven or knitted process and supporting production steps.",
      },
      {
        icon: "scan",
        title: "Inspection & Validation",
        text: "Components are checked against defined quality and dimensional requirements.",
      },
      {
        icon: "truck",
        title: "Packaging & Delivery",
        text: "Products are prepared for safe handling, traceability and shipment to the customer.",
      },
    ],
  },

  quality: {
    eyebrow: "Quality & Testing",
    title: "Assurance at every layer",
    intro: "Consistent mesh performance starts with controlled manufacturing and disciplined inspection.",
    items: [
      {
        title: "Dimensional Inspection",
        text: "Verification of critical dimensions and component geometry against defined requirements.",
        image: `${IMG}/qa-dimensional.webp`,
      },
      {
        title: "Material Verification",
        text: "Material and process documentation are managed to support consistency and traceability.",
        image: `${IMG}/qa-material.webp`,
      },
      {
        title: "Surface Quality",
        text: "Visual and application-relevant inspection helps maintain the required surface condition.",
        image: `${IMG}/qa-surface.webp`,
      },
      {
        title: "Process Control",
        text: "Manufacturing and quality-control plans support repeatable output across batches.",
        image: `${IMG}/qa-process.webp`,
      },
      {
        title: "Traceability",
        text: "100% traceability together with process and quality-control planning.",
        image: `${IMG}/qa-traceability.webp`,
      },
      {
        title: "Custom Inspection Methods",
        text: "Custom testing equipment, light-box inspection and video inspection.",
        image: `${IMG}/qa-custom.webp`,
      },
    ],
  },

  specs: {
    eyebrow: "Technical Specifications",
    title: "Parameters tailored to the application",
    intro:
      "Rather than forcing every project into a fixed standard, fuel-cell mesh is selected and engineered according to the component's role and operating environment.",
    columns: ["Parameter", "Available Approach"],
    rows: [
      ["Mesh Construction", "Woven or knitted options depending on application"],
      ["Material", "Nickel, stainless steel, titanium and selected specialty alloys"],
      ["Wire Diameter", "Selected according to strength, flow and conductivity requirements"],
      ["Mesh Density", "Application-specific"],
      ["Opening / Porosity", "Engineered according to required flow behaviour"],
      ["Thickness", "Project-specific"],
      ["Width / Dimensions", "Standard and custom formats"],
      ["Component Form", "Roll, sheet, cut part or formed component"],
      ["Surface Treatment", "Application-specific options available"],
      ["Further Processing", "Cutting, forming, cleaning and other selected operations"],
    ] as [string, string][],
    note: "Final specifications are confirmed against your actual application and approved engineering data.",
    image: `${IMG}/spec-mesh.webp`,
    alt: "Illustration: a roll and a sheet of woven metal mesh",
  },

  downloads: {
    eyebrow: "Technical Downloads",
    title: "Resources for fuel-cell applications",
    intro:
      "Access supporting documents to help evaluate material options, mesh construction and project requirements.",
    items: [
      {
        title: "Green Energy Brochure",
        text: "Precision woven mesh for electrolysers and fuel cells: capabilities, materials and process.",
        label: "Download Brochure",
        meta: "PDF",
        href: docs.greenEnergy,
        external: true,
      },
      {
        title: "Green Hydrogen Knitted Mesh Leaflet",
        text: "Knit types, parameters and stack applications for knitted mesh.",
        label: "Download Leaflet",
        meta: "PDF",
        href: docs.hydrogenLeaflet,
        external: true,
      },
      {
        title: "Material Data",
        text: "Reference information for commonly used mesh materials.",
        label: "View Material Data",
        meta: "Web",
        href: "/precision-mesh-solutions#specifications",
        external: false,
      },
      {
        title: "Technical Enquiry Form",
        text: "Share your application details with our engineering team.",
        label: "Start Enquiry",
        meta: "Form",
        href: "/contact#enquiry",
        external: false,
      },
    ],
  },

  rnd: {
    eyebrow: "R&D and Engineering Support",
    title: "Engineering support beyond the mesh",
    paragraphs: [
      "Complex applications often require more than a standard product. BVK's technical approach includes application review, material recommendations, prototyping and mesh-design optimization.",
      "Where required, engineering evaluation can also include simulation-based assessment and flow analysis before production scale-up.",
    ],
    items: [
      { title: "Engineering Support", text: "Application-focused technical discussion from concept stage." },
      { title: "Prototype Development", text: "Support for testing new configurations before scale-up." },
      { title: "Design Optimization", text: "Mesh geometry and material choices can be refined around application needs." },
      { title: "Scale-Up Support", text: "Development solutions can be transitioned toward repeatable manufacturing." },
    ],
    image: `${IMG}/rnd.webp`,
    alt: "Illustration: a fuel cell stack on a laboratory bench",
  },

  why: {
    eyebrow: "Why BVK Hydrotech",
    title: "Your partner in fuel-cell mesh solutions",
    items: [
      {
        icon: "target",
        title: "Application-Focused Engineering",
        text: "We start with what the component needs to do, not with a fixed catalogue item.",
      },
      {
        icon: "wrench",
        title: "Custom Development",
        text: "Mesh construction and processing can be tailored around specific project needs.",
      },
      {
        icon: "layers",
        title: "Woven & Knitted Capability",
        text: "BVK develops both woven and knitted metal mesh solutions for demanding industrial and clean-energy applications.",
      },
      {
        icon: "factory",
        title: "Manufacturing Know-How",
        text: "Engineering and production capabilities support development as well as repeat requirements.",
      },
      {
        icon: "scan",
        title: "Quality & Traceability",
        text: "Structured quality controls and traceability support consistent supply.",
      },
      {
        icon: "handshake",
        title: "Collaborative Approach",
        text: "Our team works with customers to identify practical mesh solutions for their applications.",
      },
    ],
  },

  sustainability: {
    eyebrow: "Sustainability",
    title: "Powering a cleaner planet",
    paragraphs: [
      "Fuel cells are part of the wider transition toward cleaner and more efficient energy technologies.",
      "BVK Hydrotech supports this transition by developing precision mesh components for fuel-cell and hydrogen-related applications, combining material efficiency, engineering capability and application-focused manufacturing.",
      "Our goal is simple: help customers build reliable systems with components engineered for their real-world operating requirements.",
    ],
    items: [
      { icon: "leaf", title: "Clean Energy Applications", text: "Solutions for hydrogen and fuel-cell technologies." },
      { icon: "recycle", title: "Resource-Conscious Engineering", text: "Material and geometry selected according to application needs." },
      { icon: "handshake", title: "Long-Term Partnership", text: "Engineering support from development through supply." },
    ],
    image: `${IMG}/sustainability.webp`,
  },

  enquiry: {
    eyebrow: "Technical Enquiry",
    title: "Discuss your fuel-cell mesh requirements",
    text: [
      "Every fuel-cell project has different requirements.",
      "Share your application, preferred material, component dimensions and expected function with our team. We will review the requirement and help identify a suitable mesh solution.",
    ],
    primary: { label: "Request a Quote", href: "/contact#enquiry" },
    secondary: { label: "Speak to an Expert", href: "/contact#enquiry-general" },
    image: `${IMG}/enquiry.webp`,
  },

  faqs: [
    {
      question: "What types of fuel-cell mesh components can BVK Hydrotech support?",
      answer:
        "Mesh-based applications include gas diffusion, current collection and distribution, electrode support and related stack components. The exact solution depends on the fuel-cell architecture and component requirement.",
    },
    {
      question: "Which fuel-cell technologies does BVK Hydrotech work with?",
      answer:
        "PEM, Alkaline and Solid Oxide fuel-cell systems, for relevant mesh applications. Other architectures can be reviewed through the engineering team.",
    },
    {
      question: "Which parameters matter when selecting fuel-cell mesh?",
      answer:
        "Important considerations can include material, electrical conductivity, mass transport, pressure drop, mechanical strength, flexibility and porosity.",
    },
    {
      question: "How can mesh support gas diffusion and current collection?",
      answer:
        "The open mesh structure can support gas movement, while the metallic wire network provides conductive paths for current collection and distribution.",
    },
    {
      question: "Can fuel-cell mesh be customized?",
      answer:
        "Yes. Material, mesh design, geometry, density, forming and selected treatments can be adapted around project requirements.",
    },
    {
      question: "Are coatings or treatments available?",
      answer:
        "Coating options, annealing, laser cutting and other processing or finishing operations are available depending on the application.",
    },
    {
      question: "How does BVK approach quality control?",
      answer:
        "Through traceability, quality-control plans, custom testing equipment, light-box inspection and video inspection.",
    },
    {
      question: "Can BVK support prototyping and application development?",
      answer:
        "Yes. Support includes prototyping, simulation, CFD-based assessment, material recommendations and mesh-design optimization.",
    },
  ],

  related: {
    eyebrow: "Related Solutions",
    title: "Explore other mesh solutions",
    items: [
      {
        title: "Electrolyser Solutions",
        text: "Precision woven and knitted mesh solutions developed for hydrogen and electrolyser applications.",
        cta: "Explore Electrolyser Solutions",
        href: "/electrolyser-solutions",
        image: "/bvk-assets/02-electrolyser-solutions.webp",
      },
      {
        title: "Industrial Filtration Solutions",
        text: "Engineered metal mesh for industrial liquid and gas filtration requirements.",
        cta: "Explore Filtration Solutions",
        href: "/industrial-filtration",
        image: `${IMG}/material-stainless.webp`,
      },
      {
        title: "Electrochemical Solutions",
        text: "Mesh structures for selected electrochemical and process applications.",
        cta: "Explore Electrochemical Solutions",
        href: "/energy-clean-tech",
        image: "/bvk-assets/07-applications-clean-energy.webp",
      },
      {
        title: "Custom Mesh Solutions",
        text: "Application-specific woven and knitted mesh developed around unique dimensional and functional requirements.",
        cta: "Explore Custom Mesh Solutions",
        href: "/precision-mesh-solutions",
        image: `${IMG}/material-custom.webp`,
      },
    ],
  },

  finalCta: {
    title: "Need precision mesh matched to your fuel-cell application?",
    text: "Tell us what the component needs to do. Our team can help you review the material, mesh construction, geometry and processing options for your application.",
    primary: { label: "Request a Quote", href: "/contact#enquiry" },
    secondary: { label: "Speak to an Expert", href: "/contact#enquiry-general" },
    image: `${IMG}/cta-bg.webp`,
  },
};
