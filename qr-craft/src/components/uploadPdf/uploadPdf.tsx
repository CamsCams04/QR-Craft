"use client";

import { useState, useEffect } from "react";

type UploadPdfProps = {
  onPdfUrlChange: (url: string) => void;
};

export default function UploadPdf({ onPdfUrlChange }: UploadPdfProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (file.type !== "application/pdf") {
      alert("Veuillez sélectionner un fichier PDF !");
      return;
    }

    setPdfFile(file);

    // Génère une URL locale pour prévisualisation
    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    // Transmet la "fausse" URL au QR code pour tester
    onPdfUrlChange(url);
  };

  // Nettoyage de l'URL quand le composant se démonte
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg font-medium">Télécharger un PDF</label>

      <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-500 transition">
        <span className="text-gray-600">Cliquez ou glissez un PDF ici</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {pdfUrl && (
        <div className="mt-4 flex flex-col gap-2">
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="400px"
          />
          <a
            href={pdfUrl}
            download={pdfFile?.name}
            className="text-blue-600 underline"
          >
            Télécharger le PDF
          </a>
        </div>
      )}
    </div>
  );
}
