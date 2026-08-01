import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Épargne collective — Maquette Synergia",
};

const contributions = [
  { nom: "Aïcha Ndongo", montant: "80 000 XAF" },
  { nom: "Marc Bello", montant: "65 000 XAF" },
  { nom: "Thomas Eyenga", montant: "50 000 XAF" },
  { nom: "Antoine Fouda", montant: "45 000 XAF" },
];

const objectif = 3200000;
const collecte = 2010000;
const pourcentage = Math.round((collecte / objectif) * 100);

export default function EpargneMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/epargne" />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">ÉPARGNE COLLECTIVE</p>
        <h1 className="mt-4 font-display text-3xl">Projet Maison</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Objectif fixé par le groupe pour financer la construction. Échéance :
          31 décembre 2026.
        </p>

        <div className="mt-10 border border-line p-8">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-3xl">
              {collecte.toLocaleString("fr-FR")} XAF
            </p>
            <p className="text-sm text-ink/55">
              sur {objectif.toLocaleString("fr-FR")} XAF
            </p>
          </div>

          <div className="mt-4 h-1.5 w-full bg-line">
            <div
              className="h-1.5 bg-gold"
              style={{ width: `${pourcentage}%` }}
            />
          </div>
          <p className="mt-3 text-xs tracking-[0.15em] text-ink/45">
            {pourcentage}% DE L&apos;OBJECTIF ATTEINT
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl">Contributions récentes</h2>
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {contributions.map((c) => (
              <li key={c.nom} className="flex items-center justify-between py-4 text-sm">
                <span>{c.nom}</span>
                <span className="text-ink/70">{c.montant}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
