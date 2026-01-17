"use client";

import { useState, ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabViewProps = {
  tabs: Tab[];
};

export default function TabView({ tabs }: TabViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Onglets */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 -mb-px font-medium border-b-2 transition-colors ${
              activeIndex === index
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-gray-600 hover:text-[var(--primary)]"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu de l’onglet actif */}
      <div className="p-2 mt-4">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
