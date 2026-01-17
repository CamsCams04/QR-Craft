"use client";

import { useEffect, useState } from "react";
import ImageOptionButton from "../imageOptionButton/imageOptionButton";
import ColorInput from "../colorInput/colorInput";

type QrStyleOptionsProps = {
  onChange?: (options: object) => void;
  color?: string;
};

/* ===== OPTIONS ===== */

const DOT_OPTIONS = [
  { value: "square", label: "Carré", image: "/assets/logo.png" },
  { value: "dots", label: "Ronds", image: "/assets/logo.png" },
  { value: "rounded", label: "Arrondi", image: "/assets/logo.png" },
  { value: "extra-rounded", label: "Extra", image: "/assets/logo.png" },
  { value: "classy", label: "Classy", image: "/assets/logo.png" },
  { value: "classy-rounded", label: "Classy+", image: "/assets/logo.png" },
];

const CORNER_OPTIONS = [
  { value: "dot", label: "Ronds", image: "/assets/logo.png" },
  { value: "square", label: "Carré", image: "/assets/logo.png" },
  { value: "dots", label: "Points", image: "/assets/logo.png" },
  { value: "rounded", label: "Arrondi", image: "/assets/logo.png" },
  { value: "extra-rounded", label: "Extra", image: "/assets/logo.png" },
  { value: "classy", label: "Classy", image: "/assets/logo.png" },
  { value: "classy-rounded", label: "Classy+", image: "/assets/logo.png" },
];

export default function QrStyleOptions({ onChange, color }: QrStyleOptionsProps) {
  const [dotType, setDotType] = useState("square");
  const [dotColor, setDotColor] = useState(color || "#0F172A");

  const [cornerType, setCornerType] = useState("square");
  const [cornerColor, setCornerColor] = useState(color || "#0F172A");
  
  const [logoSize, setLogoSize] = useState(0.2);
  const [logoMargin, setLogoMargin] = useState(0);

  /* ===== EMIT CHANGES ===== */
  useEffect(() => {
    if (!onChange) return;

    onChange({
      dotsOptions: {
        type: dotType,
        color: dotColor,
      },
      cornersSquareOptions: {
        type: cornerType,
        color: cornerColor,
      },
      imageOptions: {
        imageSize: logoSize,
        margin: logoMargin,
      },
    });
  }, [dotType, dotColor, cornerType, cornerColor, logoSize, logoMargin, onChange]);

  return (
    <div className="flex flex-col gap-6">

      {/* ===== POINTS ===== */}
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-sm">Forme des points</h3>
        <div className="grid grid-cols-3 gap-3">
          {DOT_OPTIONS.map((opt) => (
            <ImageOptionButton
              key={opt.value}
              {...opt}
              selected={dotType === opt.value}
              onClick={() => setDotType(opt.value)}
            />
          ))}
        </div>
      </section>

      {/* ===== COINS ===== */}
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-sm">Forme des coins</h3>
        <div className="grid grid-cols-3 gap-3">
          {CORNER_OPTIONS.map((opt) => (
            <ImageOptionButton
              key={opt.value}
              {...opt}
              selected={cornerType === opt.value}
              onClick={() => setCornerType(opt.value)}
            />
          ))}
        </div>
      </section>

      {/* ===== LOGO ===== */}
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-sm">Logo</h3>

        <div>
          <label className="text-xs">Taille</label>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            value={logoSize}
            onChange={(e) => setLogoSize(Number(e.target.value))}
            className="w-full accent-[var(--foreground)]"
          />

        </div>

        <div>
          <label className="text-xs">Marge</label>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={logoMargin}
            onChange={(e) => setLogoMargin(Number(e.target.value))}
            className="w-full accent-[var(--foreground)]"
          />
        </div>
      </section>
    </div>
  );
}
