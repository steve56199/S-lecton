import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app/AppHeader";
import { CreerGroupeForm } from "./CreerGroupeForm";

export const metadata: Metadata = {
  title: "Créer un groupe — Synergia",
};

export default async function NouveauGroupePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?suite=/groupes/nouveau");
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-xl flex-1 px-6 py-16 sm:px-0">
        <p className="text-xs tracking-[0.3em] text-gold">NOUVEAU GROUPE</p>
        <h1 className="mt-4 font-display text-3xl">Créer un groupe</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Vous en devenez l&apos;administrateur. Vous pourrez configurer la
          tontine et inviter des membres une fois le groupe créé.
        </p>

        <div className="mt-10 border-t border-line pt-10">
          <CreerGroupeForm />
        </div>
      </main>
    </div>
  );
}
