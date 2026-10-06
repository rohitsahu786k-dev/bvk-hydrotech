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
      question: "Can I get copies of your certificates?",
      answer:
        "Yes. Current-issue certificates for IATF 16949, ISO 9001, ISO 14001, ISO 45001, ISO 50001, AS9100 and DSIR recognition are issued on request, as are RoHS and REACH material compliance declarations.",
    },
    {
      question: "Do you provide material test reports and mill certificates?",
      answer:
        "Yes, per batch. Mill certificates, material traceability records, air permeability, grain structure and stress testing reports are issued against a specific order or programme rather than published.",
    },
    {
      question: "Can you complete our supplier questionnaire?",
      answer:
        "Yes. Send the questionnaire along with your audit requirements and documentation standard, and we will state up front where we meet it and where we do not.",
    },
    {
      question: "Is there a datasheet for a specific mesh specification?",
      answer:
        "Specifications are issued per component rather than as a catalogue, because the geometry, alloy and finishing route are set against your duty. Send the application and our engineers will return a specification you can review.",
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
      alt: "Precision mesh roll featured in BVK technical literature",
    },
  },
  benefits: [
    { icon: "file", title: "Three Brochures", text: "Green energy, knitted mesh and hydrogen." },
    { icon: "badge", title: "Certificates", text: "ISO, IATF, AS9100 and DSIR on request." },
    { icon: "flask", title: "Material Data", text: "Alloy specifications and compliance." },
    { icon: "headset", title: "Direct Support", text: "An engineer, not a brochure, for specifics." },
  ],
  overview: {
    eyebrow: "What is available",
    title: "Literature for the",
    titleAccent: "qualification stage",
    body: "These documents are written for engineers and buyers who need to assess BVK before an RFQ: what we make, in which materials, to which standards, and how the process is controlled. They are not a substitute for a technical conversation — anything specific to your component is best answered directly, and usually faster.",
    action: { label: "Ask an Engineer", href: "/contact" },
    image: {
      src: img.gembaBoard,
      alt: "Documentation and quality records at the BVK plant",
    },
    badge: { title: "Need something else?", text: "Certificates and data on request" },
  },
  components: {
    eyebrow: "Downloads",
    title: "Available",
    titleAccent: "documents",
    intro:
      "Three brochures covering the product range. Each opens as a PDF in a new tab.",
    image: {
      src: img.meshRoll,
      alt: "BVK precision mesh product range",
    },
    callouts: [
      {
        title: "Green Energy Brochure",
        text: "Precision woven mesh solutions for electrolysers and fuel cells. Covers company credentials, the full material table, process capability and industries served.",
      },
      {
        title: "Green Hydrogen Leaflet",
        text: "Knitted mesh for the hydrogen value chain. Covers the three knit types, machine and wire parameters, and applicable standards.",
      },
      {
        title: "Certification Pack",
        text: "ISO 9001, ISO 14001, ISO 45001, ISO 50001, IATF 16949, AS9100 and DSIR recognition — available on request.",
      },
      {
        title: "Knitted Mesh Brochure",
        text: "Functional advantages, key parameters and the BVK competitive edge for knitted mesh across applications.",
      },
      {
        title: "Material Compliance",
        text: "RoHS and REACH declarations, plus alloy specifications against AISI and UNS designations.",
      },
      {
        title: "Quality Documentation",
        text: "Control plans, PPA documentation and traceability records, issued per programme.",
      },
    ],
  },
  features: {
    eyebrow: "On request",
    title: "What is not",
    titleAccent: "on this page",
    body: "Some documents are issued per customer or per programme rather than published. Ask and we will send the current version.",
    points: [
      "ISO, IATF, AS9100 and DSIR certificates — current issue",
      "RoHS and REACH material compliance declarations",
      "Mill certificates and material traceability for a specific batch",
      "Control plans and Production Part Approval documentation",
      "Test reports — air permeability, grain structure, stress testing",
      "CFD assessment reports for a developed component",
      "Supplier questionnaire responses and audit pack",
    ],
    image: {
      src: img.materialRacks,
      alt: "Material storage with batch identification at the BVK plant",
    },
    badge: { title: "Issued per programme", text: "always the current revision" },
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
        text: "Wire diameter, knit type, corrugation and single-piece capability.",
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
      image: { src: img.electrolyserSplash, alt: "Electrolyser stack" },
      title: "Electrolyser Solutions",
      href: "/electrolyser-solutions",
    },
    {
      image: { src: img.knittedMacro, alt: "Knitted mesh detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
    {
      image: { src: img.flowLab, alt: "R&D laboratory" },
      title: "R&D, CFD & Prototyping",
      href: "/rd-cfd-prototyping",
    },
  ],
  cta: standardCta({
    title: "Need a document\nthat is not here?",
    body: "Certificates, test reports, mill certificates and compliance declarations are all available. Tell us what your qualification process requires.",
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
      alt: "Macro detail of knitted metal mesh structure",
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
    body: "In our experience the parts that fail in service were rarely made badly — they were specified against an incomplete picture of the duty. A micron rating without a pressure drop budget. An alloy chosen for cost without checking the medium. A knit density set by what was available rather than by the stack. This page collects the reasoning we go through with customers, so that the conversation can start further along.",
    action: { label: "Read the Notes", href: "#components" },
    image: {
      src: img.meshTestingLab,
      alt: "Mesh flow testing laboratory",
    },
    badge: { title: "Written by engineers", text: "for engineers specifying mesh" },
  },
  components: {
    eyebrow: "Engineering notes",
    title: "Six things worth",
    titleAccent: "knowing first",
    intro:
      "Each of these comes up in nearly every technical enquiry we handle.",
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
      alt: "Precision mesh flow laboratory with analysis display",
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
      image: { src: img.knittedMacro, alt: "Knitted mesh" },
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
    { icon: "spool", title: "Up to 2.2 m", text: "Single-piece diameter capability." },
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
      "Nothing here is unusual — but an enquiry carrying all six usually gets a technical answer the same week.",
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
      "Single-piece diameter — up to 2.2 m, removing seams from large circular components",
      "Corrugation — 4 to 10 mm, in herringbone, W and V profiles",
      "Treatments — degreased, annealed, coated or plated",
      "Certifications — IATF 16949, ISO 9001, ISO 14001, ISO 45001, ISO 50001, AS9100, DSIR, CE, RoHS, REACH",
      "Standards referenced — ASTM B164, ISO 9044, DSIR-RDI and ISO 22734-ready QMS",
      "Export — currently supplying 25+ countries",
    ],
    image: {
      src: img.stainlessMeshRoll,
      alt: "Stainless steel mesh roll",
    },
    badge: { title: "Still unanswered?", text: "An engineer will reply directly" },
  },
  why: {
    eyebrow: "How we respond",
    title: "An engineer,",
    titleAccent: "not a form letter",
    intro:
      "Technical enquiries are routed to the application team rather than to sales administration. That occasionally makes the first reply slower and almost always makes it more useful.",
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
      image: { src: img.membraneRoll, alt: "Technical literature" },
      title: "Resources & Downloads",
      href: "/resources",
    },
    {
      image: { src: img.knittedMacro, alt: "Engineering insights" },
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
