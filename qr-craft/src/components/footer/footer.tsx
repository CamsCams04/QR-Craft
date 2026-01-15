import Link from "next/link";
// TODO: Ajouter des liens pertinents dans le footer
export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center w-full py-3 px-8 border-t-3 border-gray-200 mt-10 gap-4">
      <div className="flex gap-4 items-center">
        <Link href="/" className="text-sm hover:underline">
          Confidentialité
        </Link>
          <span className="border-l border-gray-300 h-5"></span>
        <Link href="/" className="text-sm hover:underline">
          Condition d&apos;utilisation
        </Link>
          <span className="border-l border-gray-300 h-5"></span>
        <Link href="/" className="text-sm hover:underline">
          Contact
        </Link>
      </div>
    <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} QR-Craft.
      </p>
    </footer>
  );
}