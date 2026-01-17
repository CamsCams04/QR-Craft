import CustomQrCode from "../customQrCode/customQrCode";
import LienURL from "../lienURL/lienURL";
import TabView from "../tabView/tabView";

type CardCreationProps = {
  url: string;
  onUrlChange: (url: string) => void;
  cornerColor: string;
  setCornerColor: (c: string) => void;
  dotColor: string;
  setDotColor: (c: string) => void;
  bgColor: string;
  setBgColor: (c: string) => void;
  logoFile: File | null;
  setLogoFile: (f: File | null) => void;
  onStyleChange: (opts: object) => void;
};

export default function CardCreation({
  url,
  onUrlChange,
  cornerColor,
  setCornerColor,
  dotColor,
  setDotColor,
  bgColor,
  setBgColor,
  setLogoFile,
  onStyleChange,
}: CardCreationProps) {
  const tabs = [
    {
      label: "Lien URL",
      content: (
        <>
          <LienURL value={url} onChange={onUrlChange} />

          <hr className="my-6 border-gray-300" />

          <CustomQrCode
            cornerColor={cornerColor}
            setCornerColor={setCornerColor}
            dotColor={dotColor}
            setDotColor={setDotColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            onLogoChange={setLogoFile}
            onStyleChange={onStyleChange}
          />
        </>
      ),
    },
    { label: "Image", content: <div>Image</div> },
    { label: "PDF", content: <div>PDF</div> },
    { label: "Texte", content: <div>Texte</div> },
  ];

  return (
    <div className="inline-block bg-white rounded-xl shadow-md border border-gray-200">
      <div className="bg-[var(--background)] py-2 px-4 border-b border-gray-200 rounded-t-xl">
        <h2 className="text-xl font-semibold">Créer votre QR Code</h2>
      </div>

      <div className="p-6">
        <TabView tabs={tabs} />
      </div>
    </div>
  );
}
