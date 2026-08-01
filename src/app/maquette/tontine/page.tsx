import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Tontine — Maquette Synergia",
};

const membres = [
  { nom: "Aïcha Ndongo", statut: "payé", gagnant: false },
  { nom: "Marc Bello", statut: "payé", gagnant: true },
  { nom: "Thomas Eyenga", statut: "payé", gagnant: false },
  { nom: "Antoine Fouda", statut: "en attente", gagnant: false },
  { nom: "Sarah Owona", statut: "en retard", gagnant: false },
];

export default function TontineMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/tontine" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">TONTINE DES AMIS</p>
        <h1 className="mt-4 font-display text-3xl">Configuration et cycle</h1>

        <section className="mt-14">
          <p className="text-xs tracking-[0.15em] text-ink/45">
            VUE ADMINISTRATEUR — À LA CRÉATION
          </p>
          <h2 className="mt-3 font-display text-xl">Paramètres de la tontine</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 border border-line p-6 sm:grid-cols-2">
            <div>
              <label className="text-xs tracking-[0.15em] text-ink/45">FRÉQUENCE</label>
              <select
                disabled
                defaultValue="mensuelle"
                className="mt-2 w-full border border-line bg-ivory px-3 py-2.5 text-sm"
              >
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="bi-hebdomadaire">Bi-hebdomadaire</option>
                <option value="mensuelle">Mensuelle</option>
                <option value="trimestrielle">Trimestrielle</option>
              </select>
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] text-ink/45">MONTANT PAR MEMBRE</label>
              <input
                disabled
                defaultValue="25 000 XAF"
                className="mt-2 w-full border border-line bg-ivory px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] text-ink/45">NOMBRE DE MEMBRES / TOURS</label>
              <input
                disabled
                defaultValue="10 membres, 10 tours"
                className="mt-2 w-full border border-line bg-ivory px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] text-ink/45">LIBÉRATION DU POT</label>
              <input
                disabled
                defaultValue="Chaque vendredi, 17h00"
                className="mt-2 w-full border border-line bg-ivory px-3 py-2.5 text-sm"
              />
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink/45">
            Champs désactivés dans cette maquette — ils deviendront un vrai
            formulaire lors du branchement au Module 4.
          </p>
        </section>

        <section className="mt-14">
          <p className="text-xs tracking-[0.15em] text-ink/45">VUE MEMBRE — CYCLE EN COURS</p>
          <h2 className="mt-3 font-display text-xl">Tour 4 sur 10</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            Tirage au sort effectué le 8 août 2026 à 17h00. Pot de 250 000 XAF
            libéré à Marc Bello.
          </p>

          <ul className="mt-6 divide-y divide-line border-t border-line">
            {membres.map((m) => (
              <li key={m.nom} className="flex items-center justify-between py-4 text-sm">
                <span>
                  {m.nom}
                  {m.gagnant ? " — gagnant de ce tour" : ""}
                </span>
                <span
                  className={
                    "text-xs tracking-[0.15em] " +
                    (m.statut === "en retard"
                      ? "text-red-800"
                      : m.statut === "en attente"
                        ? "text-ink/45"
                        : "text-emerald")
                  }
                >
                  {m.statut.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-ink/45">
            Le prochain tirage au sort aura lieu le 5 septembre 2026 à 17h00,
            une fois les cotisations du tour clôturées.
          </p>
        </section>
      </main>
    </div>
  );
}
