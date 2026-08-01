import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Plateforme — Maquette Synergia",
};

const groupesRecents = [
  { nom: "Tontine des amis", membres: 10, statut: "actif", cree: "2 juillet 2026" },
  { nom: "Projet Maison", membres: 6, statut: "actif", cree: "15 juin 2026" },
  { nom: "Tontine du bureau", membres: 8, statut: "actif", cree: "1 août 2026" },
  { nom: "Baptême de Léa", membres: 12, statut: "clôturé", cree: "3 mars 2026" },
];

export default function PlateformeMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/plateforme" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">
          ADMINISTRATEUR GLOBAL
        </p>
        <h1 className="mt-4 font-display text-3xl">Vue d&apos;ensemble de la plateforme</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Réservée au propriétaire de la plateforme — jamais visible par les
          administrateurs ou membres de groupe.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 border border-line sm:grid-cols-4 sm:divide-x sm:divide-line">
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">UTILISATEURS</p>
            <p className="mt-2 font-display text-2xl">1 284</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">GROUPES ACTIFS</p>
            <p className="mt-2 font-display text-2xl">142</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">VOLUME CE MOIS</p>
            <p className="mt-2 font-display text-2xl">18,4 M XAF</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">KYC EN ATTENTE</p>
            <p className="mt-2 font-display text-2xl">23</p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl">Groupes récents</h2>
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {groupesRecents.map((g) => (
              <li key={g.nom} className="flex items-center justify-between py-4 text-sm">
                <div>
                  <p className="text-ink/80">{g.nom}</p>
                  <p className="mt-1 text-xs text-ink/45">
                    {g.membres} membres — créé le {g.cree}
                  </p>
                </div>
                <span
                  className={
                    "text-xs tracking-[0.15em] " +
                    (g.statut === "clôturé" ? "text-ink/45" : "text-emerald")
                  }
                >
                  {g.statut === "clôturé" ? "CLÔTURÉ" : "ACTIF"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 border border-line p-6">
          <h2 className="font-display text-lg">Conformité et audit</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Journal complet des connexions, créations de groupe, paiements,
            tirages au sort et modifications de configuration — conservé sept
            ans, exportable à tout moment.
          </p>
        </div>
      </main>
    </div>
  );
}
