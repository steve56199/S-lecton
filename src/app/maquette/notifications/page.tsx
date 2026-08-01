import type { Metadata } from "next";
import { MaquetteHeader } from "@/components/maquette/MaquetteHeader";

export const metadata: Metadata = {
  title: "Notifications — Maquette Synergia",
};

const notifications = [
  {
    date: "Aujourd'hui, 9h12",
    titre: "Paiement dû dans 3 jours",
    texte: "Votre cotisation de 25 000 XAF pour Tontine des amis est due le 12 août 2026.",
  },
  {
    date: "Hier, 17h03",
    titre: "Pot libéré",
    texte: "Le pot de 250 000 XAF a été versé à Marc Bello pour le tour 4 de Tontine des amis.",
  },
  {
    date: "Hier, 17h00",
    titre: "Résultat du tirage au sort",
    texte: "Marc Bello a été désigné bénéficiaire du tour 4.",
  },
  {
    date: "3 août 2026",
    titre: "Pénalité appliquée",
    texte: "Un frais de retard de 2 500 XAF a été ajouté au solde de Sarah Owona.",
  },
  {
    date: "1 août 2026",
    titre: "Nouveau membre",
    texte: "Antoine Fouda a rejoint le groupe Tontine des amis.",
  },
];

export default function NotificationsMaquette() {
  return (
    <div className="flex flex-1 flex-col">
      <MaquetteHeader actif="/maquette/notifications" />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">NOTIFICATIONS</p>
        <h1 className="mt-4 font-display text-3xl">Vos notifications</h1>

        <ul className="mt-10 divide-y divide-line border-t border-line">
          {notifications.map((n, i) => (
            <li key={i} className="py-6">
              <p className="text-xs tracking-[0.15em] text-ink/45">
                {n.date.toUpperCase()}
              </p>
              <p className="mt-2 font-display text-lg">{n.titre}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {n.texte}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
