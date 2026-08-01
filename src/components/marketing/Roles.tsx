const roles = [
  {
    title: "Administrateur global",
    subtitle: "Propriétaire de la plateforme",
    points: [
      "Vue d'ensemble de tous les groupes",
      "Conformité et reporting global",
      "Support et gestion des utilisateurs",
    ],
  },
  {
    title: "Administrateur de groupe",
    subtitle: "Créateur et premier membre",
    points: [
      "Configure la fréquence, le montant et le cycle",
      "Invite et gère la liste des membres",
      "Décide du niveau de confidentialité du groupe",
    ],
  },
  {
    title: "Membre",
    subtitle: "Participant du groupe",
    points: [
      "Cotise à chaque tour selon les règles acceptées",
      "Participe au tirage au sort",
      "Consulte son propre historique de transactions",
    ],
  },
];

export function Roles() {
  return (
    <section id="roles" className="border-b border-line bg-ivory-soft">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">GOUVERNANCE</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-balance sm:text-4xl">
          Une hiérarchie simple, sans ambiguïté.
        </h2>

        <div className="mt-16 grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {roles.map((role) => (
            <div key={role.title} className="p-10">
              <h3 className="font-display text-xl">{role.title}</h3>
              <p className="mt-1 text-xs tracking-[0.15em] text-ink/45">
                {role.subtitle.toUpperCase()}
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm leading-relaxed text-ink/70"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
