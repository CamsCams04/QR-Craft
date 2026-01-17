"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/solid";

type InputImageProps = {
  onChange?: (file: File | null) => void;
};

export default function InputImage({ onChange }: InputImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    if (onChange) onChange(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (onChange) onChange(null);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
        className="relative flex flex-col items-center justify-center w-full h-40 bg-[var(--background)] border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      >
        {preview ? (
          <>
            <div className="relative w-32 h-32 mt-4 mb-4">
              <Image
                src={preview}
                alt="Preview"
                fill
                style={{ objectFit: "contain" }}
                unoptimized={true}
              />
            </div>

            {/* Bouton supprimer placé à l'extérieur du label click */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // évite ouverture du file picker
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center pt-5 pb-6">
            <ArrowUpTrayIcon className="w-8 h-8 mb-4 text-gray-600" />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
            </p>
            <p className="text-xs text-gray-500">SVG, PNG ou JPG</p>
          </div>
        )}

        <input
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
