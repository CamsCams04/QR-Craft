"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QrStyleOptions } from "@/types/qr";

type PrevisualisationProps = {
  data?: string;
  cornerColor: string;
  dotColor: string;
  bgColor: string;
  logoFile: File | null;
  styleOptions?: QrStyleOptions;
};

export default function Previsualisation({
  data = "https://example.com",
  cornerColor,
  dotColor,
  bgColor,
  logoFile,
  styleOptions = {},
}: PrevisualisationProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  // --- Création initiale du QR Code ---
  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: 240,
      height: 240,
      type: "svg",
      data,
      dotsOptions: {
        color: dotColor,
        type: styleOptions.dotsOptions?.type ?? "square",
      },
      cornersSquareOptions: {
        type: styleOptions.cornersSquareOptions?.type ?? "square",
        color: cornerColor
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: styleOptions.imageSize ?? 0.2,
      },
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrInstance.current.append(qrRef.current);
    }
  }, []); // ne créer qu'une seule fois

  // --- Mise à jour dynamique des options ---
  useEffect(() => {
    console.log("Mise à jour du QR Code avec :", 
      styleOptions,
    );
    if (!qrInstance.current) return;
    qrInstance.current.update({
      data,
      dotsOptions: {
        color: dotColor,
        type: styleOptions.dotsOptions?.type ?? "square",
      },
      cornersSquareOptions: {
        type: styleOptions.cornersSquareOptions?.type ?? "square",
        color: cornerColor,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        margin: styleOptions.margin ?? 5,
        imageSize: styleOptions.imageSize ?? 0.5,
      },
    });
  }, [data, cornerColor, dotColor, bgColor, styleOptions, styleOptions.margin, styleOptions.imageSize]); // déclenché à chaque changement

  // --- Gestion du logo ---
  useEffect(() => {
    if (!qrInstance.current) return;

    if (!logoFile) {
      qrInstance.current.update({ image: undefined });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      qrInstance.current?.update({
        image: reader.result as string,
      });
    };
    reader.readAsDataURL(logoFile);
  }, [logoFile]);

  return (
    <div className="flex justify-center">
      <div
        ref={qrRef}
        className="p-4 bg-white rounded-xl shadow-md"
      />
    </div>
  );
}
