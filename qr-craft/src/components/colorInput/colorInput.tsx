"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/solid";

type ColorInputProps = {
  label?: string;
  defaultColor?: string;
  onChange?: (color: string) => void;
};

export default function ColorInput({
  label = "Choisir une couleur",
  defaultColor = "#1E3A8A",
  onChange,
}: ColorInputProps) {
  const [color, setColor] = useState(defaultColor);
  const [copied, setCopied] = useState(false);

  const handleChange = (value: string) => {
    setColor(value);
    if (onChange) onChange(value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center w-full max-w-md gap-4">
      {/* Label */}
      <label className="whitespace-nowrap font-semibold">{label}</label>

      {/* Wrapper input + carré couleur + bouton */}
      <div className="flex items-center flex-1 border border-gray-200 rounded-lg overflow-hidden">
        {/* Carré couleur arrondi */}
        <input
          type="color"
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          className="w-10 h-10 cursor-pointer m-1 p-0"
        />

        {/* Input texte */}
        <input
          type="text"
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        {/* Bouton copier */}
        <button
          onClick={handleCopy}
          className="px-3 hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
}
