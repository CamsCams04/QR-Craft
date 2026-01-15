import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full py-5 px-8 border-b-3 border-gray-200">
      <div className="flex gap-4 items-center">
        <Image
          src="/assets/logo.png"
          alt="Logo QR-Craft"
          width={48}
          height={48}
        />
        <h1 className="text-2xl">
          <span className="font-bold">QR-Craft</span> {" "} générateur
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/" className="text-lg hover:underline">
          Documentation
        </Link>
          <span className="border-l border-gray-300 h-5"></span>
        <Link href="/about" className="text-lg hover:underline">
          À propos
        </Link>
      </div>
    </header>
  );
}
