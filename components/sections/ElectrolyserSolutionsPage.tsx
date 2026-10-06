import Image from "next/image";
import styles from "./ElectrolyserSolutionsPage.module.css";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bolt,
  Box,
  CheckCircle2,
  CircuitBoard,
  Download,
  Droplet,
  Factory,
  FlameKindling,
  Gauge,
  Leaf,
  Microscope,
  Recycle,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
} from "lucide-react";

// Page-specific assets selected from the WordPress media library.
const assets = {
  stack: "https://dev.bhavcreations.in/wp-content/uploads/hydrogen_electrolyzer_in_blue_water_splash.png",
  exploded: "https://dev.bhavcreations.in/wp-content/uploads/exploded_stainless_steel_heat_exchanger_assembly.png",
  h2Bg: "https://dev.bhavcreations.in/wp-content/uploads/hydrogen_electrolyzer_in_blue_water_splash.png",
  facility: "https://dev.bhavcreations.in/wp-content/uploads/hydrogen_plant_inspection_platform.png",
  racks: "https://dev.bhavcreations.in/wp-content/uploads/symmetrical_industrial_gas_cylinder_hall.png",
  spray: "https://dev.bhavcreations.in/wp-content/uploads/precision_stainless_mist_nozzles.png",
  fuelCellMesh: "https://dev.bhavcreations.in/wp-content/uploads/industrial_heat_exchanger_assembly_line.png",
  solar: "https://dev.bhavcreations.in/wp-content/uploads/sunrise_solar_farm_and_mountains.png",
  forest: "https://dev.bhavcreations.in/wp-content/uploads/misty_sunrise_over_a_forested_river_valley.png",
  mesh: "https://dev.bhavcreations.in/wp-content/uploads/advanced_silver_membrane_roll_close_up.png",
  worker: "https://dev.bhavcreations.in/wp-content/uploads/golden_hour_clean_energy_refinery.png",
  annealing: "https://dev.bhavcreations.in/wp-content/uploads/interwoven_steel_mesh_in_macro_detail.png",
  roll: "https://dev.bhavcreations.in/wp-content/uploads/advanced_silver_membrane_roll_close_up.png",
};

const brochureUrl =
  "https://dev.bhavcreations.in/wp-content/uploads/green-hydrogen-knitted-mesh-solutions-leaflet.pdf";

const statCards = [
  { icon: Gauge, title: "High Efficiency", text: "Porosity tuned for reactant flow and stack contact." },
  { icon: ShieldCheck, title: "Robust & Durable", text: "Nickel, titanium, stainless steel and specialty alloys." },
  { icon: BarChart3, title: "Scalable Supply", text: "Prototype to sustainable volume production." },
  { icon: Wrench, title: "Custom Engineered", text: "Mesh architecture set around cell chemistry and fit." },
];

const offerPoints = [
  { title: "GDL / PTL Mesh", text: "Gas diffusion and porous transport layers for alkaline and PEM stacks.", x: "12%", y: "12%" },
  { title: "Nickel Elastic Elements", text: "Stack-conformable separators and elastic mesh parts.", x: "6%", y: "70%" },
  { title: "Catalyst Support", text: "Surface-area coating support for production efficiency.", x: "43%", y: "8%" },
  { title: "Current Collection", text: "Conductive metal pathways for current collection and distribution.", x: "45%", y: "74%" },
  { title: "Flow Control", text: "Porosity and wire profile tuned to manage gas and liquid movement.", x: "74%", y: "12%" },
  { title: "Custom Components", text: "Cut, corrugated, flattened, coated or plated to drawing.", x: "76%", y: "73%" },
];

const processSteps = [
  { icon: Droplet, title: "Water Feed", text: "Feed stream enters the electrolyser system." },
  { icon: Bolt, title: "Electrolysis", text: "Renewable electricity splits water into H2 and O2." },
  { icon: Sparkles, title: "Hydrogen Output", text: "High-purity hydrogen is produced for use or storage." },
  { icon: Waves, title: "Oxygen By-product", text: "Oxygen is vented, captured or routed as needed." },
  { icon: Leaf, title: "Clean Energy", text: "Green hydrogen supports low-carbon industrial systems." },
];

const applications = [
  { image: assets.solar, icon: Leaf, title: "Green Hydrogen Production", text: "Electrolysis components for renewable fuel and storage." },
  { image: assets.worker, icon: Factory, title: "Industrial Decarbonisation", text: "Cleaner process-energy pathways for heavy industry." },
  { image: assets.racks, icon: Box, title: "Hydrogen Storage & BoP", text: "Mesh elements for support, purification and drying skids." },
  { image: assets.spray, icon: CircuitBoard, title: "Specialty Gas Systems", text: "High-purity hydrogen support for critical applications." },
];

const materialPoints = [
  "Wire diameter range from 0.05 mm to 0.30 mm",
  "Single, double and multi-end knitted mesh options",
  "Single-piece diameter capability up to 2.2 m",
  "Nickel 201/202, titanium, stainless steel and specialty alloys",
  "ASTM B164, ISO 9044 and ISO 22734-ready QMS references",
];

