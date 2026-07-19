import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="mx-auto max-w-2xl border-t border-line px-5 py-12 sm:px-6">
      <p className="text-sm text-mute">연락 주시면 빠르게 답장드리겠습니다.</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a href={`mailto:${profile.email}`} className="font-medium text-accent hover:underline">
          {profile.email}
        </a>
        <a href={`tel:${profile.phone.replace(/-/g, '')}`} className="hover:underline">
          {profile.phone}
        </a>
      </div>
      <p className="mt-10 font-mono text-[11px] text-mute">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
