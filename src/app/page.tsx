'use client';

import { useState } from 'react';
import { Project, Task, ProjectStatus, initialProjects, statusConfig } from '@/lib/data';

function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  );
}

function PriorityDot({ priority }: { priority?: 'low' | 'medium' | 'high' }) {
  if (!priority) return null;
  const colors = {
    low: 'bg-slate-400',
    medium: 'bg-amber-400',
    high: 'bg-red-500',
  };
  return <span className={`w-2 h-2 rounded-full ${colors[priority]} inline-block mr-2`} />;
}

function TaskItem({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (taskId: string) => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${
        task.completed ? 'opacity-60' : ''
      }`}
      onClick={() => onToggle(task.id)}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      <PriorityDot priority={task.priority} />
      <span className={task.completed ? 'line-through text-slate-400' : 'text-slate-700'}>
        {task.title}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  onToggleTask,
  onStatusChange,
}: {
  project: Project;
  onToggleTask: (projectId: string, taskId: string) => void;
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const completedCount = project.tasks.filter((t) => t.completed).length;
  const totalCount = project.tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className={`h-2 ${project.color}`} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{project.description}</p>
          </div>
          <select
            value={project.status}
            onChange={(e) => onStatusChange(project.id, e.target.value as ProjectStatus)}
            className="text-xs font-medium px-2 py-1 rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-3 mb-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-600 hover:text-slate-800 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{completedCount}/{totalCount} tasks</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${project.color} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tasks */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-2"
        >
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Tasks
        </button>
        {expanded && (
          <div className="space-y-1 pl-2">
            {project.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={(taskId) => onToggleTask(project.id, taskId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatsCard({ projects }: { projects: Project[] }) {
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = projects.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
        <div className="text-sm text-slate-500">Total Projects</div>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-2xl font-bold text-emerald-600">{activeProjects}</div>
        <div className="text-sm text-slate-500">Active</div>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-2xl font-bold text-slate-900">{totalTasks}</div>
        <div className="text-sm text-slate-500">Total Tasks</div>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-2xl font-bold text-blue-600">{completedTasks}</div>
        <div className="text-sm text-slate-500">Completed</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : project
      )
    );
  };

  const changeStatus = (projectId: string, status: ProjectStatus) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, status } : project
      )
    );
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter((p) => p.status === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            🚀 Sean&apos;s Project Board
          </h1>
          <p className="text-slate-600">Track all your projects and tasks in one place</p>
        </div>

        {/* Stats */}
        <StatsCard projects={projects} />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            All
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilter(key as ProjectStatus)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-slate-900 text-white'
                  : `bg-white ${config.textColor} hover:bg-slate-50 border border-slate-200`
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleTask={toggleTask}
              onStatusChange={changeStatus}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500">
          Built with ❤️ by Carl • {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  );
}
