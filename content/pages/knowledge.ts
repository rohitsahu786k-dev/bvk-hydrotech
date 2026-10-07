import type { SolutionPageContent } from "@/lib/content/types";
import { docs, img } from "../assets";
import { standardCta } from "../shared";

export const resources: SolutionPageContent = {
  slug: "resources",
  breadcrumb: "Resources",
  faqs: [
    {
      question: "Which brochures can I download?",
      answer:
        "Three: the Green Energy Brochure covering precision woven mesh for electrolysers and fuel cells, the Knitted Mesh Brochure covering functional advantages and parameters, and the Green Hydrogen Knitted Mesh leaflet covering knit types and stack applications. All open as PDFs.",
    },
    {
      question: "Which certifications does BVK refer to?",
      answer:
        "BVK literature refers to IATF 16949:2016, ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018, together with DSIR recognition for in-house R&D. The certification badges are shown on this site. For documents needed in your qualification process, contact the team.",
    },
    {
      question: "Is there a datasheet for a specific mesh specification?",
      answer:
        "The brochures set out the material range, parameter ranges and process capability. For a specific component, share the application and requirements through the enquiry form and the engineering team will respond.",
    },
  ],
  hero: {
    eyebrow: "Downloads",
    title: "Resources &",
    titleAccent: "Downloads",
    subtitle:
      "Approved brochures and technical literature for vendor qualification, internal circulation and early engineering review.",
    features: [
      { icon: "file", title: "Brochures" },
      { icon: "flask", title: "Technical Data" },
      { icon: "badge", title: "Certifications" },
      { icon: "headset", title: "Engineer Access" },
    ],
    primary: { label: "Request Specific Data", href: "/contact" },
    secondary: { label: "Green Energy Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.membraneRoll,
      alt: "Illustration: Precision mesh roll featured in BVK technical literature",
    },
  },
  benefits: [
    { icon: "file", title: "Three Brochures", text: "Green energy, knitted mesh and hydrogen." },
    { icon: "badge", title: "Credentials", text: "IATF, ISO and DSIR recognition." },
    { icon: "flask", title: "Material Data", text: "Fourteen alloys with AISI/UNS designations." },
    { icon: "headset", title: "Direct Contact", text: "For anything specific to your component." },
  ],
  overview: {
    eyebrow: "What is available",
    title: "Literature for the",
    titleAccent: "qualification stage",
    body: "These documents are written for engineers and buyers who need to assess BVK before an RFQ: what we make, in which materials, to which standards, and how the process is controlled. They are not a substitute for a technical conversation — anything specific to your component is best taken up with the team directly.",
    action: { label: "Ask an Engineer", href: "/contact" },
    image: {
      src: img.gembaBoard,
      alt: "Gemba quality management board at the BVK plant",
    },
    badge: { title: "Need something else?", text: "Contact the team" },
  },
  downloads: {
    eyebrow: "Downloads",
    title: "Available",
    titleAccent: "documents",
    intro: "Three documents covering the product range. Each opens as a PDF in a new tab.",
    items: [
      {
        title: "Green Energy Brochure",
        text: "Precision woven mesh solutions for electrolysers and fuel cells: company credentials, the material table, process capability, sustainability and industries served.",
        href: docs.greenEnergy,
        format: "PDF · Brochure",
      },
      {
        title: "Green Hydrogen Knitted Mesh Solutions",
        text: "Knit types (Voltra Lite, Voltra +, Voltra Max), machine and wire parameters, stack applications and the standards referenced.",
        href: docs.hydrogenLeaflet,
        format: "PDF · Leaflet",
      },
      {
        title: "Knitted Mesh Brochure",
        text: "Functional advantages, key parameters, finishing and forming options, and the BVK competitive edge for knitted mesh.",
        href: docs.knittedMesh,
        format: "PDF · Brochure",
      },
    ],
  },
  features: {
    eyebrow: "Inside the documents",
    title: "What the brochures",
    titleAccent: "cover",
    body: "Together the three documents cover the company, the product range and the process behind it.",
    points: [
      "Fourteen-alloy material table with material number, description and AISI/UNS designation",
      "Company credentials, certifications and industries served",
      "Process capability: treatments, coatings and quality control",
      "Knit types and their stack applications",
      "Knitted mesh parameters: wire diameter, knit type, forming and finishing",
      "Sustainability and ESG commitments",
    ],
    image: {
      src: img.materialRacks,
      alt: "Stainless steel material storage racks at the BVK plant",
    },
    badge: { title: "Three documents", text: "PDF, opens in a new tab" },
  },
  why: {
    eyebrow: "Using these documents",
    title: "Written for",
    titleAccent: "technical readers",
    intro:
      "The brochures assume you already know what mesh is. They are structured around the decisions an engineer actually has to make.",
    cards: [
      {
        icon: "flask",
        title: "Material Tables",
        text: "Fourteen alloys with material number, description and AISI/UNS equivalent.",
      },
      {
        icon: "ruler",
        title: "Parameter Ranges",
        text: "Wire diameter, knit type, corrugation and forming options.",
      },
      {
        icon: "cog",
        title: "Process Capability",
        text: "Treatment, coating, forming and quality control routes described.",
      },
      {
        icon: "shapes",
        title: "Application Mapping",
        text: "Which mesh function serves which position in a stack or filter.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.electrolyserSplash, alt: "Illustration: Electrolyser stack" },
      title: "Electrolyser Solutions",
      href: "/electrolyser-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Illustration: Knitted mesh detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
    {
      image: { src: img.flowLab, alt: "Illustration: R&D laboratory" },
      title: "R&D, CFD & Prototyping",
      href: "/rd-cfd-prototyping",
    },
  ],
  cta: standardCta({
    title: "Need a document\nthat is not here?",
    body: "Tell us what your qualification process requires and the team will respond.",
    brochure: docs.knittedMesh,
    eyebrow: "Resources",
  }),
};

export const insights: SolutionPageContent = {
  slug: "insights",
  breadcrumb: "Insights",
  faqs: [
    {
      question: "What is the difference between woven and knitted wire mesh?",
      answer:
        "Woven mesh is made by interlacing wires at right angles, giving a defined and repeatable aperture — the right choice when retention and flow have to be predictable. Knitted mesh is made from interlocking loops, giving high porosity and the ability to compress and conform to an irregular shape. Choosing wrongly cannot be corrected further down the process.",
    },
    {
      question: "How do I choose between retention and pressure drop?",
      answer:
        "You trade them, you do not choose them independently. Tightening the aperture to retain smaller particles raises pressure drop across the element. State the budget for both and the geometry follows; state only one and the specification is underdetermined.",
    },
    {
      question: "Which alloy should I specify?",
      answer:
        "The medium decides, not the budget. Stainless 304 is the default where chemistry is mild, 316 where chlorides are present, 904L for aggressive acids, nickel grades for alkaline service and conductivity, and Hastelloy C-22 or Alloy 625 where stainless will not survive. Starting from price usually costs more over the life of the part.",
    },
    {
      question: "How does wire diameter affect mesh performance?",
      answer:
        "Across the 0.05 mm to 0.30 mm range, wire diameter sets pore size, surface area, stiffness and conductivity simultaneously. It is rarely a free variable — changing it to fix one property will move the other three.",
    },
    {
      question: "Does treatment really change how mesh performs?",
      answer:
        "Substantially. Micro-structure annealing alters formability, coating changes surface area and contact resistance, and corrugation sets the spring rate. The same woven roll can produce two components that behave very differently.",
    },
    {
      question: "What should be validated before moving from prototype to production?",
      answer:
        "A good prototype proves the geometry works; it does not prove the process is capable of repeating it. Process capability is established through a documented control plan and the Production Part Approval procedure before series release.",
    },
  ],
  hero: {
    eyebrow: "Knowledge Center",
    title: "Engineering",
    titleAccent: "Insights",
    subtitle:
      "How mesh decisions are actually made: choosing an alloy, setting geometry, and knowing what to validate before a prototype becomes a production part.",
    features: [
      { icon: "flask", title: "Material Choice" },
      { icon: "ruler", title: "Geometry" },
      { icon: "cog", title: "Process Effects" },
      { icon: "trending", title: "Scale-Up" },
    ],
    primary: { label: "Ask an Engineer", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.knittedMacro,
      alt: "Illustration: Macro detail of knitted metal mesh structure",
    },
  },
  benefits: [
    { icon: "flask", title: "Alloy Selection", text: "Matching metal to chemistry and duty." },
    { icon: "ruler", title: "Geometry Effects", text: "How aperture and density drive behaviour." },
    { icon: "flame", title: "Treatment Impact", text: "Why the same mesh behaves differently." },
    { icon: "listChecks", title: "Validation", text: "What to test before you commit." },
  ],
  overview: {
    eyebrow: "Why this page exists",
    title: "Most mesh problems are",
    titleAccent: "specification problems",
    body: "A mesh specified against an incomplete picture of the duty can fail in service however well it is made. A micron rating without a pressure drop budget. An alloy chosen for cost without checking the medium. A knit density set by what was available rather than by the stack. This page collects the reasoning we go through with customers, so that the conversation can start further along.",
    action: { label: "Read the Notes", href: "#components" },
    image: {
      src: img.meshTestingLab,
      alt: "Illustration: Mesh flow testing laboratory",
    },
    badge: { title: "Six checkpoints", text: "before specifying mesh" },
  },
  components: {
    eyebrow: "Engineering notes",
    title: "Six things worth",
    titleAccent: "knowing first",
    intro:
      "Six points worth settling before a mesh is specified.",
    image: {
      src: img.wovenMeshSurface,
      alt: "Precision woven mesh structure",
    },
    callouts: [
      {
        title: "Woven or knitted is the first question",
        text: "Woven gives a defined, repeatable aperture. Knitted gives porosity and the ability to compress and conform. Choosing wrongly here cannot be fixed by adjusting anything downstream.",
      },
      {
        title: "Retention and pressure drop are traded, not chosen",
        text: "Tightening the aperture to improve retention raises pressure drop. State the budget for both and the geometry follows; state only one and the specification is underdetermined.",
      },
      {
        title: "Treatment changes the part as much as the weave",
        text: "Annealing, coating and forming alter hardness, formability, contact resistance and surface area. The same woven roll can produce two very different components.",
      },
      {
        title: "Alloy is set by the medium, not by the budget",
        text: "304 is the default, 316 for chlorides, 904L for aggressive acids, nickel for alkaline and conductivity, Hastelloy where stainless will not survive. Starting from price usually costs more.",
      },
      {
        title: "Wire diameter drives more than pore size",
        text: "Across 0.05–0.30 mm, wire diameter sets surface area, stiffness and conductivity at the same time. It is rarely a free variable.",
      },
      {
        title: "Validate the batch, not the sample",
        text: "A good prototype proves the geometry works. It does not prove the process is capable. That is what control plans and Production Part Approval are for.",
      },
    ],
  },
  features: {
    eyebrow: "Before you RFQ",
    title: "What to have",
    titleAccent: "ready",
    body: "An enquiry with these answers gets a technical response quickly. One without them starts with a round of questions.",
    points: [
      "Application and which position in the assembly the mesh occupies",
      "Medium, chemistry and concentration",
      "Operating and excursion temperature",
      "Flow rate and allowable pressure drop",
      "Retention requirement, and whether absolute or nominal",
      "Mechanical loading — clamping force, vibration, cleaning cycles",
      "Finished geometry, thickness budget and tolerances",
      "Expected annual volume and prototype timeline",
      "Certification and country-of-destination requirements",
    ],
    image: {
      src: img.flowLab,
      alt: "Illustration: Precision mesh flow laboratory with analysis display",
    },
    badge: { title: "Nine inputs", text: "turn an enquiry into a specification" },
  },
  why: {
    eyebrow: "Our position",
    title: "We would rather",
    titleAccent: "say no",
    intro:
      "Mesh is not the right answer to every separation or conduction problem. Where it is not, saying so early costs us an order and saves you a programme.",
    cards: [
      {
        icon: "microscope",
        title: "Model Before Making",
        text: "CFD and simulation can rule an approach out before tooling exists.",
      },
      {
        icon: "handshake",
        title: "Close Cooperation",
        text: "Filtration is rarely plug-and-play; it needs supplier and customer working together.",
      },
      {
        icon: "box",
        title: "Prototype Honestly",
        text: "Samples tested against norms both sides agreed, not a best-case demonstration.",
      },
      {
        icon: "fileCheck",
        title: "Document the Limits",
        text: "Where a specification has a boundary, it belongs in the control plan.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.wovenMeshSurface, alt: "Woven mesh" },
      title: "Woven Mesh Solutions",
      href: "/woven-mesh-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Illustration: Knitted mesh" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
    {
      image: { src: img.annealing, alt: "Annealing line" },
      title: "Process & Treatments",
      href: "/process-treatments",
    },
  ],
  cta: standardCta({
    title: "Have a question this\npage did not answer?",
    body: "Our application engineers answer technical questions directly, whether or not there is an order behind them.",
    eyebrow: "Knowledge Center",
    primaryLabel: "Ask an Engineer",
  }),
};

export const faqs: SolutionPageContent = {
  slug: "faqs",
  breadcrumb: "FAQs",
  hero: {
    eyebrow: "Before you enquire",
    title: "Frequently Asked",
    titleAccent: "Questions",
    subtitle:
      "Materials, mesh types, capabilities, certifications and what we need from you to quote accurately.",
    features: [
      { icon: "flask", title: "Materials" },
      { icon: "ruler", title: "Capabilities" },
      { icon: "badge", title: "Certifications" },
      { icon: "headset", title: "Enquiry Process" },
    ],
    primary: { label: "Ask Something Else", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.meshRoll,
      alt: "BVK precision mesh roll",
    },
  },
  benefits: [
    { icon: "ruler", title: "0.05–0.30 mm", text: "Knitted mesh wire diameter range." },
    { icon: "spool", title: "Large Single Pieces", text: "Single-piece diameter capability." },
    { icon: "flask", title: "14 Alloys", text: "Catalogued material range." },
    { icon: "globe", title: "25+ Countries", text: "Current export reach." },
  ],
  overview: {
    eyebrow: "Overview",
    title: "What we need to",
    titleAccent: "quote properly",
    body: "The most common reason a quotation takes longer than it should is an enquiry that specifies a product rather than a duty. If you already have a drawing, send it. If you do not, send the operating conditions instead — our application team would genuinely rather have the conditions, because that is what allows us to check whether the part you have in mind is the right one.",
    action: { label: "See the Inputs", href: "#components" },
    image: {
      src: img.gembaBoard,
      alt: "Technical documentation at the BVK plant",
    },
    badge: { title: "No drawing yet?", text: "Send the duty instead" },
  },
  components: {
    eyebrow: "Enquiry inputs",
    title: "Six things that",
    titleAccent: "speed up a quote",
    intro:
      "Nothing here is unusual — but an enquiry carrying all six lets the engineering team start from the application.",
    image: {
      src: img.engineeredMeshRender,
      alt: "Engineered mesh component for technical enquiry",
    },
    callouts: [
      {
        title: "Application Details",
        text: "Cell chemistry or medium, operating temperature, pressure, target porosity and the available envelope.",
      },
      {
        title: "Performance Targets",
        text: "Retention, flow rate, allowable pressure drop, conductivity or mechanical strength — whichever govern.",
      },
      {
        title: "Commercial Context",
        text: "Expected annual volume, prototype timeline and destination country.",
      },
      {
        title: "Drawings & Tolerances",
        text: "Dimensional drawings, target thickness, forming requirements and assembly constraints.",
      },
      {
        title: "Material Preference",
        text: "A preferred alloy if you have one — or the chemistry, and we will recommend it.",
      },
      {
        title: "Certification Needs",
        text: "Any standard, approval or documentation your qualification process requires.",
      },
    ],
  },
  features: {
    eyebrow: "Quick answers",
    title: "The questions we",
    titleAccent: "get most often",
    body: "Short answers to the enquiries that arrive weekly. Page-specific questions are answered in the accordion further down, and anything else is best asked directly.",
    points: [
      "Materials — nickel 201/202, titanium, stainless steel, copper, aluminium, Hastelloy and specialty alloys; fourteen catalogued grades",
      "Knitted wire diameter — 0.05 mm to 0.30 mm",
      "Knit types — single, double and multi-end",
      "Single-piece sizes — large diameters, removing seams from circular components",
      "Corrugation — 4 to 10 mm, in herringbone, W and V profiles",
      "Treatments — degreased, annealed, coated or plated",
      "Certifications — IATF 16949, ISO 9001, ISO 14001, ISO 45001, ISO 50001, DSIR, CE, RoHS, REACH",
      "Standards referenced — ASTM B164, ISO 9044, DSIR-RDI and ISO 22734-ready QMS",
      "Export — currently supplying 25+ countries",
    ],
    image: {
      src: img.stainlessMeshRoll,
      alt: "Illustration: Stainless steel mesh roll",
    },
    badge: { title: "Still unanswered?", text: "An engineer will reply directly" },
  },
  why: {
    eyebrow: "How we respond",
    title: "An engineer,",
    titleAccent: "not a form letter",
    intro:
      "Technical enquiries are addressed on the engineering question first.",
    cards: [
      {
        icon: "headset",
        title: "Technical First Response",
        text: "The first reply addresses the engineering question, not the commercial one.",
      },
      {
        icon: "microscope",
        title: "Recommendation With Reasoning",
        text: "You get the why behind a material or geometry suggestion, so you can challenge it.",
      },
      {
        icon: "box",
        title: "Prototype Route",
        text: "Where the answer is uncertain, we propose a sample and a test rather than a guess.",
      },
      {
        icon: "handshake",
        title: "Honest Scope",
        text: "If mesh is the wrong solution, or the volume does not suit us, we will say so.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.meshRoll, alt: "Precision mesh" },
      title: "Precision Mesh Solutions",
      href: "/precision-mesh-solutions",
    },
    {
      image: { src: img.membraneRoll, alt: "Illustration: Technical literature" },
      title: "Resources & Downloads",
      href: "/resources",
    },
    {
      image: { src: img.knittedMacro, alt: "Illustration: Engineering insights" },
      title: "Engineering Insights",
      href: "/insights",
    },
  ],
  cta: standardCta({
    title: "Question not\nanswered here?",
    body: "Send it with whatever detail you have. Our application engineers answer technical questions directly, whether or not there is an order behind them.",
    eyebrow: "Still have questions",
    primaryLabel: "Ask an Engineer",
  }),
};
