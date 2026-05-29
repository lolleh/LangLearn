import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { languages } from "@/data"
import { getLanguageStats } from "@/lib/storage"

const GRADIENTS = [
  "from-sl-green to-sl-blue",
  "from-sl-blue to-sl-green",
  "from-emerald-400 to-cyan-500",
]

function SparkleIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  )
}

const LANG_THEMES: Record<string, { icon: typeof BookIcon; gradient: string; border: string }> = {
  chinese: {
    icon: GlobeIcon,
    gradient: "from-red-500/10 via-yellow-500/10 to-red-500/10",
    border: "hover:border-red-400",
  },
  spanish: {
    icon: BookIcon,
    gradient: "from-sl-green/10 via-yellow-500/10 to-red-500/10",
    border: "hover:border-sl-green",
  },
  arabic: {
    icon: SparkleIcon,
    gradient: "from-emerald-500/10 via-sl-green/10 to-sl-blue/10",
    border: "hover:border-emerald-500",
  },
}

export default function Home() {
  const [stats, setStats] = useState<Record<string, ReturnType<typeof getLanguageStats>>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const s: Record<string, ReturnType<typeof getLanguageStats>> = {}
    for (const lang of languages) {
      s[lang.slug] = getLanguageStats(lang.slug)
    }
    setStats(s)
    setMounted(true)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sl-green/5 blur-3xl" />
        <div className="animate-float-delayed absolute -right-20 top-40 h-96 w-96 rounded-full bg-sl-blue/5 blur-3xl" />
        <div className="animate-float absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-sl-green/5 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 hidden h-16 w-16 md:block">
          <div className="animate-pulse-soft h-full w-full rounded-full bg-sl-green/10 blur-sm" />
        </div>
        <div className="absolute right-1/4 top-1/4 hidden h-12 w-12 md:block">
          <div className="animate-pulse-soft h-full w-full rounded-full bg-sl-blue/10 blur-sm" style={{ animationDelay: "1.5s" }} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-sl-green to-sl-blue p-8 text-white shadow-2xl md:p-12">
        <div className="animate-gradient absolute inset-0 bg-[linear-gradient(135deg,#1EB53A_0%,#0072C6_25%,#1EB53A_50%,#0072C6_75%,#1EB53A_100%)] bg-400% opacity-90" />
        <div className="relative z-10">
          <div className={`flex items-center justify-center gap-3 transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.78.147 2.653.255m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              LangLearn
            </h1>
          </div>
          <p className={`mx-auto mt-4 max-w-2xl text-center text-lg text-white/80 transition-all delay-100 duration-700 md:text-xl ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            Master Chinese, Spanish, and Arabic with interactive flashcards, quizzes, and voice pronunciation
          </p>
        </div>
      </div>

      {/* Language Cards */}
      <div className="grid gap-8 md:grid-cols-3">
        {languages.map((lang, i) => {
          const s = stats[lang.slug]
          const theme = LANG_THEMES[lang.slug]
          const Icon = theme.icon
          const delay = i * 150

          return (
            <Link
              key={lang.slug}
              to={`/language/${lang.slug}`}
              style={{ animationDelay: `${delay}ms` }}
              className={`group relative animate-fade-in-up overflow-hidden rounded-2xl border-2 border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme.border}`}
            >
              {/* Card top gradient bar */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sl-green to-sl-blue" />

              {/* Hover glow */}
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sl-green/5 to-sl-blue/5 blur-xl" />
              </div>

              {/* Background pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative z-10">
                {/* Icon + Flag */}
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sl-green to-sl-blue text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <div className="h-7 w-7">
                      <Icon />
                    </div>
                  </div>
                  <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{lang.flag}</span>
                </div>

                {/* Language Name */}
                <h2 className="mt-4 text-2xl font-bold text-gray-800 group-hover:text-sl-green-dark transition-colors duration-300">
                  {lang.name}
                </h2>
                <p className="text-sm capitalize text-gray-400">{lang.slug}</p>

                {/* Stats */}
                {s && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-sl-green/10 to-sl-green/5 p-3 text-center transition-transform duration-300 group-hover:scale-105">
                      <p className="text-lg font-bold text-sl-green">{s.wordsLearned}</p>
                      <p className="text-xs text-gray-500">Words Seen</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-sl-blue/10 to-sl-blue/5 p-3 text-center transition-transform duration-300 group-hover:scale-105">
                      <p className="text-lg font-bold text-sl-blue">{s.accuracy}%</p>
                      <p className="text-xs text-gray-500">Accuracy</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3 text-center transition-transform duration-300 group-hover:scale-105">
                      <p className="text-lg font-bold text-gray-700">{s.sessions}</p>
                      <p className="text-xs text-gray-500">Sessions</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3 text-center transition-transform duration-300 group-hover:scale-105">
                      <p className="text-lg font-bold text-gray-700">{s.totalReviewed}</p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                  </div>
                )}

                {/* Start button */}
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-sl-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>Start learning</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Bottom decorative bar */}
      <div className="mt-12 flex items-center justify-center gap-4 text-xs text-gray-400">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-sl-green/30 to-transparent" />
        <span>Learn at your own pace</span>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-sl-blue/30 to-transparent" />
      </div>
    </div>
  )
}
