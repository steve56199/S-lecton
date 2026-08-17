# Guide : remplir un sujet (Prüfung 002–101)

Ce dossier contient **101 fichiers d'examen** : `pruefung-001.json` (contenu réel,
déjà publié) et 100 gabarits `pruefung-002.json` → `pruefung-101.json` (statut
`"draft"`, structure correcte, contenu à remplir).

Chaque gabarit a déjà :
- la bonne structure (4 sections, 9 parties, 70 questions)
- le bon barème (75 / 30 / 75 / 45 = **225 points**, déjà vérifié par le générateur)
- un **thème suggéré** (`suggestedTheme`) pour vous orienter
- des **sources d'écoute suggérées** (`sourceHints`) par partie de Hörverstehen
  (voir aussi `HOEREN-QUELLEN.md` à la racine du projet)

Vous n'avez donc **que le contenu à écrire** — pas de schéma à réinventer.

## Workflow pour insérer un sujet

1. Ouvrez `data/exams/pruefung-0XX.json`
2. Remplacez chaque `"[ZU ERSTELLEN] ..."` par le vrai contenu (voir schéma ci-dessous)
3. Vérifiez que le JSON reste valide (pas de virgule en trop, guillemets fermés)
4. Une fois complet, changez `"status": "draft"` → `"status": "published"`
5. Rechargez `index.html` — le sujet apparaît **automatiquement** dans la
   bibliothèque, sans toucher au code

Rien d'autre à modifier : `manifest.json` liste déjà les 101 ids, `index.html`
et `exam-simulator.html` chargent chaque fichier individuellement.

## Où écrire quoi (référence schéma)

### Leseverstehen (75 pts — ne pas changer les `points`)

| Partie | Contenu à écrire |
|---|---|
| `lesen-1` | `referenceList` : 8 titres (A–H). Chaque question : un texte de 40–60 mots (`text`), `correctAnswer` = la lettre du bon titre. 3 titres ne doivent correspondre à aucun texte (distracteurs). |
| `lesen-2` | `sharedPassage.paragraphs` : un article cohérent de ~480 mots (5 paragraphes). 10 questions à choix multiple (3 options), `correctAnswer` = index "0"/"1"/"2". |
| `lesen-3` | `referenceList` : 10 annonces (a–j) + `"X"` = "trifft nicht zu". 10 situations, `correctAnswer` = la lettre de l'annonce correspondante (une situation doit rester sans correspondance → `"X"`). |

### Sprachbausteine (30 pts, 1,5 pt/question)

| Partie | Contenu à écrire |
|---|---|
| `sprachbausteine-1` | `sharedPassage.html` : texte de ~150–200 mots avec 10 lacunes numérotées `(1)`…`(10)`. Chaque question : 3 options grammaticales, `correctAnswer` = index. |
| `sprachbausteine-2` | `wordBank` : 15 mots (10 corrects + 5 distracteurs). `sharedPassage.html` : même principe. Chaque question : `correctAnswer` = le mot exact de la liste. |

### Hörverstehen (75 pts)

Pas encore de vrais fichiers audio hébergés — le simulateur affiche les
**transcriptions** comme support d'entraînement (`audioNote` l'indique déjà
à l'utilisateur). Voir `HOEREN-QUELLEN.md` pour trouver du contenu B2
authentique servant de base à vos transcriptions.

| Partie | Contenu à écrire |
|---|---|
| `hoeren-1` | 5 questions, chacune avec son propre `transcript` court (40–60 mots : annonce, répondeur, mini-dialogue) + 1 question à 3 options. |
| `hoeren-2` | `sharedPassage.paragraphs` : interview complète (8 tours de parole environ). 10 questions à 3 options. |
| `hoeren-3` | `sharedPassage.paragraphs` : 5 courtes déclarations de locuteurs différents. 10 affirmations Richtig/Falsch à vérifier contre les déclarations. |

### Schriftlicher Ausdruck (45 pts)

Deux sujets au choix (`topics[0]` et `topics[1]`), chacun avec un `prompt`
(consigne) et une `sampleAnswer` complète (corrigé modèle, 150–200 mots) —
c'est ce corrigé qui s'affiche à l'utilisateur après l'examen pour
autoévaluation.

## Champ `explanation`

Chaque question objective a un champ `explanation` (le "Pourquoi ?" affiché
dans les résultats en cas d'erreur). Toujours le remplir : c'est ce qui
transforme le simulateur en véritable outil pédagogique, pas seulement un
correcteur automatique.

## Contrainte de points — ne pas casser le barème

Ne modifiez **jamais** les valeurs `points`, `maxPoints` ou `totalPoints` :
elles sont déjà calculées pour totaliser 225. Si vous ajoutez ou retirez une
question, le total ne collera plus — dans ce cas, gardez le même nombre de
questions que le gabarit d'origine.

## Régénérer les gabarits

Si vous voulez repartir de zéro (par ex. changer les 30 thèmes suggérés),
le script est reproductible :

```bash
python3 scripts/generate_subject_templates.py
```

⚠️ Cela écrase `pruefung-002.json` → `pruefung-101.json` (pas `pruefung-001.json`,
qui n'est pas touché par le script). Sauvegardez vos fichiers déjà remplis
avant de relancer le script.
