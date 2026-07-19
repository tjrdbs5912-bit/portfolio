import { profile } from '@/data/profile'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4 sm:px-6">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </a>
        <div className="flex gap-5 font-mono text-[11px] text-mute">
          <a href="#career" className="hover:text-fg">
            경력
          </a>
          <a href="#projects" className="hover:text-fg">
            프로젝트
          </a>
          <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
            연락
          </a>
        </div>
      </div>
    </header>
  )
}
