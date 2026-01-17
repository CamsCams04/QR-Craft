"use client";

import { useState } from "react";
import CardCreation from "@/components/cardCreation/cardCreation";
import Previsualisation from "@/components/previsualisation/previsualisation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [cornersColor, setCornersColor] = useState("#000000");
  const [dotColor, setDotColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [qrStyle, setQrStyle] = useState({});

  return (
    <div className="flex flex-row px-4 gap-6 w-full">
      <CardCreation
        url={url}
        onUrlChange={setUrl}
        cornerColor={cornersColor}
        setCornerColor={setCornersColor}
        dotColor={dotColor}
        setDotColor={setDotColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
        logoFile={logoFile}
        setLogoFile={setLogoFile}
        onStyleChange={setQrStyle}
      />

      <Previsualisation
        data={url}
        cornerColor={cornersColor}
        dotColor={dotColor}
        bgColor={bgColor}
        logoFile={logoFile}
        styleOptions={qrStyle}
      />
    </div>
  );
}
