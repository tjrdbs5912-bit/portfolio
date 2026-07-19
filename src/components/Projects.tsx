'use client'

import { useState } from 'react'
import { projects, type Project } from '@/data/profile'
import { ProjectDialog } from './ProjectDialog'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="mx-auto max-w-2xl px-5 py-12 sm:px-6">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-mute">프로젝트</h2>

      <ul className="mt-6">
        {projects.map((project) => (
          <li key={project.id} className="border-t border-line">
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="group w-full py-5 text-left"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold tracking-tight group-hover:text-accent sm:text-lg">
                  {project.title}
                </h3>
              </div>
              <p className="mt-1 text-sm text-mute">
                {project.company}
           
              </p>
              <p className="mt-2 text-[14px] leading-6 text-fg/80">{project.summary}</p>
              <p className="mt-2 font-mono text-[11px] text-mute">
                {project.stack.slice(0, 5).join(' · ')}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
