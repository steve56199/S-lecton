import Link from "next/link";
import { DeconnexionButton } from "./DeconnexionButton";

const links = [
  { label: "Mon compte", href: "/compte" },
  { label: "Mes groupes", href: "/groupes" },
];

export function AppHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-display text-lg tracking-[0.2em]">
            SYNERGIA
          </Link>
          <nav className="hidden items-center gap-8 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <DeconnexionButton />
      </div>
    </header>
  );
}
