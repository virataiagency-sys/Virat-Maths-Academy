export type BoardType = 'cbse' | 'icse' | 'state_board';

export interface BoardMeta {
  id: BoardType;
  name: string;
  shortName: string;
  badge: string;
  badgeClass: string;
  authority: string;
  standardPublishers: string;
  description: string;
  highlights: string[];
}

export type BoardProblemType =
  | 'Textbook Exercise'
  | 'Board Examination'
  | 'Exemplar / HOTS'
  | 'Practical / Field Math'
  | 'Scholarship / Competitive';

export interface BoardProblem {
  id: string;
  exercise: string;
  type: BoardProblemType;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  hint: string;
  solution: string;
  vedicShortcut?: string;
  boardInsight?: string; // Specific ICSE or State Board examiner insight
}

export interface BoardChapter {
  id: string;
  number: number;
  title: string;
  description: string;
  keyFormulas: string[];
  boardHighlight?: string;
  problems: BoardProblem[];
}

export interface BoardGradeBook {
  grade: number;
  board: BoardType;
  bookTitle: string;
  boardName: string;
  syllabusHighlights: string[];
  chapters: BoardChapter[];
}

export const BOARD_METADATA: Record<BoardType, BoardMeta> = {
  cbse: {
    id: 'cbse',
    name: 'CBSE / NCERT Board',
    shortName: 'CBSE',
    badge: 'NCERT Syllabus',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    authority: 'Central Board of Secondary Education (CBSE, Delhi)',
    standardPublishers: 'NCERT, NCERT Exemplar, RD Sharma, RS Aggarwal',
    description: 'National curriculum emphasizing conceptual clarity, algebraic foundations, and national competitive exam readiness (JEE, NEET, Olympiads).',
    highlights: ['NCERT Exercise solutions', 'Exemplar HOTS problems', 'CBSE Board Questions', 'Step-by-step marking rubrics']
  },
  icse: {
    id: 'icse',
    name: 'ICSE / CISCE Board',
    shortName: 'ICSE',
    badge: 'CISCE Syllabus',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    authority: 'Council for the Indian School Certificate Examinations (CISCE)',
    standardPublishers: 'Concise Mathematics (Selina), Understanding Mathematics (ML Aggarwal), Frank',
    description: 'In-depth rigorous curriculum renowned for Commercial Mathematics (GST, Banking RD, Shares), Matrices, Locus, Ogive curves, and formal proofs.',
    highlights: ['Selina & ML Aggarwal style problems', 'Commercial Math (GST & Banking)', 'Matrices & Loci Geometry', 'ISC Senior Secondary Prep']
  },
  state_board: {
    id: 'state_board',
    name: 'State Board / Local SCERT',
    shortName: 'State Board',
    badge: 'SCERT / Local Syllabus',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    authority: 'State Councils of Educational Research & Training (SCERT & State Boards)',
    standardPublishers: 'State Textbook Bureaus (Balbharati, Samacheer Kalvi, Karnataka KSEEB, etc.)',
    description: 'Regional state curriculum grounded in practical real-world arithmetic, Cramer’s rule, local trade, synthetic division, and State Scholarship (NMMS/NTSE) prep.',
    highlights: ['Cramer’s Rule & Determinants', 'Practical Regional Trade & Farm Math', 'State Board SSC/HSC exam format', 'NMMS & State Scholarship drills']
  }
};
