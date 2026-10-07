import type { SolutionPageContent } from "@/lib/content/types";
import { docs, img } from "../assets";
import { sustainabilityBand, standardCta } from "../shared";

export const engineeringManufacturing: SolutionPageContent = {
  slug: "engineering-manufacturing",
  breadcrumb: "Engineering & Manufacturing",
  faqs: [
    {
      question: "What manufacturing capabilities does BVK Hydrotech have?",
      answer:
        "An integrated weaving platform with equipment of German origin, covering weaving, treatments such as annealing and coating, laser cutting and quality control, supported by Industry 4.0 systems including a manufacturing execution system.",
    },
    {
      question: "Which quality practices does BVK describe?",
      answer:
        "100% traceability, product standard harmonisation, process and quality control plans, custom-made testing equipment, and light-box and video inspection. Total Quality Management is guided by standardised control plans and a Production Part Approval (PPA) procedure.",
    },
    {
      question: "What does Industry 4.0 cover at BVK?",
      answer:
        "Technology 4.0 (material and manufacturing simulation, digital twin), Supply Chain 4.0 (end-to-end real-time transparency, AI early-warning systems), Manufacturing 4.0 (manufacturing execution system, MRO 4.0, predictive maintenance, human-machine interface, intelligent machine control) and Business 4.0 (predictive analytics, e-learning, IT security).",
    },
    {
      question: "What is BVK's production scale?",
      answer: "BVK converts 650+ MT of metal per annum, with 300+ employees and exports to 25+ countries.",
    },
    {
      question: "Where is the plant located?",
      answer: "Industrial Area, Jhotwara, Jaipur 302012, Rajasthan, India.",
    },
  ],
  hero: {
    eyebrow: "Scalability with stability",
    title: "Engineering &",
    titleAccent: "Manufacturing",
    subtitle:
      "An integrated weaving plant with German-origin equipment, Industry 4.0 process control and Total Quality Management — built so the fiftieth delivery matches the first.",
    features: [
      { icon: "factory", title: "Integrated Plant" },
      { icon: "cpu", title: "Industry 4.0" },
      { icon: "clipboard", title: "TQM & PPA" },
      { icon: "scan", title: "100% Traceability" },
    ],
    primary: { label: "Discuss Your Programme", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.weavingFloor,
      alt: "BVK factory weaving production floor with looms in operation",
    },
  },
  benefits: [
    { icon: "users", title: "300+ Employees", text: "An integrated weaving organisation." },
    { icon: "trending", title: "650+ MT p.a.", text: "Annual metal volume converted." },
    { icon: "globe", title: "German Equipment", text: "Equipment origin: Germany." },
    { icon: "badge", title: "IATF 16949", text: "Automotive-grade process discipline." },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Manufacturing built for",
    titleAccent: "repeat orders",
    body: "We prioritise innovation through manufacturing excellence by pursuing global standards, incorporating state-of-the-art technologies that place us at the forefront of global manufacturing. Central to that commitment is Total Quality Management, guided by standardised control plans and a Production Part Approval procedure. In practice this means the sample you approve and a later batch come off the same documented route.",
    action: { label: "See the Route", href: "#components" },
    image: {
      src: img.materialRacks,
      alt: "Stainless steel material storage racks in the BVK plant",
    },
    badge: { title: "TQM & PPA", text: "standardised control plans" },
  },
  process: {
    eyebrow: "Manufacturing route",
    title: "From raw wire to",
    titleAccent: "dispatched part",
    intro:
      "Five stages from raw wire to dispatched part.",
    steps: [
      {
        icon: "package",
        title: "Material Sourcing",
        text: "Certified alloy sourcing against a documented supply chain.",
      },
      {
        icon: "spool",
        title: "Weaving / Knitting",
        text: "Setup and production on German-origin equipment.",
      },
      {
        icon: "flame",
        title: "Treatment & Forming",
        text: "Annealing, coating, corrugation, flattening and cutting.",
      },
      {
        icon: "scan",
        title: "Inspection",
        text: "Light-box and video inspection against the control plan.",
      },
      {
        icon: "truck",
        title: "Pack & Dispatch",
        text: "Reusable, recyclable packaging with batch documentation.",
      },
    ],
  },
  components: {
    eyebrow: "Technology 4.0",
    title: "A digitally agile",
    titleAccent: "enterprise",
    intro:
      "BVK's digital vision is an ecosystem strategy — six connected layers rather than a single MES bolted onto an analogue plant.",
    image: {
      src: img.warping,
      alt: "Wire warping stage of the mesh manufacturing process",
    },
    callouts: [
      {
        title: "Manufacturing 4.0",
        text: "Manufacturing Execution System, MRO 4.0, predictive maintenance, human-machine interface and intelligent machine control.",
      },
      {
        title: "Supply Chain 4.0",
        text: "End-to-end real-time transparency, AI early-warning systems and optimised material flow.",
      },
      {
        title: "Quality Control",
        text: "100% traceability, product standard harmonisation, process and quality control plans, custom-made testing equipment.",
      },
      {
        title: "Material & Simulation",
        text: "Material and manufacturing simulation with digital twin modelling before production.",
      },
      {
        title: "Business 4.0",
        text: "Predictive analytics, e-learning and IT security across the organisation.",
      },
      {
        title: "Engineering",
        text: "Prototyping, simulation assessments, cost evaluations, material recommendations and mesh design optimisation.",
      },
    ],
  },
  features: {
    eyebrow: "Quality control",
    title: "What gets",
    titleAccent: "checked, and how",
    body: "Inspection at BVK is not a final gate — it is distributed through the route and recorded at each point. This is what a buyer's qualification audit will find.",
    points: [
      "100% traceability from incoming material to dispatch",
      "Product standard harmonisation across customers and orders",
      "Documented process and quality control plans per part",
      "Custom-made testing equipment built for specific mesh geometries",
      "Light-box inspection for aperture and defect detection",
      "Video inspection for continuous surface verification",
      "Production Part Approval procedure before series release",
    ],
    image: {
      src: img.gembaBoard,
      alt: "Gemba quality management board on the BVK shop floor",
    },
    badge: { title: "Gemba management", text: "quality visible on the floor" },
  },
  sustainability: sustainabilityBand,
  applications: {
    eyebrow: "In the plant",
    title: "The stages you can",
    titleAccent: "come and see",
    intro:
      "Photographs from the BVK plant.",
    cards: [
      {
        image: { src: img.warping, alt: "Wire warping process at BVK" },
        icon: "spool",
        title: "Warping",
        text: "Wire prepared and aligned before weaving begins.",
      },
      {
        image: { src: img.weavingFloor, alt: "Weaving production floor at BVK" },
        icon: "factory",
        title: "Weaving",
        text: "Production looms running precision technical mesh.",
      },
      {
        image: { src: img.annealing, alt: "Annealing furnace line at BVK" },
        icon: "flame",
        title: "Annealing",
        text: "Micro-structure annealing to alter physical properties.",
      },
      {
        image: { src: img.slitting, alt: "Precision slitting process at BVK" },
        icon: "scissors",
        title: "Slitting",
        text: "Precision slitting to finished width and tolerance.",
      },
    ],
  },
  why: {
    eyebrow: "Why it matters",
    title: "The problem is never the",
    titleAccent: "first sample",
    intro:
      "Any mesh maker can produce one good sample. The commercial question is whether the organisation behind it can repeat that under audit, at volume, two years later.",
    cards: [
      {
        icon: "route",
        title: "No External Handoff",
        text: "Weaving through to finished element in one plant, one record.",
      },
      {
        icon: "clipboard",
        title: "Control Plans",
        text: "Standardised plans and PPA before anything is released to series.",
      },
      {
        icon: "cpu",
        title: "Digital Visibility",
        text: "MES and machine monitoring supporting consistent volume production.",
      },
      {
        icon: "fileCheck",
        title: "Audit-Ready Records",
        text: "Batch-level documentation supporting critical industry requirements.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.annealing, alt: "Annealing line" },
      title: "Process & Treatments",
      href: "/process-treatments",
    },
    {
      image: { src: img.flowLab, alt: "Illustration: Flow testing laboratory" },
      title: "R&D, CFD & Prototyping",
      href: "/rd-cfd-prototyping",
    },
    {
      image: { src: img.meshRoll, alt: "Precision mesh roll" },
      title: "Precision Mesh Solutions",
      href: "/precision-mesh-solutions",
    },
  ],
  cta: standardCta({
    title: "Qualifying a new\nmesh supplier?",
    body: "Send your supplier questionnaire, audit requirements and the documentation standard you work to. We will tell you up front where we meet it and where we do not.",
    brochure: docs.greenEnergy,
  }),
};

export const processTreatments: SolutionPageContent = {
  slug: "process-treatments",
  breadcrumb: "Process & Treatments",
  hero: {
    eyebrow: "Mesh expertise from weaving to coating",
    title: "Process &",
    titleAccent: "Treatments",
    subtitle:
      "The same mesh behaves very differently after treatment. Annealing, coating, forming and cutting are where a woven roll becomes a component that fits.",
    features: [
      { icon: "flame", title: "Annealing" },
      { icon: "layers3", title: "Coating" },
      { icon: "shapes", title: "Forming" },
      { icon: "scissors", title: "Laser Cutting" },
    ],
    primary: { label: "Discuss a Treatment", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.annealing,
      alt: "Annealing furnace line at the BVK manufacturing plant",
    },
  },
  benefits: [
    {
      icon: "flame",
      title: "Property Control",
      text: "Hardness, softness and formability altered to suit.",
    },
    {
      icon: "layers3",
      title: "Modulated Coating",
      text: "Thickness and pattern defined, not just applied.",
    },
    {
      icon: "shapes",
      title: "Profile Forming",
      text: "Crimped, corrugated or flattened to the assembly.",
    },
    {
      icon: "scissors",
      title: "Precision Cutting",
      text: "Laser-cut parts and die-cut geometries.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Where the mesh becomes",
    titleAccent: "the component",
    body: "A woven or knitted roll is raw material. What arrives at your assembly line is the result of what happened afterwards: whether it was annealed soft enough to form without cracking, whether the coating went on at the thickness the electrochemistry needs, whether the corrugation angle gives the right spring rate. BVK's process allows mesh hardness, softness and formability to be changed deliberately, which is the difference between a mesh that fits and one that has to be forced.",
    action: { label: "See the Treatments", href: "#components" },
    image: {
      src: img.slitting,
      alt: "Precision slitting process at the BVK plant",
    },
    badge: { title: "Post-weave finishing", text: "annealing, coating, forming and cutting" },
  },
  components: {
    eyebrow: "Capability",
    title: "Six treatment and",
    titleAccent: "forming routes",
    intro:
      "Each one changes a different property. Most components use two or three in sequence.",
    image: {
      src: img.membraneRoll,
      alt: "Illustration: Treated precision mesh roll close up",
    },
    callouts: [
      {
        title: "Micro-structure Annealing",
        text: "Alters material physical properties — the controlling step for formability.",
      },
      {
        title: "Coating",
        text: "Alternative coating possibilities with pre- and post-coating processes, and the ability to modulate coating thickness and pattern.",
      },
      {
        title: "Forming",
        text: "Crimped, corrugated in herringbone, W and V profiles with variable angles, or flattened.",
      },
      {
        title: "Work Hardening",
        text: "Work-hardened material compensates forming tensions in the finished part.",
      },
      {
        title: "Surface Preparation",
        text: "Degreasing and plating for cleanliness, conductivity and corrosion resistance.",
      },
      {
        title: "Cutting",
        text: "Laser cutting, slitting and die-cut geometries to the final component outline.",
      },
    ],
  },
  features: {
    eyebrow: "Coating science",
    title: "Advanced material",
    titleAccent: "science applied",
    body: "Coating is where mesh for electrochemical duty is won or lost. BVK's coating capability goes beyond applying a layer evenly.",
    points: [
      "Alternative coating possibilities evaluated per application",
      "Pre-coating and post-coating process routes",
      "Ability to modulate coating thickness across the surface",
      "Ability to modulate coating pattern, not only thickness",
      "Advanced material science applied to coating granule application",
      "Ability to define a specification pattern for the customer's process",
      "Surface-area enhancement that improves hydrogen production and stack efficiency",
    ],
    image: {
      src: img.mistNozzlesFactory,
      alt: "Illustration: Precision coating and treatment equipment in a stainless steel factory",
    },
    badge: { title: "Coating pattern", text: "defined, not incidental" },
  },
  specs: {
    caption: "Treatment selection by requirement",
    columns: ["If you need", "The treatment is", "Effect"],
    rows: [
      {
        parameter: "A mesh that forms without cracking",
        value: "Micro-structure annealing",
        note: "Softens the material and relieves weaving stress",
      },
      {
        parameter: "A part that holds its shape after forming",
        value: "Work hardening",
        note: "Compensates forming tensions in service",
      },
      {
        parameter: "Lower contact resistance",
        value: "Plating or conductive coating",
        note: "Improves electrical pathway at the interface",
      },
      {
        parameter: "More catalyst surface area",
        value: "Modulated coating",
        note: "Thickness and pattern tuned to the electrochemistry",
      },
      {
        parameter: "A compressible elastic element",
        value: "Corrugation, 4–10 mm",
        note: "Herringbone, W or V profile at a chosen angle",
      },
      {
        parameter: "A flat, dense layer",
        value: "Flattening",
        note: "Reduces thickness and raises contact area",
      },
      {
        parameter: "A clean surface for bonding",
        value: "Degreasing",
        note: "Removes process residues before coating or assembly",
      },
      {
        parameter: "A complex outline",
        value: "Laser cutting or die cutting",
        note: "Finished geometry without secondary operations",
      },
    ],
  },
  sustainability: sustainabilityBand,
  why: {
    eyebrow: "Why in-house matters",
    title: "Treatment is not a",
    titleAccent: "separate purchase",
    intro:
      "When weaving and finishing sit in different companies, nobody owns the result. A coating problem becomes a weaving argument. BVK runs both, so the specification is one conversation.",
    cards: [
      {
        icon: "route",
        title: "One Responsible Party",
        text: "Weaving, treatment and forming controlled by the same quality system.",
      },
      {
        icon: "microscope",
        title: "Rapid Prototyping",
        text: "Prototype samples for dimensional and functional checks.",
      },
      {
        icon: "scan",
        title: "Continuous Traceability",
        text: "100% traceability across the process route.",
      },
      {
        icon: "clipboard",
        title: "Repeatable Parameters",
        text: "Process and quality control plans guide production.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.weavingFloor, alt: "Weaving production floor" },
      title: "Engineering & Manufacturing",
      href: "/engineering-manufacturing",
    },
    {
      image: { src: img.flowLab, alt: "Illustration: Flow testing laboratory" },
      title: "R&D, CFD & Prototyping",
      href: "/rd-cfd-prototyping",
    },
    {
      image: { src: img.knittedMacro, alt: "Illustration: Knitted mesh detail" },
      title: "Knitted Mesh Solutions",
      href: "/knitted-mesh-solutions",
    },
  ],
  cta: standardCta({
    title: "Need the mesh\nfinished, not raw?",
    body: "Tell us the final form: the profile, the coating, the outline and the surface condition. Treatment is specified alongside the weave, not after it.",
    brochure: docs.greenEnergy,
  }),
};

export const rdCfdPrototyping: SolutionPageContent = {
  slug: "rd-cfd-prototyping",
  breadcrumb: "R&D, CFD & Prototyping",
  faqs: [
    {
      question: "Is BVK's R&D recognised by the Government of India?",
      answer:
        "Yes. BVK has received recognition from the Government of India through the DSIR programme for its in-house research and development efforts.",
    },
    {
      question: "Which tests can BVK run?",
      answer:
        "Advanced Computational Fluid Dynamics (CFD) analysis, examination of grain structure, topography assessments of air permeability and stress testing, in line with norms established between BVK and the customer.",
    },
    {
      question: "How does BVK use CFD?",
      answer:
        "BVK uses Computational Fluid Dynamics and rapid prototyping to analyse flow dynamics within the mesh structure.",
    },
    {
      question: "Does BVK offer prototyping and engineering support?",
      answer:
        "Yes. Prototyping, simulation assessments, cost evaluations, material recommendations and mesh design optimisation are part of BVK's engineering offer.",
    },
  ],
  hero: {
    eyebrow: "DSIR-recognised R&D centre",
    title: "R&D, CFD &",
    titleAccent: "Prototyping",
    subtitle:
      "Computational Fluid Dynamics, rapid prototyping and physical testing — so the mesh is chosen on evidence before you commit to tooling and volume.",
    features: [
      { icon: "microscope", title: "CFD Analysis" },
      { icon: "box", title: "Rapid Prototyping" },
      { icon: "flask", title: "Physical Testing" },
      { icon: "award", title: "DSIR Recognised" },
    ],
    primary: { label: "Start a Development", href: "/contact" },
    secondary: { label: "Download Brochure", href: docs.greenEnergy, external: true },
    image: {
      src: img.flowLab,
      alt: "Illustration: Precision mesh flow laboratory with simulation display",
    },
  },
  benefits: [
    {
      icon: "microscope",
      title: "Flow Modelled First",
      text: "CFD analysis of flow within the mesh structure.",
    },
    {
      icon: "box",
      title: "Prototype Early",
      text: "Rapid samples before tooling commitment.",
    },
    {
      icon: "award",
      title: "Government Recognised",
      text: "DSIR-recognised in-house R&D centre.",
    },
    {
      icon: "handshake",
      title: "Joint Programmes",
      text: "R&D collaboration with the Government of India.",
    },
  ],
  overview: {
    eyebrow: "Overview",
    title: "Choose the right mesh",
    titleAccent: "before you scale",
    body: "Through its committed research and development work, BVK has been able to secure its technological edge. We use Computational Fluid Dynamics and rapid prototyping to analyse flow dynamics within the mesh structure — which means the trade-off between porosity, pressure drop and strength can be examined on screen and on a sample bench, rather than discovered after the first production batch.",
    action: { label: "See the Test Suite", href: "#components" },
    image: {
      src: img.meshTestingLab,
      alt: "Illustration: Industrial mesh flow testing laboratory",
    },
    badge: { title: "DSIR recognised", text: "Dept. of Scientific & Industrial Research" },
  },
  components: {
    eyebrow: "Services",
    title: "The tests BVK",
    titleAccent: "can run",
    intro:
      "These services adhere to norms established between BVK and the customer, so the result is evidence both sides accept.",
    image: {
      src: img.meshRollFactory,
      alt: "Illustration: Mesh samples prepared for laboratory evaluation",
    },
    callouts: [
      {
        title: "CFD Analysis",
        text: "Advanced Computational Fluid Dynamics assessing how mesh structure affects flow dynamics and pressure behaviour.",
      },
      {
        title: "Air Permeability Topography",
        text: "Topography assessment of air permeability across the mesh surface.",
      },
      {
        title: "Simulation Assessment",
        text: "Material and manufacturing simulation, including digital twin modelling.",
      },
      {
        title: "Grain Structure Examination",
        text: "Microstructure examination to verify material condition after treatment.",
      },
      {
        title: "Stress Testing",
        text: "Mechanical stress testing against the duty the component will see.",
      },
      {
        title: "Mesh Design Optimisation",
        text: "Geometry, cost and manufacturing route refined together before scale-up.",
      },
    ],
  },
  process: {
    eyebrow: "Development path",
    title: "Five steps to a",
    titleAccent: "frozen specification",
    intro:
      "The point of this sequence is to move the expensive discoveries to the front, where they are still cheap.",
    steps: [
      {
        icon: "listChecks",
        title: "Define Conditions",
        text: "Operating envelope, medium, chemistry and constraints.",
      },
      {
        icon: "microscope",
        title: "Model Options",
        text: "CFD and simulation across candidate structures.",
      },
      {
        icon: "box",
        title: "Build Prototypes",
        text: "Rapid samples of the shortlisted geometries.",
      },
      {
        icon: "flask",
        title: "Test & Tune",
        text: "Physical testing against agreed norms, then refine.",
      },
      {
        icon: "fileCheck",
        title: "Release Route",
        text: "Control plan, PPA and production specification frozen.",
      },
    ],
  },
  features: {
    eyebrow: "Recognition",
    title: "Government-recognised",
    titleAccent: "R&D",
    body: "BVK's R&D efforts have received recognition from the Government of India through the DSIR programme, and BVK takes part in joint R&D programmes.",
    points: [
      "DSIR recognition for in-house research and development",
      "Joint R&D programmes with the Government of India",
      "Advanced Computational Fluid Dynamics (CFD) analysis",
      "Examination of grain structure",
      "Topography assessments of air permeability",
      "Stress testing",
      "Tests adhere to norms established between BVK and the customer",
    ],
    image: {
      src: img.weavingMachine,
      alt: "Illustration: Precision mesh weaving machine used for prototype production",
    },
    badge: { title: "DSIR recognised", text: "in-house R&D" },
  },
  specs: {
    caption: "Test methods and what each one tells you",
    columns: ["Method", "Measures", "Used to decide"],
    rows: [
      {
        parameter: "Computational Fluid Dynamics",
        value: "Flow dynamics and pressure behaviour within the mesh structure",
        note: "Porosity, aperture and layer thickness",
      },
      {
        parameter: "Air permeability topography",
        value: "Permeability variation across the mesh surface",
        note: "Uniformity of the weave or knit",
      },
      {
        parameter: "Grain structure examination",
        value: "Microstructure condition after treatment",
        note: "Annealing parameters and formability",
      },
      {
        parameter: "Stress testing",
        value: "Mechanical response against the service duty",
        note: "Wire diameter and mesh density",
      },
      {
        parameter: "Simulation and digital twin",
        value: "Material and manufacturing behaviour before tooling",
        note: "Manufacturing route and cost",
      },
      {
        parameter: "Rapid prototyping",
        value: "Dimensional and functional performance of a real sample",
        note: "Final geometry before freeze",
      },
      {
        parameter: "Production Part Approval",
        value: "Process capability, not just part performance",
        note: "Release to series production",
      },
    ],
  },
  sustainability: sustainabilityBand,
  why: {
    eyebrow: "Why develop with BVK",
    title: "Engineering input,",
    titleAccent: "not order taking",
    intro:
      "Filtration and electrochemical mesh are rarely plug-and-play; they require close cooperation between supplier and customer. BVK is resourced for that cooperation rather than for catalogue fulfilment.",
    cards: [
      {
        icon: "award",
        title: "Recognised Laboratory",
        text: "In-house R&D recognised by the Government of India through DSIR.",
      },
      {
        icon: "cpu",
        title: "Simulation Capability",
        text: "CFD and digital twin modelling applied before any tooling is cut.",
      },
      {
        icon: "network",
        title: "Joint R&D Programmes",
        text: "Collaboration with the Government of India.",
      },
      {
        icon: "route",
        title: "Development to Volume",
        text: "The same organisation that prototypes it also produces it at scale.",
      },
    ],
  },
  tiles: [
    {
      image: { src: img.weavingFloor, alt: "Weaving production floor" },
      title: "Engineering & Manufacturing",
      href: "/engineering-manufacturing",
    },
    {
      image: { src: img.annealing, alt: "Annealing line" },
      title: "Process & Treatments",
      href: "/process-treatments",
    },
    {
      image: { src: img.electrolyserSplash, alt: "Illustration: Electrolyser stack" },
      title: "Electrolyser Solutions",
      href: "/electrolyser-solutions",
    },
  ],
  cta: standardCta({
    title: "Have a mesh problem\nthat is not solved yet?",
    body: "Bring it early. The cheapest time to find out that a structure will not work is before the tooling exists — and that is exactly what CFD and prototyping are for.",
    brochure: docs.greenEnergy,
  }),
};
