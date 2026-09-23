import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Beaker,
  Boxes,
  Cpu,
  Factory,
  FileText,
  Gauge,
  Leaf,
  Layers,
  Microscope,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from "lucide-react";

type IconName =
  | "badge"
  | "beaker"
  | "boxes"
  | "cpu"
  | "factory"
  | "file"
  | "gauge"
  | "leaf"
  | "layers"
  | "microscope"
  | "shield"
  | "sliders"
  | "spark"
  | "workflow";

type Metric = { value: string; label: string };
type Card = { title: string; body: string; icon?: IconName };
type Spec = { label: string; value: string };
type Resource = { label: string; href: string };

type Enhancement = {
  eyebrow: string;
  title: string;
  intro: string;
  metrics?: Metric[];
  cards: Card[];
  specs?: Spec[];
  processTitle?: string;
  process?: string[];
  applications?: string[];
  resources?: Resource[];
};

const icons: Record<IconName, ComponentType<{ className?: string }>> = {
  badge: BadgeCheck,
  beaker: Beaker,
  boxes: Boxes,
  cpu: Cpu,
  factory: Factory,
  file: FileText,
  gauge: Gauge,
  leaf: Leaf,
  layers: Layers,
  microscope: Microscope,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  spark: Sparkles,
  workflow: Workflow,
};

const resources = {
  greenEnergy: "https://dev.bhavcreations.in/wp-content/uploads/Green-Energy-Brochure.pdf",
  knitted: "https://dev.bhavcreations.in/wp-content/uploads/BVK-Knitted-Mesh-Brochure.pdf",
  hydrogen: "https://dev.bhavcreations.in/wp-content/uploads/Green-Hydrogen-Knitted-Mesh-Solutions_leaflet.pdf",
};

