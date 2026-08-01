import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfilForm } from "./ProfilForm";
import { DeconnexionButton } from "./DeconnexionButton";

export const metadata: Metadata = {
  title: "Mon compte — Synergia",
};

export default async function ComptePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?suite=/compte");
  }

  const { data: profil } = await supabase
    .from("profiles")
    .select("prenom, nom, date_naissance, telephone, telephone_verifie")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <Link href="/" className="font-display text-lg tracking-[0.2em]">
            SYNERGIA
          </Link>
          <DeconnexionButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-0">
        <p className="text-xs tracking-[0.3em] text-gold">MON COMPTE</p>
        <h1 className="mt-4 font-display text-3xl">
          Bienvenue{profil?.prenom ? `, ${profil.prenom}` : ""}.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Connecté avec {user.email}. Complétez votre profil pour pouvoir
          rejoindre ou créer un groupe.
        </p>

        <div className="mt-10 border-t border-line pt-10">
          <ProfilForm profil={profil ?? null} />
        </div>
      </main>
    </div>
  );
}
