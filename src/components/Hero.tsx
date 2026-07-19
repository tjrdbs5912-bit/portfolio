import { profile } from '@/data/profile'

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-2xl px-5 pb-14 pt-12 sm:px-6 sm:pt-16">
      <p className="font-mono text-[11px] text-mute">
        {profile.title} · {profile.experience}
      </p>

      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
        {profile.name}
      </h1>

      <p className="mt-5 text-[15px] leading-7 text-mute">{profile.summary}</p>

      <dl className="mt-8 grid gap-3 border-t border-line pt-6 font-mono text-[12px] sm:grid-cols-2">
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 text-mute">Email</dt>
          <dd>
            <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
              {profile.email}
            </a>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 text-mute">Phone</dt>
          <dd>
            <a href={`tel:${profile.phone.replace(/-/g, '')}`} className="hover:underline">
              {profile.phone}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  )
}
