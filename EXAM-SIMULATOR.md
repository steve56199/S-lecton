# telc B2 Exam Simulator - User & Developer Guide

## Quick Start

### For Users

1. **Open the simulator**
   ```
   exam-simulator.html
   ```

2. **Choose an exam**
   - Click "Modelltest B2 — Prüfung 001"

3. **Start the exam**
   - Click "Start"
   - Timer begins: 02:30:00

4. **Navigate freely**
   - Use section tabs to jump between parts
   - Answer questions in any order
   - Return and modify answers anytime

5. **Finish**
   - Click "Finish Exam" when ready
   - Or automatic lockdown at 00:00

6. **View results**
   - Total score: XXX / 225
   - Section breakdown
   - Error analysis

---

## For Developers

### File Structure

```
exam-simulator.html
├─ exam-simulator
│  ├─ ExamManager
│  ├─ UIRenderer
│  ├─ ExamTimer
│  ├─ ScoringEngine
│  └─ App

data/
└─ exams.json (exam questions and structure)
```

### Data Flow

```
Landing Page
    ↓
User selects exam
    ↓
ExamManager.startExam()
    │
    ├─ Creates session with expiresAt timestamp
    ├─ Saves to localStorage
    └─ Initializes answers object
    ↓
UIRenderer.renderExamInterface()
    │
    ├─ Renders section tabs
    ├─ Renders question list
    └─ Binds event listeners
    ↓
ExamTimer.start()
    │
    └─ Updates timer every 1 second
    
    ↓
User answers questions
    │
    ├─ recordAnswer(questionId, answer)
    ├─ Save to localStorage
    └─ Update UI
    ↓
At expiration (00:00)
    │
    ├─ ExamTimer.handleExpired()
    ├─ Lock exam interface
    └─ Show results
    ↓
Results Page
    │
    ├─ ScoringEngine.scoreExam()
    ├─ Calculate scores
    └─ Render breakdown
```

---

## Class Reference

### ExamManager

Manages exam session and answer tracking.

```javascript
class ExamManager {
  constructor()
  loadExams()                          // Load from data/exams.json
  startExam(examId)                    // Create new session
  generateSessionId()                  // UUID + timestamp
  saveSession()                        // Persist to localStorage
  getTimeRemaining()                   // Seconds until expiration
  isExamExpired()                      // Check if time's up
  recordAnswer(questionId, answer)     // Save user response
  getAnswer(questionId)                // Retrieve user response
}
```

**Key Property: Session**
```javascript
{
  id: "session_abc123_1692288000",
  examId: "pruefung-001",
  startedAt: "2024-08-17T10:00:00Z",
  expiresAt: "2024-08-17T12:30:00Z",  // ← ABSOLUTE TIME
  status: "active"
}
```

### UIRenderer

Renders exam interface and questions.

```javascript
class UIRenderer {
  constructor(examManager)
  formatTime(seconds)                  // Convert to HH:MM:SS
  renderLandingPage()                  // Show exam selection
  renderExamInterface()                // Show timer + sections
  selectSection(sectionId)             // Switch section
  renderSectionContent(section)        // Render questions
  renderQuestion(question)             // Render single Q
  
  // Question type renderers
  renderMatchingQuestion(q, answer)
  renderMultipleChoice(q, answer)
  renderFillInBlank(q, answer)
  renderWritingQuestion(q, answer)
}
```

### ExamTimer

Manages countdown timer with absolute time.

```javascript
class ExamTimer {
  constructor(examManager, renderer)
  start()                              // Begin timer loop
  update()                             // Update display (1/sec)
  handleExpired()                      // Lock exam at 00:00
  stop()                               // Clear interval
}
```

**Timer Logic**
```javascript
// Calculate remaining time
remaining = new Date(expiresAt) - new Date()

// Update display
display = formatTime(remaining / 1000)

// Critical state
if (remaining <= 300) {               // Last 5 minutes
  flash red
}

// Expired
if (remaining <= 0) {
  lock exam
  show results
}
```

### ScoringEngine

Automatically scores exam and generates results.

```javascript
class ScoringEngine {
  constructor(exam)
  scoreExam()                          // Score entire exam
  scoreQuestion(question, answer)      // Score single Q
  
  // Writing evaluation
  scoreWriting(question, text)
  evaluateGrammar(text)
  evaluateVocabulary(text)
  evaluateCoherence(text)
  evaluateTaskCompletion(text, prompt)
  findGrammarErrors(text)
}
```

