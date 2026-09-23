import type { ComponentType } from "react";
import Image from "next/image";
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
type ProductFamily = {
  name: string;
  tag: string;
  description: string;
  image: string;
  points: string[];
};

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
  productFamilies?: ProductFamily[];
  benefits?: string[];
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
    title: "BVK Hydrotech makes precision mesh easy to specify and reliable to source",
    intro:
      "BVK Hydrotech is a BVK Group company from Jaipur, built on 60+ years of weaving and filtration experience. We manufacture woven mesh, knitted mesh and custom metal mesh components for green hydrogen, fuel cells, industrial filtration and clean-energy equipment.",
    metrics: [
      { value: "1963", label: "Group foundation" },
      { value: "25+", label: "Export countries" },
      { value: "300+", label: "Group employees" },
      { value: "650+ MT", label: "Annual metal volume" },
    ],
    cards: [
      { title: "Experience customers can trust", body: "A 1963-founded group, German-origin equipment and export presence in 25+ countries give buyers confidence for long-term precision mesh sourcing.", icon: "factory" },
      { title: "Guidance before quotation", body: "Our team reviews material, size, flow, porosity, corrosion and application needs before recommending woven or knitted mesh.", icon: "workflow" },
      { title: "Certified manufacturing systems", body: "ISO 9001, ISO 14001, ISO 45001, IATF 16949 and other credentials support repeat orders and global quality expectations.", icon: "shield" },
    ],
    processTitle: "How buyers work with BVK",
    process: ["Share drawings, chemistry and duty conditions", "Receive material and mesh-structure guidance", "Prototype, validate and freeze the production route", "Scale with documented process controls"],
  },
  "precision-mesh-solutions": {
    eyebrow: "Solutions",
    title: "Precision metal mesh for filtration, hydrogen and industrial components",
    intro:
      "BVK Hydrotech supplies precision wire mesh in woven and knitted forms. Instead of pushing a catalogue item, we help you choose the right metal, mesh opening, density, finish and shape for your equipment.",
    cards: [
      { title: "Woven wire mesh", body: "Best when you need controlled openings, stable geometry and predictable flow for filtration, electrode support or separation.", icon: "layers" },
      { title: "Knitted wire mesh", body: "Best when you need flexibility, high porosity and a mesh that can fit into stacks, pads, filters or shaped assemblies.", icon: "sliders" },
      { title: "Ready-to-fit parts", body: "Mesh can be degreased, annealed, coated, plated, corrugated, flattened or laser cut for direct use in your product.", icon: "spark" },
    ],
    specs: [
      { label: "Material families", value: "Nickel, titanium, stainless steel, copper, aluminium, Hastelloy and specialty alloys" },
      { label: "Typical duties", value: "Porosity control, gas diffusion, current collection, filtration and mechanical support" },
      { label: "Route", value: "Weaving or knitting, treatment, forming, inspection and batch traceability" },
    ],
    applications: ["Electrolysers", "Fuel cells", "Industrial filtration", "Automotive", "Aerospace", "Chemical processing"],
    productFamilies: [
      {
        name: "Stainless Steel Mesh",
        tag: "Filtration and support",
        description: "Durable stainless steel wire mesh for filtration, protection, separation and general industrial applications.",
        image: "/bvk-assets/stainless-steel-mesh.jpg",
        points: ["SS 304 / 316 options", "Good corrosion resistance", "Stable mesh opening"],
      },
      {
        name: "Copper and Nickel Mesh",
        tag: "Conductivity focused",
        description: "Conductive metal mesh for applications where current collection, heat transfer or special chemistry matters.",
        image: "/bvk-assets/copper-mesh.jpg",
        points: ["High conductivity", "Nickel 201/202 options", "Useful for energy systems"],
      },
      {
        name: "Knitted Mesh Rolls",
        tag: "Flexible and porous",
        description: "Knitted mesh rolls and shapes for gas diffusion, demister pads, elastic elements and stack-fit assemblies.",
        image: "/bvk-assets/mesh-roll.jpg",
        points: ["High porosity", "Custom density", "Cut and formed parts"],
      },
    ],
    benefits: ["Easier vendor qualification", "Clear material recommendations", "Prototype-to-volume support", "SEO-ready product information for buyers searching precision mesh manufacturers in India"],
  },
  "woven-mesh-solutions": {
    eyebrow: "Woven Mesh",
    title: "Woven wire mesh with controlled openings and dependable flow",
    intro:
      "Woven mesh is ideal when your component needs a stable opening size, smooth flow and repeatable filtration performance. BVK supplies woven wire mesh for electrolysers, fuel cells, industrial filters and custom metal parts.",
    cards: [
      { title: "Controlled filtration", body: "Mesh opening and wire size are selected to balance retention, flow rate and pressure drop.", icon: "gauge" },
      { title: "Energy applications", body: "Metal mesh can support current collection, gas diffusion and electrode support in electrochemical stacks.", icon: "cpu" },
      { title: "Wide material range", body: "Stainless steel, nickel, copper, aluminium, titanium and specialty alloys are available as per application need.", icon: "beaker" },
    ],
    specs: [
      { label: "Common stainless grades", value: "304, 304L, 316, 316L, 314, 904L" },
      { label: "Nickel options", value: "Ni 99.6, Ni 99.2, LC-Ni 99.2, Hastelloy C-22 and Alloy 625" },
      { label: "Support", value: "CFD, simulation assessment, cost evaluation and mesh design optimisation" },
    ],
    resources: [{ label: "Green Energy Brochure", href: resources.greenEnergy }],
    productFamilies: [
      {
        name: "Stainless Steel Woven Mesh",
        tag: "Industrial filtration",
        description: "A strong choice for filtration, separation, dewatering and process protection where corrosion resistance matters.",
        image: "/bvk-assets/stainless-steel-mesh.jpg",
        points: ["SS 304 / 316 / 904L", "Stable aperture", "Repeatable rolls or parts"],
      },
      {
        name: "Nickel Woven Mesh",
        tag: "Electrolyser ready",
        description: "Nickel mesh options for alkaline electrolyser components, catalyst support and conductive layers.",
        image: "/bvk-assets/mesh-roll.jpg",
        points: ["Ni 99.6 / Ni 99.2", "Good conductivity", "Energy-sector use"],
      },
      {
        name: "Copper Mesh",
        tag: "Conductive mesh",
        description: "Copper mesh for applications requiring electrical conductivity, shielding or heat-transfer support.",
        image: "/bvk-assets/copper-mesh.jpg",
        points: ["Conductive surface", "Custom opening", "Cut-to-size options"],
      },
    ],
  },
  "knitted-mesh-solutions": {
    eyebrow: "Knitted Mesh",
    title: "Knitted wire mesh for hydrogen stacks, filters and flexible assemblies",
    intro:
      "Knitted mesh is used where a flat woven mesh is not flexible enough. BVK manufactures single, double and multi-end knitted wire mesh with high porosity, good conductivity and custom density for hydrogen, filtration and industrial components.",
    metrics: [
      { value: "2.2 m", label: "Single-piece diameter capability" },
      { value: "0.05-0.30 mm", label: "Wire diameter range" },
      { value: "Ni / Ti / SS", label: "Hydrogen-ready materials" },
    ],
    cards: [
      { title: "Voltra Lite", body: "Low-density single-wire knitted mesh for open gas diffusion layers, elastic elements and lightweight assemblies.", icon: "layers" },
      { title: "Voltra+", body: "Medium-density double-wire knitted mesh for separators and balanced stack performance.", icon: "sliders" },
      { title: "Voltra Max", body: "High-density knitted mesh for dense GDL, electrode support and high-contact applications.", icon: "gauge" },
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
    productFamilies: [
      {
        name: "Voltra Lite",
        tag: "Low density",
        description: "Single-wire knitted mesh for open porosity, gas flow and elastic elements.",
        image: "/bvk-assets/knitted-tube-1.jpg",
        points: ["Open GDL", "Elastic elements", "Lightweight stack fit"],
      },
      {
        name: "Voltra+",
        tag: "Medium density",
        description: "Double-wire knitted mesh for separators and balanced porosity, strength and conductivity.",
        image: "/bvk-assets/mesh-roll.jpg",
        points: ["Separator support", "Balanced flow", "Custom density"],
      },
      {
        name: "Voltra Max",
        tag: "High density",
        description: "Dense knitted mesh for GDL and electrode support applications that need higher contact area.",
        image: "/bvk-assets/fuel-cell-mesh.png",
        points: ["Dense GDL", "Electrode support", "High surface area"],
      },
    ],
    benefits: ["High porosity for reactant flow", "Good gas and liquid permeability", "Mechanical conformability for irregular shapes", "Custom wire diameter from 0.05 mm to 0.30 mm"],
  },
  "electrolyser-solutions": {
    eyebrow: "Electrolysers",
    title: "Electrolyser mesh for cleaner flow, better contact and easier stack integration",
    intro:
      "BVK supports alkaline and PEM electrolyser builders with woven mesh and knitted mesh components. The aim is simple: help gases move, support current collection, fit the stack and stay consistent from prototype to production.",
    cards: [
      { title: "Flow and bubble control", body: "Porosity and mesh profile can be tuned to support gas movement and reduce unwanted flow restriction.", icon: "gauge" },
      { title: "Conductive support", body: "Metal mesh helps with current collection, catalyst support and contact inside electrolyser stack assemblies.", icon: "beaker" },
      { title: "Hydrogen-ready metals", body: "Nickel 201/202, titanium, stainless steel and specialty alloys are selected based on chemistry and duty.", icon: "shield" },
    ],
    specs: [
      { label: "Functions", value: "Porosity control, conductivity, surface-area coating and support layers" },
      { label: "Knitted capability", value: "Single-piece up to 2.2 m diameter for stack-fit components" },
      { label: "Quality direction", value: "ISO 22734-ready QMS references with ISO, IATF and DSIR-RDI credentials" },
    ],
  },
  "fuel-cell-solutions": {
    eyebrow: "Fuel Cells",
    title: "Fuel cell mesh for gas diffusion, current collection and durable support",
    intro:
      "Fuel cell components need the right balance of gas movement, conductivity, pressure drop and mechanical strength. BVK helps select woven or knitted metal mesh for electrode support, GDL-related parts and custom stack components.",
    cards: [
      { title: "Gas diffusion support", body: "Open area and mesh density can be selected around gas diffusion and pressure-drop requirements.", icon: "workflow" },
      { title: "Current collection", body: "Metallic pathways support electrical conductivity and current distribution in electrode-support applications.", icon: "cpu" },
      { title: "Fuel-cell compatibility", body: "Material and geometry can be discussed for AFC, SOFC and PEM-related component requirements.", icon: "badge" },
    ],
    specs: [
      { label: "Mesh advantage", value: "High conductivity, current collection, improved gas diffusion, flexibility and porosity" },
      { label: "Design inputs", value: "Pressure drop, mechanical strength, mass transport and conductivity targets" },
    ],
  },
  "engineering-manufacturing": {
    eyebrow: "Manufacturing",
    title: "Manufacturing built for repeat orders, not one-time samples",
    intro:
      "BVK connects material sourcing, weaving or knitting, finishing, inspection and documentation into one controlled route. This helps customers move from sample approval to regular production with fewer surprises.",
    cards: [
      { title: "Controlled process route", body: "Control plans and production approvals help keep mesh quality stable after the first sample is approved.", icon: "workflow" },
      { title: "Digital manufacturing visibility", body: "MES, machine monitoring and predictive analytics support consistent volume production.", icon: "cpu" },
      { title: "Traceable quality", body: "Inspection, batch-level records and documented process plans support critical industrial and clean-energy requirements.", icon: "shield" },
    ],
    processTitle: "Manufacturing route",
    process: ["Material review and sourcing", "Weaving or knitting setup", "Treatment, forming or coating", "Inspection and documentation", "Packing and dispatch"],
  },
  "process-treatments": {
    eyebrow: "Treatments",
    title: "Mesh treatments that make the part fit, form and perform better",
    intro:
      "The same mesh can behave very differently after treatment. BVK offers finishing and forming routes that improve cleanliness, softness, corrosion resistance, conductivity and integration inside the final assembly.",
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
    title: "R&D support to choose the right mesh before you scale",
    intro:
      "BVK uses prototyping, testing and CFD-led review to help customers compare mesh options before committing to production. This reduces trial-and-error and speeds up product development.",
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
    title: "Precision mesh for clean energy and everyday industrial use",
    intro:
      "BVK mesh is used in green hydrogen, fuel cells, automotive, aerospace, filtration, paper, food, chemical, mining, electronics and architecture. Each industry gets a mesh choice based on flow, strength, corrosion and fit.",
    cards: [
      { title: "Energy and clean tech", body: "Electrolysis, fuel cells, hydrogen purification and stack-interface applications.", icon: "leaf" },
      { title: "Mobility and aerospace", body: "Drive technology, hydraulic filtration, EGR, EMI shielding and lightweight protection use cases.", icon: "factory" },
      { title: "Process industries", body: "Pulp and paper, polymers, food, chemical, mining, electronics and architecture.", icon: "boxes" },
    ],
    applications: ["Automotive", "Aerospace", "Pulp and paper", "Plastic and polymer", "Food and beverage", "Chemical", "Mining", "Energy", "Electronics", "Architecture"],
  },
  "industrial-filtration": {
    eyebrow: "Industrial Filtration",
    title: "Industrial filtration mesh for separation, dewatering and process protection",
    intro:
      "BVK supplies filtration mesh for plants and equipment where flow, retention, cleaning and repeat supply matter. Stainless steel mesh, nickel mesh and other alloys can be selected as per medium and operating condition.",
    cards: [
      { title: "Process fit", body: "Mesh geometry is matched to retention, pressure drop, flow rate and media compatibility.", icon: "gauge" },
      { title: "Material breadth", body: "Stainless, nickel, copper, aluminium and specialty alloys allow selection around corrosion and temperature.", icon: "beaker" },
      { title: "Repeat supply", body: "Traceable production and controlled inspection support repeat orders and specification stability.", icon: "shield" },
    ],
    applications: ["Fiber molding", "Paper forming", "Dewatering", "Juicing", "Distillation", "Coal washing", "Mineral separation", "FGD"],
  },
  "energy-clean-tech": {
    eyebrow: "Clean Tech",
    title: "Clean-energy mesh components for electrolysis, fuel cells and hydrogen systems",
    intro:
      "Clean-energy equipment needs parts that are reliable, conductive, corrosion-aware and easy to scale. BVK supports electrolysis, fuel cells, hydrogen purification and balance-of-plant systems with application-led metal mesh solutions.",
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
      "BVK combines renewable energy, reusable packaging, digital energy management and ESG-focused improvements. More than 50% of current energy needs are powered through renewable sources, with a goal of complete renewable self-reliance.",
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
    title: "Brochures and documents for faster vendor review",
    intro:
      "Use these approved brochures for internal review, vendor qualification, early engineering discussion and SEO-friendly learning around precision mesh, woven mesh, knitted mesh and green hydrogen components.",
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
  const productFamilies = data.productFamilies ?? [];

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
            <dl
              className={`grid gap-px overflow-hidden border border-hairline bg-hairline ${
                data.metrics.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
              }`}
            >
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

        {productFamilies.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-brand-deep">Product range</p>
                <h3 className="mt-4 font-display text-3xl font-bold text-ink">
                  Image-led product selection for real equipment
                </h3>
              </div>
              <Link href="/contact" className="btn btn-outline-dark w-fit">
                Discuss a custom part
              </Link>
            </div>

            <div className="mt-8 grid overflow-hidden border border-ink-line bg-ink text-white lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[24rem] bg-ink-raised">
                <Image
                  src={productFamilies[0].image}
                  alt={`${productFamilies[0].name} product visual`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-90"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 max-w-xl p-7 lg:p-10">
                  <p className="text-xs font-semibold uppercase text-brand">
                    Featured product
                  </p>
                  <h4 className="mt-3 font-display text-3xl font-bold">
                    {productFamilies[0].name}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
                    {productFamilies[0].description}
                  </p>
                </div>
              </div>

              <div className="grid content-between gap-8 p-7 lg:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase text-brand">
                    {productFamilies[0].tag}
                  </p>
                  <ul className="mt-6 grid gap-3">
                    {productFamilies[0].points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 border border-ink-line bg-ink-raised px-4 py-3 text-sm text-on-dark"
                      >
                        <span aria-hidden className="h-2 w-2 shrink-0 bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-3 lg:grid-cols-1">
                  {["Best for", "Mesh behavior", "Stack fit"].map((label, index) => (
                    <div key={label} className="bg-ink-raised p-4">
                      <p className="text-[0.6875rem] font-semibold uppercase text-on-dark-faint">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {productFamilies[0].points[index] ?? "Customised"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {productFamilies.slice(1).map((product) => (
                <article
                  key={product.name}
                  className="group grid overflow-hidden border border-hairline bg-white sm:grid-cols-[0.8fr_1fr]"
                >
                  <div className="relative min-h-64 overflow-hidden bg-ink">
                    <Image
                      src={product.image}
                      alt={`${product.name} for BVK Hydrotech precision mesh applications`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase text-brand-deep">{product.tag}</p>
                    <h4 className="mt-3 font-display text-2xl font-bold text-ink">{product.name}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-grey">{product.description}</p>
                    <ul className="mt-6 space-y-2 border-t border-hairline pt-5">
                      {product.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm leading-snug text-grey">
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-deep" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {data.benefits && (
          <div className="mt-10 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-4">
            {data.benefits.map((benefit) => (
              <div key={benefit} className="bg-surface-raised p-5 text-sm font-medium leading-relaxed text-ink">
                {benefit}
              </div>
            ))}
          </div>
        )}

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
