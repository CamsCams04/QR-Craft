"use client";

import { useState } from "react";

type LienURLProps = {
  value: string;
  onChange: (value: string) => void;
}

export default function LienURL( { value, onChange }: LienURLProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null); // null = pas encore saisi

  // Validation simple d'URL
  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  // Au changement de l'input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);

    if (value === "") {
      setIsValid(null); // rien saisi
    } else {
      setIsValid(validateUrl(value)); // true ou false
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="font-semibold text-lg mb-2">1. Entrez le lien URL</label>
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Entrez l'URL ici"
          className={`
            border rounded-lg px-4 py-2 w-full pr-10
            transition-all duration-300
            focus:outline-none
            ${
              isValid === true
                ? "border-green-600 focus:ring-green-500"
                : isValid === false
                ? "border-red-600 focus:ring-red-400"
                : "border-gray-300 focus:ring-[var(--primary)]"
            }
          `}
        />

        {/* Icône à droite */}
        {isValid === true && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl">
            ✓
          </span>
        )}
        {isValid === false && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 text-xl">
            ✗
          </span>
        )}
      </div>
    </div>
  );
}
