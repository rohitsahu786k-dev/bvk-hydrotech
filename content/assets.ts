/**
 * Every image and document the content layer points at.
 *
 * Centralised so the media host can change in one place, and so a filename
 * that goes missing in WordPress is found here rather than hunted through
 * fifteen content files. All of these were verified against the live media
 * library; the brochure filenames in particular are case-sensitive.
 */

const MEDIA = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "https://dev.bhavcreations.in"}/wp-content/uploads`;

const u = (file: string) => `${MEDIA}/${file}`;

export const docs = {
  greenEnergy: u("green-energy-brochure.pdf"),
  knittedMesh: u("bvk-knitted-mesh-brochure.pdf"),
  hydrogenLeaflet: u("green-hydrogen-knitted-mesh-solutions-leaflet.pdf"),
  brandGuidelines: u("bvk-hydrotech-brand-guidelines.pdf"),
};

export const img = {
  // Hydrogen and electrolyser
  electrolyserSplash: u("hydrogen_electrolyzer_in_blue_water_splash.png"),
  electrolyserMotion: u("hydrogen_electrolyzer_in_motion.png"),
  hydrogenInspection: u("hydrogen_plant_inspection_platform.png"),
  hydrogenEngineer: u("engineer_inspecting_high_tech_hydrogen_plant.png"),
  hydrogenFacility: u("sunlit_hydrogen_facility_in_the_mountains.webp"),
  hydrogenValley: u("hydrogen_plant_in_a_misty_forest_valley.webp"),
  hydrogenFilterModule: u("hydrogen_plant_filter_module_assembly.webp"),
  electrolyzerPlant: u("cinematic_stainless_steel_electrolyzer_plant.webp"),
  electrolyserStackRender: u("bvk-hydrogen-electrolyser-stack.jpeg"),
  explodedElectrolyser: u("exploded_electrolyzer_stack_infographic.png"),
  explodedElectrolyserDiagram: u("exploded_electrolyzer_component_diagram.png"),
  explodedStainless: u("exploded_stainless_steel_heat_exchanger_assembly.png"),
  explodedPlate: u("exploded_plate_heat_exchanger_assembly.png"),
  heatExchangerLine: u("industrial_heat_exchanger_assembly_line.png"),
  gasCylinderHall: u("symmetrical_industrial_gas_cylinder_hall.png"),

  // Fuel cell
  fuelCellStack: u("bvk-fuel-cell-stack-component.jpeg"),
  fuelCellStackAlt: u("bvk-fuel-cell-stack-component-transparent.png"),
  fuelCellMesh: u("bvk-fuel-cell-mesh-components.png"),

  // Mesh product
  wovenMeshSurface: u("bvk-precision-woven-mesh-surface.png"),
  meshRoll: u("bvk-metal-mesh-roll.png"),
  stainlessMesh: u("bvk-stainless-steel-mesh.jpeg"),
  copperMesh: u("bvk-copper-metal-mesh.jpeg"),
  blackMesh: u("bvk-black-metal-mesh.jpeg"),
  knittedMacro: u("interwoven_steel_mesh_in_macro_detail.png"),
  membraneRoll: u("advanced_silver_membrane_roll_close_up.png"),
  stainlessMeshRoll: u("industrial_stainless_steel_mesh_roll.webp"),
  meshRollFactory: u("industrial_mesh_roll_in_a_cool_factory_setting.webp"),
  engineeredMeshRender: u("bvk-engineered-mesh-component-render.png"),
  cylindricalStack: u("bvk-engineered-cylindrical-stack-tube-1.png"),
  filterElementCutaway: u("bvk-filter-element-cutaway.png"),

  // Plant and process — the genuine photography in the library
  weavingFloor: u("bvk-factory-weaving-production-floor.jpeg"),
  warping: u("bvk-wire-warping-manufacturing-process.jpeg"),
  annealing: u("bvk-annealing-manufacturing-process.jpeg"),
  slitting: u("bvk-precision-slitting-process.jpeg"),
  materialRacks: u("bvk-stainless-steel-material-storage-racks.jpeg"),
  gembaBoard: u("bvk-gemba-quality-management-board.jpeg"),
  team: u("bvk-company-team-factory.jpeg"),

  // Laboratory and simulation
  flowLab: u("precision_mesh_flow_laboratory.webp"),
  meshTestingLab: u("industrial_mesh_flow_testing_lab.webp"),
  weavingMachine: u("precision_mesh_weaving_machine.webp"),
  wireMeshLine: u("industrial_wire_mesh_production_line.webp"),
  mistNozzles: u("precision_stainless_mist_nozzles.png"),
  mistNozzlesFactory: u("precision_mist_nozzles_in_stainless_steel_factory.png"),

  // Industry tiles
  industryAerospace: u("aerospace-bvk-hydrotech.webp"),
  industryAutomotive: u("automotive-bvk-hydrotech.webp"),
  industryChemical: u("chemical-bvk-hydrotech.webp"),
  industryElectronics: u("electronics-bvk-hydrotech.webp"),
  industryEnergy: u("energy-hydrogen-bvk-hydrotech.webp"),
  industryFood: u("food-beverage-bvk-hydrotech.webp"),
  industryMining: u("mining-bvk-hydrotech.webp"),
  industryPulpPaper: u("pulp-paper-bvk-hydrotech.webp"),

  // Environment and energy
  forestValley: u("misty_sunrise_over_a_forested_river_valley.png"),
  solarSunrise: u("sunrise_solar_farm_and_mountains.png"),
  solarMountains: u("solar_farm_beneath_mountain_skies.png"),
  algae: u("sunlit_aquatic_algae_garden.png"),
  refineryCleanEnergy: u("golden_hour_clean_energy_refinery.png"),
  refineryPetrochemical: u("golden_hour_petrochemical_refinery.png"),
  airliner: u("airliner_above_the_clouds.png"),
};
