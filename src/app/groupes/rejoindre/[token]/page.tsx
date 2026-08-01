import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { RejoindreButton } from "./RejoindreButton";

export const metadata: Metadata = {
  title: "Invitation — Synergia",
};

export default async function RejoindreGroupePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  const { data: apercu } = await supabase
    .rpc("apercu_invitation", { p_token: token })
    .returns<{ group_id: string; nom: string; description: string | null }[]>()
    .maybeSingle();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-5 sm:px-10">
          <Link href="/" className="font-display text-lg tracking-[0.2em]">
            SYNERGIA
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-24 sm:px-0">
        {!apercu ? (
          <>
            <p className="text-xs tracking-[0.3em] text-gold">INVITATION</p>
            <h1 className="mt-4 font-display text-3xl">
              Ce lien n&apos;est plus valable
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              L&apos;invitation a peut-être expiré ou a déjà été utilisée.
              Demandez un nouveau lien à l&apos;administrateur du groupe.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs tracking-[0.3em] text-gold">
              VOUS ÊTES INVITÉ
            </p>
            <h1 className="mt-4 font-display text-3xl">{apercu.nom}</h1>
            {apercu.description && (
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {apercu.description}
              </p>
            )}

            <div className="mt-10">
              {user ? (
                <RejoindreButton token={token} />
              ) : (
                <Link
                  href={`/connexion?suite=/groupes/rejoindre/${token}`}
                  className="inline-block border border-ink bg-ink px-6 py-3 text-sm tracking-wide text-ivory transition-colors hover:bg-ink/85"
                >
                  Se connecter pour rejoindre
                </Link>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
