import Image from "next/image";

type ImageOptionButtonProps = {
  label: string;
  image: string;
  selected: boolean;
  onClick: () => void;
};

export default function ImageOptionButton({
  label,
  image,
  selected,
  onClick,
}: ImageOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-2 rounded-lg border transition
        active:scale-95
        ${
          selected
            ? "border-[var(--primary)] ring-2 ring-[var(--primary)]"
            : "border-gray-200 hover:border-gray-400"
        }
      `}
    >
      <div className="relative w-16 h-16">
        <Image src={image} alt={label} fill className="object-contain" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
