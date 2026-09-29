import { GradeLevel, PillarType } from './curriculum';
import { AppView } from '../components/Navbar';
import { DayOfWeek, ScheduledTopic, QuizReminder } from './planner';

export interface AgentActionExecution {
  id: string;
  type: 'navigate' | 'schedule_topic' | 'schedule_reminder' | 'generate_quiz' | 'search_web' | 'award_xp';
  description: string;
  parameters: Record<string, any>;
  status: 'pending' | 'executed' | 'failed';
  resultSummary?: string;
}

export interface AgentQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  speedHack?: string;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  thoughts?: string[];
  actions?: AgentActionExecution[];
  generatedQuiz?: {
    topic: string;
    grade: GradeLevel;
    questions: AgentQuizQuestion[];
  };
  groundingLinks?: { title: string; url: string }[];
}

export interface AgentState {
  isThinking: boolean;
  activePlan: string[];
  currentMode: 'autonomous' | 'socratic' | 'olympiad' | 'speed_coach';
  selectedGrade: GradeLevel;
}