**Scoring Output**
```javascript
{
  sessionId: "session_abc123",
  startedAt: "2024-08-17T10:00:00Z",
  completedAt: "2024-08-17T12:25:00Z",
  sections: {
    lesen: {
      name: "Leseverstehen",
      score: 61,
      maxPoints: 75,
      percentage: 81,
      details: [...]
    },
    ...
  },
  totalScore: 174,
  totalMaxPoints: 225,
  totalPercentage: 77
}
```

---

## Question Format

### Matching (Leseverstehen Teil 1)

**JSON**
```json
{
  "id": "q1",
  "type": "matching",
  "points": 3,
  "text": "Fleischloser Genuss: Ein Trend setzt sich durch",
  "passage": "Immer mehr Menschen entscheiden sich...",
  "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  "correctAnswer": "A"
}
```

**Rendered**
```
Fleischloser Genuss: Ein Trend setzt sich durch

"Immer mehr Menschen entscheiden sich..."

[Dropdown: Choose option...]
```

### Multiple Choice (Leseverstehen Teil 2)

**JSON**
```json
{
  "id": "q6",
  "type": "multipleChoice",
  "points": 3,
  "text": "Der Satz 'Die Künstliche Intelligenz...' bedeutet:",
  "options": [
    "KI hat kein Einfluss",
    "KI ist ein neuer Bereich",
    "KI ist nur theoretisch"
  ],
  "correctAnswer": 1
}
```

**Rendered**
```
Der Satz 'Die Künstliche...' bedeutet:

○ KI hat kein Einfluss
● KI ist ein neuer Bereich
○ KI ist nur theoretisch
```

### Fill in the Blank (Sprachbausteine)

**JSON**
```json
{
  "id": "q16",
  "type": "fillInTheBlank",
  "points": 2,
  "text": "Die Technologie _____ die Arbeitswelt verändert.",
  "options": ["hat", "haben", "hadde", "habe"],
  "correctAnswer": 0
}
```

**Rendered**
```
Die Technologie _____ die Arbeitswelt verändert.

[Dropdown: Choose option...]
```

### Writing (Schriftlicher Ausdruck)

**JSON**
```json
{
  "id": "q51",
  "type": "writing",
  "points": 45,
  "prompt": "Sie haben ein Produkt online gekauft. Das Produkt ist fehlerhaft angekommen. Schreiben Sie eine Email an den Kundendienst. (150-200 Wörter)",
  "criteria": {
    "aufgabenbewältigung": 15,
    "kommunikativeGestaltung": 10,
    "korrektheit": 10,
    "wortschatz": 10
  }
}
```

**Rendered**
```
Sie haben ein Produkt online gekauft...

[Textarea for writing response]
[Word count indicator]
```

---

## Adding New Questions

### Step 1: Edit data/exams.json

```json
{
  "id": "q52",
  "type": "multipleChoice",
  "points": 3,
  "text": "Your question text?",
  "options": ["A", "B", "C"],
  "correctAnswer": 0
}
```

### Step 2: Assign to section

Add to appropriate `part.questions[]` array:
- `lesen-1`, `lesen-2`, `lesen-3`
- `sprachbausteine-1`, `sprachbausteine-2`
- `hoeren-1`, `hoeren-2`, `hoeren-3`
- `schreiben-1`

### Step 3: Reload

```
exam-simulator.html → refresh
```

---

## Browser Storage

### localStorage Structure

```javascript
localStorage["exam_session_abc123"] = {
  session: {
    id: "session_abc123",
    examId: "pruefung-001",
    startedAt: "2024-08-17T10:00:00Z",
    expiresAt: "2024-08-17T12:30:00Z",
    status: "active"
  },
  answers: {
    "q1": { answer: "A", answeredAt: "2024-08-17T10:05:00Z" },
    "q2": { answer: "2", answeredAt: "2024-08-17T10:08:00Z" },
    "q51": { answer: "Sehr geehrte Damen...", answeredAt: "..." }
  }
}
```

### Data Persistence

- **Auto-save**: Every answer is saved immediately
- **Refresh-safe**: Session data persists across page refreshes
- **Device-specific**: Each device has its own localStorage
- **Clearable**: User can clear browser data to reset

---

## Scoring Details

### Objective Questions (Auto-Scored)

