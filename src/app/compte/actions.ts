"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type EtatProfil =
  | { erreur: string; succes?: undefined }
  | { succes: true; erreur?: undefined }
  | undefined;

export async function enregistrerProfil(
  _etat: EtatProfil,
  formData: FormData,
): Promise<EtatProfil> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { erreur: "Votre session a expiré. Reconnectez-vous." };
  }

  const prenom = String(formData.get("prenom") ?? "").trim();
  const nom = String(formData.get("nom") ?? "").trim();
  const dateNaissance = String(formData.get("date_naissance") ?? "").trim();
  const telephone = String(formData.get("telephone") ?? "").trim();

  if (!prenom || !nom) {
    return { erreur: "Le prénom et le nom sont obligatoires." };
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    prenom,
    nom,
    date_naissance: dateNaissance || null,
    telephone: telephone || null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { erreur: "Impossible d'enregistrer le profil pour le moment." };
  }

  revalidatePath("/compte");
  return { succes: true };
}
