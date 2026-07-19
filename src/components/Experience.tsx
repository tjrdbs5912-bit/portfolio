import { profile } from '@/data/profile'

export function Experience() {
  return (
    <section id="career" className="mx-auto max-w-2xl px-5 py-12 sm:px-6">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-mute">경력</h2>

      <div className="mt-6 space-y-10">
        {profile.careers.map((career) => (
          <article key={career.company} className="border-t border-line pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight">{career.company}</h3>
              <p className="font-mono text-[11px] text-mute">{career.period}</p>
            </div>
            <p className="mt-1 text-sm text-mute">{career.role}</p>
            <ul className="mt-4 space-y-2">
              {career.points.map((point) => (
                <li key={point} className="flex gap-2 text-[14px] leading-6 text-fg/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
