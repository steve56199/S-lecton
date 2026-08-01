"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type EtatCreationGroupe = { erreur: string } | undefined;

export async function creerGroupe(
  _etat: EtatCreationGroupe,
  formData: FormData,
): Promise<EtatCreationGroupe> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { erreur: "Votre session a expiré. Reconnectez-vous." };
  }

  const { data: profil } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profil) {
    return {
      erreur: "Complétez d'abord votre profil, dans Mon compte, avant de créer un groupe.",
    };
  }

  const nom = String(formData.get("nom") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const confidentiel = formData.get("confidentiel") === "on";

  if (!nom) {
    return { erreur: "Le nom du groupe est obligatoire." };
  }

  const { data: groupe, error } = await supabase
    .from("groups")
    .insert({ nom, description: description || null, confidentiel, created_by: user.id })
    .select("id")
    .single();

  if (error || !groupe) {
    return { erreur: "Impossible de créer le groupe pour le moment." };
  }

  const { error: erreurMembre } = await supabase.from("group_members").insert({
    group_id: groupe.id,
    user_id: user.id,
    role: "admin",
  });

  if (erreurMembre) {
    return { erreur: "Le groupe a été créé, mais l'ajout comme administrateur a échoué." };
  }

  redirect(`/groupes/${groupe.id}`);
}
