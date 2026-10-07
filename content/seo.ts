import type { PageSeo } from "@/lib/content/types";

/**
 * Per-page search metadata.
 *
 * The first entry in `keywords` is the page's primary keyword — it also appears
 * in the title and the opening sentence of the page copy. Everything after it is
 * a secondary term. Titles are kept under ~60 characters and descriptions under
 * ~158 so they survive to the SERP intact; the site name is appended by the
 * template in app/layout.tsx.
 */

export const pageSeo: Record<string, PageSeo> = {
  about: {
    title: "About BVK Hydrotech | Precision Mesh Maker Since 1963",
    description:
      "BVK Hydrotech is a Jaipur precision wire mesh manufacturer, part of BVK Group since 1963. 300+ people, 650+ MT a year, exporting to 25+ countries.",
    keywords: [
      "BVK Hydrotech",
      "precision mesh manufacturer India",
      "wire mesh manufacturer Jaipur",
      "BVK Group",
      "technical mesh company India",
      "IATF 16949 mesh supplier",
    ],
    schema: {
      type: "AboutPage",
      name: "About BVK Hydrotech",
      description:
        "BVK Hydrotech India Pvt. Ltd., a BVK Group company manufacturing precision woven and knitted metal mesh in Jaipur, India since 1963.",
    },
  },

  "precision-mesh-solutions": {
    title: "Precision Wire Mesh Solutions | Woven & Knitted Metal Mesh",
    description:
      "Precision wire mesh engineered to your duty: woven and knitted metal mesh in 14 catalogued alloys, with treatment, forming and cutting in one plant.",
    keywords: [
      "precision wire mesh",
      "precision metal mesh manufacturer",
      "woven and knitted mesh",
      "stainless steel wire mesh 316L",
      "nickel wire mesh",
      "custom metal mesh components",
      "laser cut mesh parts",
    ],
    schema: {
      type: "Product",
      name: "Precision Wire Mesh",
      description:
        "Woven and knitted precision metal mesh in stainless steel, nickel, titanium, copper, aluminium and specialty alloys, finished to customer drawing.",
      material: [
        "Stainless steel 304",
        "Stainless steel 316L",
        "Stainless steel 904L",
        "Nickel 201",
        "Nickel 202",
        "Titanium",
        "Hastelloy C-22",
        "Copper",
        "Aluminium",
      ],
    },
  },

  "woven-mesh-solutions": {
    title: "Woven Wire Mesh Manufacturer | Controlled Aperture Mesh",
    description:
      "Woven wire mesh with a stable, repeatable aperture for rated filtration, electrode support and conductive layers in stainless, nickel and specialty alloys.",
    keywords: [
      "woven wire mesh manufacturer",
      "woven mesh for filtration",
      "stainless steel woven mesh",
      "nickel woven mesh",
      "copper mesh",
      "electrode substrate mesh",
      "catalyst support mesh",
    ],
    schema: {
      type: "Product",
      name: "Woven Wire Mesh",
      description:
        "Precision woven wire mesh with controlled aperture for industrial filtration, electrolyser electrodes, fuel cell layers and custom components.",
      material: [
        "Stainless steel 304",
        "Stainless steel 316",
        "Stainless steel 314",
        "Stainless steel 904L",
        "Crofer 22",
        "Nickel 99.6",
        "Hastelloy C-22",
        "Alloy 625",
        "Copper",
        "Aluminium",
      ],
    },
  },

  "knitted-mesh-solutions": {
    title: "Knitted Wire Mesh | GDL, Elastic Elements & Stack Components",
    description:
      "Single, double and multi-end knitted wire mesh in nickel, titanium and stainless steel. Wire 0.05–0.30 mm, large single-piece diameters.",
    keywords: [
      "knitted wire mesh",
      "knitted wire mesh manufacturer India",
      "gas diffusion layer mesh",
      "GDL mesh",
      "nickel knitted mesh",
      "elastic element nickel mesh",
      "demister mesh",
      "corrugated knitted mesh",
    ],
    schema: {
      type: "Product",
      name: "Knitted Wire Mesh",
      description:
        "Single, double and multi-end knitted wire mesh for electrolyser stacks, gas diffusion layers, separators, elastic elements and filtration elements.",
      material: ["Nickel 201", "Nickel 202", "Titanium", "Stainless steel", "Hastelloy", "Copper"],
    },
  },

  "electrolyser-solutions": {
    title: "Electrolyser Mesh for Green Hydrogen Stacks | Alkaline & PEM",
    description:
      "Electrolyser mesh for alkaline and PEM stacks: GDL and PTL layers, catalyst support, current collection and nickel elastic elements. Large single-piece diameters.",
    keywords: [
      "electrolyser mesh",
      "alkaline electrolyser components",
      "PEM electrolyser mesh",
      "porous transport layer",
      "PTL mesh",
      "catalyst support mesh",
      "current collector mesh",
      "green hydrogen mesh manufacturer",
    ],
    schema: {
      type: "Product",
      name: "Electrolyser Mesh Components",
      description:
        "Woven and knitted metal mesh for alkaline and PEM electrolyser stacks: gas diffusion and porous transport layers, catalyst support, current collection and elastic elements.",
      material: ["Nickel 201", "Nickel 202", "Titanium", "Stainless steel", "Specialty alloys"],
    },
  },

  "fuel-cell-solutions": {
    title: "Fuel Cell Mesh | Gas Diffusion & Electrode Support Components",
    description:
      "Fuel cell mesh for gas diffusion, current collection and electrode support in AFC, SOFC and PEM stacks. Specified against conductivity and pressure drop.",
    keywords: [
      "fuel cell mesh",
      "fuel cell electrode mesh",
      "gas diffusion layer mesh",
      "current collector mesh",
      "SOFC interconnect mesh",
      "PEM fuel cell components",
      "bipolar plate mesh",
    ],
    schema: {
      type: "Product",
      name: "Fuel Cell Mesh Components",
      description:
        "Woven and knitted metal mesh for alkaline, solid oxide and polymer electrolyte membrane fuel cell stacks, serving gas diffusion, current collection and electrode support.",
      material: [
        "Stainless steel 316L",
        "Crofer 22",
        "Nickel 99.6",
        "Hastelloy C-22",
        "Alloy 625",
      ],
    },
  },

  "industrial-filtration": {
    title: "Industrial Filtration Mesh & Filter Elements | BVK Hydrotech",
    description:
      "Industrial filtration mesh and elements for separation, de-watering and process protection: filter candles, pleated filters, discs and screen cylinders.",
    keywords: [
      "industrial filtration mesh",
      "filter element manufacturer India",
      "pleated mesh filter",
      "filter candle",
      "screen cylinder",
      "de-watering mesh",
      "mineral separation mesh",
    ],
    schema: {
      type: "Service",
      name: "Industrial Filtration Mesh and Elements",
      description:
        "Filtration mesh and fabricated filter elements for pulp and paper, chemical, mining, food and beverage, and process industries.",
      serviceType: "Industrial filtration component manufacturing",
    },
  },

  "energy-clean-tech": {
    title: "Green Hydrogen Mesh Components | Energy & Clean Tech",
    description:
      "Green hydrogen mesh components for electrolysis, fuel cells, purification and balance of plant — from a manufacturer running 50%+ on renewable energy.",
    keywords: [
      "green hydrogen mesh components",
      "hydrogen electrolysis components",
      "clean energy mesh supplier",
      "balance of plant filtration",
      "hydrogen purification mesh",
      "green hydrogen supply chain India",
    ],
    schema: {
      type: "Service",
      name: "Clean Energy Mesh Components",
      description:
        "Metal mesh components for electrolysis, fuel cells, hydrogen purification and balance-of-plant systems across the green hydrogen value chain.",
      serviceType: "Clean energy component manufacturing",
    },
  },

  "engineering-manufacturing": {
    title: "Wire Mesh Manufacturing | Integrated Plant & Quality Systems",
    description:
      "Wire mesh manufacturing on German-origin equipment with Industry 4.0 control, Total Quality Management, Production Part Approval and 100% traceability.",
    keywords: [
      "wire mesh manufacturing process",
      "mesh manufacturing India",
      "integrated weaving plant",
      "IATF 16949 manufacturing",
      "production part approval mesh",
      "traceable mesh production",
    ],
    schema: {
      type: "Service",
      name: "Precision Mesh Manufacturing",
      description:
        "Integrated weaving, knitting, treatment, forming, inspection and documentation for precision technical mesh components.",
      serviceType: "Precision mesh manufacturing",
    },
  },

  "process-treatments": {
    title: "Wire Mesh Treatment, Coating & Forming | Process Capability",
    description:
      "Wire mesh surface treatment and forming: micro-structure annealing, modulated coating, corrugation 4–10 mm, flattening, slitting and laser cutting.",
    keywords: [
      "wire mesh surface treatment",
      "mesh annealing",
      "mesh coating process",
      "corrugated mesh forming",
      "laser cut mesh",
      "mesh plating",
      "degreased annealed mesh",
    ],
    schema: {
      type: "Service",
      name: "Mesh Treatment and Forming",
      description:
        "Annealing, coating, plating, crimping, corrugation, flattening, slitting and laser cutting applied to woven and knitted metal mesh.",
      serviceType: "Metal mesh treatment and forming",
    },
  },

  "rd-cfd-prototyping": {
    title: "Mesh CFD Simulation & Prototyping | DSIR-Recognised R&D",
    description:
      "Mesh CFD simulation, rapid prototyping, air permeability topography, grain structure examination and stress testing from a DSIR-recognised R&D centre.",
    keywords: [
      "mesh CFD simulation",
      "wire mesh prototyping",
      "DSIR recognised R&D",
      "air permeability testing",
      "mesh design optimisation",
      "filtration simulation India",
    ],
    schema: {
      type: "Service",
      name: "Mesh R&D, CFD and Prototyping",
      description:
        "Computational Fluid Dynamics analysis, rapid prototyping, physical testing and mesh design optimisation from a Government of India DSIR-recognised R&D centre.",
      serviceType: "Research, simulation and prototyping",
    },
  },

  "industries-applications": {
    title: "Wire Mesh Applications | 10 Industries Served Worldwide",
    description:
      "Wire mesh applications across automotive, aerospace, pulp and paper, chemical, mining, food, energy, electronics and architecture. Exporting to 25+ countries.",
    keywords: [
      "wire mesh applications",
      "industrial mesh industries",
      "EMI shielding mesh",
      "paper forming mesh",
      "EGR filter mesh",
      "architectural metal mesh",
      "mesh for mining",
    ],
    schema: {
      type: "CollectionPage",
      name: "Industries and Applications",
      description:
        "The ten industries BVK Hydrotech precision mesh is specified into, and the sub-applications served within each.",
    },
  },

  sustainability: {
    title: "Sustainable Mesh Manufacturing | 50%+ Renewable Energy",
    description:
      "Sustainable mesh manufacturing: 50%+ of energy from renewables, a 100% self-reliance goal, fully reusable packaging and ISO 14001, 45001 and 50001 systems.",
    keywords: [
      "sustainable mesh manufacturing",
      "ESG mesh supplier",
      "renewable energy manufacturing India",
      "ISO 50001 energy management",
      "recyclable industrial packaging",
      "low carbon supply chain",
    ],
    schema: {
      type: "WebPage",
      name: "Sustainability at BVK Hydrotech",
      description:
        "BVK Hydrotech's renewable energy share, circular packaging, certified environmental and energy management systems, and 2030 ESG goals.",
    },
  },

  resources: {
    title: "Wire Mesh Brochure Downloads | Technical Literature",
    description:
      "Download BVK Hydrotech brochures: green energy woven mesh, knitted mesh and the green hydrogen leaflet. Certificates and compliance declarations on request.",
    keywords: [
      "wire mesh brochure download",
      "knitted mesh brochure",
      "green hydrogen mesh leaflet",
      "mesh technical datasheet",
      "ISO certificate mesh supplier",
      "REACH RoHS declaration",
    ],
    schema: {
      type: "CollectionPage",
      name: "Resources and Downloads",
      description:
        "Approved BVK Hydrotech brochures and technical literature for vendor qualification and engineering review.",
    },
  },

  insights: {
    title: "Mesh Engineering Guide | How Mesh Specifications Are Made",
    description:
      "A mesh engineering guide: woven versus knitted, retention against pressure drop, treatment effects, alloy choice and what to validate before scale-up.",
    keywords: [
      "mesh engineering guide",
      "woven vs knitted mesh",
      "how to specify wire mesh",
      "mesh material selection",
      "filtration specification guide",
      "mesh porosity design",
    ],
    schema: {
      type: "CollectionPage",
      name: "Engineering Insights",
      description:
        "Engineering notes on specifying precision metal mesh: form, geometry, material, treatment and validation.",
    },
  },

  faqs: {
    title: "Wire Mesh FAQ | Materials, Capability & Enquiry Process",
    description:
      "Wire mesh FAQ: materials and alloys, wire diameter 0.05–0.30 mm, knit types, single-piece capability, certifications and what we need to quote.",
    keywords: [
      "wire mesh FAQ",
      "knitted mesh wire diameter",
      "mesh material options",
      "mesh certifications",
      "wire mesh enquiry",
      "mesh RFQ requirements",
    ],
    schema: {
      type: "WebPage",
      name: "Frequently Asked Questions",
      description:
        "Common questions about BVK Hydrotech materials, mesh types, manufacturing capability, certifications and the enquiry process.",
    },
  },

  // Legal pages. Thin by nature, so they carry a plain title and a low sitemap
  // priority rather than keyword targeting.
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "How BVK Hydrotech India Pvt. Ltd. collects, uses, stores and protects personal data submitted through this website.",
    keywords: ["BVK Hydrotech privacy policy"],
  },
  "terms-of-use": {
    title: "Terms & Conditions",
    description:
      "The terms and conditions governing use of the BVK Hydrotech website and any enquiry submitted through it.",
    keywords: ["BVK Hydrotech terms and conditions"],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    description:
      "The terms and conditions governing use of the BVK Hydrotech website and any enquiry submitted through it.",
    keywords: ["BVK Hydrotech terms and conditions"],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description:
      "How BVK Hydrotech uses cookies and similar technologies on this website, and how to control them.",
    keywords: ["BVK Hydrotech cookie policy"],
  },
  disclaimer: {
    title: "Disclaimer",
    description:
      "Disclaimer covering the technical information, specifications and material published on the BVK Hydrotech website.",
    keywords: ["BVK Hydrotech disclaimer"],
  },
};

/**
 * terms-of-use and terms-and-conditions hold the same text word for word in
 * the CMS. Rather than leave two indexable copies, the one the footer menu
 * does NOT link to canonicalises to the one it does, so the indexed URL and
 * the linked URL are the same page. Add any future duplicate here.
 */
export const canonicalOverrides: Record<string, string> = {
  "terms-of-use": "/terms-and-conditions",
};

/** Pages that should resolve but stay out of search results. */
export const noindexSlugs = new Set<string>(["terms-of-use"]);
