import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app/AppHeader";

export const metadata: Metadata = {
  title: "Mes groupes — Synergia",
};

export default async function GroupesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?suite=/groupes");
  }

  const { data: appartenances } = await supabase
    .from("group_members")
    .select("role, groups(id, nom, description)")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: false });

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold">MES GROUPES</p>
            <h1 className="mt-4 font-display text-3xl">Vos groupes</h1>
          </div>
          <Link
            href="/groupes/nouveau"
            className="border border-ink px-5 py-2 text-sm tracking-wide text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            Créer un groupe
          </Link>
        </div>

        {!appartenances || appartenances.length === 0 ? (
          <div className="mt-12 border border-line bg-ivory-soft p-8">
            <p className="text-sm leading-relaxed text-ink/70">
              Vous ne faites partie d&apos;aucun groupe pour le moment.
              Créez-en un, ou rejoignez-en un grâce à un lien
              d&apos;invitation reçu d&apos;un administrateur.
            </p>
          </div>
        ) : (
          <ul className="mt-12 divide-y divide-line border-t border-line">
            {appartenances.map((appartenance) => {
              const groupe = Array.isArray(appartenance.groups)
                ? appartenance.groups[0]
                : appartenance.groups;
              if (!groupe) return null;

              return (
                <li key={groupe.id} className="py-6">
                  <Link
                    href={`/groupes/${groupe.id}`}
                    className="block hover:opacity-80"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-display text-xl">{groupe.nom}</h2>
                      <span className="text-xs tracking-[0.15em] text-ink/45">
                        {appartenance.role === "admin"
                          ? "ADMINISTRATEUR"
                          : "MEMBRE"}
                      </span>
                    </div>
                    {groupe.description && (
                      <p className="mt-2 text-sm text-ink/65">
                        {groupe.description}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