```
if (userAnswer === correctAnswer) {
  score = question.points
} else {
  score = 0
}
```

### Writing Responses (AI-Evaluated)

```
Total = aufgabenbewältigung + kommunikativeGestaltung + 
        korrektheit + wortschatz

aufgabenbewältigung (max 15):
  - Does response address all points?
  
kommunikativeGestaltung (max 10):
  - Structure, coherence, connectors (daher, ebenso, etc.)
  
korrektheit (max 10):
  - Grammar, syntax, orthography
  
wortschatz (max 10):
  - Vocabulary richness and appropriateness
```

### Result Example

```
Session: session_abc123_1692288000
Started: 2024-08-17 10:00:00
Finished: 2024-08-17 12:25:00 (time remaining: 5:00)

SCORE BREAKDOWN
═══════════════════════════════
Leseverstehen          61 / 75  (81%)
Sprachbausteine        24 / 30  (80%)
Hörverstehen           58 / 75  (77%)
Schriftlicher Ausdruck 31 / 45  (69%)
───────────────────────────────
TOTAL               174 / 225  (77%)

ANALYSIS
────────
Strongest: Leseverstehen (81%)
Weakest: Schriftlicher Ausdruck (69%)

ERRORS
──────
Q14: Your answer "C" → Correct answer "B"
  Why? The text explicitly states... [explanation]

Q31: Your answer "No" → Correct answer "Yes"
  Why? The context indicates... [explanation]
```

---

## Timer Security

### Why Absolute Time?

```
Vulnerable approach:
  remaining_seconds = 9000
  setInterval(() => remaining_seconds--, 1000)
  
Problems:
  - User can refresh page
  - User can manipulate JavaScript
  - User can modify system time
```

### Secure Approach

```javascript
// On exam start
expiresAt = now + 9000 seconds

// On every tick
remaining = expiresAt - now()

// Problems prevented:
✓ Refresh: remaining = expiresAt - now (recalculated)
✓ DevTools: remaining based on server time
✓ System time: Device time used, but expiresAt fixed
✓ JavaScript manipulation: timestamp is immutable
```

### Next Level (Production)

```
Server-side validation:
- Exam end timestamp stored on server
- Client submits answers with timestamp
- Server verifies: submission_time <= exam_ends_at
- Server rejects late submissions
```

---

## Customization

### Change Exam Duration

**File: data/exams.json**
```json
"duration": 5400  // 90 minutes instead of 150
```

### Change Point Values

**File: data/exams.json**
```json
{
  "maxPoints": 100,  // Change from 225
  "sections": [
    { "id": "lesen", "maxPoints": 30 },  // Instead of 75
    ...
  ]
}
```

### Customize Branding

**File: exam-simulator.html**
```html
<h1 class="text-4xl font-bold">Your Exam Title</h1>
<span class="material-symbols-outlined">your_icon</span>
```

---

## Troubleshooting

### Timer not updating
- Check browser console for errors
- Ensure JavaScript is enabled
- Reload exam-simulator.html

### Answers not saving
- Check localStorage is enabled
- Verify localStorage quota (usually 5-10MB)
- Check browser privacy settings

### Exam not locking at 00:00
- Ensure system time is correct
- Manually refresh after time expires
- Check browser console for exceptions

### Questions not rendering
- Verify data/exams.json is valid JSON
- Check file path is correct
- Ensure all question types are defined

---

## Performance Tips

### For Exams with Many Questions

1. **Lazy load questions**
   - Don't render all questions upfront
   - Render only visible section

2. **Compress exam data**
   - Minify JSON
   - Use shorter field names internally

3. **Use IndexedDB**
   - For 1000+ questions
   - Better than localStorage
   - Larger capacity

---

## Future Enhancements

- [ ] Real exam content (200+ questions)
- [ ] Audio playback for Hörverstehen
- [ ] Video proctoring
- [ ] Multiple languages
- [ ] Admin panel for content management
- [ ] User accounts & progress tracking
- [ ] Detailed analytics
- [ ] Practice question bank
- [ ] Full-screen enforcement
- [ ] Keyboard shortcut presets

---

## Support

For questions or issues:
1. Check this documentation
2. Review exam-simulator.html code
3. Check browser console for errors
4. Verify data/exams.json format

---

**Version**: 1.0.0  
**Last Updated**: August 2024  
**Status**: MVP Ready
