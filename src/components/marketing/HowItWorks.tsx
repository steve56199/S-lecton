const steps = [
  {
    number: "01",
    title: "Création du groupe",
    text: "L'administrateur crée le groupe, en devient le premier membre et configure la fréquence, le montant et la durée de la tontine.",
  },
  {
    number: "02",
    title: "Adhésion des membres",
    text: "Chaque membre rejoint le groupe et accepte les règles fixées par l'administrateur avant le premier tour.",
  },
  {
    number: "03",
    title: "Cotisation et tirage",
    text: "À chaque tour, les membres cotisent via Mobile Money, puis un tirage au sort désigne le bénéficiaire du pot.",
  },
  {
    number: "04",
    title: "Remise du pot",
    text: "Le pot est libéré automatiquement à la date et à l'heure annoncées, et le bénéficiaire en est notifié aussitôt.",
  },
];

export function HowItWorks() {
  return (
    <section id="cycle" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">LE CYCLE D&apos;UNE TONTINE</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-balance sm:text-4xl">
          Un déroulement annoncé à l&apos;avance, sans surprise.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="border-l border-line pl-6">
              <span className="font-display text-sm text-gold">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-lg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
