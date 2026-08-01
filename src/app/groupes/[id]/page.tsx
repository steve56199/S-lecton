import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app/AppHeader";
import { InvitationPanel } from "./InvitationPanel";

export const metadata: Metadata = {
  title: "Groupe — Synergia",
};

type Membre = {
  user_id: string;
  role: "admin" | "membre";
  profiles: { prenom: string; nom: string } | { prenom: string; nom: string }[] | null;
};

function nomMembre(membre: Membre) {
  const profil = Array.isArray(membre.profiles) ? membre.profiles[0] : membre.profiles;
  return profil ? `${profil.prenom} ${profil.nom}` : "Membre";
}

export default async function GroupePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/connexion?suite=/groupes/${id}`);
  }

  const { data: groupe } = await supabase
    .from("groups")
    .select("id, nom, description, confidentiel")
    .eq("id", id)
    .maybeSingle();

  if (!groupe) {
    notFound();
  }

  const { data: membres } = await supabase
    .from("group_members")
    .select("user_id, role, profiles(prenom, nom)")
    .eq("group_id", id)
    .order("joined_at", { ascending: true })
    .returns<Membre[]>();

  const tousLesMembres = membres ?? [];
  const monAppartenance = tousLesMembres.find((m) => m.user_id === user.id);
  const estAdmin = monAppartenance?.role === "admin";
  const masquerLesAutres = groupe.confidentiel && !estAdmin;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-0">
        <p className="text-xs tracking-[0.3em] text-gold">
          {estAdmin ? "GROUPE — ADMINISTRATEUR" : "GROUPE"}
        </p>
        <h1 className="mt-4 font-display text-3xl">{groupe.nom}</h1>
        {groupe.description && (
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            {groupe.description}
          </p>
        )}

        <div className="mt-10 border-t border-line pt-10">
          <h2 className="font-display text-xl">
            Membres ({tousLesMembres.length})
          </h2>

          {masquerLesAutres ? (
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              L&apos;administrateur a choisi de garder ce groupe
              confidentiel : seule votre propre participation vous est
              montrée.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-line border-t border-line">
              {tousLesMembres.map((membre) => (
                <li
                  key={membre.user_id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span>
                    {nomMembre(membre)}
                    {membre.user_id === user.id ? " (vous)" : ""}
                  </span>
                  <span className="text-xs tracking-[0.15em] text-ink/45">
                    {membre.role === "admin" ? "ADMINISTRATEUR" : "MEMBRE"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {estAdmin && (
          <div className="mt-10 border-t border-line pt-10">
            <InvitationPanel groupId={groupe.id} />
          </div>
        )}
      </main>
    </div>
  );
}
