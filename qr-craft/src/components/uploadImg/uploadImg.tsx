type UploadImgProps = {
  onImageChange: (url: string) => void;
};

export default function UploadImg({ onImageChange }: UploadImgProps) {
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500_000) {
      alert("Image trop lourde (max 500 Ko)");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", { method: "POST", body: formData });

      if (!res.ok) {
        const text = await res.text();
        console.error("Erreur upload : ", text);
        alert("Erreur upload");
        return;
      }

      const data = await res.json();
      onImageChange(data.url);
    } catch (err) {
      console.error(err);
      alert("Erreur réseau ou serveur");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg font-medium">Télécharger une image</label>

      <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-500 transition">
        <span className="text-gray-600">Cliquez ou glissez une image ici</span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
}