const pageEnhancements: Record<string, Enhancement> = {
  about: {
    eyebrow: "Company",
    title: "Six decades of precision mesh manufacturing from Jaipur",
    intro:
      "BVK Hydrotech brings BVK Group's weaving heritage into hydrogen, fuel cell and industrial filtration programs where repeatability, traceability and engineering response matter as much as mesh geometry.",
    metrics: [
      { value: "1963", label: "Group foundation" },
      { value: "25+", label: "Export countries" },
      { value: "300+", label: "Group employees" },
      { value: "650+ MT", label: "Annual metal volume" },
    ],
    cards: [
      { title: "German-origin equipment, Indian agility", body: "Integrated weaving and finishing capacity helps the team move from sample development to repeatable series supply.", icon: "factory" },
      { title: "Engineering before quotation", body: "Application teams review chemistry, flow, porosity, pressure drop and tolerance targets before recommending a route.", icon: "workflow" },
      { title: "Certified systems", body: "Quality, environmental, occupational health, safety and automotive management systems support global procurement programs.", icon: "shield" },
    ],
    processTitle: "How buyers work with BVK",
    process: ["Share drawings, chemistry and duty conditions", "Receive material and mesh-structure guidance", "Prototype, validate and freeze the production route", "Scale with documented process controls"],
  },
  "precision-mesh-solutions": {
    eyebrow: "Solutions",
    title: "Precision mesh specified around performance, not catalogue codes",
    intro:
      "BVK combines woven and knitted structures with finishing, coating, forming and inspection routes so each mesh is tuned to flow, conductivity and mechanical constraints.",
    cards: [
      { title: "Woven precision", body: "Stable apertures, controlled porosity and repeatable geometry for filtration, electrodes, support layers and separation duties.", icon: "layers" },
      { title: "Knitted flexibility", body: "Single, double and multi-end knitted mesh for elastic elements, gas diffusion layers and stack-conformable interfaces.", icon: "sliders" },
      { title: "Application finishing", body: "Degreasing, annealing, coating, plating, corrugation, flattening and laser-cut shapes are selected around the assembly.", icon: "spark" },
    ],
    specs: [
      { label: "Material families", value: "Nickel, titanium, stainless steel, copper, aluminium, Hastelloy and specialty alloys" },
      { label: "Typical duties", value: "Porosity control, gas diffusion, current collection, filtration and mechanical support" },
      { label: "Route", value: "Weaving or knitting, treatment, forming, inspection and batch traceability" },
    ],
    applications: ["Electrolysers", "Fuel cells", "Industrial filtration", "Automotive", "Aerospace", "Chemical processing"],
  },
  "woven-mesh-solutions": {
    eyebrow: "Woven Mesh",
    title: "Controlled aperture and conductivity for electrochemical and filtration systems",
    intro:
      "Woven wire mesh is selected where stable geometry, pore-size control and predictable pressure drop are central to the component's function.",
    cards: [
      { title: "Porosity control", body: "Weaving parameters are tuned to influence gas flow, retention and pressure drop across the component.", icon: "gauge" },
      { title: "Conductive pathways", body: "Metal mesh structures support current collection, distribution and surface-area development in electrochemical stacks.", icon: "cpu" },
      { title: "Advanced alloys", body: "Material options span stainless steels, nickel grades, copper, aluminium, titanium and high-performance nickel alloys.", icon: "beaker" },
    ],
    specs: [
      { label: "Common stainless grades", value: "304, 304L, 316, 316L, 314, 904L" },
      { label: "Nickel options", value: "Ni 99.6, Ni 99.2, LC-Ni 99.2, Hastelloy C-22 and Alloy 625" },
      { label: "Support", value: "CFD, simulation assessment, cost evaluation and mesh design optimisation" },
    ],
    resources: [{ label: "Green Energy Brochure", href: resources.greenEnergy }],
  },
  "knitted-mesh-solutions": {
    eyebrow: "Knitted Mesh",
    title: "Stack-conformable knitted mesh for hydrogen applications",
    intro:
      "Single, double and multi-end knitted mesh is engineered for high porosity, conductivity, permeability and mechanical conformability in demanding stack assemblies.",
    metrics: [
      { value: "2.2 m", label: "Single-piece diameter capability" },
      { value: "0.05-0.30 mm", label: "Wire diameter range" },
      { value: "Ni / Ti / SS", label: "Hydrogen-ready materials" },
    ],
    cards: [
      { title: "Voltra Lite", body: "Low-density single-wire construction for open GDLs and elastic elements.", icon: "layers" },
      { title: "Voltra+", body: "Medium-density double-wire build for separators and balanced stack performance.", icon: "sliders" },
      { title: "Voltra Max", body: "High-density construction for dense GDLs and electrode support applications.", icon: "gauge" },
    ],
    specs: [
      { label: "Knit type", value: "Single, double and multi-end" },
      { label: "Treatments", value: "Degreased, annealed, coated or plated" },
      { label: "Forming", value: "Crimped, corrugated, flattened and laser-cut precision parts" },
    ],
    applications: ["Gas diffusion layer (GDL) / PTL", "Electrolyser stack core", "BoP filter elements", "Hydrogen purification", "Drying skids", "Elastic elements"],
    resources: [
      { label: "Knitted Mesh Brochure", href: resources.knitted },
      { label: "Green Hydrogen Leaflet", href: resources.hydrogen },
    ],
  },
  "electrolyser-solutions": {
    eyebrow: "Electrolysers",
    title: "Mesh for alkaline and PEM electrolyser stack performance",
    intro:
      "BVK supports electrolyser builders with woven and knitted structures that manage reactant flow, conductivity, surface area and stack-fit requirements.",
    cards: [
      { title: "Catalyst support", body: "Mesh structures help support catalyst interaction, gas diffusion and current collection in the stack.", icon: "beaker" },
      { title: "Bubble and flow control", body: "Porosity and geometry are tuned to improve flow distribution and release behavior.", icon: "gauge" },
      { title: "Hydrogen-ready alloys", body: "Nickel 201/202, titanium, stainless steel and specialty alloys are selected per chemistry and duty.", icon: "shield" },
    ],
    specs: [
      { label: "Functions", value: "Porosity control, conductivity, surface-area coating and support layers" },
      { label: "Knitted capability", value: "Single-piece up to 2.2 m diameter for stack-fit components" },
      { label: "Quality direction", value: "ISO 22734-ready QMS references with ISO, IATF and DSIR-RDI credentials" },
    ],
  },
  "fuel-cell-solutions": {
    eyebrow: "Fuel Cells",
    title: "Electrode-support mesh for transport, conductivity and durability",
    intro:
      "Fuel cell components need mass transport, electrical conductivity and resistance to deformation. BVK tunes mesh geometry and material selection around those trade-offs.",
    cards: [
      { title: "Mass transport", body: "Open area and mesh profile can be tuned around gas diffusion and pressure-drop requirements.", icon: "workflow" },
      { title: "Current collection", body: "Metallic pathways support distribution and conductivity in electrode-support applications.", icon: "cpu" },
      { title: "Stack compatibility", body: "Designed for AFC, SOFC and PEM-related fuel cell component discussions.", icon: "badge" },
    ],
    specs: [
      { label: "Mesh advantage", value: "High conductivity, current collection, improved gas diffusion, flexibility and porosity" },
      { label: "Design inputs", value: "Pressure drop, mechanical strength, mass transport and conductivity targets" },
    ],
  },
  "engineering-manufacturing": {
    eyebrow: "Manufacturing",
    title: "From material simulation to repeatable production control",
    intro:
      "BVK's manufacturing system links supply chain, digital process visibility, engineering, treatments, quality control and traceability into one production route.",
    cards: [
      { title: "Integrated process harmonisation", body: "Process reliability is built through customer collaboration, control plans and standardised production approvals.", icon: "workflow" },
      { title: "Industry 4.0 controls", body: "MES, predictive analytics, machine monitoring and real-time transparency support consistent volume production.", icon: "cpu" },
      { title: "100% traceability", body: "Inspection, process plans and batch-level records support critical industrial and clean-energy requirements.", icon: "shield" },
    ],
    processTitle: "Manufacturing route",
    process: ["Material review and sourcing", "Weaving or knitting setup", "Treatment, forming or coating", "Inspection and documentation", "Packing and dispatch"],
  },
  "process-treatments": {
    eyebrow: "Treatments",
    title: "Finishing routes that change how mesh behaves in assembly",
    intro:
      "Treatment decisions affect hardness, softness, formability, cleanliness, corrosion resistance and integration. BVK selects the route around the duty condition.",
    cards: [
      { title: "Annealing", body: "Micro-structure annealing alters physical properties for formability and application fit.", icon: "spark" },
      { title: "Coating and plating", body: "Pre- and post-coating processes can adjust surface behavior, conductivity, cleanliness and corrosion resistance.", icon: "beaker" },
      { title: "Cutting and forming", body: "Laser cutting, slitting, corrugation and flattening shape mesh for precise integration.", icon: "sliders" },
    ],
    specs: [
      { label: "Surface treatments", value: "Degreased, annealed, coated or plated" },
      { label: "Forms", value: "Crimped, corrugated Herringbone/W/V profiles, flattened and die-cut geometries" },
    ],
  },
  "rd-cfd-prototyping": {
    eyebrow: "R&D",
    title: "Simulation-led mesh development before production commitment",
    intro:
      "BVK uses CFD, prototyping, material recommendations and testing to reduce trial cycles and help customers freeze an efficient mesh design earlier.",
    cards: [
      { title: "CFD and flow assessment", body: "Simulation helps assess how mesh structure affects flow dynamics and pressure behavior.", icon: "microscope" },
      { title: "Rapid prototyping", body: "Prototype samples support early validation of geometry, density, forming and finishing choices.", icon: "boxes" },
      { title: "Design optimisation", body: "Mesh architecture, cost, material and manufacturing route are refined before scale-up.", icon: "workflow" },
    ],
    processTitle: "Development path",
    process: ["Define operating conditions", "Model flow and structure options", "Build prototype samples", "Test and tune parameters", "Release production route"],
  },
  "industries-applications": {
    eyebrow: "Applications",
    title: "Precision mesh across clean energy and established industries",
    intro:
      "The same manufacturing depth that serves automotive, aerospace and industrial filtration now supports clean energy applications that need controlled geometry and reliable supply.",
    cards: [
      { title: "Energy and clean tech", body: "Electrolysis, fuel cells, hydrogen purification and stack-interface applications.", icon: "leaf" },
      { title: "Mobility and aerospace", body: "Drive technology, hydraulic filtration, EGR, EMI shielding and lightweight protection use cases.", icon: "factory" },
      { title: "Process industries", body: "Pulp and paper, polymers, food, chemical, mining, electronics and architecture.", icon: "boxes" },
    ],
    applications: ["Automotive", "Aerospace", "Pulp and paper", "Plastic and polymer", "Food and beverage", "Chemical", "Mining", "Energy", "Electronics", "Architecture"],
  },
  "industrial-filtration": {
    eyebrow: "Industrial Filtration",
    title: "Mesh for separation, dewatering, protection and process reliability",
    intro:
      "BVK's long filtration experience supports customers in environments where retention, flow, cleanability and robust supply matter.",
    cards: [
      { title: "Process fit", body: "Mesh geometry is matched to retention, pressure drop, flow rate and media compatibility.", icon: "gauge" },
      { title: "Material breadth", body: "Stainless, nickel, copper, aluminium and specialty alloys allow selection around corrosion and temperature.", icon: "beaker" },
      { title: "Repeat supply", body: "Traceable production and controlled inspection support repeat orders and specification stability.", icon: "shield" },
    ],
    applications: ["Fiber molding", "Paper forming", "Dewatering", "Juicing", "Distillation", "Coal washing", "Mineral separation", "FGD"],
  },
  "energy-clean-tech": {
    eyebrow: "Clean Tech",
    title: "Mesh components for electrolysis, fuel cells and sustainability-led programs",
    intro:
      "Clean-energy components demand tight collaboration between design, material science and manufacturing. BVK supports this with hydrogen-specific mesh capability and renewable-energy commitments.",
    metrics: [
      { value: "50%+", label: "Energy needs powered through renewables" },
      { value: "100%", label: "Renewable self-reliance goal" },
    ],
    cards: [
      { title: "Electrolysis", body: "Woven and knitted options for stack cores, GDL/PTL layers and separator-related duties.", icon: "beaker" },
      { title: "Fuel cells", body: "Electrode support and mass transport mesh tuned for pressure drop, strength and conductivity.", icon: "cpu" },
      { title: "Hydrogen balance of plant", body: "Filter elements and support structures for purification, drying and auxiliary systems.", icon: "workflow" },
    ],
  },
  sustainability: {
    eyebrow: "Sustainability",
    title: "Responsible manufacturing for customers building lower-carbon systems",
    intro:
      "BVK's sustainability work combines renewable energy, reusable packaging, digital energy management and ESG-focused manufacturing improvements.",
    metrics: [
      { value: "50%+", label: "Current renewable-energy contribution" },
      { value: "2030", label: "ESG goal horizon" },
      { value: "20%", label: "Women employees in the group" },
    ],
    cards: [
      { title: "Renewable energy", body: "A significant share of energy needs is powered through renewables, with a goal of complete renewable self-reliance.", icon: "leaf" },
      { title: "Reusable packaging", body: "Packaging choices support circularity and reduce waste across repeat supply programs.", icon: "boxes" },
      { title: "Digital conservation", body: "Digital energy management and Industry 4.0 visibility help drive conservation and process efficiency.", icon: "cpu" },
    ],
  },
  resources: {
    eyebrow: "Resources",
    title: "Brochures and technical documents for specification work",
    intro:
      "Use these approved PDFs as starting points for internal review, vendor qualification and early engineering discussions.",
    cards: [
      { title: "Green Energy Brochure", body: "Precision woven mesh solutions for electrolysers and fuel cells.", icon: "file" },
      { title: "Knitted Mesh Brochure", body: "Functional advantages, parameters and competitive edge for knitted mesh.", icon: "file" },
      { title: "Green Hydrogen Leaflet", body: "Hydrogen value-chain overview, knit types and stack applications.", icon: "file" },
    ],
    resources: [
      { label: "Green Energy Brochure", href: resources.greenEnergy },
      { label: "Knitted Mesh Brochure", href: resources.knitted },
      { label: "Green Hydrogen Leaflet", href: resources.hydrogen },
    ],
  },
  insights: {
    eyebrow: "Knowledge",
    title: "Engineering notes for buyers and stack-development teams",
    intro:
      "This hub is shaped for practical reading: material decisions, mesh geometry, hydrogen applications, manufacturing controls and sustainability considerations.",
    cards: [
      { title: "Material selection", body: "How nickel, titanium, stainless steel and specialty alloys map to chemistry, corrosion and conductivity needs.", icon: "beaker" },
      { title: "Geometry choices", body: "How aperture, knit density, wire diameter and forming route influence porosity and integration.", icon: "sliders" },
      { title: "Scale-up readiness", body: "What to validate before moving from prototype mesh to repeatable production.", icon: "workflow" },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Questions buyers ask before a technical RFQ",
    intro:
      "Use this page to frame the information BVK needs for material recommendation, mesh design, prototype planning and quotation.",
    cards: [
      { title: "Application details", body: "Share cell chemistry, medium, operating temperature, pressure, target porosity and available envelope.", icon: "file" },
      { title: "Drawings and tolerances", body: "Dimensional drawings, target thickness, forming needs and assembly constraints help shorten review cycles.", icon: "sliders" },
      { title: "Commercial context", body: "Expected volume, prototype timeline, certification needs and destination country help align feasibility and lead time.", icon: "workflow" },
    ],
  },
};

export function hasPageEnhancement(slug: string) {
  return Boolean(pageEnhancements[slug]);
}

export default function EnhancedPageContent({ slug }: { slug: string }) {
  const data = pageEnhancements[slug];
  if (!data) return null;

  return (
    <section className="bg-surface text-ink">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-deep">{data.eyebrow}</p>
            <h2 className="display-section mt-5 text-balance text-ink">{data.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-grey lg:text-lg">{data.intro}</p>

            {data.resources && (
              <div className="mt-8 flex flex-wrap gap-3">
                {data.resources.map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark"
                  >
                    {resource.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {data.metrics && (
            <dl className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
              {data.metrics.map((metric) => (
                <div key={metric.label} className="bg-white p-7">
                  <dt className="text-sm font-medium leading-relaxed text-grey">{metric.label}</dt>
                  <dd className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {data.cards.map((card) => {
            const Icon = icons[card.icon ?? "spark"];
            return (
              <article key={card.title} className="border border-hairline bg-white p-7">
                <span className="flex h-11 w-11 items-center justify-center bg-brand-wash text-brand-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey">{card.body}</p>
              </article>
            );
          })}
        </div>

        {(data.specs || data.process || data.applications) && (
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {data.specs && (
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Key specification inputs
                </h3>
                <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
                  {data.specs.map((spec) => (
                    <div key={spec.label} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-grey-soft">
                        {spec.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-grey">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {data.process && (
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                  {data.processTitle ?? "Process"}
                </h3>
                <ol className="mt-6 space-y-4">
                  {data.process.map((step, index) => (
                    <li key={step} className="flex gap-4 border-b border-hairline pb-4 last:border-b-0">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-ink text-xs font-semibold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 text-sm leading-relaxed text-grey">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {data.applications && (
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Application areas
                </h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {data.applications.map((item) => (
                    <li key={item} className="border border-hairline bg-surface-raised px-4 py-3 text-sm font-medium text-grey">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 border border-ink-line bg-ink p-8 text-white lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Need this matched to your application?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
                Share drawings, chemistry, target porosity, operating conditions and expected volume. BVK&apos;s application team can recommend a mesh route and next-step validation plan.
              </p>
            </div>
            <Link href="/contact" className="btn btn-green group shrink-0">
              Request technical RFQ
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
