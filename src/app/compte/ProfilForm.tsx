"use client";

import { useActionState } from "react";
import { enregistrerProfil, type EtatProfil } from "./actions";

type Profil = {
  prenom: string;
  nom: string;
  date_naissance: string | null;
  telephone: string | null;
  telephone_verifie: boolean;
};

export function ProfilForm({ profil }: { profil: Profil | null }) {
  const [etat, action, enCours] = useActionState<EtatProfil, FormData>(
    enregistrerProfil,
    undefined,
  );

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="prenom" className="text-sm text-ink/70">
            Prénom
          </label>
          <input
            id="prenom"
            name="prenom"
            required
            defaultValue={profil?.prenom ?? ""}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="nom" className="text-sm text-ink/70">
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            required
            defaultValue={profil?.nom ?? ""}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="date_naissance" className="text-sm text-ink/70">
            Date de naissance
          </label>
          <input
            id="date_naissance"
            name="date_naissance"
            type="date"
            defaultValue={profil?.date_naissance ?? ""}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="telephone" className="text-sm text-ink/70">
            Numéro de téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="+237 6 00 00 00 00"
            defaultValue={profil?.telephone ?? ""}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <p className="mt-2 text-xs text-ink/45">
            {profil?.telephone_verifie
              ? "Numéro vérifié."
              : "La vérification par SMS sera activée prochainement."}
          </p>
        </div>
      </div>

      {etat?.erreur && <p className="text-sm text-red-800">{etat.erreur}</p>}
      {etat?.succes && (
        <p className="text-sm text-emerald">Profil enregistré.</p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="border border-ink bg-ink px-6 py-3 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
      >
        {enCours ? "Enregistrement" : "Enregistrer le profil"}
      </button>
    </form>
  );
}
