"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DeconnexionButton() {
  const router = useRouter();

  async function onClick() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={onClick}
      className="border border-line px-5 py-2 text-sm text-ink/70 transition-colors hover:border-ink hover:text-ink"
    >
      Se déconnecter
    </button>
  );
}
