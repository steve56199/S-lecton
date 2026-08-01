const links = [
  { label: "La plateforme", href: "#produits" },
  { label: "Comment ça marche", href: "#cycle" },
  { label: "Rôles", href: "#roles" },
  { label: "Sécurité", href: "#securite" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#"
          className="font-display text-lg tracking-[0.2em] text-ink"
        >
          SYNERGIA
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#rejoindre"
          className="border border-ink px-5 py-2 text-sm tracking-wide text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          Rejoindre la liste
        </a>
      </div>
    </header>
  );
}
