const pillars = [
  {
    number: "01",
    title: "Stabilité",
    text: "Des cycles de cotisation fixes, des dates de versement annoncées à l'avance et un cadre qui ne change pas en cours de route.",
  },
  {
    number: "02",
    title: "Confiance",
    text: "Chaque versement, chaque tirage au sort et chaque remise de pot est enregistré et consultable par les membres du groupe.",
  },
  {
    number: "03",
    title: "Évolution",
    text: "La plateforme s'enrichit progressivement, module après module, sans jamais interrompre les groupes déjà actifs.",
  },
  {
    number: "04",
    title: "Synergie",
    text: "La force d'un groupe qui avance ensemble, où chaque membre profite de la discipline collective plutôt que de l'épargne isolée.",
  },
];

export function Pillars() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">NOS PRINCIPES</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-balance sm:text-4xl">
          Quatre principes guident chaque décision de conception.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-16 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="border-t border-line pt-6"
            >
              <span className="font-display text-sm text-gold">
                {pillar.number}
              </span>
              <h3 className="mt-3 font-display text-xl">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
