'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Project } from '@/data/profile'

type Props = {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)



  const sites =
    project?.sites ??
    (project?.url
      ? [{ label: '사이트', url: project.url, image: project.image }]
      : project?.image
        ? [{ label: project.title, url: '', image: project.image }]
        : [])

  const imageSites = sites.filter((site) => site.image)
  const linkSites = sites.filter((site) => site.url)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (project) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="fixed inset-0 z-[100] m-auto max-h-[min(92svh,880px)] w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-2xl border border-line bg-bg p-0 open:flex open:flex-col backdrop:bg-fg/40"
    >
      {project && (
        <div className="flex max-h-[min(92svh,880px)] flex-col overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
            <div>
              <p className="font-mono text-[11px] text-mute">{project.company}</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">{project.title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="font-mono text-[11px] text-mute hover:text-fg"
            >
              닫기
            </button>
          </div>

          <div className="overflow-y-auto">
            {imageSites.length > 0 && (
              <div
                className={
                  imageSites.length > 1
                    ? 'grid grid-cols-1 border-b border-line sm:grid-cols-2'
                    : 'border-b border-line'
                }
              >
                {imageSites.map((site) => (
                  <div key={site.label + (site.url || site.image)} className="relative">
                    {imageSites.length > 1 && (
                      <p className="absolute left-3 top-3 z-10 bg-bg/90 px-2 py-0.5 font-mono text-[11px] text-mute">
                        {site.label}
                      </p>
                    )}
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={site.image!}
                        alt={site.label}
                        fill
                        className="object-contain w-full h-auto"
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              {linkSites.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-3">
                  {linkSites.map((site) => (
                    <a
                      key={site.label + site.url}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-medium text-accent hover:underline"
                    >
                      {linkSites.length > 1 ? `${site.label} 보기 →` : '사이트 보기 →'}
                    </a>
                  ))}
                </div>
              )}

              <p className="text-[14px] leading-6 text-mute">{project.summary}</p>

              <p className="mt-6 font-mono text-[11px] text-mute">주요 내용</p>
              <ul className="mt-2 space-y-2">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-6">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {project.troubleshooting && project.troubleshooting.length > 0 && (
                <>
                  <p className="mt-6 font-mono text-[11px] text-mute">트러블슈팅</p>
                  <ul className="mt-2 space-y-4">
                    {project.troubleshooting.map((item) => (
                      <li
                        key={item.problem}
                        className="space-y-1 border-l-2 border-accent/40 pl-3 text-[13px] leading-6"
                      >
                        <p>
                          <span className="font-semibold">문제 </span>
                          <span className="text-mute">{item.problem}</span>
                        </p>
                        <p>
                          <span className="font-semibold">원인 </span>
                          <span className="text-mute">{item.cause}</span>
                        </p>
                        <p>
                          <span className="font-semibold">해결 </span>
                          <span className="text-mute">{item.solution}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="mt-6 font-mono text-[11px] text-mute">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
