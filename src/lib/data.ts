export type ProjectStatus = 'planning' | 'active' | 'paused' | 'done';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  url?: string;
  repoUrl?: string;
  tasks: Task[];
  color: string;
}

export const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Agent Arena',
    description: 'AI agent battle arena - watch agents compete in real-time challenges',
    status: 'active',
    url: 'https://agent-arena-nu.vercel.app',
    repoUrl: 'https://github.com/AskCarl/agent-arena',
    color: 'bg-emerald-500',
    tasks: [
      { id: '1-1', title: 'Add more arena types', completed: false, priority: 'medium' },
      { id: '1-2', title: 'Implement leaderboard', completed: false, priority: 'high' },
      { id: '1-3', title: 'Add sound effects', completed: false, priority: 'low' },
      { id: '1-4', title: 'Mobile responsiveness polish', completed: true },
    ],
  },
  {
    id: '2',
    name: 'Sebastian World',
    description: 'Interactive website for Sebastian with games, photos & more!',
    status: 'done',
    url: 'https://sebastian-world.vercel.app',
    repoUrl: 'https://github.com/AskCarl/sebastian-world',
    color: 'bg-purple-500',
    tasks: [
      { id: '2-1', title: 'Math game (3rd grade level)', completed: true, priority: 'high' },
      { id: '2-2', title: 'Photo album with family pics', completed: true, priority: 'high' },
      { id: '2-3', title: 'Minecraft decorations', completed: true, priority: 'medium' },
      { id: '2-4', title: 'Weather widget', completed: true, priority: 'medium' },
      { id: '2-5', title: 'Bash Bucks reward system', completed: true, priority: 'high' },
      { id: '2-6', title: 'Deploy to Vercel', completed: true, priority: 'high' },
    ],
  },
  {
    id: '3',
    name: 'The Coincierge',
    description: 'AI-powered crypto concierge service',
    status: 'planning',
    url: 'https://www.thecoincierge.io',
    color: 'bg-amber-500',
    tasks: [
      { id: '3-1', title: 'Define MVP features', completed: false, priority: 'high' },
      { id: '3-2', title: 'Design landing page', completed: false, priority: 'medium' },
      { id: '3-3', title: 'Research competitor landscape', completed: false, priority: 'medium' },
      { id: '3-4', title: 'Set up domain/hosting', completed: true },
    ],
  },
  {
    id: '4',
    name: 'Nibbles Bot',
    description: 'Polymarket arbitrage trading bot',
    status: 'paused',
    color: 'bg-rose-500',
    tasks: [
      { id: '4-1', title: 'Fix API rate limiting', completed: false, priority: 'high' },
      { id: '4-2', title: 'Implement new arb strategy', completed: false, priority: 'medium' },
      { id: '4-3', title: 'Manual signature setup', completed: false, priority: 'high' },
      { id: '4-4', title: 'Backtesting framework', completed: true },
    ],
  },
  {
    id: '5',
    name: 'Task Board',
    description: 'This very task board you\'re looking at!',
    status: 'active',
    repoUrl: 'https://github.com/AskCarl/task-board',
    color: 'bg-blue-500',
    tasks: [
      { id: '5-1', title: 'Initial build', completed: true },
      { id: '5-2', title: 'Deploy to Vercel', completed: true },
      { id: '5-3', title: 'Add persistent storage', completed: false, priority: 'high' },
      { id: '5-4', title: 'Add drag-and-drop', completed: false, priority: 'medium' },
    ],
  },
];

export const statusConfig: Record<ProjectStatus, { label: string; bgColor: string; textColor: string }> = {
  planning: { label: 'Planning', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
  active: { label: 'Active', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  paused: { label: 'Paused', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
  done: { label: 'Done', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
};
