/**
 * The certification marks shown across the site, as supplied by the
 * certification body. Only these six; they live in the media library.
 */
export const certifications = [
  { name: "ISO 9001:2015", label: "Quality Management", file: "ISO-9001-2015-English.png" },
  { name: "IATF 16949:2016", label: "Automotive Quality", file: "IATF-16949.png" },
  { name: "EN 9100 / AS9100", label: "Aerospace Quality", file: "EN-AS-9100-English.jpg" },
  { name: "ISO 14001:2015", label: "Environmental Management", file: "ISO-14001-2015-English.png" },
  { name: "ISO 45001:2018", label: "Health & Safety", file: "ISO-45001-English.png" },
  { name: "DSIR Recognised R&D", label: "Government of India", file: "dsir-certification.png" },
] as const;
