const products = [
  {
    label: "Produit principal",
    title: "Tontines",
    text: "Un groupe cotise à intervalle régulier — hebdomadaire, mensuel ou selon le rythme choisi par l'administrateur — et un tirage au sort désigne, à chaque tour, le membre qui reçoit le pot commun. Le cycle continue jusqu'à ce que chaque membre ait été servi.",
    points: [
      "Fréquence, montant et durée définis par le groupe",
      "Tirage au sort horodaté et consultable",
      "Libération du pot à date et heure fixes",
    ],
  },
  {
    label: "Produit secondaire",
    title: "Épargne collective",
    text: "Un groupe met en commun ses ressources pour un objectif précis — un projet de construction, un mariage, un événement — avec une durée et un montant cible définis à l'avance.",
    points: [
      "Objectif et échéance personnalisables",
      "Suivi d'avancement en temps réel",
      "Historique complet des contributions",
    ],
  },
];

export function Products() {
  return (
    <section id="produits" className="border-b border-line bg-ivory-soft">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">CE QUE PERMET SYNERGIA</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-balance sm:text-4xl">
          Deux façons d&apos;épargner ensemble.
        </h2>

        <div className="mt-16 grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {products.map((product) => (
            <div key={product.title} className="p-10">
              <p className="text-xs tracking-[0.2em] text-ink/50">
                {product.label.toUpperCase()}
              </p>
              <h3 className="mt-3 font-display text-2xl">{product.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                {product.text}
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {product.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm leading-relaxed text-ink/75"
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
