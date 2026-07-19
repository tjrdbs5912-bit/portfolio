import { skills } from '@/data/profile'

const groups = [
  { label: '프론트엔드', items: skills.frontend },
  { label: '도구', items: skills.tools },
] as const

export function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-2xl px-5 py-12 sm:px-6">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-mute">기술 스택</h2>

      <div className="mt-6 divide-y divide-line border-y border-line">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[6.5rem_1fr] sm:items-baseline sm:gap-6"
          >
            <p className="text-sm font-medium text-fg">{group.label}</p>
            <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
              {group.items.map((item, i) => (
                <li key={item} className="text-[14px] leading-6 text-mute">
                  {item}
                  {i < group.items.length - 1 && (
                    <span className="ml-2 text-line" aria-hidden>
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
