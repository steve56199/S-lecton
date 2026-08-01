import type { Metadata } from "next";
import Link from "next/link";
import { ConnexionForm } from "./ConnexionForm";

export const metadata: Metadata = {
  title: "Connexion — Synergia",
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ suite?: string }>;
}) {
  const { suite = "" } = await searchParams;

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
        <p className="text-xs tracking-[0.3em] text-gold">ACCÈS AU COMPTE</p>
        <h1 className="mt-4 font-display text-3xl">Connexion à Synergia</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Indiquez votre adresse email. Un lien sécurisé vous permettra de
          vous connecter, ou de créer votre compte si c&apos;est votre
          première visite.
        </p>

        <div className="mt-10">
          <ConnexionForm suite={suite} />
        </div>
      </main>
    </div>
  );
}
