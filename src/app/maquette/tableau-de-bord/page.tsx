import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Tableau de bord — Maquette Synergia",
};

const tontinesActives = [
  {
    nom: "Tontine des amis",
    tour: "Tour 4 sur 10",
    prochainPaiement: "12 août 2026",
    montant: "25 000 XAF",
    statut: "à jour",
  },
  {
    nom: "Projet Maison — Épargne",
    tour: "Objectif : 3 200 000 XAF",
    prochainPaiement: "31 août 2026",
    montant: "50 000 XAF",
    statut: "à jour",
  },
  {
    nom: "Tontine du bureau",
    tour: "Tour 1 sur 8",
    prochainPaiement: "5 août 2026",
    montant: "15 000 XAF",
    statut: "en retard",
  },
];

const historique = [
  { date: "15 juillet 2026", libelle: "Cotisation — Tontine des amis", montant: "-25 000 XAF" },
  { date: "1 juillet 2026", libelle: "Pot reçu — Tontine du bureau", montant: "+120 000 XAF" },
  { date: "28 juin 2026", libelle: "Cotisation — Projet Maison", montant: "-50 000 XAF" },
  { date: "15 juin 2026", libelle: "Cotisation — Tontine des amis", montant: "-25 000 XAF" },
  { date: "1 juin 2026", libelle: "Cotisation — Tontine des amis", montant: "-25 000 XAF" },
];

export default function TableauDeBordMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/tableau-de-bord" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">TABLEAU DE BORD</p>
        <h1 className="mt-4 font-display text-3xl">Bienvenue, Aïcha.</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Vue d&apos;ensemble de vos tontines et de votre épargne collective.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 border border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">TOTAL ÉPARGNÉ</p>
            <p className="mt-2 font-display text-2xl">465 000 XAF</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">TOTAL REÇU</p>
            <p className="mt-2 font-display text-2xl">120 000 XAF</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">GROUPES ACTIFS</p>
            <p className="mt-2 font-display text-2xl">3</p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl">Mes tontines et épargnes actives</h2>
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {tontinesActives.map((t) => (
              <li key={t.nom} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg">{t.nom}</p>
                  <p className="mt-1 text-sm text-ink/60">{t.tour}</p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="text-ink/70">
                    {t.montant} — échéance {t.prochainPaiement}
                  </p>
                  <p
                    className={
                      "mt-1 text-xs tracking-[0.15em] " +
                      (t.statut === "en retard" ? "text-red-800" : "text-emerald")
                    }
                  >
                    {t.statut === "en retard" ? "EN RETARD" : "À JOUR"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl">Historique récent</h2>
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {historique.map((h, i) => (
              <li key={i} className="flex items-center justify-between py-4 text-sm">
                <div>
                  <p className="text-ink/80">{h.libelle}</p>
                  <p className="mt-1 text-xs text-ink/45">{h.date}</p>
                </div>
                <p className={h.montant.startsWith("+") ? "text-emerald" : "text-ink/70"}>
                  {h.montant}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
