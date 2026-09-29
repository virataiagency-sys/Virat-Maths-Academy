import { FlowAIPodcast, PodcastStyle, HostDuoId } from '../types/podcast';

export interface GeneratePodcastParams {
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: {
    conventionalStepByStep?: string[];
    speedHack?: string;
    keyTakeaway?: string;
  } | string;
  grade?: number;
  topic?: string;
  podcastStyle?: PodcastStyle;
  duoId?: HostDuoId;
}

export async function generateFlowAIPodcast(params: GeneratePodcastParams): Promise<FlowAIPodcast> {
  const response = await fetch('/api/gemini/generate-podcast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to generate podcast: status ${response.status}`);
  }

  return response.json();
}
