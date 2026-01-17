"use client";

import { useState } from "react";
import ColorInput from "../colorInput/colorInput";
import InputImage from "../inputImage/inputImage";
import Accordion from "../accordion/accordion";
import QrStyleOptions from "../qrStyleOptions/qrStyleOptions";

type CustomQrCodeProps = {
  cornerColor: string;
  setCornerColor: (c: string) => void;
  dotColor: string;
  setDotColor: (c: string) => void;
  bgColor: string;
  setBgColor: (c: string) => void;
  onLogoChange: (file: File | null) => void;
  onStyleChange: (opts: object) => void;
};

export default function CustomQrCode({
  cornerColor,
  setCornerColor,
  dotColor,
  setDotColor,
  bgColor,
  setBgColor,
  onLogoChange,
  onStyleChange,
}: CustomQrCodeProps) {
  return (
    <div className="flex flex-col gap-4">
      <ColorInput label="Couleur coin" defaultColor={cornerColor} onChange={setCornerColor} />
      <ColorInput label="Couleur point" defaultColor={dotColor} onChange={setDotColor} />
      <ColorInput label="Arrière-plan" defaultColor={bgColor} onChange={setBgColor} />

      <InputImage onChange={onLogoChange} />

      <Accordion title="Forme & style">
        <QrStyleOptions onChange={onStyleChange} />
      </Accordion>
    </div>
  );
}

