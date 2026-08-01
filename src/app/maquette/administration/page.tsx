import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Administration — Maquette Synergia",
};

const transactions = [
  { date: "8 août 2026", membre: "Marc Bello", type: "Pot reçu", montant: "+250 000 XAF" },
  { date: "5 août 2026", membre: "Aïcha Ndongo", type: "Cotisation", montant: "-25 000 XAF" },
  { date: "5 août 2026", membre: "Thomas Eyenga", type: "Cotisation", montant: "-25 000 XAF" },
  { date: "3 août 2026", membre: "Sarah Owona", type: "Pénalité de retard", montant: "-2 500 XAF" },
];

const defauts = [
  { membre: "Sarah Owona", tour: "Tour 4", retard: "3 jours" },
];

export default function AdministrationMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/administration" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">
          ADMINISTRATION — TONTINE DES AMIS
        </p>
        <h1 className="mt-4 font-display text-3xl">Vue d&apos;ensemble du groupe</h1>

        <div className="mt-10 grid grid-cols-1 gap-6 border border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">COLLECTÉ AU TOTAL</p>
            <p className="mt-2 font-display text-2xl">1 000 000 XAF</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">PAIEMENTS À TEMPS</p>
            <p className="mt-2 font-display text-2xl">92%</p>
          </div>
          <div className="p-6">
            <p className="text-xs tracking-[0.15em] text-ink/45">MEMBRES ACTIFS</p>
            <p className="mt-2 font-display text-2xl">10</p>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Transactions récentes</h2>
            <button className="border border-line px-4 py-2 text-xs tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink">
              EXPORTER (CSV)
            </button>
          </div>
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {transactions.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-4 text-sm">
                <div>
                  <p className="text-ink/80">
                    {t.type} — {t.membre}
                  </p>
                  <p className="mt-1 text-xs text-ink/45">{t.date}</p>
                </div>
                <p className={t.montant.startsWith("+") ? "text-emerald" : "text-ink/70"}>
                  {t.montant}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl">Défauts de paiement</h2>
          {defauts.length === 0 ? (
            <p className="mt-4 text-sm text-ink/65">Aucun défaut de paiement en cours.</p>
          ) : (
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {defauts.map((d, i) => (
                <li key={i} className="flex items-center justify-between py-4 text-sm">
                  <span>
                    {d.membre} — {d.tour}
                  </span>
                  <span className="text-xs tracking-[0.15em] text-red-800">
                    RETARD DE {d.retard.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
