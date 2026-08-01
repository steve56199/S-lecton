"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type EtatInvitation = { erreur: string } | { lien: string } | undefined;

export async function genererInvitation(
  groupId: string,
): Promise<EtatInvitation> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { erreur: "Votre session a expiré. Reconnectez-vous." };
  }

  const { data: invitation, error } = await supabase
    .from("group_invites")
    .insert({ group_id: groupId, created_by: user.id })
    .select("token")
    .single();

  if (error || !invitation) {
    return {
      erreur:
        "Impossible de créer une invitation. Seul un administrateur du groupe le peut.",
    };
  }

  revalidatePath(`/groupes/${groupId}`);
  return { lien: `/groupes/rejoindre/${invitation.token}` };
}
