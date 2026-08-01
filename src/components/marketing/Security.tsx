const guarantees = [
  {
    title: "Chiffrement bout en bout",
    text: "Toutes les communications transitent en HTTPS et les données sensibles sont chiffrées au repos dans la base de données.",
  },
  {
    title: "Vérification d'identité",
    text: "Chaque utilisateur confirme son adresse email et son numéro de téléphone avant de pouvoir rejoindre un groupe.",
  },
  {
    title: "Traçabilité complète",
    text: "Chaque paiement, tirage au sort et libération de pot est journalisé et consultable dans l'historique du groupe.",
  },
];

export function Security() {
  return (
    <section id="securite" className="border-b border-line bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold-soft">
          SÉCURITÉ ET CONFORMITÉ
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-balance sm:text-4xl">
          La rigueur d&apos;une institution financière, appliquée à un
          groupe d&apos;amis.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ivory/15 pt-12 sm:grid-cols-3">
          {guarantees.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-lg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
