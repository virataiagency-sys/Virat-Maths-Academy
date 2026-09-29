import { AgentMessage, AgentActionExecution } from '../types/agent';
import { GradeLevel } from '../types/curriculum';

export interface CallAgentParams {
  message: string;
  conversationHistory: AgentMessage[];
  grade: GradeLevel;
  activeView: string;
  studentContext?: {
    streak?: number;
    completedQuizzes?: number;
  };
}

export interface AgentApiResponse {
  reply: string;
  thoughts?: string[];
  actions?: AgentActionExecution[];
  generatedQuiz?: {
    topic: string;
    grade: GradeLevel;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
      speedHack?: string;
    }[];
  };
}

export async function sendAgentMessage(params: CallAgentParams): Promise<AgentApiResponse> {
  const response = await fetch('/api/gemini/agent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: params.message,
      conversationHistory: params.conversationHistory.slice(-8), // Send recent context
      grade: params.grade,
      activeView: params.activeView,
      studentContext: params.studentContext
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Agent failed with status ${response.status}`);
  }

  return response.json();
}
