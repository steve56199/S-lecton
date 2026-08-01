import Link from "next/link";

const links = [
  { label: "Tableau de bord", href: "/maquette/tableau-de-bord" },
  { label: "Tontine", href: "/maquette/tontine" },
  { label: "Épargne collective", href: "/maquette/epargne" },
  { label: "Paiement", href: "/maquette/paiement" },
  { label: "Administration", href: "/maquette/administration" },
  { label: "Notifications", href: "/maquette/notifications" },
];

export function MaquetteHeader({ actif }: { actif: string }) {
  return (
    <div>
      <div className="bg-gold-soft/40 px-6 py-2 text-center text-xs tracking-[0.15em] text-ink/70 sm:px-10">
        APERÇU VISUEL — DONNÉES FICTIVES, AUCUNE CONNEXION RÉELLE
      </div>
      <header className="border-b border-line bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <Link href="/maquette" className="font-display text-lg tracking-[0.2em]">
            SYNERGIA
          </Link>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "text-sm transition-colors " +
                  (actif === link.href
                    ? "text-ink"
                    : "text-ink/55 hover:text-ink")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
