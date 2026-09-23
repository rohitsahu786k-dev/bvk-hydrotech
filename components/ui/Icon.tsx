/**
 * Renders the icon named by the "Lucide Icon Name" ACF field.
 *
 * The lookup happens inside this component rather than in the caller, so the
 * icon is never a component value created during a parent's render.
 *
 * The field is free text, so an editor can type any Lucide name — only the
 * icons mapped here are bundled, and anything unrecognised falls back to a
 * neutral mark instead of breaking the page. Extend ICONS when the content
 * team starts using a new one.
 *
 * The brand guidelines have not signed off an icon set, so these serve as
 * neutral UI affordances only, never as brand marks.
 */
import {
  Building2, BatteryCharging, Car, CircuitBoard, Cog, CupSoda, FlaskConical,
  Flame, Grid3x3, Hexagon, Layers, Mountain, Plane, Waves, Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Building2, BatteryCharging, Car, CircuitBoard, Cog, CupSoda, FlaskConical,
  Flame, Grid3x3, Layers, Mountain, Plane, Waves, Zap,
};

interface IconProps {
  name?: string | null;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  const key = (name ?? "").replace(/\s+/g, "");
  const Glyph = ICONS[key] ?? Hexagon;
  return <Glyph className={className} aria-hidden />;
}
