#!/usr/bin/env python3
"""
Generates 100 schema-correct, draft exam templates (Prüfung 002-101) into
data/exams/, plus the manifest that lists every exam file the app should load.

Each generated file already has the correct structure and point totals
(75 Lesen / 30 Sprachbausteine / 75 Hören / 45 Schreiben = 225) so that
filling one in is purely a content-authoring task, not a schema one.
Every question/passage/transcript field is a clearly marked "[ZU ERSTELLEN]"
placeholder — nothing here is fabricated exam content.

Run: python3 scripts/generate_subject_templates.py
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'data', 'exams')

# 30 realistic telc-B2-style themes, cycled across the 100 templates so
# consecutive Modelltests don't repeat the same topic back to back.
THEMES = [
    "Homeoffice und flexible Arbeitszeiten",
    "Nachhaltiger Konsum",
    "Digitalisierung des Alltags",
    "Stress und Erholung im Berufsleben",
    "Elektromobilität",
    "Ehrenamtliches Engagement",
    "Wohnungsmarkt in Großstädten",
    "Gesunde Ernährung",
    "Weiterbildung im Erwachsenenalter",
    "Klimawandel und Landwirtschaft",
    "Reisen und Massentourismus",
    "Soziale Medien und Jugendliche",
    "Vereinbarkeit von Familie und Beruf",
    "Fachkräftemangel",
    "Künstliche Intelligenz im Alltag",
    "Plastikvermeidung",
    "Generationenkonflikt am Arbeitsplatz",
    "Stadt vs. Land: Wohnen der Zukunft",
    "Fast Fashion und nachhaltige Mode",
    "Gesundheitssystem und Prävention",
    "Sprachenlernen im Erwachsenenalter",
    "Die Vier-Tage-Woche",
    "Freiwilligenarbeit im Ausland",
    "Online-Shopping vs. lokaler Handel",
    "Mediennutzung und Nachrichtenkompetenz",
    "Barrierefreiheit im öffentlichen Raum",
    "Erneuerbare Energien",
    "Work-Life-Balance",
    "Integration und Mehrsprachigkeit",
    "Zukunft der Mobilität in Städten",
]

# General, verified (see HOEREN-QUELLEN.md), free/legitimate sources for
# building each Hörverstehen part. Kept generic per Teil-type rather than
# per exact episode, since no specific episode was individually verified
# against each theme.
HOEREN_SOURCE_HINTS = {
    "hoeren-1": {
        "teil": "Teil 1 — kurze Durchsagen/Gespräche",
        "empfehlung": "Kurze Alltagsszenen: Easy German Straßeninterviews (Ausschnitte) oder Slow German-Episoden als Vorlage für Tempo/Wortschatz.",
        "quellen": ["Easy German (YouTube)", "Slow German (slowgerman.com)"]
    },
    "hoeren-2": {
        "teil": "Teil 2 — längeres Interview/Vortrag",
        "empfehlung": "DW 'Top-Thema mit Vokabeln' oder Deutschlandfunk-Feature zum gewählten Thema als inhaltliche Vorlage für ein Interview-Transkript.",
        "quellen": ["DW Deutsch lernen – Top-Thema mit Vokabeln (Podcast)", "Deutschlandfunk / ARD Sounds Feature-Beiträge"]
    },
    "hoeren-3": {
        "teil": "Teil 3 — mehrere Sprecher/Meinungen",
        "empfehlung": "Easy German Straßenumfragen ('Was denken die Deutschen über ...') eignen sich gut als Vorlage für mehrere kurze Sprecherstatements.",
        "quellen": ["Easy German Straßenumfragen (YouTube)", "DW 'Langsam gesprochene Nachrichten' für Tempo-Referenz"]
    }
}

REFERENCE_HEADLINES = ["A", "B", "C", "D", "E", "F", "G", "H"]
REFERENCE_ADS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "X"]


def todo(label):
    return f"[ZU ERSTELLEN] {label}"


def build_lesen_1():
    ref_list = [{"code": c, "text": todo(f"Überschrift {c}")} for c in REFERENCE_HEADLINES]
    questions = []
    for i in range(1, 6):
        qid = f"l1q{i}"
        questions.append({
            "id": qid, "type": "matching", "points": 3,
            "text": todo(f"Kurztext {i} (ca. 40-60 Wörter)"),
            "options": REFERENCE_HEADLINES,
            "correctAnswer": REFERENCE_HEADLINES[i - 1],
            "explanation": todo("Begründung, warum diese Überschrift passt")
        })
    return {
        "id": "lesen-1", "title": "Teil 1",
        "description": "Lesen Sie die fünf Kurztexte. Wählen Sie für jeden Text die passende Überschrift aus der Liste rechts. Es gibt mehr Überschriften als Texte.",
        "pointsPerQuestion": 3, "layout": "matching-reference",
        "referenceListTitle": "Überschriften A–H", "referenceList": ref_list,
        "questions": questions
    }


def build_lesen_2(theme):
    questions = []
    for i in range(1, 11):
        qid = f"l2q{i}"
        questions.append({
            "id": qid, "type": "multipleChoice", "points": 3,
            "text": todo(f"Verständnisfrage {i} zum Text"),
            "options": [todo("Option A"), todo("Option B"), todo("Option C")],
            "correctAnswer": "0",
            "explanation": todo("Textstelle, die die richtige Antwort belegt")
        })
    return {
        "id": "lesen-2", "title": "Teil 2",
        "description": "Lesen Sie den folgenden Artikel und beantworten Sie die zehn Fragen dazu.",
        "pointsPerQuestion": 3, "layout": "shared-passage",
        "sharedPassage": {
            "title": todo(f"Artikeltitel zum Thema: {theme}"),
            "paragraphs": [todo(f"Absatz {i} (~80-100 Wörter, ca. 480 Wörter insgesamt)") for i in range(1, 6)]
        },
        "questions": questions
    }


def build_lesen_3():
    ref_list = [{"code": c, "text": todo(f"Anzeige {c}")} for c in REFERENCE_ADS[:-1]]
    ref_list.append({"code": "X", "text": "Trifft nicht zu — keines der Angebote passt."})
    questions = []
    for i in range(1, 11):
        qid = f"l3q{i}"
        correct = REFERENCE_ADS[i - 1] if i <= 9 else "X"
        questions.append({
            "id": qid, "type": "matching", "points": 3,
            "text": todo(f"Situation {i}: Person sucht ..."),
            "options": REFERENCE_ADS,
            "correctAnswer": correct,
            "explanation": todo("Begründung der Zuordnung")
        })
    return {
        "id": "lesen-3", "title": "Teil 3",
        "description": "Zehn Personen suchen ein passendes Angebot. Ordnen Sie jeweils die passende Anzeige (a–j) zu, oder 'X — trifft nicht zu'.",
        "pointsPerQuestion": 3, "layout": "matching-reference",
        "referenceListTitle": "Anzeigen a–j", "referenceList": ref_list,
        "questions": questions
    }


def build_sprachbausteine_1(theme):
    gap_markers = " ".join(f"<b>({i})</b> ..." for i in range(1, 11))
    questions = []
    for i in range(1, 11):
        qid = f"sb1q{i}"
        questions.append({
            "id": qid, "type": "fillInTheBlank", "points": 1.5, "gapNumber": i,
            "text": f"Lücke ({i})",
            "options": [todo("a"), todo("b"), todo("c")],
            "correctAnswer": "0",
            "explanation": todo("Grammatikregel (Präposition/Konjunktion/Pronomen/Verbform)")
        })
    return {
        "id": "sprachbausteine-1", "title": "Teil 1",
        "description": "Lesen Sie den Text. Wählen Sie für jede Lücke (1-10) die richtige Lösung (a, b oder c).",
        "pointsPerQuestion": 1.5, "layout": "gap-text",
        "sharedPassage": {
            "title": todo(f"Lückentext zum Thema: {theme}"),
            "html": todo(f"Fließtext (~150-200 Wörter) mit 10 nummerierten Lücken. Platzhalter: {gap_markers}")
        },
        "questions": questions
    }


def build_sprachbausteine_2(theme):
    word_bank = [todo(f"Wort{i}") for i in range(1, 16)]
    questions = []
    for i in range(1, 11):
        qid = f"sb2q{i}"
        questions.append({
            "id": qid, "type": "wordBank", "points": 1.5, "gapNumber": i,
            "text": f"Lücke ({i})",
            "correctAnswer": word_bank[i - 1],
            "explanation": todo("Warum dieses Wort grammatisch/inhaltlich passt")
        })
    return {
        "id": "sprachbausteine-2", "title": "Teil 2",
        "description": "Lesen Sie den Text. Wählen Sie für jede Lücke (1-10) das passende Wort aus der 15-Wörter-Liste (5 sind Distraktoren).",
        "pointsPerQuestion": 1.5, "layout": "gap-text-wordbank",
        "wordBank": word_bank,
        "sharedPassage": {
            "title": todo(f"Lückentext zum Thema: {theme}"),
            "html": todo("Fließtext (~150-200 Wörter) mit 10 nummerierten Lücken.")
        },
        "questions": questions
    }


def build_hoeren_1():
    questions = []
    for i in range(1, 6):
        qid = f"h1q{i}"
        questions.append({
            "id": qid, "type": "multipleChoice", "points": 3,
            "transcript": todo("Kurzes Transkript (Durchsage/Anrufbeantworter/kurzer Dialog, 40-60 Wörter)"),
            "text": todo(f"Frage {i} zum Hörtext"),
            "options": [todo("Option A"), todo("Option B"), todo("Option C")],
            "correctAnswer": "0",
            "explanation": todo("Textstelle im Transkript, die die Antwort belegt")
        })
    return {
        "id": "hoeren-1", "title": "Teil 1",
        "description": "Sie hören fünf kurze Durchsagen bzw. Gesprächsausschnitte. Beantworten Sie zu jedem Hörtext eine Frage.",
        "pointsPerQuestion": 3, "layout": "audio-list",
        "audioNote": "🎧 Audio-Wiedergabe folgt in einer späteren Version. Aktuell als Lesetranskript zum Üben verfügbar.",
        "questions": questions
    }


def build_hoeren_2(theme):
    questions = []
    for i in range(1, 11):
        qid = f"h2q{i}"
        questions.append({
            "id": qid, "type": "multipleChoice", "points": 3,
            "text": todo(f"Frage {i} zum Interview"),
            "options": [todo("Option A"), todo("Option B"), todo("Option C")],
            "correctAnswer": "0",
            "explanation": todo("Textstelle im Transkript, die die Antwort belegt")
        })
    return {
        "id": "hoeren-2", "title": "Teil 2",
        "description": "Sie hören ein Interview. Beantworten Sie die zehn Fragen dazu.",
        "pointsPerQuestion": 3, "layout": "shared-passage",
        "audioNote": "🎧 Audio-Wiedergabe folgt in einer späteren Version. Aktuell als Lesetranskript zum Üben verfügbar.",
        "sharedPassage": {
            "title": todo(f"Interview-Transkript zum Thema: {theme}"),
            "paragraphs": [todo(f"Gesprächsbeitrag {i} (Moderator/Gast im Wechsel)") for i in range(1, 9)]
        },
        "questions": questions
    }


def build_hoeren_3(theme):
    questions = []
    for i in range(1, 11):
        qid = f"h3q{i}"
        questions.append({
            "id": qid, "type": "multipleChoice", "points": 3,
            "text": todo(f"Richtig/Falsch-Aussage {i} zu einem der Sprecher"),
            "options": ["Richtig", "Falsch"],
            "correctAnswer": "0",
            "explanation": todo("Zitat des Sprechers, das die Antwort belegt")
        })
    return {
        "id": "hoeren-3", "title": "Teil 3",
        "description": "Fünf Personen äußern sich zum Thema. Entscheiden Sie bei jeder Aussage: richtig oder falsch.",
        "pointsPerQuestion": 3, "layout": "shared-passage",
        "audioNote": "🎧 Audio-Wiedergabe folgt in einer späteren Version. Aktuell als Lesetranskript zum Üben verfügbar.",
        "sharedPassage": {
            "title": todo(f"Fünf Stimmen zum Thema: {theme}"),
            "paragraphs": [todo(f"Sprecher {i} (Name, Alter): Kurzes Statement") for i in range(1, 6)]
        },
        "questions": questions
    }


def build_schreiben(theme):
    return {
        "id": "schreiben-1", "title": "Aufgabe",
        "description": "Wählen Sie eines der beiden Themen und schreiben Sie einen zusammenhängenden Text (150-200 Wörter).",
        "questions": [{
            "id": "sq1", "type": "writing", "points": 45,
            "topics": [
                {
                    "id": "topic-a", "label": todo("Thema A — Titel"),
                    "prompt": todo(f"Schreibaufgabe A, thematisch passend zu: {theme}"),
                    "sampleAnswer": todo("Vollständige Musterlösung (150-200 Wörter)")
                },
                {
                    "id": "topic-b", "label": todo("Thema B — Titel"),
                    "prompt": todo("Schreibaufgabe B (alternative Textsorte, z.B. formelle E-Mail)"),
                    "sampleAnswer": todo("Vollständige Musterlösung (150-200 Wörter)")
                }
            ],
            "criteria": {
                "aufgabenbewältigung": {"description": "Werden alle geforderten Punkte behandelt?", "maxPoints": 15},
                "kommunikativeGestaltung": {"description": "Struktur, Kohärenz, Konnektoren", "maxPoints": 10},
                "korrektheit": {"description": "Grammatik, Syntax, Orthografie", "maxPoints": 10},
                "wortschatz": {"description": "Vielfalt und Angemessenheit des Wortschatzes", "maxPoints": 10}
            }
        }]
    }


def build_exam(number, theme):
    exam_id = f"pruefung-{number:03d}"
    return {
        "id": exam_id,
        "title": f"Modelltest B2 — Prüfung {number:03d}",
        "description": f"[ZU ERSTELLEN] Vollständiger telc-B2-Modelltest (Original-Übungsmaterial), Themenvorschlag: {theme}.",
        "duration": 9000,
        "totalPoints": 225,
        "status": "draft",
        "suggestedTheme": theme,
        "sourceHints": {
            "hinweis": "Allgemeine, kostenlose Quellen für authentisches B2-Hörmaterial. Details siehe HOEREN-QUELLEN.md im Projekt-Root. Kein Audio wird hier redistribuiert — nur Transkript-Vorlagen im telc-Format.",
            "hoeren-1": HOEREN_SOURCE_HINTS["hoeren-1"],
            "hoeren-2": HOEREN_SOURCE_HINTS["hoeren-2"],
            "hoeren-3": HOEREN_SOURCE_HINTS["hoeren-3"]
        },
        "sections": [
            {"id": "lesen", "name": "Leseverstehen", "maxPoints": 75, "order": 1,
             "parts": [build_lesen_1(), build_lesen_2(theme), build_lesen_3()]},
            {"id": "sprachbausteine", "name": "Sprachbausteine", "maxPoints": 30, "order": 2,
             "parts": [build_sprachbausteine_1(theme), build_sprachbausteine_2(theme)]},
            {"id": "hoeren", "name": "Hörverstehen", "maxPoints": 75, "order": 3,
             "parts": [build_hoeren_1(), build_hoeren_2(theme), build_hoeren_3(theme)]},
            {"id": "schreiben", "name": "Schriftlicher Ausdruck", "maxPoints": 45, "order": 4,
             "parts": [build_schreiben(theme)]},
        ]
    }


def verify_points(exam):
    total = 0
    for section in exam["sections"]:
        section_total = 0
        for part in section["parts"]:
            for q in part["questions"]:
                section_total += q["points"]
        assert section_total == section["maxPoints"], \
            f"{exam['id']} section {section['id']}: {section_total} != {section['maxPoints']}"
        total += section_total
    assert total == exam["totalPoints"], f"{exam['id']}: total {total} != {exam['totalPoints']}"


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest_ids = ["pruefung-001"]  # the real, published exam already in data/exams/

    for n in range(2, 102):  # pruefung-002 .. pruefung-101 => 100 templates
        theme = THEMES[(n - 2) % len(THEMES)]
        exam = build_exam(n, theme)
        verify_points(exam)
        exam_id = exam["id"]
        manifest_ids.append(exam_id)
        out_path = os.path.join(OUT_DIR, f"{exam_id}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(exam, f, ensure_ascii=False, indent=2)

    manifest = {"exams": manifest_ids}
    with open(os.path.join(OUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"Generated {len(manifest_ids) - 1} templates + manifest.json ({len(manifest_ids)} exams total).")


if __name__ == "__main__":
    main()
