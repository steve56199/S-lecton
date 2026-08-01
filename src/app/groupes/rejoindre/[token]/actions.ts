"use server";

import { createClient } from "@/lib/supabase/server";

export type EtatAdhesion =
  | { erreur: string }
  | { groupId: string }
  | undefined;

export async function rejoindreGroupe(token: string): Promise<EtatAdhesion> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { erreur: "Connectez-vous pour rejoindre ce groupe." };
  }

  const { data: groupId, error } = await supabase.rpc(
    "join_group_via_invite",
    { p_token: token },
  );

  if (error || !groupId) {
    if (error?.message?.includes("invitation_invalide")) {
      return { erreur: "Ce lien d'invitation n'est plus valable." };
    }
    return {
      erreur:
        "Impossible de rejoindre ce groupe. Complétez d'abord votre profil dans Mon compte.",
    };
  }

  return { groupId };
}
