export type PillarType = 'basic_maths' | 'algebra' | 'abacus' | 'vedic_maths';

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FlowchartNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'output' | 'end';
  title: string;
  description: string;
  exampleStep?: string;
  yesNext?: string;
  noNext?: string;
  next?: string;
}

export interface FlowchartData {
  title: string;
  concept: string;
  realWorldExample: string;
  nodes: FlowchartNode[];
}

export interface InfographicItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  keyRule: string;
  visualType: 'formula' | 'abacus_bead' | 'steps' | 'diagram' | 'comparison';
  details: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  visualData?: {
    beadValue?: number;
    formulaLatex?: string;
    diagramLines?: { left: string; middle: string; right: string }[];
    highlightText?: string;
  };
  mnemonicOrTakeaway: string;
}

export interface TipTrickItem {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Hard';
  howItWorks: string[];
  example: {
    question: string;
    steps: string[];
    answer: string;
  };
  commonPitfall: string;
  timeSaved: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PillarContent {
  pillar: PillarType;
  pillarName: string;
  tagline: string;
  iconName: string;
  flowchart: FlowchartData;
  infographics: InfographicItem[];
  tipsAndTricks: TipTrickItem[];
  quiz: QuizQuestion[];
}

export interface GradeCurriculum {
  grade: GradeLevel;
  gradeTitle: string;
  levelTier: 'Primary (Classes 1-5)' | 'Middle (Classes 6-8)' | 'Secondary (Classes 9-10)' | 'Senior (Classes 11-12)';
  themeDescription: string;
  pillars: Record<PillarType, PillarContent>;
}
