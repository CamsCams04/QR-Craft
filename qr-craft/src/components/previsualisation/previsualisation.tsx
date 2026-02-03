"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QrStyleOptions } from "@/types/qr";
import QrFrame from "../qrFrame/qrFrame";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";


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
        color: cornerColor,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Mise à jour dynamique des options ---
  useEffect(() => {
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
  }, [data, cornerColor, dotColor, bgColor, styleOptions]);

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

  // --- Fonctions de partage ---
  const shareByMail = () => {
    const subject = encodeURIComponent("Voici mon QR code !");
    const body = encodeURIComponent(`Salut !\nVoici le lien : ${data}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(data);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(data);
    const text = encodeURIComponent("Regarde ce QR code !");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(data);
    const text = encodeURIComponent("Regarde ce QR code !");
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
  };

  // --- Contenu des boutons (téléchargement + partage) ---
  const content = (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {/* Boutons de téléchargement */}
      <div className="flex flex-row gap-2 items-center justify-center">
        <button
          className="flex gap-2 items-center px-4 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors"
          onClick={() => qrInstance.current?.download({ name: "qr-code", extension: "png" })}
        >
          <ArrowDownTrayIcon className="w-4 h-4" /> Télécharger PNG
        </button>

        <button
          className="flex gap-2 items-center px-4 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors"
          onClick={() => qrInstance.current?.download({ name: "qr-code", extension: "svg" })}
        >
          <ArrowDownTrayIcon className="w-4 h-4" /> Télécharger SVG
        </button>
      </div>

      {/* Boutons de partage */}
      <div className="flex flex-row gap-2 items-center justify-center">
        <button
          className="flex gap-2 items-center px-4 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors"
          onClick={shareByMail}
        >
          <FaEnvelope className="w-4 h-4" />
        </button>

        <button
          className="px-4 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-sm"
          onClick={shareOnFacebook}
        >
          <FaFacebookF className="w-4 h-4" />
        </button>

        <button
          className="px-4 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 text-sm"
          onClick={shareOnTwitter}
        >
          <FaTwitter className="w-4 h-4" />
        </button>

        <button
          className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
          onClick={shareOnWhatsApp}
        >
          <FaWhatsapp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="inline-block w-full h-140 bg-white rounded-xl shadow-md border border-gray-200 overflow-auto flex flex-col items-center">
      <div className="bg-[var(--background)] py-2 px-4 border-b border-gray-200 rounded-t-xl w-full">
        <h2 className="text-xl font-semibold">Prévisualisation</h2>
      </div>

      <div className="flex justify-center py-6 w-full">
        <QrFrame size={240} padding={12} content={content}>
          <div ref={qrRef} />
        </QrFrame>
      </div>
    </div>
  );
}
