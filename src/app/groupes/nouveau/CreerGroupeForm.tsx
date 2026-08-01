"use client";

import { useActionState } from "react";
import { creerGroupe, type EtatCreationGroupe } from "../actions";

export function CreerGroupeForm() {
  const [etat, action, enCours] = useActionState<
    EtatCreationGroupe,
    FormData
  >(creerGroupe, undefined);

  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="nom" className="text-sm text-ink/70">
          Nom du groupe
        </label>
        <input
          id="nom"
          name="nom"
          required
          placeholder="Tontine des amis, Projet Maison..."
          className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm text-ink/70">
          Description (optionnelle)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink/70">
        <input
          type="checkbox"
          name="confidentiel"
          className="mt-1 border-line accent-gold"
        />
        <span>
          Masquer l&apos;identité et les montants des membres entre eux.
          Vous, en tant qu&apos;administrateur, conservez toujours une vue
          complète.
        </span>
      </label>

      {etat?.erreur && <p className="text-sm text-red-800">{etat.erreur}</p>}

      <button
        type="submit"
        disabled={enCours}
        className="border border-ink bg-ink px-6 py-3 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
      >
        {enCours ? "Création en cours" : "Créer le groupe"}
      </button>
    </form>
  );
}
