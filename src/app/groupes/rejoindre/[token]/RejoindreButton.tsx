"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { rejoindreGroupe } from "./actions";

export function RejoindreButton({ token }: { token: string }) {
  const router = useRouter();
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function onClick() {
    setEnCours(true);
    setErreur("");

    const resultat = await rejoindreGroupe(token);

    if (resultat && "erreur" in resultat) {
      setErreur(resultat.erreur);
      setEnCours(false);
      return;
    }

    if (resultat && "groupId" in resultat) {
      router.push(`/groupes/${resultat.groupId}`);
    }
  }

  return (
    <div>
      <button
        onClick={onClick}
        disabled={enCours}
        className="border border-ink bg-ink px-6 py-3 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
      >
        {enCours ? "Adhésion en cours" : "Rejoindre ce groupe"}
      </button>
      {erreur && <p className="mt-3 text-sm text-red-800">{erreur}</p>}
    </div>
  );
}
