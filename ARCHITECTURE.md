# S-Lecton Exam Simulator - Architecture

## 1. System Overview

S-Lecton is a **realistic telc B2 exam simulator** that reproduces the actual exam constraints:

- **Global 150-minute timer** (inviolable, based on absolute time)
- **Free navigation** between all sections
- **Automatic scoring** with detailed feedback
- **No account required** (MVP stage)

### Key Principles

✓ **One exam = One session** with a global timer
✓ **Absolute time tracking** (cannot be manipulated)
✓ **Automatic lockdown** at 00:00
✓ **Complete navigation freedom**
✓ **Instant results** with section-by-section breakdown

---

## 2. Application Flow

### Landing Page
```
User visits simulator
    ↓
Chooses exam (Prüfung 001)
    ↓
Clicks "Prüfung starten"
```

### Exam Session
```
Timer starts: 02:30:00
User can freely navigate:
  • Lesen (Teil 1, 2, 3)
  • Sprachbausteine (Teil 1, 2)
  • Hörverstehen (Teil 1, 2, 3)
  • Schriftlicher Ausdruck

User can revisit sections anytime.
Timer decrements globally (not per section).

At 00:00:
  • Exam auto-locks
  • Results page shows automatically
```

### Results Page
```
Shows:
  • Total score (e.g., 174/225)
  • Section breakdown (75 max per section)
  • Percentage scores
  • Detailed error analysis
```

---

## 3. Technical Architecture

### Frontend (exam-simulator.html)

#### Classes

**ExamManager**
- Manages exam data and session lifecycle
- Stores answers in local session
- Computes remaining time based on **absolute expiration time**

```javascript
// Session structure
{
  id: "session_xxx_timestamp",
  examId: "pruefung-001",
  startedAt: ISO 8601,
  expiresAt: ISO 8601,  // ← ABSOLUTE time (not duration!)
  status: "active" | "expired" | "finished"
}
```

**UIRenderer**
- Renders exam interface with section tabs
- Renders different question types dynamically
- Updates DOM based on user selections

**ExamTimer**
- Updates timer every 1 second
- Compares current time to `expiresAt`
- Triggers auto-lockdown when time expires
- Prevents manipulation (uses server time concept)

**ScoringEngine**
- Auto-scores objective questions (matching, MC, fill-in)
- Evaluates writing responses (AI-based scoring)
- Generates detailed reports
- Calculates section and total scores

---

## 4. Question Types

### Matching (Leseverstehen Teil 1)
```json
{
  "type": "matching",
  "text": "Fleischloser Genuss: Ein Trend...",
  "passage": "Immer mehr Menschen...",
  "options": ["A", "B", "C", ...],
  "correctAnswer": "A",
  "points": 3
}
```

### Multiple Choice (Leseverstehen Teil 2)
```json
{
  "type": "multipleChoice",
  "text": "Welche Aussage ist richtig?",
  "options": ["Option 1", "Option 2", "Option 3"],
  "correctAnswer": 1,
  "points": 3
}
```

### Fill in the Blank (Sprachbausteine)
```json
{
  "type": "fillInTheBlank",
  "text": "Die Technologie _____ die Arbeitswelt verändert.",
  "options": ["hat", "haben", "hadde", "habe"],
  "correctAnswer": 0,
  "points": 2
}
```

### Writing (Schriftlicher Ausdruck)
```json
{
  "type": "writing",
  "prompt": "Schreiben Sie eine Beschwerde-Email...",
  "points": 45,
  "criteria": {
    "aufgabenbewältigung": 15,
    "kommunikativeGestaltung": 10,
    "korrektheit": 10,
    "wortschatz": 10
  }
}
```

---

## 5. Scoring System

### Section Breakdown

| Section | Max Points | Weight |
|---------|-----------|--------|
| Leseverstehen | 75 | 33% |
| Sprachbausteine | 30 | 13% |
| Hörverstehen | 75 | 33% |
| Schriftlicher Ausdruck | 45 | 20% |
| **TOTAL** | **225** | **100%** |

### Automatic Scoring Logic

**Objective Questions** (Matching, MC, Fill-in)
```
if (userAnswer === correctAnswer) {
  score = question.points
} else {
  score = 0
}
```

**Writing Assessment**
```
score = 
  evaluateTaskCompletion(text) +
  evaluateCoherence(text) +
  evaluateGrammar(text) +
  evaluateVocabulary(text)

max 45 points
```

### Result Example
```
Leseverstehen:        61 / 75  (81%)
Sprachbausteine:      24 / 30  (80%)
Hörverstehen:         58 / 75  (77%)
Schriftlicher Ausdruck: 31 / 45  (69%)
─────────────────────────────
TOTAL:               174 / 225  (77%)
```

---

## 6. Timer Implementation

### Why Absolute Time?

Users could:
- Refresh the page
- Close the browser
- Modify JavaScript
- Change device time

### Solution: Expiration Time

```javascript
// Session creation
const now = new Date();
const expiresAt = new Date(now.getTime() + 9000000); // 150 min in ms
localStorage: { expiresAt: "2024-08-17T12:30:45Z" }

// On every update
const remaining = expiresAt - Date.now();
if (remaining <= 0) → LOCK EXAM
```

### Validation Flow

```
1. User loads exam
2. Check localStorage for expiresAt
3. Calculate: remaining = expiresAt - now
4. If remaining > 0 → Continue
5. If remaining <= 0 → Auto-lock
```

---

## 7. Data Persistence

### Client-Side (localStorage)

