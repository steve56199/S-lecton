# Sources pour le Hörverstehen (compréhension orale)

## Pourquoi ce document ?

Le simulateur n'héberge pas encore de vrais fichiers audio — chaque question
de Hörverstehen affiche une **transcription texte** comme support d'entraînement
(c'est indiqué à l'utilisateur via `audioNote`). Pour écrire des transcriptions
réalistes de niveau B2, il vaut mieux s'appuyer sur du vrai contenu allemand
authentique plutôt que d'inventer à vide.

**Important — droits d'auteur** : ne copiez jamais un texte protégé mot pour
mot dans un fichier d'examen. Ces sources servent de **modèle de niveau, de
rythme, de vocabulaire et de thématique** pour écrire votre propre
transcription originale — comme cela a été fait pour `pruefung-001.json`
(aucun contenu telc réel n'y est reproduit). Si vous voulez un jour de vrais
fichiers audio, les options légitimes sont : enregistrer vos propres
transcriptions (voix humaine ou synthèse vocale sous licence), ou obtenir une
licence commerciale pour du contenu existant.

---

## 1. Sources officielles d'examen (le niveau de référence)

### telc — sujets modèles gratuits
Vrais modèles d'examen telc B2 (PDF + audio MP3), publiés par telc eux-mêmes
ou par des écoles de langues partenaires. C'est la référence la plus proche
du format réel — utile pour calibrer le niveau et le style des questions,
mais **ne redistribuez pas leur audio/texte tel quel** dans ce projet.

- [telc Deutsch B2 – Übungstest MP3 (boutique officielle telc)](https://shop.telc.net/de_DE/telc-deutsch-b2-ubungstest-version-1-mp3-audio-datei.html)
- [Modelltest telc B2 – PDF avec solutions (DeutschAkademie)](https://www.deutschakademie.de/deutsch-zertifikate/telc/b2-pruefung-modelltest/)
- [telc B2 Modelltest + audio (Sprachenatelier Berlin)](https://www.sprachenatelier-berlin.de/en/article/3601.telc-deutsch-b2-exam.html)

### Goethe-Institut — matériel B2 officiel et gratuit
Le Goethe-Zertifikat B2 n'est pas telc, mais vise le même niveau CECR B2 —
excellent pour caler la difficulté du Hörverstehen.

- [Übungsmaterialien Goethe-Zertifikat B2 (page officielle)](https://www.goethe.de/ins/de/de/prf/prf/gzb2/ue9.html)
- [Exercice de Hörverstehen B2 interactif en ligne](https://bfu.goethe.de/b2_mod_2MX6/hoeren.php)

---

## 2. Contenu authentique à vitesse native (pour Hörverstehen Teil 2 et 3)

Utile pour des interviews/reportages réalistes (`hoeren-2`) ou des micro-trottoirs
à plusieurs locuteurs (`hoeren-3`).

- [Easy German (YouTube)](https://www.youtube.com/c/EasyGerman/videos) — interviews de rue avec sous-titres allemand/anglais, transcriptions disponibles pour les membres. Idéal pour `hoeren-3` (plusieurs avis courts sur un sujet).
- [easygerman.org](https://www.easygerman.org/) — site officiel, accès aux transcriptions.
- [Deutschlandfunk / ARD Sounds](https://en.wikipedia.org/wiki/ARD_Sounds) — reportages et interviews de fond, niveau natif (bon repère pour `hoeren-2`, à simplifier ensuite au niveau B2).

## 3. Contenu ralenti / calibré pour apprenants (pour Hörverstehen Teil 1)

Utile pour des dialogues courts et annonces (`hoeren-1`).

- [DW Deutsch lernen — "Langsam gesprochene Nachrichten"](https://podcasts.apple.com/us/podcast/langsam-gesprochene-nachrichten-audios-dw-deutsch-lernen/id282930329) — actualités du jour, prononciation lente et claire, transcription complète disponible.
- [DW Deutsch lernen — "Top-Thema mit Vokabeln"](https://podcasts.apple.com/us/podcast/top-thema-mit-vokabeln-audios-dw-deutsch-lernen/id282932005) — deux reportages courts par semaine avec vocabulaire expliqué, bon niveau B2.
- [Slow German (Annik Rubens)](https://slowgerman.com/) — podcast créé spécifiquement pour apprenants B1/B2, transcriptions complètes fournies.

---

## 4. Quelle source pour quelle partie ?

| Partie de l'examen | Ce qu'il faut | Source recommandée |
|---|---|---|
| **Hören Teil 1** (5 dialogues/annonces courts) | Phrases courtes, situations du quotidien | Slow German, ou Easy German (extraits courts) |
| **Hören Teil 2** (1 interview longue, 10 questions) | Discours suivi, vocabulaire varié | DW "Top-Thema mit Vokabeln", Deutschlandfunk/ARD Sounds |
| **Hören Teil 3** (5 locuteurs, Richtig/Falsch) | Plusieurs avis courts et contrastés | Easy German (micro-trottoirs "Was denken die Deutschen über…") |

Cette correspondance est déjà indiquée automatiquement dans chaque fichier
`data/exams/pruefung-0XX.json` sous la clé `sourceHints`, partie par partie.

---

## Rappel méthodologique

1. Écoutez/lisez la source pour vous imprégner du niveau et du thème.
2. Écrivez votre **propre** transcription originale, inspirée du sujet et du
   registre, jamais recopiée.
3. Adaptez la longueur au format telc B2 (voir `TEMPLATE-GUIDE.md`).
4. Rédigez les questions à partir de VOTRE transcription, pas de la source.
