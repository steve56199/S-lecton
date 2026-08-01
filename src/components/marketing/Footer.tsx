export function Footer() {
  return (
    <footer id="rejoindre" className="mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">PROCHAINE ÉTAPE</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl text-balance sm:text-4xl">
          La plateforme se construit module après module.
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink/65">
          L&apos;inscription, la création de groupe et le premier cycle de
          tontine seront ouverts dès que les fondations seront prêtes. Cette
          page évolue à chaque étape.
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-ink/45 sm:flex-row sm:items-center sm:px-10">
          <span className="tracking-[0.2em]">SYNERGIA — 2026</span>
          <span>Plateforme en construction progressive. Aucun paiement réel n&apos;est traité pour le moment.</span>
        </div>
      </div>
    </footer>
  );
}
