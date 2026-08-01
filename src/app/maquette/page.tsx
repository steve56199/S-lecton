import type { Metadata } from "next";
import Link from "next/link";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Maquette — Synergia",
};

const ecrans = [
  {
    numero: "01",
    titre: "Tableau de bord",
    description:
      "Ce que voit un membre en arrivant : ses tontines actives, ses prochains paiements, son historique et son épargne totale.",
    href: "/maquette/tableau-de-bord",
  },
  {
    numero: "02",
    titre: "Tontine",
    description:
      "Configuration d'une tontine par l'administrateur, puis vue du cycle en cours : tour actuel, tirage au sort, statut des paiements.",
    href: "/maquette/tontine",
  },
  {
    numero: "03",
    titre: "Épargne collective",
    description:
      "Suivi d'un objectif d'épargne de groupe pour un projet ou un événement, avec avancement et contributions.",
    href: "/maquette/epargne",
  },
  {
    numero: "04",
    titre: "Paiement",
    description:
      "Écran de cotisation par Mobile Money : choix de l'opérateur, montant, confirmation.",
    href: "/maquette/paiement",
  },
  {
    numero: "05",
    titre: "Administration du groupe",
    description:
      "Vue réservée à l'administrateur : transactions, taux de paiement à temps, défauts, export de l'historique.",
    href: "/maquette/administration",
  },
  {
    numero: "06",
    titre: "Plateforme",
    description:
      "Vue réservée à l'administrateur global : utilisateurs, groupes, volume traité, conformité et audit.",
    href: "/maquette/plateforme",
  },
  {
    numero: "07",
    titre: "Notifications",
    description:
      "Rappels de paiement, résultats de tirage au sort, confirmations de libération du pot.",
    href: "/maquette/notifications",
  },
];

export default function MaquettePage() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">MAQUETTE</p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl">
          Aperçu de l&apos;ensemble de la plateforme
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65">
          Ces écrans utilisent des données fictives, pour que vous puissiez
          juger l&apos;expérience complète avant qu&apos;on connecte quoi que
          ce soit de réel. Parcourez-les, puis dites-moi ce qu&apos;il faut
          garder, changer ou retirer.
        </p>

        <div className="mt-14 divide-y divide-line border-t border-line">
          {ecrans.map((ecran) => (
            <Link
              key={ecran.href}
              href={ecran.href}
              className="flex flex-col gap-2 py-8 transition-opacity hover:opacity-70 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-display text-sm text-gold">
                {ecran.numero}
              </span>
              <div>
                <h2 className="font-display text-xl">{ecran.titre}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/65">
                  {ecran.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
