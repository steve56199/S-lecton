"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function ConnexionForm({ suite }: { suite: string }) {
  const [email, setEmail] = useState("");
  const [statut, setStatut] = useState<"repos" | "envoi" | "envoye" | "erreur">(
    "repos",
  );
  const [erreur, setErreur] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatut("envoi");
    setErreur("");

    const supabase = createClient();
    const redirectTo = new URL("/auth/callback", window.location.origin);
    if (suite) {
      redirectTo.searchParams.set("suite", suite);
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo.toString() },
    });

    if (error) {
      setErreur(
        "Impossible d'envoyer le lien de connexion pour le moment. Réessayez dans un instant.",
      );
      setStatut("erreur");
      return;
    }

    setStatut("envoye");
  }

  if (statut === "envoye") {
    return (
      <div className="border border-line bg-ivory-soft p-8">
        <h2 className="font-display text-xl">Vérifiez votre boîte mail</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          Un lien de connexion vient d&apos;être envoyé à {email}. Ouvrez-le
          depuis cet appareil pour accéder à votre compte.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="text-sm text-ink/70">
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm text-ink outline-none focus:border-gold"
          placeholder="vous@exemple.com"
        />
      </div>

      {erreur && <p className="text-sm text-red-800">{erreur}</p>}

      <button
        type="submit"
        disabled={statut === "envoi"}
        className="w-full border border-ink bg-ink px-6 py-3 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
      >
        {statut === "envoi" ? "Envoi en cours" : "Recevoir le lien de connexion"}
      </button>

      <p className="text-xs leading-relaxed text-ink/45">
        Aucun mot de passe à retenir. Vous recevrez un lien à usage unique,
        valable une heure, pour accéder à votre compte.
      </p>
    </form>
  );
}
