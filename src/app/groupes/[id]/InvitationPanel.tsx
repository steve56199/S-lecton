"use client";

import { useState } from "react";
import { genererInvitation } from "./actions";

export function InvitationPanel({ groupId }: { groupId: string }) {
  const [lien, setLien] = useState<string | null>(null);
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [copie, setCopie] = useState(false);

  async function onClick() {
    setEnCours(true);
    setErreur("");
    setCopie(false);

    const resultat = await genererInvitation(groupId);

    if (resultat && "erreur" in resultat) {
      setErreur(resultat.erreur);
    } else if (resultat && "lien" in resultat) {
      setLien(`${window.location.origin}${resultat.lien}`);
    }

    setEnCours(false);
  }

  async function copier() {
    if (!lien) return;
    await navigator.clipboard.writeText(lien);
    setCopie(true);
  }

  return (
    <div className="border border-line bg-ivory-soft p-6">
      <h3 className="font-display text-lg">Inviter des membres</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">
        Générez un lien à partager vous-même (WhatsApp, email, SMS...). Il
        reste valable 30 jours.
      </p>

      {lien ? (
        <div className="mt-4 space-y-3">
          <div className="break-all border border-line bg-ivory px-4 py-3 text-sm text-ink/80">
            {lien}
          </div>
          <button
            onClick={copier}
            className="border border-ink px-5 py-2 text-sm tracking-wide text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            {copie ? "Copié" : "Copier le lien"}
          </button>
        </div>
      ) : (
        <button
          onClick={onClick}
          disabled={enCours}
          className="mt-4 border border-ink bg-ink px-5 py-2 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
        >
          {enCours ? "Génération" : "Générer un lien d'invitation"}
        </button>
      )}

      {erreur && <p className="mt-3 text-sm text-red-800">{erreur}</p>}
    </div>
  );
}
