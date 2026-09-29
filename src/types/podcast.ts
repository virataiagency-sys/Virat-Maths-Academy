export type PodcastSpeaker = 'Virat' | 'Aadya' | 'Dr. Ramanujan' | 'Tara' | 'Prof. Vikram' | string;

export type PodcastStyle =
  | 'notebooklm_flow'
  | 'olympiad_hacks'
  | 'mental_speed_secrets'
  | 'socratic_tutor'
  | 'icse_proofs'
  | 'story_math';

export type HostDuoId = 'classic_flow' | 'olympiad_masters' | 'speed_hackers' | 'peer_study' | 'socratic_debate';

export interface HostDuo {
  id: HostDuoId;
  name: string;
  tagline: string;
  badge: string;
  host1: { name: string; title: string; voice: string; avatar: string; pitch: number; rate: number };
  host2: { name: string; title: string; voice: string; avatar: string; pitch: number; rate: number };
}

export const HOST_DUOS: Record<HostDuoId, HostDuo> = {
  classic_flow: {
    id: 'classic_flow',
    name: 'Virat & Aadya',
    tagline: 'Curious Concept Guide meets Agile Speed Strategist (NotebookLM style)',
    badge: 'Popular',
    host1: { name: 'Virat', title: 'Speed Strategist', voice: 'energetic', avatar: '⚡', pitch: 0.95, rate: 1.15 },
    host2: { name: 'Aadya', title: 'Concept Guide', voice: 'warm', avatar: '🌟', pitch: 1.1, rate: 1.0 }
  },
  olympiad_masters: {
    id: 'olympiad_masters',
    name: 'The Olympiad Masters',
    tagline: 'Deep mathematical rigor, ICSE theorems, & IMO problem decomposition',
    badge: 'Advanced',
    host1: { name: 'Dr. Ramanujan', title: 'Axiomatic Master', voice: 'scholarly', avatar: '🏛️', pitch: 0.9, rate: 0.95 },
    host2: { name: 'Aadya', title: 'Intuition Guide', voice: 'warm', avatar: '🌟', pitch: 1.1, rate: 1.0 }
  },
  speed_hackers: {
    id: 'speed_hackers',
    name: 'Speed & Exam Hackers',
    tagline: '5-second mental math shortcuts & board examination scoring heuristics',
    badge: 'Shortcuts',
    host1: { name: 'Virat', title: 'Mental Speed Hacker', voice: 'energetic', avatar: '⚡', pitch: 0.95, rate: 1.15 },
    host2: { name: 'Prof. Vikram', title: 'Exam Coach', voice: 'practical', avatar: '🎯', pitch: 1.0, rate: 1.05 }
  },
  peer_study: {
    id: 'peer_study',
    name: 'Peer Study Room',
    tagline: 'Friendly, stress-free peer learning with fun real-world stories',
    badge: 'Foundations',
    host1: { name: 'Aadya', title: 'Peer Math Buddy', voice: 'cheerful', avatar: '🌟', pitch: 1.15, rate: 1.05 },
    host2: { name: 'Virat', title: 'Mental Math Hacker', voice: 'energetic', avatar: '⚡', pitch: 0.95, rate: 1.15 }
  },
  socratic_debate: {
    id: 'socratic_debate',
    name: 'Socratic Debate Club',
    tagline: 'High-voltage intellectual banter: formal proof vs practical speed hack!',
    badge: 'Debate',
    host1: { name: 'Virat', title: 'Speed Strategist', voice: 'energetic', avatar: '⚡', pitch: 0.95, rate: 1.15 },
    host2: { name: 'Aadya', title: 'Deep Conceptualist', voice: 'warm', avatar: '🌟', pitch: 1.1, rate: 1.0 }
  }
};

export interface PodcastDialogueLine {
  id: string;
  speaker: string;
  role: string;
  text: string;
  emphasis?: string;
  soundCue?: string; // e.g. '[ding]', '[applause]', '[aha!]', '[chime]'
  timestamp: string; // e.g. '0:15'
}

export interface FlowAIPodcast {
  id: string;
  title: string;
  tagline: string;
  grade: number;
  topic: string;
  style: PodcastStyle;
  duoId?: HostDuoId;
  durationEstSeconds: number;
  hosts: {
    host1: { name: string; title: string; voice: string; avatar: string };
    host2: { name: string; title: string; voice: string; avatar: string };
  };
  hookIntro: string;
  questionRecap: string;
  dialogue: PodcastDialogueLine[];
  keyTakeaway: string;
  cheatSheetFormula?: string;
  audioGeneratedAt?: string;
}