```javascript
localStorage["exam_session_abc123"] = {
  session: { ... },
  answers: {
    "q1": { answer: "A", answeredAt: "..." },
    "q2": { answer: "2", answeredAt: "..." },
    ...
  }
}
```

### Advantages
- No server dependency
- Instant save on every answer
- Works offline
- Private (no external storage)

### Limitations (MVP)
- Only one device
- Lost if browser data cleared
- No analytics

---

## 8. Future Backend Structure

When moving to production:

### Database Schema (PostgreSQL)

```sql
-- Exams
CREATE TABLE exams (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  duration INTEGER, -- seconds
  total_points INTEGER,
  created_at TIMESTAMP
);

-- Exam Sections
CREATE TABLE exam_sections (
  id VARCHAR PRIMARY KEY,
  exam_id VARCHAR REFERENCES exams,
  name VARCHAR,
  max_points INTEGER,
  "order" INTEGER
);

-- Questions
CREATE TABLE questions (
  id VARCHAR PRIMARY KEY,
  section_id VARCHAR REFERENCES exam_sections,
  type VARCHAR, -- matching, multipleChoice, fillInBlank, writing
  question_text TEXT,
  points INTEGER,
  correct_answer VARCHAR
);

-- Options (for MC/Matching/Fill-in)
CREATE TABLE options (
  id VARCHAR PRIMARY KEY,
  question_id VARCHAR REFERENCES questions,
  option_text VARCHAR,
  is_correct BOOLEAN
);

-- Exam Sessions
CREATE TABLE exam_sessions (
  id VARCHAR PRIMARY KEY,
  exam_id VARCHAR REFERENCES exams,
  started_at TIMESTAMP,
  expires_at TIMESTAMP, -- ← ABSOLUTE TIME
  status VARCHAR, -- active, expired, finished
  ip_address INET,
  user_agent TEXT
);

-- Answers (Student responses)
CREATE TABLE answers (
  id VARCHAR PRIMARY KEY,
  session_id VARCHAR REFERENCES exam_sessions,
  question_id VARCHAR REFERENCES questions,
  answer VARCHAR,
  answered_at TIMESTAMP
);

-- Writing Submissions
CREATE TABLE writing_submissions (
  id VARCHAR PRIMARY KEY,
  session_id VARCHAR REFERENCES exam_sessions,
  question_id VARCHAR REFERENCES questions,
  content TEXT,
  submitted_at TIMESTAMP
);

-- Results
CREATE TABLE results (
  id VARCHAR PRIMARY KEY,
  session_id VARCHAR REFERENCES exam_sessions,
  lesen_score DECIMAL,
  sprachbausteine_score DECIMAL,
  hoeren_score DECIMAL,
  schreiben_score DECIMAL,
  total_score DECIMAL,
  percentage DECIMAL,
  created_at TIMESTAMP
);
```

### API Endpoints

```
POST   /api/exams
GET    /api/exams/:id
POST   /api/sessions
GET    /api/sessions/:id
PUT    /api/sessions/:id/answer
POST   /api/sessions/:id/finish
GET    /api/results/:sessionId
```

---

## 9. Security Considerations

### Current (MVP)
- Client-side only
- localStorage for data
- No authentication

### Production Requirements
- Server-side timer validation
- IP-based session tracking
- Disable copy/paste during exam
- Full-screen enforcement
- Webcam proctoring (optional)
- Tamper detection (console/DevTools)
- Answer submission timestamps
- Prevent back button

---

## 10. Exam Experience

### User Workflow

```
1. Landing Page
   └─ Choose "Modelltest B2 — Prüfung 001"

2. Exam Starts
   ├─ Timer: 02:30:00
   ├─ Sidebar navigation
   └─ Click sections freely

3. Example Navigation
   Lesen (30 min) → Sprachbausteine (5 min) → Hören (20 min) 
   → Schreiben (30 min) → Back to Lesen (5 min) → Finish

4. Auto-Lock at 00:00
   └─ Exam locked, cannot modify answers

5. Results Page
   ├─ Total Score: 174/225 (77%)
   ├─ Section Breakdown
   ├─ Error Analysis
   └─ Recommendations
```

---

## 11. Implementation Roadmap

### Phase 1: MVP (Current)
- [x] Exam simulator with global timer
- [x] Free navigation
- [x] Auto-scoring (objective + writing)
- [x] Results page
- [ ] Real exam content (150+ questions)

### Phase 2: Enhancement
- [ ] Backend API
- [ ] User authentication
- [ ] Progress saving
- [ ] Detailed analytics
- [ ] Admin panel

### Phase 3: Scale
- [ ] Multiple exams (B1, C1)
- [ ] Speaking component
- [ ] Video proctoring
- [ ] Performance tracking
- [ ] Community features

---

## 12. Performance & Optimization

### Current
- Single HTML file
- ~15KB JavaScript
- LocalStorage
- Real-time UI updates

### Optimizations (if needed)
- Lazy load questions
- Service workers for offline
- IndexedDB for large datasets
- Compress exam data
- CDN for static assets

---

## 13. Testing Strategy

### Unit Tests
- Timer calculations
- Score computations
- Question rendering

### Integration Tests
- Full exam flow
- Session persistence
- Timer accuracy

### User Testing
- Navigation intuitiveness
- Timer clarity
- Results comprehension

---

## Summary

S-Lecton is a **client-side exam simulator** that faithfully reproduces telc B2 constraints with:

1. **Global 150-minute timer** (inviolable)
2. **Complete navigation freedom**
3. **Automatic scoring** (45-point scale)
4. **Instant results** with detailed breakdown
5. **Zero-setup launch** (no accounts)

This creates a **realistic exam experience** that helps users practice under actual test conditions.
