-- S-Lecton Exam Simulator Database Schema
-- PostgreSQL

-- ============================================
-- CORE EXAM DATA
-- ============================================

CREATE TABLE exams (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL DEFAULT 9000, -- 150 minutes in seconds
  total_points INTEGER NOT NULL DEFAULT 225,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_sections (
  id VARCHAR(50) PRIMARY KEY,
  exam_id VARCHAR(50) NOT NULL REFERENCES exams(id),
  name VARCHAR(100) NOT NULL,
  max_points INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_parts (
  id VARCHAR(50) PRIMARY KEY,
  section_id VARCHAR(50) NOT NULL REFERENCES exam_sections(id),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  points_per_question INTEGER,
  "order" INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- QUESTIONS
-- ============================================

CREATE TABLE questions (
  id VARCHAR(50) PRIMARY KEY,
  part_id VARCHAR(50) NOT NULL REFERENCES exam_parts(id),
  type VARCHAR(50) NOT NULL, -- matching, multipleChoice, fillInTheBlank, writing
  question_text TEXT,
  passage TEXT, -- For reading comprehension
  points INTEGER NOT NULL,
  audio_url VARCHAR(500), -- For listening comprehension
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_options (
  id VARCHAR(50) PRIMARY KEY,
  question_id VARCHAR(50) NOT NULL REFERENCES questions(id),
  option_text TEXT NOT NULL,
  option_index INTEGER NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  "order" INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE writing_criteria (
  id VARCHAR(50) PRIMARY KEY,
  question_id VARCHAR(50) NOT NULL REFERENCES questions(id),
  criterion_name VARCHAR(100) NOT NULL, -- aufgabenbewältigung, kommunikativeGestaltung, etc.
  max_points INTEGER NOT NULL,
  description TEXT,
  "order" INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- EXAM SESSIONS
-- ============================================

CREATE TABLE exam_sessions (
  id VARCHAR(50) PRIMARY KEY,
  exam_id VARCHAR(50) NOT NULL REFERENCES exams(id),
  started_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL, -- ← ABSOLUTE time, cannot be manipulated
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, expired, finished, abandoned
  ip_address INET,
  user_agent TEXT,
  device_info JSON, -- Browser, OS, screen resolution
  session_hash VARCHAR(255) UNIQUE, -- For verification
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_exam_id ON exam_sessions(exam_id);
CREATE INDEX idx_sessions_expires_at ON exam_sessions(expires_at);
CREATE INDEX idx_sessions_status ON exam_sessions(status);

-- ============================================
-- ANSWERS (Student Responses)
-- ============================================

CREATE TABLE answers (
  id VARCHAR(50) PRIMARY KEY,
  session_id VARCHAR(50) NOT NULL REFERENCES exam_sessions(id),
  question_id VARCHAR(50) NOT NULL REFERENCES questions(id),
  answer TEXT NOT NULL, -- The selected/filled answer
  answer_index INTEGER, -- For multiple choice (0, 1, 2, ...)
  answered_at TIMESTAMP NOT NULL,
  modified_count INTEGER DEFAULT 0, -- Track if user changed answer
  last_modified_at TIMESTAMP,
  is_flagged BOOLEAN DEFAULT false, -- User can flag for review
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_answers_session ON answers(session_id);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE UNIQUE INDEX idx_answers_unique ON answers(session_id, question_id);

-- ============================================
-- WRITING SUBMISSIONS
-- ============================================

CREATE TABLE writing_submissions (
  id VARCHAR(50) PRIMARY KEY,
  session_id VARCHAR(50) NOT NULL REFERENCES exam_sessions(id),
  question_id VARCHAR(50) NOT NULL REFERENCES questions(id),
  content TEXT NOT NULL,
  word_count INTEGER,
  character_count INTEGER,
  submitted_at TIMESTAMP NOT NULL,
  last_modified_at TIMESTAMP,
  revision_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_writing_session ON writing_submissions(session_id);

-- ============================================
-- RESULTS & SCORING
-- ============================================

CREATE TABLE exam_results (
  id VARCHAR(50) PRIMARY KEY,
  session_id VARCHAR(50) NOT NULL UNIQUE REFERENCES exam_sessions(id),
  exam_id VARCHAR(50) NOT NULL REFERENCES exams(id),

  -- Section Scores
  lesen_score DECIMAL(5,1),
  lesen_max_points INTEGER,

  sprachbausteine_score DECIMAL(5,1),
  sprachbausteine_max_points INTEGER,

  hoeren_score DECIMAL(5,1),
  hoeren_max_points INTEGER,

  schreiben_score DECIMAL(5,1),
  schreiben_max_points INTEGER,

  -- Total
  total_score DECIMAL(6,1),
  total_max_points INTEGER,
  percentage DECIMAL(5,2),

  -- Metadata
  scoring_engine_version VARCHAR(20), -- For tracking algorithm changes
  time_taken INTEGER, -- Seconds actually spent
  questions_answered INTEGER,
  questions_skipped INTEGER,

  generated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_results_session ON exam_results(session_id);
CREATE INDEX idx_results_exam ON exam_results(exam_id);
CREATE INDEX idx_results_percentage ON exam_results(percentage);

-- ============================================
-- DETAILED RESULTS (per question/section)
-- ============================================

CREATE TABLE question_results (
  id VARCHAR(50) PRIMARY KEY,
  exam_result_id VARCHAR(50) NOT NULL REFERENCES exam_results(id),
  question_id VARCHAR(50) NOT NULL REFERENCES questions(id),
  part_id VARCHAR(50) NOT NULL REFERENCES exam_parts(id),
  section_id VARCHAR(50) NOT NULL REFERENCES exam_sections(id),

  user_answer TEXT,
  correct_answer TEXT,
  score DECIMAL(5,1),
  max_points INTEGER,
  is_correct BOOLEAN,

  -- For writing
  aufgabenbewältigung DECIMAL(5,1),
  kommunikativeGestaltung DECIMAL(5,1),
  korrektheit DECIMAL(5,1),
  wortschatz DECIMAL(5,1),

  -- Feedback
  explanation TEXT, -- Why it's correct/wrong
  comment TEXT, -- Additional feedback

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_question_results_exam_result ON question_results(exam_result_id);
CREATE INDEX idx_question_results_question ON question_results(question_id);

-- ============================================
-- WRITING EVALUATION
-- ============================================

CREATE TABLE writing_evaluations (
  id VARCHAR(50) PRIMARY KEY,
  writing_submission_id VARCHAR(50) NOT NULL REFERENCES writing_submissions(id),
  exam_result_id VARCHAR(50) NOT NULL REFERENCES exam_results(id),

  aufgabenbewältigung_score DECIMAL(3,1),
  aufgabenbewältigung_max DECIMAL(3,1),
  aufgabenbewältigung_feedback TEXT,

  kommunikativeGestaltung_score DECIMAL(3,1),
  kommunikativeGestaltung_max DECIMAL(3,1),
  kommunikativeGestaltung_feedback TEXT,

  korrektheit_score DECIMAL(3,1),
  korrektheit_max DECIMAL(3,1),
  korrektheit_feedback TEXT,

  wortschatz_score DECIMAL(3,1),
  wortschatz_max DECIMAL(3,1),
  wortschatz_feedback TEXT,

  total_score DECIMAL(5,1),
  evaluator_type VARCHAR(20), -- ai, human, hybrid
  evaluated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ANALYTICS & REPORTING
-- ============================================

CREATE TABLE exam_statistics (
  id VARCHAR(50) PRIMARY KEY,
  exam_id VARCHAR(50) NOT NULL REFERENCES exams(id),
  date_period VARCHAR(20), -- daily, weekly, monthly
  date DATE,

  total_sessions INTEGER,
  completed_sessions INTEGER,
  abandoned_sessions INTEGER,
  average_score DECIMAL(5,2),

  -- By section
  avg_lesen DECIMAL(5,2),
  avg_sprachbausteine DECIMAL(5,2),
  avg_hoeren DECIMAL(5,2),
  avg_schreiben DECIMAL(5,2),

  -- Difficulty data
  easiest_question_id VARCHAR(50),
  hardest_question_id VARCHAR(50),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- AUDIT LOG
-- ============================================

CREATE TABLE audit_log (
  id VARCHAR(50) PRIMARY KEY,
  session_id VARCHAR(50) REFERENCES exam_sessions(id),
  event_type VARCHAR(100), -- session_created, answer_submitted, exam_finished, suspicious_activity
  event_data JSON,
  ip_address INET,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_session ON audit_log(session_id);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);

-- ============================================
-- CONTENT MANAGEMENT (Admin)
-- ============================================

CREATE TABLE content_versions (
  id VARCHAR(50) PRIMARY KEY,
  question_id VARCHAR(50) REFERENCES questions(id),
  exam_section_id VARCHAR(50) REFERENCES exam_sections(id),
  version_number INTEGER,
  previous_content JSON, -- Snapshot of old data
  change_description TEXT,
  changed_by VARCHAR(100),
  changed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- VIEWS (for easier queries)
-- ============================================

CREATE VIEW session_scores AS
SELECT
  s.id AS session_id,
  s.exam_id,
  s.started_at,
  s.expires_at,
  r.total_score,
  r.total_max_points,
  r.percentage,
  r.lesen_score,
  r.sprachbausteine_score,
  r.hoeren_score,
  r.schreiben_score
FROM exam_sessions s
LEFT JOIN exam_results r ON s.id = r.session_id;

CREATE VIEW question_difficulty AS
SELECT
  q.id,
  q.question_text,
  COUNT(DISTINCT a.session_id) AS times_answered,
  SUM(CASE WHEN qr.is_correct THEN 1 ELSE 0 END)::FLOAT /
    NULLIF(COUNT(DISTINCT a.session_id), 0) AS correct_rate,
  ROUND(100 * SUM(CASE WHEN qr.is_correct THEN 1 ELSE 0 END)::FLOAT /
    NULLIF(COUNT(DISTINCT a.session_id), 0)) AS difficulty_percentage
FROM questions q
LEFT JOIN answers a ON q.id = a.question_id
LEFT JOIN question_results qr ON q.id = qr.question_id
GROUP BY q.id, q.question_text
ORDER BY correct_rate ASC;

-- ============================================
-- CONSTRAINTS & TRIGGERS
-- ============================================

-- Ensure expires_at is always after started_at
ALTER TABLE exam_sessions
ADD CONSTRAINT check_session_time CHECK (expires_at > started_at);

-- Trigger to update exam_sessions updated_at
CREATE OR REPLACE FUNCTION update_session_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_session_timestamp
BEFORE UPDATE ON exam_sessions
FOR EACH ROW
EXECUTE FUNCTION update_session_timestamp();

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

INSERT INTO exams (id, title, description, duration, total_points) VALUES
('pruefung-001', 'Modelltest B2 — Prüfung 001', 'Vollständiger telc B2 Modelltest mit realem Zeitlimit', 9000, 225);

INSERT INTO exam_sections (id, exam_id, name, max_points, "order") VALUES
('lesen', 'pruefung-001', 'Leseverstehen', 75, 1),
('sprachbausteine', 'pruefung-001', 'Sprachbausteine', 30, 2),
('hoeren', 'pruefung-001', 'Hörverstehen', 75, 3),
('schreiben', 'pruefung-001', 'Schriftlicher Ausdruck', 45, 4);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_exams_active ON exams(is_active);
CREATE INDEX idx_questions_part ON questions(part_id);
CREATE INDEX idx_questions_active ON questions(is_active);
CREATE INDEX idx_options_question ON question_options(question_id);