const whyCards = [
  { icon: Microscope, title: "R&D Led", text: "CFD, rapid prototyping, material recommendation and mesh design optimisation." },
  { icon: BadgeCheck, title: "Certified Systems", text: "IATF 16949, ISO 9001, ISO 14001 and ISO 45001 backed manufacturing." },
  { icon: Factory, title: "Integrated Production", text: "Weaving, knitting, treatments, inspection and documentation under one route." },
  { icon: Recycle, title: "Sustainability Focus", text: "50%+ energy needs powered through renewables, with a 100% self-reliance goal." },
];

function BlueIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6ff] text-[#0876c9] ring-1 ring-blue-100">
      {children}
    </span>
  );
}

export default function ElectrolyserSolutionsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="shell"><nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><ArrowRight size={11} /><span>Electrolyser Solutions</span></nav></div>
        <div className={`shell ${styles.heroLayout}`}>
          <div>
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Clean energy. Real impact.</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6.4rem)] font-black leading-[0.92] text-[#071a33]">
              Electrolyser <span className="block text-[#0876c9]">Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
              High-performance mesh materials and precision components for efficient, reliable and scalable green hydrogen production.
            </p>
            <div className={styles.heroFeatures}>{[{ icon: Bolt, title: "High Efficiency" }, { icon: ShieldCheck, title: "Robust & Durable" }, { icon: Leaf, title: "Sustainable Hydrogen" }, { icon: Wrench, title: "Custom Engineered" }].map(({ icon: Icon, title }) => <div key={title}><Icon size={22} /><span>{title}</span></div>)}</div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0876c9] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-blue-700/20 transition hover:bg-[#055faa]">
                Talk to Our Experts <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={brochureUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#0876c9]/30 bg-white px-6 py-3 text-sm font-bold text-[#0876c9] transition hover:border-[#0876c9]">
                Download Brochure <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image src={assets.stack} alt="Electrolyser stack with hydrogen bubbles and blue water" fill preload sizes="(min-width: 1024px) 760px, 100vw" />
          </div>
        </div>

        <div className={`shell ${styles.benefits}`}>
          {statCards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 rounded-md px-3 py-4">
              <BlueIcon><Icon className="h-5 w-5" /></BlueIcon>
              <div>
                <h2 className="text-sm font-bold leading-tight text-[#071a33]">{title}</h2>
                <p className="mt-1 text-xs leading-snug text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Overview</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.2rem)] font-black leading-none text-[#071a33]">
              Engineered for a<br /><span className="text-[#0876c9]">Hydrogen-Powered</span> Future
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              BVK Hydrotech supports alkaline and PEM electrolyser builders with precision woven and knitted mesh. Our mesh helps control porosity, improve conductivity, support catalyst layers and keep stack-fit components consistent from prototype to series supply.
            </p>
            <Link href="#electrolyser-components" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0876c9] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#055faa]">
              Explore Our Solutions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[24rem] overflow-hidden rounded-lg bg-slate-100 shadow-2xl shadow-blue-950/10">
            <Image src={assets.facility} alt="Electrolyser component manufacturing facility" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            <div className="absolute bottom-8 left-8 flex items-center gap-4 rounded-lg bg-white/95 p-4 shadow-xl">
              <BlueIcon><FlameKindling className="h-5 w-5" /></BlueIcon>
              <div>
                <p className="text-sm font-bold text-[#071a33]">Building Blocks</p>
                <p className="text-xs text-slate-500">for a cleaner hydrogen value chain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="electrolyser-components" className={`section ${styles.components}`}>
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">What we offer</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none">
              Material &amp; Component Solutions<br />for <span className="text-[#0876c9]">Electrolysers</span>
            </h2>
            <p className="mt-5 text-slate-600">
              From porous transport layers to custom metal mesh components, engineered for reliable hydrogen generation.
            </p>
          </div>

          <div className={styles.diagram}>
            <div className={styles.callouts}>{offerPoints.filter((_, i) => i % 2 === 0).map(point => <div key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}</div>
            <Image src={assets.exploded} alt="Exploded electrolyser assembly showing plates, supports and stack structure" width={1536} height={864} sizes="(min-width: 1280px) 1180px, 92vw" />
            <div className={styles.callouts}>{offerPoints.filter((_, i) => i % 2 === 1).map(point => <div key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">How it works</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none">
              From water to <span className="text-[#0876c9]">clean hydrogen</span>
            </h2>
            <p className="mt-5 text-slate-600">
              Electrolysis splits water into hydrogen and oxygen using renewable electricity, enabling a carbon-free energy carrier.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {processSteps.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-blue-100 bg-white text-[#0876c9] shadow-lg shadow-blue-950/5">
                  {title === "Hydrogen Output" ? <span className="text-3xl font-bold">H<sub>2</sub></span> : title === "Oxygen By-product" ? <span className="text-3xl font-bold">O<sub>2</sub></span> : <Icon className="h-8 w-8" />}
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="absolute right-[-1.25rem] top-7 hidden h-5 w-5 text-blue-300 md:block" />
                )}
                <h3 className="mt-5 text-sm font-bold">{index + 1}. {title}</h3>
                <p className="mx-auto mt-2 max-w-[11rem] text-xs leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f7fbff]">
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Key features</p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,4vw,4rem)] font-black leading-none">
              Engineered for<br /><span className="text-[#0876c9]">Performance</span>
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              Precision woven and knitted metal mesh delivers the permeability, conductivity and mechanical conformity your electrolyser stack needs.
            </p>
            <ul className="mt-7 space-y-3">
              {materialPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0876c9]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[25rem] overflow-hidden rounded-lg bg-slate-100 shadow-2xl shadow-blue-950/10">
            <Image src={assets.fuelCellMesh} alt="Precision electrolyser assemblies on a hydrogen plant production line" fill loading="eager" sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            <div className="absolute bottom-7 left-7 rounded-lg bg-white/95 p-4 shadow-xl">
              <p className="text-sm font-bold">Stack-tunable porosity</p>
              <p className="mt-1 text-xs text-slate-500">Conductivity and pore size set per cell</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a2d15] py-20 text-white">
        <Image src={assets.forest} alt="" fill sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061a0c]/90 via-[#061a0c]/55 to-transparent" />
        <div className="shell relative grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-blue-100">Sustainability</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,5rem)] font-black leading-none">
              Powering a cleaner planet
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/85">
              Woven and knitted mesh support electrolysers and fuel cells across the green hydrogen value chain. BVK also powers 50%+ of its energy needs through renewables, with a goal of becoming 100% self-reliant.
            </p>
          </div>
          <div className="grid content-center gap-4">
            {[{ icon: Leaf, value: "50%+", text: "Energy needs powered by renewables" }, { icon: Recycle, value: "100%", text: "Renewable self-reliance goal" }].map(({ icon: Icon, value, text }) => (
              <div key={value} className={styles.sustainabilityStat}>
                <Icon size={32} /><div><strong>{value}</strong><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell">
          <div className={styles.applications}>
            <div>
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Applications</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.6rem)] font-black leading-none">
                Powering Multiple <span className="text-[#0876c9]">Industries</span>
              </h2>
              <p className="mt-5 text-slate-600">
                BVK components support clean hydrogen production, storage, balance-of-plant systems and industrial decarbonisation.
              </p>
            </div>
            <div className={styles.applicationGrid}>
              {applications.map(({ image, icon: Icon, title, text }) => (
                <article key={title} className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg shadow-blue-950/5">
                  <div className="relative h-36">
                    <Image src={image} alt={title} fill loading="eager" sizes="(min-width: 1280px) 20vw, 45vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <BlueIcon><Icon className="h-5 w-5" /></BlueIcon>
                    <h3 className="mt-4 text-base font-bold leading-tight">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f7fbff]">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Why choose BVK Hydrotech</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none">
              Trusted Partner for<br /><span className="text-[#0876c9]">Electrolyser Components</span>
            </h2>
            <p className="mt-5 text-slate-600">
              BVK combines advanced material science, precision manufacturing and deep industry expertise to deliver components that meet demanding performance and reliability expectations.
            </p>
          </div>
          <div className={styles.strengths}>
            {whyCards.map(({ icon: Icon, title, text }) => (
              <article key={title} className={styles.strength}>
                <BlueIcon><Icon className="h-5 w-5" /></BlueIcon>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.tiles}>
        {[
          { image: assets.mesh, title: "Advanced Mesh Materials" },
          { image: assets.annealing, title: "Precision Component Manufacturing" },
          { image: assets.spray, title: "Quality & Performance Assurance" },
        ].map((tile) => (
          <Link href="/precision-mesh-solutions" key={tile.title} className="group relative min-h-[19rem] overflow-hidden">
            <Image src={tile.image} alt={tile.title} fill loading="eager" sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/15 to-transparent" />
            <h2 className="absolute bottom-7 left-7 max-w-xs font-display text-2xl font-black leading-tight">{tile.title}</h2>
            <span className="absolute bottom-7 right-7 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0876c9]">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        ))}
      </section>

      <section className={styles.cta}>
        <div className="shell overflow-hidden rounded-xl bg-[#eaf6ff]">
          <div className="relative grid min-h-[24rem] items-center overflow-hidden lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative z-10 p-8 lg:p-12">
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Let&apos;s build a cleaner tomorrow</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none text-[#071a33]">
                Ready to Accelerate<br />Your Hydrogen Journey?
              </h2>
              <p className="mt-5 max-w-xl text-slate-600">
                Connect with BVK experts to discuss electrolyser mesh, stack-fit components, material selection and prototype-to-production supply.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0876c9] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#055faa]">
                  Contact Our Team <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={brochureUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#0876c9]/30 bg-white px-6 py-3 text-sm font-bold text-[#0876c9] transition hover:border-[#0876c9]">
                  Download Brochure <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
              <Image src={assets.forest} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover opacity-45 lg:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#eaf6ff] via-[#eaf6ff]/65 to-transparent lg:from-[#eaf6ff] lg:via-[#eaf6ff]/35" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
