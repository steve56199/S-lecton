import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-line bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
        <p className="text-xs tracking-[0.3em] text-gold-soft">
          PLATEFORME EN CONSTRUCTION PROGRESSIVE
        </p>

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-tight text-balance sm:text-6xl">
          L&apos;épargne collective, gérée avec la rigueur d&apos;une
          institution de confiance.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/75">
          Synergia permet à un groupe — amis, famille, collègues — de gérer
          sa tontine ou son épargne collective sur une plateforme sécurisée,
          transparente et entièrement traçable, du premier versement à la
          remise finale du pot.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/connexion"
            className="border border-gold-soft bg-gold px-7 py-3 text-center text-sm tracking-wide text-ink transition-colors hover:bg-gold-soft"
          >
            Créer mon compte
          </Link>
          <a
            href="#produits"
            className="border border-ivory/30 px-7 py-3 text-center text-sm tracking-wide text-ivory/85 transition-colors hover:border-ivory hover:text-ivory"
          >
            Découvrir la plateforme
          </a>
        </div>
      </div>
    </section>
  );
}
