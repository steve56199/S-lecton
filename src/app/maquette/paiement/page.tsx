import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Paiement — Maquette Synergia",
};

const operateurs = ["MTN Money", "Orange Money", "Airtel Money"];

export default function PaiementMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/paiement" />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">COTISATION</p>
        <h1 className="mt-4 font-display text-3xl">Tontine des amis</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Tour 4 sur 10 — échéance le 12 août 2026.
        </p>

        <div className="mt-10 border border-line p-6">
          <p className="text-xs tracking-[0.15em] text-ink/45">MONTANT DÛ</p>
          <p className="mt-2 font-display text-3xl">25 000 XAF</p>
        </div>

        <div className="mt-8">
          <p className="text-sm text-ink/70">Opérateur Mobile Money</p>
          <div className="mt-3 space-y-3">
            {operateurs.map((operateur, index) => (
              <label
                key={operateur}
                className="flex items-center gap-3 border border-line px-4 py-3 text-sm has-[:checked]:border-gold"
              >
                <input
                  type="radio"
                  name="operateur"
                  defaultChecked={index === 0}
                  className="border-line accent-gold"
                />
                {operateur}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="numero" className="text-sm text-ink/70">
            Numéro Mobile Money
          </label>
          <input
            id="numero"
            type="tel"
            placeholder="+237 6 00 00 00 00"
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>

        <button className="mt-10 border border-ink bg-ink px-6 py-3 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85">
          Confirmer la cotisation de 25 000 XAF
        </button>

        <p className="mt-6 text-xs leading-relaxed text-ink/45">
          Une confirmation vous sera envoyée dès réception du paiement.
          Les fonds transitent par le compte séquestre de Synergia jusqu&apos;à
          la libération du pot.
        </p>
      </main>
    </div>
  );
}
